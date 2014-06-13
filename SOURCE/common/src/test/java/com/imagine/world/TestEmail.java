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
@ContextConfiguration(locations = {"/test-myspring-servlet.xml"})
public class TestEmail extends TestCase {

    @Test
    public void testSendMailHtml() throws EmailException, IOException {
        String host = "email-smtp.us-east-1.amazonaws.com";
        int port = 465;
        String username = "AKIAIZ5B7OTDFACZFJ2Q";
        String password = "Au9nGs4iXUXSI1Jv6QANYZ2fytTlNj2LLmaArGfSeUcV";
        boolean useTls = true;
        boolean useSsl = true;
        String fromAlias = "CLOUD TV";
        String fromEmail = "no-reply@tsbctv.com";

        URL url = Resources.getResource("email3.html");// the emailHtml is only accept for inline css
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

        mail.addTo("hellotuan2@mail.com", "");
        mail.addTo("tuanlhdnl@gmail.com", "");
        mail.addTo("nguoi_soivn@yahoo.com", "");
        mail.setSubject(" TEST HTML EMAIL ");
        mail.setHtmlMsg(body);

        mail.send();

    }

    public void testLoadResourceByGuava(){

    }
}
