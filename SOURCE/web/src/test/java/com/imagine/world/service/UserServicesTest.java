package com.imagine.world.service;

import com.imagine.world.common.AvatarType;
import com.imagine.world.exception.MyException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Random;

/**
 * Created by tuan on 10/11/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= "classpath:test-myspring-servlet.xml")
@Service
public class UserServicesTest extends MyAbstractTest {

    @Autowired
    ServiceState serviceState ;
//    @Autowired MockHttpServletRequest request;
//    @Autowired MockHttpServletResponse response;
//    @Resource
//    HttpServletRequest httpServletRequest;
//    @Resource
//    HttpServletResponse httpServletResponse;

    @Test
    public void testRegisterUser() throws MyException {

        Random r =new Random();
        serviceState.getService().register("DELETE-"+r.nextInt(10000),r.nextInt()+"@gmail.com",
                r.nextInt(100000)+"",new Date(), null,null,null,null,null,null,null,null,null);

        serviceState.getService().uploadTempAvatar(new MockMultipartFile("beeeeep","kia co be co mai toc duoi ga".getBytes()));
        serviceState.getService().register("DELETE-"+r.nextInt(10000),r.nextInt()+"@gmail.com",
                r.nextInt(100000)+"",new Date(), 1,new BigDecimal(1.00),1000,"BEEEEP", AvatarType.UPLOADED.getValue(),
                null,null,"askjjdh aksdhk","California");

    }

    @Test
    public void testLogin() throws MyException {
//        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder
//                .getRequestAttributes();

        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        System.out.println("Please note. the UserServiceI ID of before and after authorization");
        System.out.println(serviceState.getService().getClass());

        serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "123456");
        Cookie cookie = response.getCookie(UserServiceI.COOKIE_KEY_SESSION_ID);
        Cookie cookie2 = response.getCookie(UserServiceI.COOKIE_KEY_USER_ID);
        System.out.println(cookie);


        System.out.println(serviceState.getService().getClass());
    }

    @Test
    public void testTimeStamp(){
        System.out.println(new Timestamp(new Date().getTime()).getTime());
        System.out.println(System.currentTimeMillis());
        int a = 1413368407;
    }

    @Test
    public void testLoginFail() throws MyException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        /**
         * Please note about error message every trycatch
         */
        try {            serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "wrongpass");      } catch (MyException e){            System.out.println(e.getMessage());        }
        try {            serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "wrongpass");      } catch (MyException e){            System.out.println(e.getMessage());        }
        try {            serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "wrongpass");      } catch (MyException e){            System.out.println(e.getMessage());        }
        try {            serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "wrongpass");      } catch (MyException e){            System.out.println(e.getMessage());        }
        try {            serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "wrongpass");      } catch (MyException e){            System.out.println(e.getMessage());        }
        try {            serviceState.getService().authorize(serviceState, request, response, "letuan@gmail.com", "wrongpass");      } catch (MyException e){            System.out.println(e.getMessage());        }

        Cookie cookie = response.getCookie(UserServiceI.COOKIE_KEY_USER_ID);
        System.out.println("Cookie "+cookie);
    }
}
