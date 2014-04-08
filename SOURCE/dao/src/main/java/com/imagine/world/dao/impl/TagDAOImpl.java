
 /***************************************************
 * Generated by DAOGenerator http://daogenerator.u-db.com
 * http://daogenerator.u-db.com email: buraksrc@gmail.com
 ***************************************************/
 
 
 package com.imagine.world.dao.impl;


 import com.imagine.world.customdaosupport.CustomDAOSupport;
 import com.imagine.world.dao.TagDAO;
 import com.imagine.world.models.Tag;
 import org.hibernate.Query;
 import org.springframework.stereotype.Repository;

 import java.io.Serializable;
 import java.util.List;
 
 
 /***************************************************
 *DAO class of TAG table.
 *Generated on Wed Feb 05 18:09:02 ICT 2014
 ***************************************************/

 @Repository
 public class TagDAOImpl extends CustomDAOSupport implements Serializable, TagDAO {
 
 /**
 * @return Tag
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> findAll(){

		Query query = getDAOManager().createQuery(" select t from Tag t");

		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}
 
 /**
 * Inserts Tag
 * @param: Tag
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public void save(Tag arg0){

		getDAOManager().persist(arg0);

	}
 
 /**
 * Updates Tag
 * @param: Tag
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public void update(Tag arg0){

		getDAOManager().merge(arg0);

	}
 
 /**
 * Removes Tag
 * @param: Tag
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public void delete(Tag arg0){

		getDAOManager().delete(arg0);

	}
 
 /**
 * @return Tag
 * @param: java.lang.Integer IdTag
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> getTagByIdTag(Integer idTag){

		Query query = getDAOManager().createQuery(" select t from Tag t where t.idTag = ?1 ");

		query.setParameter(1, idTag);


		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}

/**
 * @return Tag
 * @param: java.lang.Integer idTag
 * @param: int startposition
 * @param: int maxresults
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> getTagByIdTag(Integer idTag, int startPosition, int maxResult){

		Query query = getDAOManager().createQuery(" select t from Tag t where t.idTag = ?1 ");

		if(startPosition > 0 && startPosition < maxResult){
			query.setMaxResults(maxResult);
			query.setFirstResult(startPosition);
		}

			query.setParameter(1, idTag);


		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}
 
 /**
 * @return Tag
 * @param: java.lang.String Name
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> getTagByName(String name){

		Query query = getDAOManager().createQuery(" select t from Tag t where t.name = ?1 ");

		query.setParameter(1, name);


		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}

/**
 * @return Tag
 * @param: java.lang.String name
 * @param: int startposition
 * @param: int maxresults
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> getTagByName(String name, int startPosition, int maxResult){

		Query query = getDAOManager().createQuery(" select t from Tag t where t.name = ?1 ");

		if(startPosition > 0 && startPosition < maxResult){
			query.setMaxResults(maxResult);
			query.setFirstResult(startPosition);
		}

			query.setParameter(1, name);


		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}
 
 /**
 * @return Tag
 * @param: java.lang.String Description
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> getTagByDescription(String description){

		Query query = getDAOManager().createQuery(" select t from Tag t where t.description = ?1 ");

		query.setParameter(1, description);


		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}

/**
 * @return Tag
 * @param: java.lang.String description
 * @param: int startposition
 * @param: int maxresults
 * Generated on: Wed Feb 05 18:09:02 ICT 2014
 * @See Tag
 */
	public List<Tag> getTagByDescription(String description, int startPosition, int maxResult){

		Query query = getDAOManager().createQuery(" select t from Tag t where t.description = ?1 ");

		if(startPosition > 0 && startPosition < maxResult){
			query.setMaxResults(maxResult);
			query.setFirstResult(startPosition);
		}

			query.setParameter(1, description);


		List<Tag> results = query.list();

		if (results !=null && results.size() > 0) {
			return results;
		}

		return null;
	}
 
 
 
 
 }