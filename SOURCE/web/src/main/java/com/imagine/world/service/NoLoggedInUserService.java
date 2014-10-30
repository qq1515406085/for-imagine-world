package com.imagine.world.service;

import com.google.common.base.Objects;
import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.google.common.io.Files;
import com.imagine.world.common.AvatarType;
import com.imagine.world.common.UserType;
import com.imagine.world.dao.SessionDAO;
import com.imagine.world.dao.UserDAO;
import com.imagine.world.exception.AuthorizationException;
import com.imagine.world.exception.InprocessException;
import com.imagine.world.exception.MyException;
import com.imagine.world.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by tuanlhd on 10/28/14.
 */
@Component
public class NoLoggedInUserService implements CombineServices {

    @Resource
    Session session;
    @Resource
    ServiceState serviceState;
    @Autowired
    HttpServletRequest request;


    @Override
    public void authorize(
//            ServiceState serviceState, HttpServletRequest httpServletRequest,
                          HttpServletResponse httpServletResponse, String email, String password) throws MyException {
        //        ValidationUtils.rejectIfEmptyOrWhitespace();
        Preconditions.checkArgument(EMAIL_PATTERN_C.matcher(email).matches(), "Invalid email " + email);
        Preconditions.checkArgument(PASSWORD_PATTERN_C.matcher(password).matches(),"Invalid password " + password );

        /**
         * Create DAOs
         */
        UserDAO userDAO = new UserDAO();
        SessionDAO sessionDAO = new SessionDAO();

        /**
         * FIND USER by EMAIL
         */
        List<UsersEntity> usersEntityList = userDAO.getUserByEmail(email);

        /**
         * Start confirm login.
         */
        if(!usersEntityList.isEmpty()){
            UsersEntity usersEntity = usersEntityList.get(0);
            int loginAttempts = usersEntity.getUserLoginAttempts();
            int lastWarning = usersEntity.getUserLastWarning();
            int currentTime = (int) (System.currentTimeMillis()/1000L);

            if(currentTime-lastWarning <= LOGIN_FAIL_TIMEOUT  ){
                usersEntity.setUserLoginAttempts(new Integer(0).byteValue());
                userDAO.merge(usersEntity);
                throw new AuthorizationException(String.format("Must waiting for %s seconds", "" + (LOGIN_FAIL_TIMEOUT - (currentTime - lastWarning))));
            }

            if(loginAttempts >= MAX_LOGIN_ATTEMPS){
                usersEntity.setUserLastWarning(currentTime);
                lastWarning = usersEntity.getUserLastWarning();
                userDAO.merge(usersEntity);
                throw new AuthorizationException(String.format("2Must waiting for %s seconds",""+(LOGIN_FAIL_TIMEOUT-(currentTime-lastWarning))));
            }

            //check password
            if(!usersEntity.getUserPassword().equals(password)){
                int currentLoginAttemps = usersEntity.getUserLoginAttempts();
                currentLoginAttemps++;
                usersEntity.setUserLoginAttempts(new Integer(currentLoginAttemps).byteValue());
                userDAO.merge(usersEntity);
                throw new AuthorizationException("Invalid password *****");
            }

            /**
             * Reset attemps and set authorization success status
             */
            usersEntity.setUserLoginAttempts(new Integer(0).byteValue());
            userDAO.merge(usersEntity);

            /**
             * Save current session
             */
            HttpSession httpSession = request.getSession();
            List<SessionsEntity> sessionsEntityList = sessionDAO.getSessionByUserId(usersEntity.getUserId());
            SessionsEntity sessionsEntity;
            if(0 == sessionsEntityList.size()){
                sessionsEntity = new SessionsEntity();
            } else
                sessionsEntity = sessionsEntityList.get(0);
            if(!httpSession.getId().equalsIgnoreCase(sessionsEntity.getSessionId()))
                sessionDAO.delete(sessionsEntity);
            sessionsEntity.setSessionId(httpSession.getId());
            sessionsEntity.setSessionUserId(usersEntity.getUserId());
            sessionsEntity.setSessionTime((int) (httpSession.getLastAccessedTime() - httpSession.getCreationTime()));
            sessionsEntity.setSessionLastVisit(currentTime);
            sessionsEntity.setSessionBrowser("TBD");
            sessionsEntity.setSessionForwardedFor(Strings.nullToEmpty(request.getHeader("X-Forwarded-For")));
            sessionsEntity.setSessionIp(Strings.nullToEmpty(request.getRemoteAddr()));
            sessionsEntity.setSessionPage("");
            sessionDAO.persist(sessionsEntity);//use persist is better than merge for this case

            /**
             * Set cookie for remember user.
             */
            Cookie cookieSessionId = new Cookie(COOKIE_KEY_SESSION_ID, httpSession.getId());//set as default. because i has not updated sequences :D
            Cookie cookieUserId = new Cookie(COOKIE_KEY_USER_ID, usersEntity.getUserId()+"");//set as default. because i has not updated sequences :D
            cookieSessionId.setMaxAge(60*60*24*365);// 1 year
            cookieUserId.setMaxAge(60*60*24*365);// 1 year
            httpServletResponse.addCookie(cookieSessionId);
            httpServletResponse.addCookie(cookieUserId);

            /**
             * Set some information to current session
             */
            session.setUserId(usersEntity.getUserId());
            session.setEmail(usersEntity.getUserEmail());
            session.setUsername(usersEntity.getUsername());
            /**
             * Switch UserType
             */
            UserType userType = UserType.getType(usersEntity.getUserType());
            switch (userType){
                case NORMAL_USER:
                    serviceState.changeToNormalUser();
                    break;
                case FOUNDER:
                    serviceState.changeToPowerUser();
                    break;
                default:
                    serviceState.changeToNoLoggedInUser();
            }



        } else { // there are not existing a user.
            throw new AuthorizationException("There are not existing such user's email " + email);

        }
    }

