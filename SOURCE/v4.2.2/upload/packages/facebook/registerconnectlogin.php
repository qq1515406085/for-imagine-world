<?php if (!defined('VB_ENTRY')) die('Access denied.');
/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.2.2 - Licence Number VBFRD8D65H
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/

/**
 *
 * @package vBulletin
 * @author vBulletin Development Team
 * @version $Revision: 28674 $
 * @since $Date: 2008-12-03 12:56:57 +0000 (Wed, 03 Dec 2008) $
 * @copyright vBulletin Solutions Inc.
 */

class vB_Facebook_RegisterConnectlogin
{
	/**
	 * Url destination for post request
	 *
	 * @var	string
	 */

	/**
	 * Registry
	 *
	 * @var	vB_Registry
	 */
	private static $registry = null;

	/**
	 * Send Post request with user's fbuserid
	 *
	 * @param	vB_Registry Object
	 * @param	bool		Bypass the session->created check
	 *
	 * @return	string	Response to this request from remote server
	 */
	public static function registerLogin(&$registry, $bypassCreated = false)
	{
		self::$registry = $registry;

		if ((!$bypassCreated AND !self::$registry->session->created) OR !self::$registry->userinfo['userid'] OR !self::$registry->userinfo['fbuserid'] OR !is_facebookenabled())
		{
			return;
		}

		$params = array(
			'facebookProfileId'   => self::$registry->userinfo['fbuserid'],
			'facebookAccessToken' => self::$registry->userinfo['fbaccesstoken'],
			'licenseKey'          => '[#]facebookguid[#]',
			'hideFbConnect'       => self::$registry->userinfo['disablevbsocial'],
		);

		return self::sendRequest('registerConnectLogin', $params);
	}

	/**
	 * Send POST request to API server
	 *
	 * @param	string	API method to call
	 * @param	array	Variables to post
	 *
	 * @return	string	Response to this request from remote server
	 */
	private static function sendRequest($method, $params)
	{
	}
}

/*======================================================================*\
|| ####################################################################
|| # Downloaded: 08:03, Fri Mar 14th 2014
|| # SVN: $Revision: 28674 $
|| ####################################################################
\*======================================================================*/