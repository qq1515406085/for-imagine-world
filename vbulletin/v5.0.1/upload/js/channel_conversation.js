window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,[]);(function(A){var B=[".forum-channel-content-widget",".blog-channel-content-widget",".sg-channel-content-widget"];if(!vBulletin.pageHasSelectors(B)){return false}A(document).ready(function(){vBulletin.conversation=vBulletin.conversation||{};var E=A(".channel-content-widget .channel-conversation-list-wrapper");var F=A("#activity-stream-tab",E);var K=A("#recommended-tab",E);var L=A("#subscribed-tab",E);var Z=A("#topic-tab",E);var G=A("#media-tab",E);var M=A(".conversation-list",F);var c=A(".conversation-list",K);var V=A(".conversation-list",L);var a=A(".conversation-list",Z);var T=A(".conversation-list",E);var I,b,Q,W,C;var Y,X,R,D;var J,U,S;var H=E.find(".widget-tabs-nav .ui-tabs-nav > li"),P=H.filter(".ui-tabs-selected"),O=P.index(),d;if(O==-1){O=0;P=H.first()}d=P.find("> a").attr("href");var N=function(e){var f=(E.offset().top+(E.outerHeight()-parseFloat(E.css("border-bottom-width")))-e.height());console.log(f);return f};H.removeClass("ui-state-disabled");E.tabs({selected:O,select:function(e,f){if(S){S.hideFilterOverlay()}if(Q){Q.hideFilterOverlay()}if(R){R.hideFilterOverlay()}},show:function(f,g){if(g.tab.hash=="#activity-stream-tab"){if(Q){Q.toggleNewConversations(false)}if(!S){J=A(".conversation-toolbar-wrapper.scrolltofixed-floating",F);U=new vBulletin.scrollToFixed({element:J,limit:N(J)});var e=new vBulletin.pagination({context:F,onPageChanged:function(i,j){S.updatePageNumber(i);if(!j){S.applyFilters(false,true,false,true)}}});S=new vBulletin.conversation.filter({context:F,autoCheck:A(".toolbar-filter-overlay input[type=radio][value=conversations_on]",F).is(":checked"),scrollToTop:E,pagination:e,onContentLoad:function(){U.updateLimit(N(J));vBulletin.truncatePostContent(M);vBulletin.conversation.processPostContent(M)}});if(d==g.tab.hash){vBulletin.truncatePostContent(M);vBulletin.conversation.processPostContent(M);S.lastFilters={filters:S.getSelectedFilters(A(".toolbar-filter-overlay",F))}}}else{if(typeof S.lastFilters!="undefined"&&A(".conversation-empty:not(.hide)",g.panel).length>0){delete S.lastFilters}}S.applyFilters(false,true)}else{if(g.tab.hash=="#subscribed-tab"){if(S){S.toggleNewConversations(false)}if(Q){Q.toggleNewConversations(false)}if(!R){Y=A(".conversation-toolbar-wrapper.scrolltofixed-floating",L);X=new vBulletin.scrollToFixed({element:Y,limit:N(Y)});R=new vBulletin.conversation.filter({context:L,scrollToTop:E,onContentLoad:function(){X.updateLimit(N(Y));vBulletin.truncatePostContent(V);vBulletin.conversation.processPostContent(V)}});if(d==g.tab.hash){vBulletin.truncatePostContent(V);vBulletin.conversation.processPostContent(V);R.lastFilters={filters:R.getSelectedFilters(A(".toolbar-filter-overlay",L))}}}else{if(typeof R.lastFilters!="undefined"&&A(".conversation-empty:not(.hide)",g.panel).length>0){delete R.lastFilters}}R.applyFilters(false)}else{if(g.tab.hash=="#topic-tab"){if(S){S.toggleNewConversations(false)}if(!Q){I=A(".conversation-toolbar-wrapper.scrolltofixed-floating",Z);b=new vBulletin.scrollToFixed({element:I,limit:N(I)});var h=new vBulletin.pagination({context:Z,onPageChanged:function(i,j){Q.updatePageNumber(i);if(!j){Q.applyFilters(false,true,false,true)}}});Q=new vBulletin.conversation.filter({context:Z,autoCheck:A(".toolbar-filter-overlay input[type=radio][value=conversations_on]",Z).is(":checked"),scrollToTop:E,pagination:h,onContentLoad:function(){b.updateLimit(N(I));vBulletin.markreadcheck()}});if(d==g.tab.hash){Q.lastFilters={filters:Q.getSelectedFilters(A(".toolbar-filter-overlay",Z))}}}else{if(typeof Q.lastFilters!="undefined"&&A(".conversation-empty:not(.hide)",g.panel).length>0){delete Q.lastFilters}}Q.applyFilters(false,true)}else{if(g.tab.hash=="#media-tab"){if(S){S.toggleNewConversations(false)}if(Q){Q.toggleNewConversations(false)}if(!W){W=A(".conversation-toolbar-wrapper.scrolltofixed-floating",G);C=new vBulletin.scrollToFixed({element:W,limit:N(W)})}if(A("#profileMediaDetailContainer .album-detail",g.panel).length==0){if(!D){D=vBulletin.media.calculatePhotosPerPage(vBulletin.media.TARGET_PHOTOS_PERPAGE)}loadGalleryById({nodeid:-2,channelid:pageData.channelid,pageno:1,dateFilter:"lastweek",perpage:D},false,0,{complete:function(){A(".profile-toolbar .media-toolbar-filter",G).removeClass("hide");C.updateLimit(N(W))}})}if(d==g.tab.hash){A(".profile-toolbar .media-toolbar-filter",G).removeClass("hide")}}}}}}});T.off("click",".list-item-poll .view-more-ctrl").on("click",".view-more-ctrl",function(g){var f=A(this).closest("form.poll");var h=f.find("ul.poll");A(this).addClass("hide");h.css("max-height","none").find("li.hide").slideDown(100,function(){f.find(".action-buttons").removeClass("hide").next(".view-less-ctrl").removeClass("hide");vBulletin.animateScrollTop(f.offset().top,{duration:"fast"})});return false});T.off("click",".list-item-poll .view-less-ctrl").on("click",".view-less-ctrl",function(g){var f=A(this).closest("form.poll");vBulletin.conversation.limitVisiblePollOptionsInAPost(f,3);f.find("ul.poll").css("max-height","").find("li.hide").slideUp(100);return false});T.off("click",".post-history").on("click",".post-history",vBulletin.conversation.showPostHistory);T.off("click",".ipAddress").on("click",".ipAddress",vBulletin.conversation.showIp);T.off("click",".editCtrl").on("click",".editCtrl",function(f){vBulletin.conversation.editPost.apply(this,[f,S])});T.off("click",".voteCtrl").on("click",".voteCtrl",function(f){if(A(f.target).closest(".bubble-flyout").length==1){vBulletin.conversation.showWhoVoted.apply(f.target,[f])}else{vBulletin.conversation.votePost.apply(this,[f])}return false});T.off("click",".flagCtrl").on("click",".flagCtrl",vBulletin.conversation.flagPost);T.off("click",".commentCtrl").on("click",".commentCtrl",vBulletin.conversation.toggleCommentBox);T.off("click",".post-comment-btn").on("click",".post-comment-btn",function(f){vBulletin.conversation.postComment.apply(this,[f,function(){S.updatePageNumber(1).applyFilters(false,true)}])});vBulletin.conversation.bindEditFormEventHandlers("all")})})(jQuery);