    @Override
    public void logOut() throws MyException {
        throw new AuthorizationException("This user does not logged in");

    }

    @Override
    public void issueArticle(HttpServletResponse response) throws MyException {
        this.checkLogin(response);
        /**
         * after check login. if user is logged in. this will change state to normal user or others.
         */
        this.serviceState.getService().issueArticle(response);
        throw new AuthorizationException("This user does not logged in");

    }

    @Override
    public void register(String username, String email, String password, Date birthday, Integer userType, BigDecimal timezone, Integer rank, String avatar, String avatarType, Short avatarWidth, Short avatarHeight, String userSig, String userFrom) throws MyException {
//        ValidationUtils.rejectIfEmptyOrWhitespace();
        Preconditions.checkArgument(USERNAME_PATTERN_C.matcher(username).matches(),"Invalid username "+username);
        Preconditions.checkArgument(EMAIL_PATTERN_C.matcher(email).matches(),"Invalid email "+email);
        Preconditions.checkArgument(PASSWORD_PATTERN_C.matcher(password).matches(),"Invalid password");
        // validate timezone http://stackoverflow.com/questions/13092865/timezone-validation-in-java

        UserDAO userDAO = new UserDAO();
        Preconditions.checkState(userDAO.getUserByEmail(email).isEmpty(),"This email was existed in system "+email);
        Preconditions.checkState(userDAO.getUserByUsername(username).isEmpty(),"This username was existed in system "+username);

        UserProfile userProfile = new UserProfile();
        userProfile.setUsername(username);
        userProfile.setUserEmail(email);
        userProfile.setPassword(password);

        if(null!=userType)
            userProfile.setUserType(userType);
        else
            userProfile.setUserType(UserType.NORMAL_USER.getValue());

        if(null!=birthday){
            userProfile.setBirthday(birthdayFormat.format(birthday));
        }

        if(null!=timezone){
            Preconditions.checkArgument(isValidTimezone(timezone),"Invalid Timezone");
            userProfile.setTimezone(timezone);
        } else {
            userProfile.setTimezone(new BigDecimal(0.00));
        }

        if(null!=rank && rank>=0){
            userProfile.setUserRank(rank);
        }

        //avatarType is not null
        if(!Strings.isNullOrEmpty(avatarType) && !Strings.isNullOrEmpty(avatar)){
            if(avatarType == AvatarType.UPLOADED.getValue()){
                String tempPath = session.getTempAvatarPath();
                File tempFile = new File(tempPath);
                String newPath = PATH_AVATAR_FINAL+tempFile.getName();
                avatar = newPath;
                try {
                    Files.move(tempFile, new File(newPath));
                } catch (IOException e) {
                    throw new InprocessException("ERROR moving temp avatar to fixed local "+e.getMessage());
                }
            }

            userProfile.setUserAvatar(avatar);
            userProfile.setAvatarType(avatarType);
            userProfile.setAvatarWidth(Objects.firstNonNull(avatarWidth, (short) 0));
            userProfile.setAvatarHeight(Objects.firstNonNull(avatarHeight,(short)0));
        }

        if(!Strings.isNullOrEmpty(userSig))
            userProfile.setUserSig(userSig);
        if(!Strings.isNullOrEmpty(userFrom))
            userProfile.setUserFrom(userFrom);

        //To DAO and save
        userDAO.persist(userProfile.toUserDao());
    }

