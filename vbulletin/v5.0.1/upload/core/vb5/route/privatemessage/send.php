<?php

/* ======================================================================*\
  || #################################################################### ||
  || # vBulletin 5.0.1
  || # ---------------------------------------------------------------- # ||
  || # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
  || # This file may not be redistributed in whole or significant part. # ||
  || # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
  || # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
  || #################################################################### ||
  \*====================================================================== */

class vB5_Route_PrivateMessage_Send extends vB5_Route_PrivateMessage_Index
{
	public function validInput(&$data)
	{
		$data['arguments'] = '';

		return true;
	}

	public function getUrlParameters()
	{
		return '';
	}

	public function getParameters()
	{
		return array();
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
