window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["add_caption","attach_files","click_to_add_caption","error_uploading_image","invalid_image_allowed_filetypes_are","remove_all_photos_confirmation_message","remove_all_photos_q","upload","upload_more","you_are_already_editing_continue","you_must_be_logged_in_to_upload_photos"]);(function(D){window.vBulletin=window.vBulletin||{};vBulletin.upload=vBulletin.upload||{};vBulletin.gallery=vBulletin.gallery||{};vBulletin.permissions=vBulletin.permissions||{};var C=3,E=2,G=[];vBulletin.gallery.onBeforeSerializeEditForm=function(H){H.find(".caption-box").each(function(){var I=D(this);if(I.hasClass("placeholder")&&I.val()==I.attr("placeholder")){I.val("")}});return true};vBulletin.upload.initializePhotoUpload=function(I){if(!I||I.length==0){I=D("body");if(D(".photo-display-container",I).length>1){return false}}D(".btnPhotoUploadCont",I).off("click").on("click",function(O){var L=D(document).data("gallery-container");var K=L.find(".hiddendata");var N=[];var P=[];var M={};var J=D(this).closest(".photo-display-container");K.empty();J.find(".photo-item-wrapper:not(.hide)").each(function(){var S=D(this).find(".filedataid");var R=S.val(),U=S.data("nodeid");var T=D.trim(D(this).find(".caption-box").val());D(this).removeClass("tmp-photo");if(typeof U!=="undefined"){D(this).removeClass("tmp-photo");var Q=D.inArray(U,G);if(Q==-1){G.push(U)}}K.append(D("<input />").attr({type:"hidden",name:"filedataid[]"}).val(R)).append(D("<input />").attr({type:"hidden",name:"title_"+R}).val(T));N.push(R);P.push(T);M["title["+R+"]"]=T});M.photocount=N.length;M["filedataid[]"]=N;J.find(".photo-item-wrapper.hide").remove();J.dialog("close");if(M.photocount>0){D.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/render/editor_gallery_photoblock",data:(M),type:"POST",dataType:"json",success:function(Q){L.find(".photo-display-result").html(Q);D(document).data("gallery-container",null)}});D(".edit-photo-link",L).removeClass("hide");D(".custom-upload-button .label",L).text(vBulletin.phrase.get("upload_more"))}else{D(".photo-display-result",L).empty();D(".edit-photo-link",L).addClass("hide");D(".custom-upload-button .label",L).text(vBulletin.phrase.get("upload"))}});D(".edit-photo-link",I).off("click").on("click",function(K){D(document).data("gallery-container",D(this).closest(".gallery-editor"));var J=vBulletin.upload.getUploadedPhotosDlg(false);vBulletin.upload.relocateLastInRowClass(J.find(".photo-item-wrapper"));H(J);J.dialog("open");vBulletin.upload.adjustPhotoDialogForScrollbar(J);D(".custom-upload-button",J).trigger("focus")});D(".btnPhotoUploadCancel",I).off("click").on("click",function(L){var J=D(this).closest(".photo-display-container"),K=D(document).data("gallery-container");D(".photo-item-wrapper.tmp-photo",J).remove();D(".photo-item-wrapper.hide",J).removeClass("hide");if(D(".photo-display-result .photo-preview",K).length>0){D(".edit-photo-link",K).removeClass("hide");D(".custom-upload-button .label",K).text(vBulletin.phrase.get("upload_more"))}else{D(".photo-display-result",K).empty();D(".edit-photo-link",K).addClass("hide");D(".custom-upload-button .label",K).text(vBulletin.phrase.get("upload"))}J.dialog("close")});var H=function(J){if(D(".photo-display .photo-item-wrapper:not(.hide)",J).length>0){D(".custom-upload-button .label",J).text(vBulletin.phrase.get("upload_more"));D(".btnPhotoUploadCont, .btnPhotoUploadSave",J).show()}else{D(".custom-upload-button .label",J).text(vBulletin.phrase.get("upload"));D(".btnPhotoUploadCont, .btnPhotoUploadSave",J).hide()}};D(".gallery-editor",I).fileupload({dropZone:null,dataType:"json",acceptFileTypes:/(gif|jpg|jpeg|jpe|png)$/i,add:function(Q,P){var O=D(this);D(document).data("gallery-container",O);var K=vBulletin.upload.getUploadedPhotosDlg(true);D(".upload-status-bar",K).removeClass("hide");var L=Number(D('.photo-display .photo-item-wrapper:last input[name="sequence[]"]',O).val())+1;D(".gallery-submit-form .photoCount",O).val(L||1);var M=P.files[0];var S=M.name.split(".").pop();var N=M.size;var R=0;if(typeof vBulletin.permissions[S]==="undefined"){vBulletin.permissions[S]={};var J={data:{extension:S,uploadFrom:D("input[type=hidden][name=uploadFrom]").val()}};D.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/content_attach/getAttachmentPermissions",data:J,type:"POST",dataType:"json",async:false,success:function(T){if(!T.errors){for(var U in T){if(T.hasOwnProperty(U)){vBulletin.permissions[S][U]=T[U]}}}else{console.warn("/ajax/api/content_attach/getAttachmentPermissions error: "+T.errors[0])}},error:function(V,U,T){console.warn("/ajax/api/content_attach/getAttachmentPermissions error: "+T)}})}R=vBulletin.permissions[S]["max_size"];if(R>0&&N>R){K.find(".upload-status-bar").addClass("hide");H(K);openAlertDialog({title:vBulletin.phrase.get("upload"),message:vBulletin.phrase.get("upload_file_exceeds_limit",N,R),iconType:"warning"})}else{P.submit()}D(".custom-upload-button",K).trigger("focus")},done:function(Q,P){var M=D(this);D(document).data("gallery-container",M);var L=vBulletin.upload.getUploadedPhotosDlg(false);var R=vBulletin.phrase.get("error_uploading_image");var N="error";if(P&&P.result&&(!P.result.errors||P.result.errors.length==0)&&P.result.edit){var J=D(P.result.edit);var O=D(".photo-display",L);var K=L.parent();var S=D(".photo-item-wrapper:not(.hide)",O).length;J.addClass("tmp-photo");if((S+1)%C==0){J.addClass("last-in-row")}if((S+1)>vBulletin.contentEntryBox.ATTACHLIMIT){D(".attach-limit-warning",L).show()}vBulletin.upload.adjustPhotoDialogForScrollbar(L);O.append(J);J.fadeIn("slow",function(){A(O);L.dialog("option","position","center");if(K.hasClass("has-scrollbar")){O.animate({scrollTop:O[0].scrollHeight-O.height()},"slow")}});D(".btnPhotoUploadCont, .btnPhotoUploadSave",L).show();return }else{if(P&&P.result&&P.result.errors&&P.result.errors.length>0){var R=P.result.errors[0][0]||P.result.errors[0][1];switch(R){case"please_login_first":R=vBulletin.phrase.get("you_must_be_logged_in_to_upload_photos");N="warning";break;default:R=vBulletin.phrase.get(P.result.errors[0]);N="warning";break}}else{R=vBulletin.phrase.get("unknown_error");N="warning"}}H(L);openAlertDialog({title:vBulletin.phrase.get("upload"),message:vBulletin.phrase.get(R),iconType:N})},fail:function(N,M){var K=vBulletin.phrase.get("error_uploading_image");var J="error";if(M&&M.files.length>0){switch(M.files[0].error){case"acceptFileTypes":K=vBulletin.phrase.get("invalid_image_allowed_filetypes_are");J="warning";break}}var L=vBulletin.upload.getUploadedPhotosDlg(false);H(L);openAlertDialog({title:vBulletin.phrase.get("upload"),message:K,iconType:J})},always:function(L,K){var J=vBulletin.upload.getUploadedPhotosDlg(false);J.find(".upload-status-bar").addClass("hide");H(J)}});D(".gallery-submit-form",I).submit(function(){D(".photo-display-container .photo-display input",D(this).closest(".gallery-editor")).appendTo(D(this));var J=D("input[type=hidden][name=ret]",this);if(D.trim(J.val())==""){J.val(location.href)}});D(document).off("click.photoadd",".action-buttons .btnPhotoAdd").on("click.photoadd",".action-buttons .btnPhotoAdd",function(){var J=D(this).closest(".photo-selector-container"),K={};J.find(".photo-item-wrapper").each(function(){var L=D(this).find(".filedataid"),O=L.data("nodeid");if(L.is(":checked")){var M=L.val(),N=D.trim(D(this).find(".photo-title").text());K[O]={imgUrl:vBulletin.getAjaxBaseurl()+"/filedata/fetch?filedataid="+M+"&thumb=1",filedataid:M,title:N}}});if(!D.isEmptyObject(K)){D.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/render/photo_item",data:{items:K,wrapperClass:"tmp-photo"},type:"POST",dataType:"json",success:function(N){var P=vBulletin.upload.getUploadedPhotosDlg(false),Q=D(".photo-display",P),M,L,O=1;Q.append(N);M=D(".photo-item-wrapper:not(.hide)",Q);D.each(M,function(R,S){L=D(S);if(O%C==0){L.addClass("last-in-row")}else{L.removeClass("last-in-row")}O++});if(O>0){D(".custom-upload-button .label",P).text(vBulletin.phrase.get("upload_more"));D(".btnPhotoUploadCont, .btnPhotoUploadSave",P).show()}else{D(".btnPhotoUploadCont, .btnPhotoUploadSave",P).hide()}vBulletin.upload.adjustPhotoDialogForScrollbar(P);P.dialog("option","position","center");P.dialog("open")}})}D(".photo-selector-galleries",J).tabs("destroy");J.dialog("close")});D(".action-buttons .btnPhotoCancel",I).off("click").on("click",function(){D(document).data("gallery-container",null);var J=D(this).closest(".photo-selector-container");D(".photo-selector-galleries",J).tabs("destroy");J.dialog("close")})};vBulletin.upload.getUploadedPhotosDlg=function(H){var I,J=D(document).data("gallery-container");if(J.parent(".profile-media-photoupload-dialog").length==1){I=J.parent(".profile-media-photoupload-dialog");if(H){I.dialog("open");vBulletin.upload.adjustPhotoDialogForScrollbar(I)}return I}I=J.find(".photo-display-container");if(I.length==0){D(".photo-display-container").each(function(){if(D(this).data("associated-editor")==D(document).data("gallery-container").get(0)){I=D(this);return false}})}else{I.dialog({modal:true,width:602,autoOpen:false,showCloseButton:false,closeOnEscape:false,resizable:false,showTitleBar:false,dialogClass:"dialog-container upload-photo-dialog-container dialog-box"});I.data("orig-width",I.dialog("option","width"));I.data("associated-editor",D(document).data("gallery-container").get(0))}if(H){I.dialog("open");vBulletin.upload.adjustPhotoDialogForScrollbar(I)}return I};vBulletin.upload.adjustPhotoDialogForScrollbar=function(K){var L=D(".photo-display",K);var J=K.parent();var I=D(".photo-item-wrapper:not(.hide)",L).length;if(!J.hasClass("has-scrollbar")&&I>=(C*E)){var H=window.vBulletin.getScrollbarWidth();J.addClass("has-scrollbar");K.dialog("option","width",K.dialog("option","width")+H+11)}};vBulletin.upload.relocateLastInRowClass=function(H){H.removeClass("last-in-row").filter(":not(.hide)").filter(function(I){return((I%C)==(C-1))}).addClass("last-in-row")};function F(){D(document).off("click.removephoto",".photo-display .photo-item .remove-icon").on("click.removephoto",".photo-display .photo-item .remove-icon",function(){var I=D(this).closest(".photo-item-wrapper"),M=D(".filedataid",I).data("nodeid"),L=I.parents(".photo-display-container").last();if(typeof M!=="undefined"){var K=D.inArray(M,G);if(K!=-1){G.splice(K,1)}}I.addClass("hide");var J=D(".photo-item-wrapper:not(.hide)",L).length;if(J<=vBulletin.contentEntryBox.ATTACHLIMIT){D(".attach-limit-warning",L).hide()}var H=L.find(".photo-item-wrapper:not(.hide)");vBulletin.upload.relocateLastInRowClass(H);if(H.length<=(C*E)){L.parent().removeClass("has-scrollbar");L.dialog("option","width",L.data("orig-width"));D(".action-buttons",L).css("margin-right","")}if(H.length>0){D(".gallery-upload-form .custom-upload-button .label",L).text(vBulletin.phrase.get("upload_more"));D(".btnPhotoUploadCont, .btnPhotoUploadSave",L).show()}else{D(".gallery-upload-form .custom-upload-button .label",L).text(vBulletin.phrase.get("upload"));D(".btnPhotoUploadCont, .btnPhotoUploadSave",L).hide()}});D(document).off("blur.photocaption",".photo-display .photo-caption .caption-box").on("blur.photocaption",".photo-display .photo-caption .caption-box",function(){D(this).scrollTop(0)});vBulletin.conversation.bindEditFormEventHandlers("gallery")}function A(I){var H=D(".photo-item .photo-caption .caption-box",I);H.filter("[placeholder]").placeholder()}function B(H){D(this).replaceWith(H);A(H)}D(document).ready(function(){vBulletin.upload.initializePhotoUpload();F()})})(jQuery);function submitUrl(){var A="urlupload="+$("#urlupload").val()+"&urlretrieve="+$("#urlretrieve").val();data=$.ajax({type:"POST",url:uploadUrlTarget,data:A,success:function(C){fileInfo=jQuery.parseJSON(C);var B=document.createElement("input");B.setAttribute("type","hidden");B.setAttribute("value",fileInfo.filedataid);B.setAttribute("name","filedataids[]");B.setAttribute("id","filedataid_"+fileInfo.filedataid);var B=document.createElement("input");B.setAttribute("type","hidden");B.setAttribute("value",fileInfo.name);B.setAttribute("name","filename_"+fileInfo.filedataid);B.setAttribute("id","filename_"+fileInfo.filedataid);document.getElementById("newTextForm").appendChild(B);newItem='<div id ="uploadedUrl_'+fileInfo.filedataid+'"><img src="'+fileInfo.thumbUrl+'"></img><a href="#" onclick="javascript:deleteExistingLink('+fileInfo.filedataid+')"> Click Here to Remove</a>&nbsp;&nbsp;'+$("#urlupload").val()+"</div>";$("#urlupload").val("");$("#tab-3").append(newItem)}});return false}function deleteExistingLink(A){$("#uploadedUrl_"+A).remove();$("#filedataid_"+A).remove();return false}function removePhoto(A){$("#vb_photoEdit_"+A).remove()}function showCaptionEdit(A){$("#photoCtrl_"+A).removeClass("show");$("#photoCtrl_"+A).addClass("hide");$("#photoCaption_"+A).removeClass("hide");$("#photoCaption_"+A).addClass("show")}function closePhotoCaption(A){$("#photoCtrl_"+A).removeClass("hide");$("#photoCtrl_"+A).addClass("show");$("#photoCaption_"+A).removeClass("show");$("#photoCaption_"+A).addClass("hide");caption=$("#caption_edit_"+A).val();if(caption.length){$("#addcaptionText_"+A).html(caption.substr(0,10))}else{$("#addcaptionText_"+A).html(vBulletin.phrase.get("add_caption"))}}function cancelPhotoCaption(A){$("#photoCtrl_"+A).removeClass("hide");$("#photoCtrl_"+A).addClass("show");$("#photoCaption_"+A).removeClass("show");$("#photoCaption_"+A).addClass("hide");$("#addcaptionText_"+A).html(vBulletin.phrase.get("add_caption"));$("#caption_edit_"+A).val("")}var openGalleryEdit=false;function editGallery(B){redirect=true;if(B.data){B=B.data;redirect=false}if(openGalleryEdit!==false){if(!confirm(vBulletin.phrase.get("you_are_already_editing_continue"))){return }$("#gallery_edit_holder_"+openGalleryEdit).removeClass("show");$("#gallery_edit_holder_"+openGalleryEdit).addClass("hide");$("#gallery_edit_holder_"+openGalleryEdit).html("")}var A=0;openGalleryEdit=B;$.ajax({type:"POST",url:vBulletin.getAjaxBaseurl()+"/uploader/get_photoedit",data:"nodeid="+B,success:function(E,D,C){$("#gallery_edit_holder_"+B).removeClass("hide");$("#gallery_edit_holder_"+B).addClass("show");$("#gallery_edit_holder_"+B).html(C.responseText);$("#gallery_pageid_"+B).val(pageData.pageid);A=$("#photoCount"+B).val();$("#gallery_edit-"+B).fileupload({dropZone:null,add:function(G,F){A++;$("#photoCount"+B).val(A);$("#photo_uploader_status").css("display","block");F.submit()},done:function(H,G){if(G.result&&G.result.filedataid){var F=G.result.edit;if(typeof (G.result.galleryid)=="undefined"){galleryid=""}else{galleryid=G.result.galleryid}$("#photo_display"+galleryid).css("display","block");$("#photo_display_edit"+galleryid).append(F);$("#photo_uploader_status").css("display","none")}},fail:function(G,F){},always:function(G,F){$("#photo_display").css("display","block");$("#photo_uploader_status").css("display","none")}})},dataType:"html"})}function closeGalleryEdit(A){$("#gallery_edit_holder_"+A).removeClass("show");$("#gallery_edit_holder_"+A).addClass("hide");$("#gallery_edit_holder_"+A).html("");openGalleryEdit=false}$(function(){window.openUploadDialog=function(D,B){var C=$("#upload-dialog").data("editorId",D);if(!isNaN(B)){C.find('input[name="parentid"]').val(B)}if(!C.data("created")){C.dialog({width:720,title:vBulletin.phrase.get("attach_files"),dialogClass:"dialog-container upload-dialog-container input-dialog shadow-dark",showCloseButton:false,modal:true,resizable:false,autoOpen:false,create:function(G,F){var E=$(this);E.data("created",true);$("#btnDone",E).on("click",function(){A();E.dialog("close")});$("#btnCancelAttach",E).on("click",function(){E.dialog("close")})}})}C.dialog("open")};var A=function(){var C=function(J,I){var K="";J.each(function(){if($(this).data("insertedIntoEditor")=="true"){return true}var N=$(this).data("name");if(N.match(/\.(gif|jpg|jpeg|jpe|png|bmp)$/i)){var O=vBulletin.getAjaxBaseurl()+"/filedata/fetch?filedataid="+$(this).val();K+=' <img src="'+O+'" alt="" /> '}else{if(N!=""){var M=vBulletin.getAjaxBaseurl()+"/filedata/fetch?filedataid="+$(this).val();K+=' <a href="'+M+'">'+N+"</a>"}}$(this).data("insertedIntoEditor","true")});if(K!=""){var L=I.document.getBody();L.setAttribute("contentEditable",false);L.setAttribute("contentEditable",true);I.insertHtml(K)}};var H=$("#upload-dialog").data("editorId");var G=$("#"+H);var B=G.closest("form");var F=B.find("input[name^=filedataids]");if(F.length>0){if(!vBulletin.ckeditor.editorExists(H)){vBulletin.ckeditor.initEditor(H,{success:function(){C(F,vBulletin.ckeditor.getEditor(H))}})}else{C(F,vBulletin.ckeditor.getEditor(H))}}var D=B.find("input[name^=filename]");var E=G.closest(".content-entry-box").find("form").not(B);E.remove("input[name^=filedataids]").append(F.clone(true));E.remove("input[name^=filename]").append(D.clone(true))};$(document).off("click",".content-entry-box .btnUpload").on("click",".content-entry-box .btnUpload",function(D){var C=$(this).closest("form").find('textarea[name="text"]').attr("id");if(typeof (C)==="undefined"){C=$(this).closest("form").find('textarea[name="rawtext"]').attr("id")}var B=$(this).closest("form").find('input[name="parentid"]').val();window.openUploadDialog(C,B)});$("#fileupload").fileupload();$("#fileupload .files a:not([target^=_blank])").live("click",function(B){B.preventDefault();$('<iframe style="display:none;"></iframe>').prop("src",this.href).appendTo("body")})});