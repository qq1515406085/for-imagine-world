<?php

class vB5_Frontend_Controller_Infraction extends vB5_Frontend_Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Adds infraction for the specified userid and nodeid
	 *
	 */
	public function actionAdd()
	{
		$input = array(
			'infracteduserid' => (isset($_POST['infracteduserid']) ? trim(intval($_POST['infracteduserid'])) : 0),
			'infractednodeid' => (isset($_POST['infractednodeid']) ? trim(intval($_POST['infractednodeid'])) : 0),
			'infractionlevelid' => (isset($_POST['infractionlevelid']) ? trim(intval($_POST['infractionlevelid'])) : 0),
			'warning' => array(),
			'customreason' => (isset($_POST['customreason']) ? trim(strval($_POST['customreason'])) : ''),
			'points' => (isset($_POST['points']) ? trim(intval($_POST['points'])) : 0),
			'expires' => (isset($_POST['expires']) ? trim(intval($_POST['expires'])) : 0),
			'period' => (isset($_POST['period']) ? trim(strval($_POST['period'])) : ''),
			'message' => (isset($_POST['message']) ? trim(strval($_POST['message'])) : ''),
			'note' => (isset($_POST['note']) ? trim(strval($_POST['note'])) : ''),
			'banreason' => (isset($_POST['banreason']) ? trim(strval($_POST['banreason'])) : ''),
		);

		if (isset($_POST['warning']) AND $_POST['warning'] == $input['infractionlevelid'])
		{
			$input['warning'][$input['infractionlevelid']] = true;
		}

		$api = Api_InterfaceAbstract::instance();
		$result = $api->callApi('content_infraction', 'add', array($input, array()));

		$this->sendAsJson($result);
	}

	/**
	 * Reverses infraction for the specified nodeid
	 *
	 */
	public function actionReverse()
	{
		$nodeid = isset($_POST['nodeid']) ? trim(intval($_POST['nodeid'])) : 0;
		$reason = isset($_POST['reason']) ? trim(strval($_POST['reason'])) : '';
		$userInfraction = isset($_POST['userinfraction']) ? trim(intval($_POST['userinfraction'])) : 0;

		$api = Api_InterfaceAbstract::instance();
		$nodeId = $api->callApi('content_infraction', ($userInfraction ? 'reverseInfraction' : 'reverseNodeInfraction'), array($nodeid, $reason));

		$this->sendAsJson($nodeId);
	}
}