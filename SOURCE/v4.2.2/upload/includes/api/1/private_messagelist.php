<?php
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
if (!VB_API) die;

loadCommonWhiteList();

$VB_API_WHITELIST = array(
	'response' => array(
		'HTML' => array(
			'folderid', 'foldername',
			'messagelist_periodgroups' => array(
				'*' => array(
					'groupid', 'groupname', 'messagesingroup',
					'messagelistbits' => array(
						'*' => array(
							'pm' => array(
								'pmid', 'senddate', 'sendtime', 'statusicon',
								'iconpath', 'icontitle', 'title'
							),
							'userbit',
							'show' => array(
								'pmicon', 'unread'
							)
						)
					)
				)
			),
			'pagenav',
			'pagenumber', 'perpage', 'pmquota', 'pmtotal',
			'receipts', 'sortfilter', 'totalmessages', 'startmessage',
			'endmessage'
		)
	),
	'show' => array(
		'thisfoldertotal', 'allfolderstotal', 'pmicons', 'messagelist', 'openfilter',
		'pagenav', 'sentto', 'movetofolder'
	)
);

/*======================================================================*\
|| ####################################################################
|| # Downloaded: 08:03, Fri Mar 14th 2014
|| # CVS: $RCSfile$ - $Revision: 35584 $
|| ####################################################################
\*======================================================================*/