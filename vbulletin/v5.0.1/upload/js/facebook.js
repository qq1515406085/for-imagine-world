/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 5.0.1
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/
function vB_Facebook(A){this.config=A;this.ids={loginform_id:"navbar_loginform",loginform_usernameid:"navbar_username",loginform_passwordid:"navbar_password",fb_usernameid:"facebookusername",fb_passwordid:"facebookpassword",fb_associateid:"facebookassociate",invisibles:[{id:"fb_headerbox"},{id:"fbregbox"}],loginbtns:[{id:"lnkFacebookLogin"},{id:"lnkFacebookLoginSettings"},{id:"fb_regloginbtn"},{id:"fb_getconnected"}]};this.loginperms=this.get_config("autoreg")?{scope:"email"}:{scope:"email,user_about_me,user_activities,user_birthday,user_interests,user_likes,user_website,user_location,user_work_history"};FB.init({appId:this.get_config("appid"),status:true,cookie:true,xfbml:true});this.register_loginbtns();this.make_visible();$("#lnkFacebookDisconnectSettings").on("click",function(){$("#fbdisconnect-form").submit()})}vB_Facebook.prototype.get_config=function(A){if(typeof (this.config)=="undefined"||typeof (this.config[A])=="undefined"){return false}else{return this.config[A]}};vB_Facebook.prototype.register_loginbtns=function(){for(var C=0;C<this.ids.loginbtns.length;C++){$("#"+this.ids.loginbtns[C].id).click(this.handle_fbLogin)}var B=$("#"+this.ids.fb_usernameid);var D=$("#"+this.ids.fb_passwordid);var A=$("#"+this.ids.fb_associateid);if(B.length&&D.length&&A.length){A.click(this.login_and_associate);B.keypress(function(E){if(E.which==13){this.handle_associate_keypress(E)}});D.keypress(function(E){if(E.which==13){this.handle_associate_keypress(E)}})}};vB_Facebook.prototype.make_visible=function(){for(var A=0;A<this.ids.invisibles.length;A++){$("#"+this.ids.invisibles[A].id).removeClass("hidden")}};vB_Facebook.prototype.do_fbRedirect=function(){var A=window.top.location.href.replace(/#.*/,"");var B=(window.top.location.search.substring(1)?"&":"?");window.top.location=A+B+"dofbredirect=1"+window.top.location.hash};vB_Facebook.prototype.handle_fbLogin=function(A){A.preventDefault();if(FB.getAuthResponse()){vBfb.do_fbRedirect()}else{FB.login(function(B){if(B.authResponse){vBfb.do_fbRedirect()}},vBfb.loginperms)}};vB_Facebook.prototype.handle_associate_keypress=function(B,A){this.login_and_associate()};vB_Facebook.prototype.login_and_associate=function(){var D=$("#"+this.ids.loginform_id).get(0);var A=$("#"+this.ids.loginform_usernameid).get(0);var C=$("#"+this.ids.loginform_passwordid).get(0);var B=$("#"+this.ids.fb_usernameid).get(0);var E=$("#"+this.ids.fb_passwordid).get(0);if(A&&B){A.value=B.value}if(C&&E){C.value=E.value}if(D){D.onsubmit();D.submit()}};vB_Facebook.prototype.register_logout=function(){FB.logout(vBfb.do_fbRedirect)};vB_Facebook.prototype.handle_submit_override=function(){if(typeof (this.onSubmitEvent)=="undefined"||!this.onSubmitEvent||this.onSubmitEvent.call(this.editFormEl)){var A=document.createElement("input");A.setAttribute("type","hidden");A.setAttribute("name",this.btnClicked.name);A.setAttribute("value",this.btnClicked.value);this.editFormEl.appendChild(A);this.editFormEl.submit()}};window.vBulletin=window.vBulletin||{};window.vBulletin.options=window.vBulletin.options||{};window.vBulletin.options.precache=$.merge(window.vBulletin.options.precache,["enablefacebookconnect","facebookappid","facebookactive","facebookautoregister","fbfeednewthread","fbfeedpostreply","fbfeedblogentry","fbfeedblogcomment","fbfeednewarticle","fbfeedarticlecomment"]);window.fbAsyncInit=function(){$(document).ready(function(){if(window.vBulletin.options.get("facebookactive")){vBfb=new vB_Facebook({appid:window.vBulletin.options.get("facebookappid"),connected:0,active:0,autoreg:window.vBulletin.options.get("facebookautoregister"),feed_newthread:window.vBulletin.options.get("fbfeednewthread"),feed_postreply:window.vBulletin.options.get("fbfeedpostreply"),feed_blogentry:window.vBulletin.options.get("fbfeedblogentry"),feed_blogcomment:window.vBulletin.options.get("fbfeedblogcomment"),feed_newarticle:window.vBulletin.options.get("fbfeednewarticle"),feed_articlecomment:window.vBulletin.options.get("fbfeedarticlecomment")});$("#externalLoginProviders").parent().addClass("externalLoginEnabled")}else{$("#lnkFacebookLogin").hide()}})};(function(C){var B,E="facebook-jssdk",A=C.getElementsByTagName("script")[0],D=$("#fb-root").data("facebook-language");if(C.getElementById(E)){return }B=C.createElement("script");B.id=E;B.async=true;B.src="//connect.facebook.net/"+D+"/all.js";A.parentNode.insertBefore(B,A)}(document));