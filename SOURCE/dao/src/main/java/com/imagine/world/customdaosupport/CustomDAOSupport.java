/***************************************************
 * Generated by DAOGenerator http://daogenerator.u-db.com
 * http://daogenerator.u-db.com email: buraksrc@gmail.com
 ***************************************************/
package com.imagine.world.customdaosupport;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.io.Serializable;
import java.util.List;


public abstract class CustomDAOSupport implements Serializable {

    private static final long serialVersionUID = 1L;
    private Session session;// each DAO object should be a session. it will manage it's own session.
    private static SessionFactory sessFac = new org.hibernate.cfg.Configuration()
            .configure("hibernate.cfg.xml").buildSessionFactory();

    /**
     *  why there are always return a new session.
     *  because a connection to DB can have many session . we can do did
     *  What happen for open session. it will be timeout. by configuration. in hibernate.cfg.xml
     * @return session
     */
    public static Session getDAOManager() {
//        if(session == null || !session.isConnected()){
//            session = sessFac.openSession();
//        }
        return sessFac.openSession();
    }

    public Session getSession(){
        if(session == null || !session.isConnected()){
            session = sessFac.openSession();
        }
        return session;
    }

    public int getLastInsertId(){
        /**
         * Here's what the MySQL 5.5 documentation says:

         The ID that was generated is maintained in the server on a per-connection basis.
         This means that the value returned by the function to a given client
         is the first AUTO_INCREMENT value generated for most recent statement affecting
         an AUTO_INCREMENT column by that client. This value cannot be affected by other clients,
         even if they generate AUTO_INCREMENT values of their own. This behavior ensures that each client
         can retrieve its own ID without concern for the activity of other clients,
         and without the need for locks or transactions.
         */
        List list = this.getSession().createSQLQuery("SELECT LAST_INSERT_ID();").list();
        return new Integer(list.get(0).toString());
    }
}