(function(A){window.vBulletin=window.vBulletin||{};var B=[".registration-widget"];if(!vBulletin.pageHasSelectors(B)){return false}window.vBulletin.options=window.vBulletin.options||{};window.vBulletin.options.precache=window.vBulletin.options.precache||[];window.vBulletin.options.precache=A.merge(window.vBulletin.options.precache,["usecoppa","checkcoppa","webmasteremail","reqbirthday"]);window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=A.merge(window.vBulletin.phrase.precache,["close","email_addresses_must_match","error","invalid_email_address","password_must_be_at_least_four_chars","passwords_must_match","please_enter_a_username","please_enter_your_email_address","please_enter_your_parent_or_guardians_email_address","please_select_a_day","please_select_a_month","please_select_a_year","register_not_agreed","registration_coppa_fail","registration_start_failed","site_terms_and_rules","site_terms_and_rules_title","registeremail","moderateuser","registration_complete","paid_subscriptions"]);A(document).ready(function(){var L=parseInt(window.vBulletin.options.get("usecoppa")),I=false,E=false,J=false,D=parseInt(window.vBulletin.options.get("reqbirthday")),N,F,P,M;function K(){A("#frmRegister").trigger("reset");setTimeout(vBulletin.hv.reset,0);if(L||D){var W=A.cookie(pageData.cookie_prefix+"coppaage");var T,Q,R,V=false;if(L&&W&&parseInt(window.vBulletin.options.get("checkcoppa"))){var U=W.split("-",3);if(U.length==3){T=parseInt(U[0]);Q=parseInt(U[1]);R=parseInt(U[2]);if(T!=0&&Q!=0&&R!=0){V=true;A("#regMonth").val(T);A("#regDay").val(Q);A("#regYear").val(R)}H(T,Q,R,V,true)}}else{A(".signup-content").removeClass("hide")}A("#regMonth, #regDay, #regYear").off("change").on("change",function(){T=A("#regMonth").val();Q=A("#regDay").val();R=A("#regYear").val();H(T,Q,R,V)})}else{A(".signup-content").removeClass("hide")}A(".registration-widget select").selectBox();A("#regDataUsername").off("keydown blur").on("keydown",function(X){if(X.keyCode==13){A(this).triggerHandler("blur")}return true}).on("blur",function(){if(A.trim(this.value)==""){return true}E=true;var X=this;A.ajax({url:vBulletin.getAjaxBaseurl()+"/registration/checkusername",data:{username:A.trim(X.value)},dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",success:function(Y){if(Y&&Y.errors){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get(Y.errors[0]),iconType:"warning",onAfterClose:function(){X.value="";X.select();X.focus()}})}else{if(J){A("#frmRegister").submit()}}},complete:function(){E=false}})});A("#viewTerms").off("click").on("click",function(){console.log(window.vBulletin.options.get("webmasteremail"));openAlertDialog({title:vBulletin.phrase.get("site_terms_and_rules_title"),message:vBulletin.phrase.get("site_terms_and_rules",window.vBulletin.options.get("webmasteremail"),pageData.baseurl),buttonLabel:vBulletin.phrase.get("close"),width:600,maxHeight:400});return false});var S=A(".paidsubscription_row");if(S.length>0){A("select.cost",S).change(function(){var b=A(this).closest(".newsubscription_row"),Z=A(this).find("option:selected").first(),Y=A(this).closest(".subscriptions_list"),X=A(".order_confirm",S),a=A(".paymentform",S);N=b.attr("data-id");F=Z.attr("data-subid");M=Z.attr("data-currency");A('<tr class="confirm_data"><td>'+Z.attr("data-subtitle")+"</td><td>"+Z.attr("data-duration")+"</td><td>"+Z.attr("data-value")+"</td></tr>").appendTo(A("table.order_confirm_table",X));Y.addClass("hide");X.off("click",".remove_subscription").on("click",".remove_subscription",function(){A(".confirm_data",X).remove();A("input.paymentapi",X).closest("label").removeClass("hide");A("button.subscriptions_order",X).prop("disabled",false);A("select",Y).selectBox("value","");X.addClass("hide");Y.removeClass("hide");N=0;return false});X.off("click","input.paymentapi").on("click","input.paymentapi",function(){P=A("input.paymentapi:checked",X).val()});A("input.paymentapi",X).each(function(){var c=A(this).attr("data-currency").split(",");if(A.inArray(M,c)==-1){A(this).closest("label").addClass("hide")}});X.removeClass("hide")})}}function H(T,Q,S,U,R){R=R||false;if(T!=0&&Q!=0&&S!=0){if(U){A(".birth-date-wrapper").addClass("hide")}A.ajax({url:vBulletin.getAjaxBaseurl()+"/registration/iscoppa",data:{month:T,day:Q,year:S},dataType:"json",success:function(V){if(V&&typeof (V.needcoppa)!="undefined"){I=V.needcoppa!=0;if(V.needcoppa==2){if(!U){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("registration_coppa_fail"),iconType:"error"});A(".birth-date-wrapper").addClass("hide")}A(".signup-content").addClass("hide");A(".coppafail_notice").removeClass("hide");return }else{if((V.needcoppa==1)||(!R)){A(".birth-date-wrapper").addClass("hide");A("#regContent").removeClass("hide");A("#frmRegister .action-buttons").removeClass("hide");A(".signup-content").removeClass("hide")}else{A(".birth-date-wrapper").removeClass("hide");A(".signup-content").removeClass("hide");A(".registration-widget select").selectBox()}}}A(".coppa")[I?"removeClass":"addClass"]("hide-imp")},error:function(){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("registration_start_failed"),iconType:"error"})}})}}K();function G(Q,R){if(Q){openAlertDialog({title:vBulletin.phrase.get("error"),message:Q,iconType:"warning",onAfterClose:function(){R.focus()}});return false}return true}function O(){var Q="",R;if(L){if(A("#regMonth").val()==0){Q=vBulletin.phrase.get("please_select_a_month");R=A("#regMonth").next(".selectBox")}else{if(A("#regDay").val()==0){Q=vBulletin.phrase.get("please_select_a_day");R=A("#regDay").next(".selectBox")}else{if(A("#regYear").val()==0){Q=vBulletin.phrase.get("please_select_a_year");R=A("#regYear").next(".selectBox")}}}if(!G(Q,R)){return false}}if(A.trim(A("#regDataUsername").val())==""){Q=vBulletin.phrase.get("please_enter_a_username");R=A("#regDataUsername")}else{if(A.trim(A("#regDataEmail").val())==""){Q=vBulletin.phrase.get("please_enter_your_email_address");R=A("#regDataEmail")}else{if(!isValidEmailAddress(A("#regDataEmail").val())){Q=vBulletin.phrase.get("invalid_email_address");R=A("#regDataEmail")}else{if(A("#regDataEmail").val()!=A("#regDataEmailConfirm").val()){Q=vBulletin.phrase.get("email_addresses_must_match");R=A("#regDataEmailConfirm")}else{if(I){if(A.trim(A("#parentGuardianEmail").val())==""){Q=vBulletin.phrase.get("please_enter_your_parent_or_guardians_email_address");R=A("#parentGuardianEmail")}else{if(!isValidEmailAddress(A("#parentGuardianEmail").val())){Q=vBulletin.phrase.get("invalid_email_address");R=A("#parentGuardianEmail")}}}}}}}if(!G(Q,R)){return false}if(A("#regDataPassword").val()==""||A("#regDataPassword").val().length<4){Q=vBulletin.phrase.get("password_must_be_at_least_four_chars");R=A("#regDataPassword")}else{if(A("#regDataPassword").val()!=A("#regDataConfirmpassword").val()){Q=vBulletin.phrase.get("passwords_must_match");R=A("#regDataConfirmpassword")}else{if(!A("#cbApproveTerms").is(":checked")){Q=vBulletin.phrase.get("register_not_agreed");R=A("#cbApproveTerms")}}}if(N&&!P){Q=vBulletin.phrase.get("please_select_a_payment_method");R=A("input.paymentapi").first()}return G(Q,R)}function C(){var Q=this;console.log("Paid Subscriptions Data: subscriptionid: "+N+"; subscriptionsubid: "+F+"; paymentapiclass: "+P+"; currency: "+M);if(!O()){J=false;return false}A(".action-buttons button",Q).prop("disabled",true);A.ajax({url:vBulletin.getAjaxBaseurl()+"/registration/registration",data:A(Q).serializeArray(),type:"POST",dataType:"json",success:function(S){if(S&&S.response&&S.response.errors){var V=[];for(var R in S.response.errors){if(S.response.errors[R][0]!="exception_trace"){V.push(vBulletin.phrase.get(S.response.errors[R]))}}openAlertDialog({title:vBulletin.phrase.get("error"),message:V.join("<br />"),iconType:"warning",onAfterClose:function(){vBulletin.hv.reset(true)}})}else{if(S&&S.response&&S.response.usecoppa){location.replace(S.response.urlPath)}else{if(S&&S.response){var T=function(){var W=S.response.msg_params;W.unshift(S.response.msg);openAlertDialog({title:vBulletin.phrase.get("registration_gregister"),message:vBulletin.phrase.get.apply(vBulletin.phrase,W),onAfterClose:function(){if(S.response.urlPath){location.replace(S.response.urlPath)}else{A(".signup-success").removeClass("hide");A(".signup-content").addClass("hide")}}})};if(!N){T()}else{var U=openConfirmDialog({title:vBulletin.phrase.get("paid_subscriptions"),message:vBulletin.phrase.get("loading")+"...",width:500,dialogClass:"paidsubscription-dialog loading",buttonLabel:{yesLabel:vBulletin.phrase.get("order"),noLabel:vBulletin.phrase.get("cancel")},primaryButton:"yes",onClickYesWithAjax:true,onClickYes:function(){A(this).closest(".paidsubscription-dialog").find("form").submit()},onClickNo:function(){T()}});A.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/paidsubscription/placeorder",data:{subscriptionid:N,subscriptionsubid:F,paymentapiclass:P,currency:M},type:"POST",dataType:"json",complete:function(){A("body").css("cursor","auto")},success:function(W){if(W&&!W.error){A(".paidsubscription-dialog").removeClass("loading");A(".dialog-content .message",U).html(W);A('.dialog-content .message input[type="submit"], .dialog-content .message a.cancel',U).hide();U.dialog("option","position","center")}},error:function(Y,X,W){console.log("Unable to fetch payment api form! error:"+W);openAlertDialog({title:"Error",message:"Error fetching payment form.",iconType:"error"})}})}}}}},error:function(R){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("registration_start_failed"),iconType:"error"})},complete:function(){A(".action-buttons button",Q).prop("disabled",false);J=false}})}A("#frmRegister").off("submit.usersignup").on("submit.usersignup",function(){J=true;var Q=this;setTimeout(function(){if(E){J=false;return }C.apply(Q)},10);return false});A("#regBtnReset").off("click").on("click",function(Q){vBulletin.hv.reset();setTimeout(function(){A(".registration-widget select").selectBox("refresh");A("#regMonth").next(".selectBox").focus()},50)})})})(jQuery);