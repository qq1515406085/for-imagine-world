window.vBulletin=window.vBulletin||{};window.vBulletin.cache=function(){var G="vbcache-";var L="-timestamp";var B;var H;var D="global";var M={global:{bucketProvider:function(){},latestChange:0,preCache:[]}};function F(){var O="__vbcachetest__";var P=O;if(B!==undefined){return B}try{E(O,P);J(O);B=true}catch(N){B=false}return B}function A(){if(H===undefined){H=(window.JSON!=null)}return H}function C(){if(!F()){return }var Q=M[D];var N=[];for(var P=localStorage.length-1;P>=0;--P){storedKey=localStorage.key(P);if(storedKey.indexOf(G+D)===0&&storedKey.indexOf(L)<0){var S=storedKey.substr((G+D).length);var O=I(S);var R=K(O);R=parseInt(R);if(R<Q.latestChange){localStorage.removeItem(storedKey);Q.preCache.push(S)}else{N.push(S)}}}Q.preCache=$.grep(Q.preCache,function(T){for(var U=0;U<N.length;U++){if(T==N[U]){return false}}return true})}function I(N){return N+L}function K(N){return localStorage.getItem(G+D+N)}function E(N,O){localStorage.removeItem(G+D+N);localStorage.setItem(G+D+N,O)}function J(N){localStorage.removeItem(G+D+N)}return{set:function(U,T){if(!F()){return }if(typeof T!=="string"){if(!A()){return }try{T=JSON.stringify(T)}catch(S){return }}try{E(U,T)}catch(S){if(S.name==="QUOTA_EXCEEDED_ERR"||S.name==="NS_ERROR_DOM_QUOTA_REACHED"){var V=[];var O;for(var Q=0;Q<localStorage.length;Q++){O=localStorage.key(Q);if(O.indexOf(G+D)===0&&O.indexOf(L)<0){var W=O.substr((G+D).length);var N=I(W);var R=K(N);R=parseInt(R);V.push({key:W,size:(K(W)||"").length,timestamp:R})}}V.sort(function(Y,X){return(X.timestamp-Y.timestamp)});var P=(T||"").length;while(V.length&&P>0){O=V.pop();J(O.key);J(I(O.key));P-=O.size}try{E(U,T)}catch(S){return }}else{return }}E(I(U),window.pageData.current_server_datetime)},get:function(O){if(!F()){return null}var P=M[D];var N=I(O);var S=K(N);var Q=K(O);if(Q==null){Q=P.bucketProvider(O,P.preCache)}if(!Q||!A()){return Q}try{return JSON.parse(Q)}catch(R){return Q}},remove:function(N){if(!F()){return null}J(N);J(I(N))},supported:function(){return F()},flush:function(){if(!F()){return }for(var O=localStorage.length-1;O>=0;--O){var N=localStorage.key(O);if(N.indexOf(G+D)===0){localStorage.removeItem(N)}}},initBucket:function(Q,N,O,P){M[Q]={latestChange:N,bucketProvider:P,preCache:O};D=Q;C()},setBucket:function(N){D=N}}}();