    ///////// ValidateUtils /////////////////////////
    private boolean isValidTimezone(BigDecimal timezone){
        return 0 <= timezone.doubleValue() && timezone.doubleValue() <=23;
//        String[] availableIDs = TimeZone.getAvailableIDs();
//        for (String tzId : availableIDs) {
//            if(tzId.equals(timezone))
//                return true;
//        }
//        return false;
    }



    @Override
    public void uploadTempAvatar(MultipartFile multipartFile) throws MyException {
        if(!multipartFile.isEmpty())
            try {
                String fileName = multipartFile.getOriginalFilename();
                String path = PATH_AVATAR_TEMP+simpleDateFormat.format(new Date())+"."+fileName;
                multipartFile.transferTo(new File(path));
                session.setTempAvatarPath(path);
            } catch (IOException e) {
                throw new InprocessException("Error of multipartFile transfer fail "+e.getMessage());
            }
        else
            throw new InprocessException("MultipartFile is empty !!!");

    }


    @Override
    public UserProfile userInfo(HttpServletResponse response) throws MyException {
        this.checkLogin(response);
        /**
         * after check login. if user is logged in. this will change state to normal user or others.
         */
        return this.serviceState.getService().userInfo(response);
    }

    /**
     *
     * @param userId REQUIRED
     * @param username
     * @param currentEmail
     * @param newEmail
     * @param newPass
     * @param currentPass
     * @param userBirthday
     * @param userType
     * @param userAvatar
     * @param userAvatarType
     * @param userAvatarWidth
     * @param userAvatarHeight
     * @param userSig
     * @param userFrom
     * @throws MyException
     */
    @Override
    public void modifyUser(
                            HttpServletResponse response,
                           int userId, String username, String currentEmail, String newEmail,
                           String newPass, String currentPass, String userBirthday,
                           int userType, String userAvatar, String userAvatarType,
                           Short userAvatarWidth, Short userAvatarHeight, String userSig, String userFrom) throws MyException {
        this.checkLogin(response);
        /**
         * after check login. if user is logged in. this will change state to normal user or others.
         */
        this.serviceState.getService().modifyUser(
                                    response,
                                    userId,
                                    username,
                                    currentEmail,
                                    newEmail,
                                    newPass,
                                    currentPass,
                                    userBirthday,
                                    userType,
                                    userAvatar,
                                    userAvatarType,
                                    userAvatarWidth,
                                    userAvatarHeight,
                                    userSig,
                                    userFrom
                                );
    }

