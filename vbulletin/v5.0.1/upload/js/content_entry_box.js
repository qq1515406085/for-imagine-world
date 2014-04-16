window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["close_preview","invalid_user_filedata","loading","max_attachments_reached","no_photos_or_albums","no_post_content_to_preview","please_enter_message_x_chars","preview","saving","select_from_photo_album","unexpected_error","x_selected"]);window.vBulletin.options=window.vBulletin.options||{};window.vBulletin.options.precache=window.vBulletin.options.precache||[];window.vBulletin.options.precache=$.merge(window.vBulletin.options.precache,["postminchars","commentminchars"]);(function(D){vBulletin.ckeditor.checkEnvironment();vBulletin.contentEntryBox=vBulletin.contentEntryBox||{};var G=[],E,B;vBulletin.contentEntryBox.textFormValidate=function(){var I=D(this),L,O=(vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN?vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN:window.vBulletin.options.get("postminchars")),N=D("textarea[name=text]",I),K=N.attr("id"),H=D.trim(N.val()),J=(I.closest(".conversation-comments-wrapper").length>0)?true:false;if(vBulletin.ckeditor.editorExists(K)){L=vBulletin.ckeditor.getEditor(K);var M=L.getData();H=D.trim(D("<div />").html(M).text())}if(N.length>0&&H.length<O){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_message_x_chars",O),iconType:"warning",onAfterClose:function(){setTimeout(function(){if(L){L.focus()}else{N.focus()}},10)}});return false}else{if(D(".title-field",I).is(":visible")&&D.trim(D(".title-field",I).val())==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_title_of_topic"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D(".title-field",I).focus()},10)}});return false}}return true};vBulletin.contentEntryBox.commentFormValidate=function(){var I=D(this),K=window.vBulletin.options.get("commentminchars"),J=D("textarea[name=text]",I),H=D.trim(J.val());if(H.length<K){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_message_x_chars",K),iconType:"warning",onAfterClose:function(){setTimeout(function(){J.focus()},10)}});return false}return true};vBulletin.contentEntryBox.galleryFormValidate=function(P){var Q=D(this),O,L=(vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN?vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN:window.vBulletin.options.get("postminchars")),M=(vBulletin.contentEntryBox.ATTACHLIMIT?vBulletin.contentEntryBox.ATTACHLIMIT:0),H=D("textarea[name=text]",Q),I=H.attr("id"),J=D.trim(H.val());var N=Q.closest(".content-entry-box.edit-post");if(vBulletin.ckeditor.editorExists(I)){O=vBulletin.ckeditor.getEditor(I);var K=O.getData();J=D.trim(D("<div />").html(K).text())}if(H.length>0&&J.length<L){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_message_x_chars",L),iconType:"warning",onAfterClose:function(){setTimeout(function(){if(O){O.focus()}else{H.focus()}},10)}});return false}else{if(N.length==1){if(N.find(".edit-conversation-container .galleryLink .thumbnail-photo").length==0){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_upload_at_least_one_photo"),iconType:"warning"});return false}}else{if(D(".hiddendata input",Q).length==0){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_upload_at_least_one_photo"),iconType:"warning"});return false}else{if(D(".title-field",Q).is(":visible")&&D.trim(D(".title-field",Q).val())==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_title_of_topic"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D(".title-field",Q).focus()},10)}});return false}else{if(M>0&&D('.hiddendata input[name^="filedataid"]',Q).length>M){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("you_may_only_attach_x_files_per_post",M),iconType:"warning"});return false}}}}}Q.attr({enctype:"application/x-www-form-urlencoded","default-action":Q.attr("action"),action:Q.data("action-submit")});P.url=Q.data("action-submit");return true};vBulletin.contentEntryBox.videoFormValidate=function(){var I=D(this),K,N=(vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN?vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN:window.vBulletin.options.get("postminchars")),M=D("textarea[name=text]",I),J=M.attr("id"),H=D.trim(M.val());if(vBulletin.ckeditor.editorExists(J)){K=vBulletin.ckeditor.getEditor(J);var L=K.getData();H=D.trim(D("<div />").html(L).text())}if(M.length>0&&H.length<N){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_message_x_chars",N),iconType:"warning",onAfterClose:function(){setTimeout(function(){if(K){K.focus()}else{M.focus()}},10)}});return false}else{if(D(".videocontainer",I).length==0&&D(".linkcontainer .urlinfo",I).length==0){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_a_valid_video_url_and_click_attach"),iconType:"warning",onAfterClose:function(){D("input[name=url]",I).focus()}});return false}else{if(D(".title-field",I).is(":visible")&&D.trim(D(".title-field",I).val())==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_title_of_topic"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D(".title-field",I).focus()},10)}});return false}}}return true};vBulletin.contentEntryBox.linkFormValidate=function(){var I=D(this),K,N=(vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN?vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN:window.vBulletin.options.get("postminchars")),M=D("textarea[name=text]",I),J=M.attr("id"),H=D.trim(M.val());if(vBulletin.ckeditor.editorExists(J)){K=vBulletin.ckeditor.getEditor(J);var L=K.getData();H=D.trim(D("<div />").html(L).text())}if(M.length>0&&H.length<N){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_message_x_chars",N),iconType:"warning",onAfterClose:function(){setTimeout(function(){if(K){K.focus()}else{M.focus()}},10)}});return false}else{if(D(".linkcontainer .urlinfo",I).length==0&&D('.linkcontainer [name="videoitems[new][][url]"]',I).length==0){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_a_valid_url_and_click_attach"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D("input[name=url]",I).focus()},10)}});return false}else{if(D(".title-field",I).is(":visible")&&D.trim(D(".title-field",I).val())==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_title_of_topic"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D(".title-field",I).focus()},10)}});return false}}}return true};vBulletin.contentEntryBox.pollFormValidate=function(){var H=D(this);if(D.trim(D(".title-field",H).val())==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_poll_question"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D(".title-field",H).focus()},10)}});return false}else{var K=0,J=2,I;D(".polloption-field input:visible",H).each(function(){if(D.trim(D(this).val())!=""){K++}else{if(!I){I=D(this)}}if(K>=J){return false}});if(K<J){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_at_least_x_poll_answers",J),iconType:"warning",onAfterClose:function(){setTimeout(function(){I.focus()},10)}});return false}}return true};vBulletin.contentEntryBox.advancedEditorFormValidate=function(){var I=D(this),K,N=(vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN?vBulletin.contentEntryBox.MIN_EDITOR_CONTENT_LEN:window.vBulletin.options.get("postminchars")),M=D("textarea[name=text]",I),J=M.attr("id"),H=D.trim(M.val());if(vBulletin.ckeditor.editorExists(J)){K=vBulletin.ckeditor.getEditor(J);var L=K.getData();H=D.trim(D("<div />").html(L).text())}if(M.length>0&&H.length<N){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_message_x_chars",N),iconType:"warning",onAfterClose:function(){setTimeout(function(){if(K){K.focus()}else{M.focus()}},10)}});return false}else{if(D(".title-field",I).is(":visible")&&D.trim(D(".title-field",I).val())==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_title_of_topic"),iconType:"warning",onAfterClose:function(){setTimeout(function(){D(".title-field",I).focus()},10)}});return false}}return true};vBulletin.contentEntryBox.savePostCallback=function(M,J,V,W){console.log("vBulletin.contentEntryBox.savePostCallback");if((M&&M.error)||D.trim(M)==""){D(".refresh_imagereg a",W).click();if(typeof Recaptcha!=="undefined"){Recaptcha.reload()}var I;if(M.error&&D.isArray(M.error)&&D.isArray(M.error[0])){switch(M.error[0]){case"toomanyimages":I=vBulletin.phrase.get("toomanyimages",M.error[1],M.error[2]);break;default:D.each(M.error,function(X,Y){D.each(Y,function(a,Z){if(a>0){Y[a]=vBulletin.phrase.get(Z)}});M.error[X]=vBulletin.phrase.get(Y)});I=M.error.join("<br />")}}else{if(M.error){I=vBulletin.phrase.get(M.error)}else{I=vBulletin.phrase.get("empty_response")}}openAlertDialog({title:vBulletin.phrase.get("edit_conversation"),message:I,iconType:"warning"});return }if(W.closest(".conversation-toolbar-wrapper").length==1){W.closest(".conversation-reply-slideout").slideUp(400,function(){vBulletin.conversation.contentEntryBox.moveReplyToThreadBottom();vBulletin.conversation.replyWithQuotes.showAddWithQuotesButton()})}else{D(".conversation-reply-slideout .content-entry-box-tab a").eq(0).click()}var L=W.attr("data-content-type")||"";var K=W.attr("ck-editorid")||D(".ckeditor-bare-box",W).attr("id");W.trigger("reset");var R=vBulletin.ckeditor.getEditor?vBulletin.ckeditor.getEditor(K):false;if(R){R.setData("")}D(".photo-display-result, .linkcontainer, .hiddendata",W).html("");D(".edit-photo-link",W).addClass("hide");D(".upload-photo-dialog-container .photo-display-container .photo-display").html("");D("#upload-dialog .fileupload-content .files").empty();if(W.attr("default-action")){W.attr("action",W.attr("default-action"))}D(".custom-upload-button .label",W).text(vBulletin.phrase.get("upload"));W.closest(".content-entry-box").find("form").find("input[name^=filedataids]").remove();W.closest(".content-entry-box").find("form").find("input[name^=filename]").remove();if(K&&vBulletin.ckeditor.eventRegistered(K,"afterSave")){D("#"+K).trigger("afterSave",[K,M]);return }var Q=pageData,T,H=M.nodeId,U,P,O;U=W.closest(".conversation-content-widget");if(U.length==0){U=W.closest("#profileTab-1")}P=D(".conversation-list",U);O=D(".list-container",U);if(M.retUrl&&O.length==0){location.href=M.retUrl;return }window.vBulletin.loadingIndicator.show();if(P.hasClass("thread-view")){T="thread"}else{if(P.hasClass("full-activity-view")){T="full-activity-stream"}else{if(P.hasClass("activity-view")){T="activity-stream"}else{T="stream"}}}var N,S=D("> li.list-item:last .post-count:first",P).text()||"1";N=Number(S.replace("#",""));Q["posts-perpage"]=vBulletin.conversation.POSTS_PER_PAGE;if(T=="thread"){Q["comments-perpage"]=vBulletin.conversation.COMMENTS_PER_PAGE}var V=D.post(vBulletin.getAjaxBaseurl()+"/create-content/loadnode",{nodeid:H,view:T,index:N,page:Q,type:L},function(Z){W.closest(".content-entry-inline").hide();W.each(function(a,b){D(b).find("textarea").val("")});window.vBulletin.loadingIndicator.hide();if(Z.error){openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get(Z.error),iconType:"error"})}else{var Y=D(Z.template);if(O.length>1){$tab=W.closest(".tab");if($tab.length>0){O=D(".list-container",$tab)}else{O=D(".list-container",D(".tab.media-tab"))}}if(O.hasClass("ajax-order-newest-first")&&D("li.list-item:first",O).length>0){D("li.list-item:first",O).before(Y)}else{O.append(Y);vBulletin.scrollToAnchor("#post"+H)}if(O.children(".list-item").length>0){O.parent().find(".conversation-empty").addClass("hide")}D("body").trigger(L+"_savepost_success",[W]);Responsive.ConversationContent.checkForSignature();var X=D("li.conversation-starter",U).attr("data-node-id");if(X){if(pageData.threadmarking=="0"||pageData.userid=="0"){vBulletin.cookie.setBbarrayCookie("discussion_view",X,Math.round(new Date().getTime()/1000))}else{D.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/node/markRead",data:{nodeid:X},type:"POST",dataType:"json",complete:function(){},success:function(a){if(a&&!a.error){console.log("Topic "+X+" is marked read successfully!")}else{console.log("Topic "+X+" is marked read failed: "+a.error)}},error:function(c,b,a){console.log("Topic "+X+" is marked read failed:"+a)}})}}}},"json").error(function(Z,Y,X){console.warn("Error loading post: {0}".format(X));openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("error_loading_post"),iconType:"error"})}).complete(function(){window.vBulletin.loadingIndicator.hide()});vBulletin.hv.reset()};var A=D(".content-entry-box:not(.edit-post)");D(document).off("click",".content-entry-box .button.preview").on("click",".content-entry-box .button.preview",function(){var Q=D(this).closest("form"),M=Q.find('input[name="parentid"]').val(),K=Q.find('input[name="channelid"]').val(),J=Q.attr("data-content-type")||"",I=Q.find(".ckeditor-bare-box").attr("id"),L="",O=Q.find('.tag-editor-wrapper .tag-list input[name="tags"]').val();if(J==="advancedEditor"){J="text"}if(vBulletin.ckeditor.editorExists(I)){L=D.trim(vBulletin.ckeditor.getEditor(I).getData())}else{L=D.trim(D("#"+I).val())}if(L==""){openAlertDialog({title:vBulletin.phrase.get("preview"),message:vBulletin.phrase.get("no_post_content_to_preview"),iconType:"error"});return }var P=function(S,R){console.warn("Error loading post: {0}".format(S+" "+R));window.vBulletin.loadingIndicator.hide();openAlertDialog({title:vBulletin.phrase.get("preview"),message:vBulletin.phrase.get(S),iconType:"error"})};var H={parentid:M,channelid:K,pagedata:pageData,conversationtype:J,posttags:O,rawtext:L};if(J=="gallery"){var N=[];D('.hiddendata input[name="filedataid[]"]',Q).each(function(){N.push(this.value);H["title_"+this.value]=D('.hiddendata input[name="title_'+this.value+'"]',Q).val()||""});H.filedataid=N}window.vBulletin.loadingIndicator.show();D(this).prop("disabled",true);D.ajax({type:"POST",url:vBulletin.getAjaxBaseurl()+"/create-content/load-preview",dataType:"json",data:H,success:function(S){D(".content-entry-box .button.preview").prop("disabled",false);window.vBulletin.loadingIndicator.hide();if(!S||S.error||!S.template||!S.parsedText){P(S&&S.error?S.error:"unknown_error");return }var R=D("<div />").attr("id","preview-overlay").addClass("hide").append(D("<div />").addClass("dialog-content")).append(D("<div />").addClass("action-buttons")).appendTo("body");D("<ul />").addClass("conversation-list list-container stream-view activity-view clearfix").appendTo("#preview-overlay .dialog-content");D("<button />").attr("id","preview-overlay-close-btn").addClass("button primary").text(vBulletin.phrase.get("close_preview")).on("click",function(){D("#preview-overlay").dialog("close")}).appendTo("#preview-overlay .action-buttons");D(S.template).appendTo("#preview-overlay ul");D("#preview-overlay ul li.list-item .post-content-text").html(S.parsedText);D("#preview-overlay .dialog-content a").addClass("disabled").on("click",function(){return false});D("#preview-overlay").removeClass("hide").dialog({title:vBulletin.phrase.get("preview"),autoOpen:false,modal:true,resizable:false,closeOnEscape:true,showCloseButton:false,width:800,dialogClass:"dialog-container dialog-box",open:function(){D("#preview-overlay #preview-overlay-close-btn").focus()},close:function(){D("#preview-overlay").dialog("destroy");D("#preview-overlay").remove()}}).dialog("open")},error:function(T,S,R){P("error_loading_preview",R)},complete:function(){window.vBulletin.loadingIndicator.hide()}})});D(".content-entry-box form").trigger("reset");D(".content-entry-box-starter .action-buttons .cancel").off("click").on("click",function(){location.href=this.form.ret.value?this.form.ret.value:pageData.baseurl});var F=D("form",A);F.each(function(J,I){var H=D(I),K=H.attr("data-content-type");H.ajaxForm({dataType:"json",success:vBulletin.contentEntryBox.savePostCallback,error:function(R,Q,M){console.warn("Error when submitting content: {0}, {1}".format(Q,M));if(Q=="parsererror"){var P=String(R.responseText).split(/\r?\n/g);var L,O=P[P.length-1];try{L=D.parseJSON(O)}catch(N){}if(L){vBulletin.contentEntryBox.savePostCallback(L,"",R,H);return }}openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("error_x_while_saving_content",M),iconType:"error"})},complete:function(){window.vBulletin.loadingIndicator.hide()},beforeSerialize:function(L,M){$blogWidget=L.closest(".blog-channel-content-widget");if($blogWidget.length>0){$inputs=$blogWidget.find(".blog-editor-additional .content-entry-box input");if($inputs.length>0){$inputs.each(function(O,N){$input=D(N);D("<input>").attr({type:"hidden",id:$input.attr("name"),name:$input.attr("name"),value:($input.attr("checked"))?1:0}).appendTo(L)})}}},beforeSubmit:function(Q,P,N){var O=(vBulletin.contentEntryBox||{})[K+"FormValidate"],M;if(typeof O=="function"){M=O.apply(P,[N])}if(M===false){return false}var L=D("button",P);P.one("ajaxStart",function(){L.attr("disabled","disabled");P.one("ajaxComplete",function(){L.removeAttr("disabled")})});window.vBulletin.loadingIndicator.show();return true}})});D(document).off("click",".content-entry-box .btnGoAdvanced").on("click",".content-entry-box .btnGoAdvanced",function(I){I.preventDefault();var H=D(this).closest("form").find(".ckeditor-bare-box").eq(0).attr("id");vBulletin.ckeditor.convertToAdvancedEditor(H);D(this).prop("disabled",true)});D(document).off("click",".content-entry-box .lnkToggleAdvanced").on("click",".content-entry-box .lnkToggleAdvanced",function(I){I.preventDefault();var H=D(this).closest("form").find(".ckeditor-bare-box").eq(0).attr("id");vBulletin.ckeditor.toggleAdvancedAndBasicEditor(H)});D(document).off("click",".additional_options_toggle").on("click",".additional_options_toggle",function(){D(this).siblings(".additional_options_content").toggle()});var C=function(I){var H={width:E};H["padding-"+pageData.textDirRight]="10px";I.css(H);photoSelectorDialog.parent().addClass("has-scrollbar").width(B)};D(document).off("click",".photo-selector-button").on("click",".photo-selector-button",function(){D(document).data("gallery-container",D(this).closest(".gallery-editor"));G=[];$container=D("body");$photoSelectorContainer=D(".photo-selector-wrapper .photo-selector-container");if($photoSelectorContainer.length==0){$photoSelectorContainer=D(this).closest(".content-entry-box").find(".photo-selector-container")}$photoTab=D(".photo-selector-galleries",$photoSelectorContainer);var H=false;$photoTab.tabs({tabTemplate:'<li class="tab-item"><a href="#{href}"><span>#{label}</span></a></li>',panelTemplate:'<div class="tabPanel photo-display left"></div>',spinner:"<em>{0}&#8230;</em>".format(vBulletin.phrase.get("loading")),select:function(I,J){if(!H){return false}if(E&&B){C(D(J.panel))}H=false},load:function(M,O){var K=D(O.panel);if(E&&B){C(K)}if(!E||!B){var J=vBulletin.getScrollbarWidth();E=K.width()+J+1;B=photoSelectorDialog.dialog("option","width")+J+11;if(O.panel.scrollHeight>K.height()){C(K)}}else{if(O.panel.scrollHeight<=K.height()){var L={width:""};L["padding-"+pageData.textDirRight]="";K.css(L);photoSelectorDialog.parent().removeClass("has-scrollbar").css("width",photoSelectorDialog.dialog("option","width"))}}var N=D(".photo-item-wrapper .photo-item .filedataid",this),I=D(".checkboxCounter",D(this).parent());N.off("click").on("click",function(Q){Q.stopPropagation();var R=D(this).data("nodeid");if(this.checked){G.push(R);D(this).closest(".photo-item-wrapper").addClass("selected")}else{D(this).closest(".photo-item-wrapper").removeClass("selected");var P=D.inArray(R,G);if(P!=-1){G.splice(P,1)}}I.html(vBulletin.phrase.get("x_selected",G.length));D(".btnPhotoAdd",photoSelectorDialog).prop("disabled",G.length==0)});D(".photo-item-wrapper",this).off("click").on("click",function(){var P=D(".photo-checkbox .filedataid",this);P.prop("checked",!P.prop("checked")).triggerHandler("click")});if(G.length>0){N.each(function(){if(D.inArray(D(this).data("nodeid"),G)!=-1){this.checked=true}});D(".btnPhotoAdd",photoSelectorDialog).prop("disabled",false)}else{N.prop("checked",false);D(".btnPhotoAdd",photoSelectorDialog).prop("disabled",true)}I.html(vBulletin.phrase.get("x_selected",G.length));H=true;D(".tabPanel:not(:has(.photo-item-wrapper))",this).addClass("ui-tabs-hide")}});photoSelectorDialog=$photoSelectorContainer.dialog({modal:true,width:591,autoOpen:false,showCloseButton:false,closeOnEscape:false,resizable:false,showTitleBar:true,title:vBulletin.phrase.get("select_from_photo_album"),dialogClass:"photo-selector-wrapper dialog-container dialog-box"});D.ajax({url:vBulletin.getAjaxBaseurl()+"/profile/get-photo-tabs",data:{userid:pageData.userid},type:"POST",dataType:"json",success:function(I){var K=I.nodes,J=I.error,M;D(".photo-selector-tabs",$photoSelectorContainer).html("");if(J){openAlertDialog({title:vBulletin.phrase.get("select_from_photo_album"),message:vBulletin.phrase.get(J),iconType:"warning"})}else{var L=2;D.each(K,function(N,O){if(O.nodeid!=-1){M=(O.nodeid==-2?0:O.nodeid);$photoTab.tabs("add",vBulletin.getAjaxBaseurl()+"/profile/get-photo-tab-content?nodeid="+M+"&userid="+pageData.userid+"&ppr="+L,vBulletin.htmlEntities(O.title))}});if(B){photoSelectorDialog.parent().addClass("has-scrollbar").css("width",B)}photoSelectorDialog.dialog("open")}},error:function(K,J,I){console.warn("Error loading photo albums: "+I);openAlertDialog({title:vBulletin.phrase.get("select_from_photo_album"),message:vBulletin.phrase.get("error_loading_photo_albums_x",K.status),iconType:"error"})}})});if(typeof pageData.pageView!="undefined"&&pageData.pageView=="thread"){vBulletin.conversation.replyWithQuotes.showAddWithQuotesButton()}})(jQuery);