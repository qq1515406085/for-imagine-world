function theChampPopup(e){window.open(e,"popUpWindow","height=400,width=600,left=20,top=20,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes")}function theChampStrReplace(e,t,n){for(var r=0;r<e.length;r++){n=n.replace(new RegExp(e[r],"g"),t[r])}return n}function theChampCallAjax(e){if(typeof jQuery!="undefined"){e()}else{theChampGetScript("http://code.jquery.com/jquery-latest.min.js",e)}}function theChampGetScript(e,t){var n=document.createElement("script");n.src=e;var r=document.getElementsByTagName("head")[0],i=false;n.onload=n.onreadystatechange=function(){if(!i&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){i=true;t();n.onload=n.onreadystatechange=null;r.removeChild(n)}};r.appendChild(n)}function theChampGetElementsByClass(e,t){if(e.getElementsByClassName){return e.getElementsByClassName(t)}else{return function(e,t){if(t==null){t=document}var n=[],r=t.getElementsByTagName("*"),i=r.length,s=new RegExp("(^|\\s)"+e+"(\\s|$)"),o,u;for(o=0,u=0;o<i;o++){if(s.test(r[o].className)){n[u]=r[o];u++}}return n}(t,e)}}if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}theChampLoadEvent(function(){if(typeof jQuery!="undefined"){jQuery(".the_champ_login_container").each(function(){var e=jQuery(this).find("a");if(!jQuery(e).length){jQuery(this).remove()}else{jQuery(e).css("display","inline").css("visibility","visible");if(jQuery(e).css("display")=="none"||jQuery(e).css("visibility")=="hidden"){jQuery(e).attr("style","display: inline !important; visibility: visible !important")}}});jQuery(".the_champ_sharing_container").each(function(){if(!jQuery(this).find(".theChampSharingMoreButton").length){jQuery(this).remove()}else{jQuery(this).find(".theChampSharingMoreButton").attr("style","display: inline !important; visibility: visible !important; height: 32px !important; width: 32px !important;")}})}else{var e=theChampGetElementsByClass(document,"the_champ_login_container");for(var t=0;t<e.length;t++){var n=e[t].getElementsByTagName("a");if(!n.length){e[t].parentNode.removeChild(e[t])}else{for(var r=0;r<n.length;r++){if(n[r].style.display=="none"||n[r].style.visibility=="hidden"){n[r].setAttribute("style","display: inline !important; visibility: visible !important")}}}}var i=theChampGetElementsByClass(document,"the_champ_sharing_container");for(var t=0;t<i.length;t++){var n=theChampGetElementsByClass(i[t],"theChampSharingMoreButton");if(!n.length){i[t].parentNode.removeChild(i[t])}else{n[0].setAttribute("style","display: inline !important; visibility: visible !important; height: 32px !important; width: 32px !important;")}}}})