package com.imagine.world.service;

import com.imagine.world.common.PostApproveType;
import com.imagine.world.exception.AuthorizationException;
import com.imagine.world.exception.MyException;
import com.imagine.world.models.PostsEntity;
import com.imagine.world.models.TopicsEntity;
import com.imagine.world.models.UserProfile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

/**
 * Created by tuanlhd on 10/28/14.
 */
@Component
public class NoLoggedInUserService extends BaseService {

    @Override
    public Map getTopics(HttpServletResponse response, int forumId, int page, int num, String sortType, byte topicApproved) throws MyException {
        this.checkLogin(response);
        /**
         * Why this must use serviceStata but thi.getTopic
         * Because after checkLogin. the serviceState was change to Normal user or Power user. we do not know.
         * then let leave the checking permission on each of them.
         */
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
    public void reply(HttpServletResponse response,int forumId, int topicId, String subject, String text) throws MyException {
        this.checkLogin(response);
        this.serviceState.getService().reply(
                response,
                forumId, topicId, subject, text);
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
    public void authorize(HttpServletResponse httpServletResponse, String email, String password) throws MyException {
        super.authorize(httpServletResponse, email, password);
    }

    @Override
    public void logOut() throws AuthorizationException {
        throw new AuthorizationException("This user does not need to logout cause he have not logged in.");
    }

    @Override
    public void issueArticle(HttpServletResponse response) throws MyException {
        super.issueArticle(response);
    }

    @Override
    public void register(String username, String email, String password, Date birthday, Integer userType, BigDecimal timezone, Integer rank, String avatar, String avatarType, Short avatarWidth, Short avatarHeight, String userSig, String userFrom) throws MyException {
        super.register(username, email, password, birthday, userType, timezone, rank, avatar, avatarType, avatarWidth, avatarHeight, userSig, userFrom);
    }

    @Override
    public void uploadTempAvatar(MultipartFile multipartFile) throws MyException {
        super.uploadTempAvatar(multipartFile);
    }

    @Override
    public UserProfile userInfo(HttpServletResponse response) throws MyException {
        return super.userInfo(response);
    }

    @Override
    public void modifyUser(HttpServletResponse response, int userId, String username, String currentEmail, String newEmail, String newPass, String currentPass, String userBirthday, int userType, String userAvatar, String userAvatarType, Short userAvatarWidth, Short userAvatarHeight, String userSig, String userFrom) throws MyException {
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
    public void checkLogin(HttpServletResponse response) throws MyException {
        super.checkLogin(response);
    }

    @Override
    public void deletePost(int idPost) throws AuthorizationException {
        super.deletePost(idPost);
    }

    @Override
    public void deleteTopic(int topicId) throws AuthorizationException {
        super.deleteTopic(topicId);
    }

    @Override
    public void modifyPost() throws AuthorizationException {
        super.modifyPost();
    }

    @Override
    public void modifyTopic() throws AuthorizationException {
        super.modifyTopic();
    }

    @Override
    public TopicsEntity addNewTopic(int forumId, String title, int posterId, long topicTime, int views, byte status, byte type, int firstPostId, String firstPosterName, int lastPostId, String lastPosterName, int lastPosterId, int approveType) {
        return super.addNewTopic(forumId, title, posterId, topicTime, views, status, type, firstPostId, firstPosterName, lastPostId, lastPosterName, lastPosterId, approveType);
    }

    @Override
    public PostsEntity addNewPost(int topicId, int forumId, int posterId, long postTime, String postUsername, String subject, String text, String checksum, long editTime, String editReason, int editUser, String posterIp) {
        return super.addNewPost(topicId, forumId, posterId, postTime, postUsername, subject, text, checksum, editTime, editReason, editUser, posterIp);
    }

    @Override
    public void postInfo() {
        super.postInfo();
    }

    @Override
    public Map getPosts(HttpServletResponse response, int forumId, int topicId, int page, int num, String sortType, byte postApproveType) throws MyException {
        if( postApproveType != PostApproveType.PASS_WAITING.getValue())
            throw new AuthorizationException("This is no logged in user, you can not use topicApproved is different 0");

        return super.getPosts(response, forumId, topicId, page, num, sortType, postApproveType);
    }
}