    @Override
    public void checkLogin(
//            HttpServletRequest request,
            HttpServletResponse response
//            ServiceState serviceState
    ) throws MyException {
        String email = session.getEmail();
        List<UsersEntity> usersEntityList;
        if(Strings.isNullOrEmpty(email)){
            Preconditions.checkArgument(request.getCookies()!=null," this is new request and cookie is null ");
            //Validate IP address
            String ipAddress = request.getRemoteAddr();
            CookieList cookieList = new CookieList(Arrays.asList(request.getCookies()));
            String sessionId= cookieList.getByname(this.COOKIE_KEY_SESSION_ID).getValue();
            int userId=new Integer(cookieList.getByname(this.COOKIE_KEY_USER_ID).getValue());
            SessionDAO sessionDAO = new SessionDAO();
            List<SessionsEntity> sessionsEntityList = sessionDAO.getSessionBy(sessionId,userId,ipAddress);
            if(sessionsEntityList.size() == 0)
                throw new AuthorizationException("Cookie expired there are no existed record");
            SessionsEntity sessionsEntity = sessionsEntityList.get(0);
            sessionDAO.delete(sessionsEntity);//prepare for updating new session.
            sessionsEntity.setSessionId(request.getSession().getId());//update session id
            sessionDAO.persist(sessionsEntity);//do persist hibernate
            UserDAO userDAO = new UserDAO();
            usersEntityList = userDAO.getUserById(sessionsEntity.getSessionUserId());
        } else {
            UserDAO userDAO = new UserDAO();
            usersEntityList = userDAO.getUserByEmail(email);
        }
        if(usersEntityList.isEmpty()){
            throw new InprocessException("Finding user does not exist "+email );
        }
        session.setEmail(usersEntityList.get(0).getUserEmail());
        session.setUserId(usersEntityList.get(0).getUserId());

        /**
         * Authorize again to this user
         * After do authorize. auto change state.
         */
        UsersEntity usersEntity = usersEntityList.get(0);

        this.authorize(
//                serviceState, request,
                response,usersEntity.getUserEmail(),
                usersEntity.getUserPassword());
        //DONE nothing to do here
    }

    @Override
    public void deletePost() throws AuthorizationException {
        throw new AuthorizationException("This user does not logged in");
    }

    @Override
    public void deleteTopic() throws AuthorizationException {
        throw new AuthorizationException("This user does not logged in");

    }

    @Override
    public void modifyPost() throws AuthorizationException {
        throw new AuthorizationException("This user does not logged in");

    }

    @Override
    public void modifyTopic() throws AuthorizationException {
        throw new AuthorizationException("This user does not logged in");

    }

    @Override
    public void postNew(
            HttpServletResponse response,
            int forumId,String subject,String text ) throws MyException {
        this.checkLogin(response);
        this.serviceState.getService().postNew(
                response,
                forumId, subject, text
        );

    }

    @Override
    public TopicsEntity addNewTopic(int forumId, String title, int posterId, long topicTime,
                                    int views, byte status, byte type,
                                    int firstPostId, String firstPosterName,
                                    int lastPostId, String lastPosterName, int lastPosterId, int approveType) {
        return null;
    }

    @Override
    public PostsEntity addNewPost(int topicId, int forumId, int posterId,
                                  long postTime, String postUsername,
                                  String subject, String text, String checksum,
                                  long editTime, String editReason, int editUser, String posterIp) {
        return null;
    }

    @Override
    public void reply(HttpServletResponse response,int forumId, int topicId, String subject, String text) throws MyException {
        this.checkLogin(response);
        this.serviceState.getService().reply(
                response,
                forumId, topicId, subject, text);
    }

    @Override
    public Map getTopics(HttpServletResponse response, int forumId, int page, int num, String sortType, byte topicApproved) throws MyException {
        this.checkLogin(response);
        return this.serviceState.getService().getTopics(
                 response,
                 forumId,
                 page,
                 num,
                 sortType,
                topicApproved
        );
    }

    @Override
    public void postInfo() {

    }

    @Override
    public Map getPosts(HttpServletResponse response, int forumId, int topicId, int page, int num, String sortType) throws MyException {

        this.checkLogin(response);
        return this.serviceState.getService().getPosts(
                response,
                forumId,
                topicId,
                page,
                num,
                sortType
        );
    }

    @Override
    public void checkPermission() {

    }
}