package com.imagine.world;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import junit.framework.TestCase;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.net.URL;

/**
 * Created by letuan on 5/20/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"myspring-servlet.xml"})
public class TestEmail extends TestCase {

    @Test
    public void testSendMailHtml() throws EmailException, IOException {
        String host = "smtp.gmail.com";
        int port = 465;
        String username = "dang.capchemgio@gmail.com";
        String password = "soicodon!@#";
        boolean useTls = true;
        boolean useSsl = true;
        String fromAlias = "CLOUD TV";
        String fromEmail = "dang.capchemgio@gmail.com";

        URL url = Resources.getResource("email.html");// the emailHtml is only accept for inline css
        String body = Resources.toString(url,Charsets.UTF_8);
        HtmlEmail mail = new HtmlEmail();

        mail.setHostName(host);
        mail.setDebug(false);
        mail.setAuthentication(username, password);
        mail.setTLS(useTls);
        mail.setSSL(useSsl);
        mail.setSmtpPort(port);
        mail.setSslSmtpPort(String.valueOf(port));
        mail.setCharset(Charsets.UTF_8.name());

        mail.setFrom(fromEmail,fromAlias);

        mail.addTo("tuanlhdnl@gmail.com", "");
        mail.setSubject(" effectiveSubject ");
        mail.setHtmlMsg(body);

        mail.send();

    }

    public void testLoadResourceByGuava(){

    }
}