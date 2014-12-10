package com.entertainment.musicpage.crawler.models;

import com.entertainment.musicpage.crawler.dao.SqliteDAO;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.jsoup.Jsoup;

import java.io.IOException;
import java.sql.SQLException;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * Created by tuanlhd on 12/9/14.
 */
public abstract class Page implements Runnable{
    protected String url;
    private static int corePoolSize = 4;
    private static int maxPoolSize = 4;
    private static long keepAliveTime = 10;
    protected WebClient webClient;
    protected static final ArrayBlockingQueue<Runnable> pageQueue = new ArrayBlockingQueue<Runnable>(20);
    protected static final ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(corePoolSize,maxPoolSize,keepAliveTime,
            TimeUnit.SECONDS, pageQueue);;
    private static String blogFeeds;

    /**
     * Properties email
     *
     */
    private static String secretMail2Blogger = "tuanlhdnl.openyourlife@blogger.com ";
    private static String SMTP_HOST = "localhost";
    private static int SMTP_PORT = 25;

    /**
     * properties DAO
     */
    protected static final SqliteDAO sqliteDAO = new SqliteDAO();

    public Page(String url){
        this.url = url;
        webClient = new WebClient();
        webClient.getOptions().setCssEnabled(false);
        webClient.getOptions().setThrowExceptionOnScriptError(false);
    }

    public void start(){
        if(!threadPoolExecutor.isShutdown())
            threadPoolExecutor.execute(this);
    }

    public void completeWork(){
        this.webClient.closeAllWindows();
    }

    public boolean isExistedChapter(String urlChapter) throws SQLException {
        return !sqliteDAO.findChapterByLink(urlChapter).isEmpty();
    }

    public void sendMail(String subject, String message) throws EmailException {
        Email email = new SimpleEmail();
        email.setHostName(SMTP_HOST);
        email.setSmtpPort(SMTP_PORT);
        email.setAuthenticator(new DefaultAuthenticator("tuanlhdnl@gmail.com", "sieunhan123"));
//        email.setSSL(true);
        email.setFrom("auto-sender@gmail.com");
        email.setSubject(subject);
        email.setMsg(message);
        email.addTo(secretMail2Blogger);
        email.send();
    }

    public static ThreadPoolExecutor getThreadPoolExecutor() {
        return threadPoolExecutor;
    }
}
