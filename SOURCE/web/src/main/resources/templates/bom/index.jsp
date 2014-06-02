
<%--
  - Author(s):
  - Date:
  - Copyright Notice:
  - @(#)
  - Description:
  --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/xml" prefix="x" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tag Example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">

	<!--link rel="stylesheet/less" href="less/bootstrap.less" type="text/css" /-->
	<!--link rel="stylesheet/less" href="less/responsive.less" type="text/css" /-->
	<!--script src="js/less-1.3.3.min.js"></script-->
	<!--append ‘#!watch’ to the browser URL, then refresh the page. -->
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
  <![endif]-->

  <!-- Fav and touch icons -->
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple-touch-icon-144-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/apple-touch-icon-114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple-touch-icon-72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-57-precomposed.png">
  <link rel="shortcut icon" href="img/favicon.png">
  
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
	<script type="text/javascript" src="js/headtrackr.js"></script>
</head>

<body>

<div class="container">
	<div class="row clearfix">
		<div class="col-md-12 column">
			<form role="form">
                <div class="form-group">
                    <label for="code">Code </label><input type="text" class="form-control" id="code">
                </div>
				<div class="form-group">
					 <label for="name">Name</label><input type="email" class="form-control" id="name">
				</div>
				<div class="form-group">
					 <label for="price">Price </label><input type="text" class="form-control" id="price">
				</div>

                <div class="form-group">
                    <label for="description">Description </label> <textarea class="form-control" name="summernote" id="description" rows="10"></textarea>
                </div>

                <div class="form-group">
                    <label for="amount">Amount </label><input type="text" class="form-control" id="amount">
                </div>

                <%-- Camera --%>
                <canvas id="compare" width="320" height="240" style="display:none"></canvas>
                <video id="vid" autoplay="" loop="" width="320" height="240" src=""></video>
                <canvas id="overlay" width="320" height="240" style="position: absolute; top: 0px; z-index: 100001; display: block;"></canvas>
                <canvas id="debug" width="320" height="240" style="position: absolute; top: 0px; z-index: 100002; display: none;"></canvas>
                <p id="gUMMessage"></p>
                <span id="headtrackerMessage">Tracking face</span>
                <%----%>

                <div class="checkbox">
					 <label><input type="checkbox"> Check me out</label>
				</div>
                <div class="form-group">
                    <label for="exampleInputFile">Images upload</label><input type="file" id="exampleInputFile">
                    <p class="help-block">
                    Example block-level help text here.
                    </p>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
			</form>
		</div>
	</div>
</div>
</body>
<footer>
    <script>
        // set up video and canvas elements needed

        var videoInput = document.getElementById('vid');
        var canvasInput = document.getElementById('compare');
        var canvasOverlay = document.getElementById('overlay')
        var debugOverlay = document.getElementById('debug');
        var overlayContext = canvasOverlay.getContext('2d');
        canvasOverlay.style.position = "absolute";
        canvasOverlay.style.top = '0px';
        canvasOverlay.style.zIndex = '100001';
        canvasOverlay.style.display = 'block';
        debugOverlay.style.position = "absolute";
        debugOverlay.style.top = '0px';
        debugOverlay.style.zIndex = '100002';
        debugOverlay.style.display = 'none';

        // add some custom messaging

        statusMessages = {
            "whitebalance" : "checking for stability of camera whitebalance",
            "detecting" : "Detecting face",
            "hints" : "Hmm. Detecting the face is taking a long time",
            "redetecting" : "Lost track of face, redetecting",
            "lost" : "Lost track of face",
            "found" : "Tracking face"
        };

        supportMessages = {
            "no getUserMedia" : "Unfortunately, <a href='http://dev.w3.org/2011/webrtc/editor/getusermedia.html'>getUserMedia</a> is not supported in your browser. Try <a href='http://www.opera.com/browser/'>downloading Opera 12</a> or <a href='http://caniuse.com/stream'>another browser that supports getUserMedia</a>. Now using fallback video for facedetection.",
            "no camera" : "No camera found. Using fallback video for facedetection."
        };

        document.addEventListener("headtrackrStatus", function(event) {
            if (event.status in supportMessages) {
                var messagep = document.getElementById('gUMMessage');
                messagep.innerHTML = supportMessages[event.status];
            } else if (event.status in statusMessages) {
                var messagep = document.getElementById('headtrackerMessage');
                messagep.innerHTML = statusMessages[event.status];
            }
        }, true);

        // the face tracking setup

        var htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, calcAngles : true, ui : false, headPosition : false, debug : debugOverlay});
        htracker.init(videoInput, canvasInput);
        htracker.start();

        // for each facetracking event received draw rectangle around tracked face on canvas

        document.addEventListener("facetrackingEvent", function( event ) {
            // clear canvas
            overlayContext.clearRect(0,0,320,240);
            // once we have stable tracking, draw rectangle
            if (event.detection == "CS") {
                overlayContext.translate(event.x, event.y)
                overlayContext.rotate(event.angle-(Math.PI/2));
                overlayContext.strokeStyle = "#00FF00";
                overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
                overlayContext.rotate((Math.PI/2)-event.angle);
                overlayContext.translate(-event.x, -event.y);
            }
        });

        // turn off or on the canvas showing probability
        function showProbabilityCanvas() {
            var debugCanvas = document.getElementById('debug');
            if (debugCanvas.style.display == 'none') {
                debugCanvas.style.display = 'block';
            } else {
                debugCanvas.style.display = 'none';
            }
        }
    </script>
</footer>
</html>
