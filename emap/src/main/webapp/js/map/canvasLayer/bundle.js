(()=>{"use strict";function t(t,e){e[0]<t[0]&&(t[0]=e[0]),e[0]>t[2]&&(t[2]=e[0]),e[1]<t[1]&&(t[1]=e[1]),e[1]>t[3]&&(t[3]=e[1])}var e="cosh"in Math?Math.cosh:function(t){var e=Math.exp(t);return(e+1/e)/2},n={DEGREES:"degrees",FEET:"ft",METERS:"m",PIXELS:"pixels",TILE_PIXELS:"tile-pixels",USFEET:"us-ft"},r={};r[n.DEGREES]=2*Math.PI*6370997/360,r[n.FEET]=.3048,r[n.METERS]=1,r[n.USFEET]=1200/3937;const o=n;var i=function(t){this.code_=t.code,this.units_=t.units,this.extent_=void 0!==t.extent?t.extent:null,this.worldExtent_=void 0!==t.worldExtent?t.worldExtent:null,this.axisOrientation_=void 0!==t.axisOrientation?t.axisOrientation:"enu",this.global_=void 0!==t.global&&t.global,this.canWrapX_=!(!this.global_||!this.extent_),this.getPointResolutionFunc_=t.getPointResolution,this.defaultTileGrid_=null,this.metersPerUnit_=t.metersPerUnit};i.prototype.canWrapX=function(){return this.canWrapX_},i.prototype.getCode=function(){return this.code_},i.prototype.getExtent=function(){return this.extent_},i.prototype.getUnits=function(){return this.units_},i.prototype.getMetersPerUnit=function(){return this.metersPerUnit_||r[this.units_]},i.prototype.getWorldExtent=function(){return this.worldExtent_},i.prototype.getAxisOrientation=function(){return this.axisOrientation_},i.prototype.isGlobal=function(){return this.global_},i.prototype.setGlobal=function(t){this.global_=t,this.canWrapX_=!(!t||!this.extent_)},i.prototype.getDefaultTileGrid=function(){return this.defaultTileGrid_},i.prototype.setDefaultTileGrid=function(t){this.defaultTileGrid_=t},i.prototype.setExtent=function(t){this.extent_=t,this.canWrapX_=!(!this.global_||!t)},i.prototype.setWorldExtent=function(t){this.worldExtent_=t},i.prototype.setGetPointResolution=function(t){this.getPointResolutionFunc_=t},i.prototype.getPointResolutionFunc=function(){return this.getPointResolutionFunc_};const a=i;var s=6378137,p=Math.PI*s,c=[-p,-p,p,p],u=[-180,-85,180,85],l=function(t){function n(n){t.call(this,{code:n,units:o.METERS,extent:c,global:!0,worldExtent:u,getPointResolution:function(t,n){return t/e(n[1]/s)}})}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n}(a),h=[new l("EPSG:3857"),new l("EPSG:102100"),new l("EPSG:102113"),new l("EPSG:900913"),new l("urn:ogc:def:crs:EPSG:6.18:3:3857"),new l("urn:ogc:def:crs:EPSG::3857"),new l("http://www.opengis.net/gml/srs/epsg.xml#3857")];var d,y,f,g=[-180,-90,180,90],m=6378137*Math.PI/180,v=function(t){function e(e,n){t.call(this,{code:e,units:o.DEGREES,extent:g,axisOrientation:n,global:!0,metersPerUnit:m,worldExtent:g})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(a),_=[new v("CRS:84"),new v("EPSG:4326","neu"),new v("urn:ogc:def:crs:EPSG::4326","neu"),new v("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new v("urn:ogc:def:crs:OGC:1.3:CRS84"),new v("urn:ogc:def:crs:OGC:2:84"),new v("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new v("urn:x-ogc:def:crs:EPSG:4326","neu")],w={},x={};function E(t,e,n){var r=t.getCode(),o=e.getCode();r in x||(x[r]={}),x[r][o]=n}function S(t,e,n){var r;if(void 0!==e){for(var o=0,i=t.length;o<i;++o)e[o]=t[o];r=e}else r=t.slice();return r}function b(t,e,n){if(void 0!==e&&t!==e){for(var r=0,o=t.length;r<o;++r)e[r]=t[r];t=e}return t}function F(t){!function(t,e){w[t]=e}(t.getCode(),t),E(t,t,S)}function L(t){return"string"==typeof t?w[t]||null:t||null}function P(t){!function(t){t.forEach(F)}(t),t.forEach((function(e){t.forEach((function(t){e!==t&&E(e,t,S)}))}))}function R(t,e){return function(t,e,n){return function(t,e){return n=L(t),r=L(e),o=function(t,e){var n;return t in x&&e in x[t]&&(n=x[t][e]),n}(n.getCode(),r.getCode()),o||(o=b),o;var n,r,o}(e,n)(t,void 0,t.length)}(t,"EPSG:4326",void 0!==e?e:"EPSG:3857")}function I(t,e,n){const[r,o]=e;if(e[0]>=t)throw new Error("Out of bound");if(e[1]*t+e[0]>=n.length)throw new Error("Out of buffer bound");const i=Math.floor(r),a=Math.floor(o),s=Math.ceil(r),p=Math.ceil(o),c=r-i,u=o-a,l=n[s+t*a],h=n[i+t*a],d=n[i+t*p];return(l-h)*c+(d-h)*u+(h+n[s+t*p]-l-d)*c*u+h}P(h),P(_),d=h,y=function(t,e,n){var r=t.length,o=n>1?n:2,i=e;void 0===i&&(i=o>2?t.slice():new Array(r));for(var a=p,c=0;c<r;c+=o){i[c]=a*t[c]/180;var u=s*Math.log(Math.tan(Math.PI*(t[c+1]+90)/360));u>a?u=a:u<-a&&(u=-a),i[c+1]=u}return i},f=function(t,e,n){var r=t.length,o=n>1?n:2,i=e;void 0===i&&(i=o>2?t.slice():new Array(r));for(var a=0;a<r;a+=o)i[a]=180*t[a]/p,i[a+1]=360*Math.atan(Math.exp(t[a+1]/s))/Math.PI-90;return i},_.forEach((function(t){d.forEach((function(e){E(t,e,y),E(e,t,f)}))}));class M{constructor(t,e,n,r,o){this.extent=function(t,e){return t.slice()}(o),this.dataWidth_=n,this.dataHeight_=r,this.speedBuffer_=new Float32Array(t.length),this.simpleSpeedBuffer=new Uint8Array(t.length),this.rotationBuffer_=new Float32Array(t.length),this.uBuffer_=t,this.vBuffer_=e;for(let n=0;n<t.length;++n){const r=t[n],o=e[n],i=Math.sqrt(r*r+o*o),a=Math.atan2(o,r);this.speedBuffer_[n]=i,this.simpleSpeedBuffer[n]=Math.ceil(i),this.rotationBuffer_[n]=a}}getUVSpeed(t){const e=this.dataWidth_,n=this.dataHeight_,r=function(t,e,n,r){return[(r[0]-t[0])/(t[2]-t[0])*(e-1),(r[1]-t[1])/(t[3]-t[1])*(n-1)]}(this.extent,e,n,t);return[I(e,r,this.uBuffer_),I(e,r,this.vBuffer_)]}getRotation(t){return this.rotationBuffer_[t]}getSpeed(t){return this.speedBuffer_[t]}saveU(){const t=document.createElement("a");t.style.display="none",document.body.appendChild(t);const e=new Blob([this.uBuffer_],{type:"application/octet-stream"}),n=URL.createObjectURL(e);t.href=n,t.href=URL.createObjectURL(e),t.download="u.binary",t.click()}}var O="function"==typeof Object.assign?Object.assign:function(t,e){var n=arguments;if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(t),o=1,i=arguments.length;o<i;++o){var a=n[o];if(null!=a)for(var s in a)a.hasOwnProperty(s)&&(r[s]=a[s])}return r};function B(t){for(var e in t)delete t[e]}function T(t,e,n,r){for(var o,i=0,a=t.length;i<a;++i)if((o=t[i]).listener===e&&o.bindTo===n)return r&&(o.deleteIndex=i),o}function C(t,e){var n=A(t);return n?n[e]:void 0}function A(t,e){var n=t.ol_lm;return!n&&e&&(n=t.ol_lm={}),n}function W(t,e){var n=C(t,e);if(n){for(var r=0,o=n.length;r<o;++r)t.removeEventListener(e,n[r].boundListener),B(n[r]);n.length=0;var i=A(t);i&&(delete i[e],0===Object.keys(i).length&&function(t){delete t.ol_lm}(t))}}function k(t,e,n,r,o){var i=A(t,!0),a=i[e];a||(a=i[e]=[]);var s=T(a,n,r,!1);return s?o||(s.callOnce=!1):(s={bindTo:r,callOnce:!!o,listener:n,target:t,type:e},t.addEventListener(e,function(t){var e=function(e){var n=t.listener,r=t.bindTo||t.target;return t.callOnce&&U(t),n.call(r,e)};return t.boundListener=e,e}(s)),a.push(s)),s}function G(t,e,n,r){return k(t,e,n,r,!0)}function j(t,e,n,r){var o=C(t,e);if(o){var i=T(o,n,r,!0);i&&U(i)}}function U(t){if(t&&t.target){t.target.removeEventListener(t.type,t.boundListener);var e=C(t.target,t.type);if(e){var n="deleteIndex"in t?t.deleteIndex:e.indexOf(t);-1!==n&&e.splice(n,1),0===e.length&&W(t.target,t.type)}B(t)}}const D="change";function K(){return function(){throw new Error("Unimplemented abstract method.")}()}var V=0;function q(t){return t.ol_uid||(t.ol_uid=String(++V))}var z=function(){this.disposed_=!1};z.prototype.dispose=function(){this.disposed_||(this.disposed_=!0,this.disposeInternal())},z.prototype.disposeInternal=function(){};const X=z;function H(){}var Z=function(t){this.propagationStopped,this.type=t,this.target=null};Z.prototype.preventDefault=function(){this.propagationStopped=!0},Z.prototype.stopPropagation=function(){this.propagationStopped=!0};const Y=Z;var J=function(t){function e(){t.call(this),this.pendingRemovals_={},this.dispatching_={},this.listeners_={}}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addEventListener=function(t,e){var n=this.listeners_[t];n||(n=this.listeners_[t]=[]),-1===n.indexOf(e)&&n.push(e)},e.prototype.dispatchEvent=function(t){var e="string"==typeof t?new Y(t):t,n=e.type;e.target=this;var r,o=this.listeners_[n];if(o){n in this.dispatching_||(this.dispatching_[n]=0,this.pendingRemovals_[n]=0),++this.dispatching_[n];for(var i=0,a=o.length;i<a;++i)if(!1===o[i].call(this,e)||e.propagationStopped){r=!1;break}if(--this.dispatching_[n],0===this.dispatching_[n]){var s=this.pendingRemovals_[n];for(delete this.pendingRemovals_[n];s--;)this.removeEventListener(n,H);delete this.dispatching_[n]}return r}},e.prototype.disposeInternal=function(){!function(t){var e=A(t);if(e)for(var n in e)W(t,n)}(this)},e.prototype.getListeners=function(t){return this.listeners_[t]},e.prototype.hasListener=function(t){return t?t in this.listeners_:Object.keys(this.listeners_).length>0},e.prototype.removeEventListener=function(t,e){var n=this.listeners_[t];if(n){var r=n.indexOf(e);t in this.pendingRemovals_?(n[r]=H,++this.pendingRemovals_[t]):(n.splice(r,1),0===n.length&&delete this.listeners_[t])}},e}(X);const N=function(t){function e(){t.call(this),this.revision_=0}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.changed=function(){++this.revision_,this.dispatchEvent(D)},e.prototype.getRevision=function(){return this.revision_},e.prototype.on=function(t,e){if(Array.isArray(t)){for(var n=t.length,r=new Array(n),o=0;o<n;++o)r[o]=k(this,t[o],e);return r}return k(this,t,e)},e.prototype.once=function(t,e){if(Array.isArray(t)){for(var n=t.length,r=new Array(n),o=0;o<n;++o)r[o]=G(this,t[o],e);return r}return G(this,t,e)},e.prototype.un=function(t,e){if(Array.isArray(t))for(var n=0,r=t.length;n<r;++n)j(this,t[n],e);else j(this,t,e)},e}(J);var Q=function(t){function e(e,n,r){t.call(this,e),this.key=n,this.oldValue=r}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Y),tt={};function et(t){return tt.hasOwnProperty(t)?tt[t]:tt[t]="change:"+t}const nt="opacity",rt="visible",ot="extent",it="zIndex",at="maxResolution",st="minResolution",pt="source";var ct=function(t){function e(e){t.call(this);var n=O({},e);n[nt]=void 0!==e.opacity?e.opacity:1,n[rt]=void 0===e.visible||e.visible,n[it]=e.zIndex,n[at]=void 0!==e.maxResolution?e.maxResolution:1/0,n[st]=void 0!==e.minResolution?e.minResolution:0,this.setProperties(n),this.state_=null,this.type}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getType=function(){return this.type},e.prototype.getLayerState=function(){var t,e=this.state_||{layer:this,managed:!0};return e.opacity=(t=this.getOpacity(),0,1,Math.min(Math.max(t,0),1)),e.sourceState=this.getSourceState(),e.visible=this.getVisible(),e.extent=this.getExtent(),e.zIndex=this.getZIndex()||0,e.maxResolution=this.getMaxResolution(),e.minResolution=Math.max(this.getMinResolution(),0),this.state_=e,e},e.prototype.getLayersArray=function(t){return K()},e.prototype.getLayerStatesArray=function(t){return K()},e.prototype.getExtent=function(){return this.get(ot)},e.prototype.getMaxResolution=function(){return this.get(at)},e.prototype.getMinResolution=function(){return this.get(st)},e.prototype.getOpacity=function(){return this.get(nt)},e.prototype.getSourceState=function(){return K()},e.prototype.getVisible=function(){return this.get(rt)},e.prototype.getZIndex=function(){return this.get(it)},e.prototype.setExtent=function(t){this.set(ot,t)},e.prototype.setMaxResolution=function(t){this.set(at,t)},e.prototype.setMinResolution=function(t){this.set(st,t)},e.prototype.setOpacity=function(t){this.set(nt,t)},e.prototype.setVisible=function(t){this.set(rt,t)},e.prototype.setZIndex=function(t){this.set(it,t)},e}(function(t){function e(e){t.call(this),q(this),this.values_={},void 0!==e&&this.setProperties(e)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.get=function(t){var e;return this.values_.hasOwnProperty(t)&&(e=this.values_[t]),e},e.prototype.getKeys=function(){return Object.keys(this.values_)},e.prototype.getProperties=function(){return O({},this.values_)},e.prototype.notify=function(t,e){var n;n=et(t),this.dispatchEvent(new Q(n,t,e)),n="propertychange",this.dispatchEvent(new Q(n,t,e))},e.prototype.set=function(t,e,n){if(n)this.values_[t]=e;else{var r=this.values_[t];this.values_[t]=e,r!==e&&this.notify(t,r)}},e.prototype.setProperties=function(t,e){for(var n in t)this.set(n,t[n],e)},e.prototype.unset=function(t,e){if(t in this.values_){var n=this.values_[t];delete this.values_[t],e||this.notify(t,n)}},e}(N));var ut=function(t){function e(e){var n=O({},e);delete n.source,t.call(this,n),this.mapPrecomposeKey_=null,this.mapRenderKey_=null,this.sourceChangeKey_=null,e.map&&this.setMap(e.map),k(this,et(pt),this.handleSourcePropertyChange_,this);var r=e.source?e.source:null;this.setSource(r)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getLayersArray=function(t){var e=t||[];return e.push(this),e},e.prototype.getLayerStatesArray=function(t){var e=t||[];return e.push(this.getLayerState()),e},e.prototype.getSource=function(){return this.get(pt)||null},e.prototype.getSourceState=function(){var t=this.getSource();return t?t.getState():"undefined"},e.prototype.handleSourceChange_=function(){this.changed()},e.prototype.handleSourcePropertyChange_=function(){this.sourceChangeKey_&&(U(this.sourceChangeKey_),this.sourceChangeKey_=null);var t=this.getSource();t&&(this.sourceChangeKey_=k(t,D,this.handleSourceChange_,this)),this.changed()},e.prototype.setMap=function(t){this.mapPrecomposeKey_&&(U(this.mapPrecomposeKey_),this.mapPrecomposeKey_=null),t||this.changed(),this.mapRenderKey_&&(U(this.mapRenderKey_),this.mapRenderKey_=null),t&&(this.mapPrecomposeKey_=k(t,"precompose",(function(t){var e=t,n=this.getLayerState();n.managed=!1,void 0===this.getZIndex()&&(n.zIndex=1/0),e.frameState.layerStatesArray.push(n),e.frameState.layerStates[q(this)]=n}),this),this.mapRenderKey_=k(this,D,t.render,t),this.changed())},e.prototype.setSource=function(t){this.set(pt,t)},e}(ct);const lt=ut;function ht(t,e){let[n,r]=t.size;if(n*=t.pixelRatio,r*=t.pixelRatio,e.width!==n||e.height!==r)return e.width=n,e.height=r,!0}function dt(t,e){var n=e[0],r=e[1];return e[0]=t[0]*n+t[2]*r+t[4],e[1]=t[1]*n+t[3]*r+t[5],e}new Array(6);const yt=[];class ft extends N{constructor(t){super(),this.layer=t,this.canvases_=[document.createElement("canvas"),document.createElement("canvas")],this.previousFrame_={canvasId:0,centerX:0,centerY:0,resolution:1/0}}static handles(t){return t instanceof gt}static create(t,e){return new ft(e)}prepareFrame(t){const e=this.layer,n=this.canvases_[this.previousFrame_.canvasId];let r=n;const o=ht(t,n);let i=this.previousFrame_.canvasId;const[a,s]=t.viewState.center,p=t.viewState.resolution;if(!o&&this.previousFrame_.resolution===p){yt[0]=this.previousFrame_.centerX,yt[1]=this.previousFrame_.centerY,dt(t.coordinateToPixelTransform,yt);const e=yt[0]-t.size[0]/2,o=yt[1]-t.size[1]/2;if(0!==e||0!==o){i=(i+1)%2,r=this.canvases_[i],ht(t,r);const a=r.getContext("2d");a.clearRect(0,0,r.width,r.height),a.drawImage(n,e,o)}}this.previousFrame_.canvasId=i,this.previousFrame_.centerX=a,this.previousFrame_.centerY=s,this.previousFrame_.resolution=p;const c=r.getContext("2d");return e.doRender_(t,c),t.animate=!0,!0}composeFrame(t,e,n){const r=this.canvases_[this.previousFrame_.canvasId],o=r.width,i=r.height;n.drawImage(r,0,0,o,i)}}class gt extends lt{constructor(t){super({}),this.doRender_=t.renderFunction}getSourceState(){return"ready"}}function mt(t,e){e[0]=Math.random()*function(t){return t[2]-t[0]}(t)+t[0],e[1]=Math.random()*function(t){return t[3]-t[1]}(t)+t[1]}var vt;class _t extends gt{constructor(t){super({renderFunction:(e,n)=>{var r;return t.uvBuffer1?r="dimgray":t.uvBuffer2&&(r="blue"),this.render(e,n,r)}}),this.fading=t.fading||.8,console.assert(t.ttl),this.ttl=t.ttl,console.assert(t.map),this.map=t.map,t.uvBuffer1?(console.assert(t.uvBuffer1),this.uvBuffer=t.uvBuffer1):t.uvBuffer2&&(console.assert(t.uvBuffer2),this.uvBuffer=t.uvBuffer2),console.assert(t.particles),this.particles=new Array(t.particles);for(let e=0;e<t.particles;++e)this.particles[e]={ttl:Math.random()*this.ttl,coordinates:[]};this.pixel=[],this.viewportWithDataExtent=[1/0,1/0,-1/0,-1/0],this.map.getRenderer().registerLayerRenderers([ft]),this.particleSize=1.5}render(t,e,n){const r=e.canvas;e.fillStyle=n,this.advanceParticles(t,e),e.globalAlpha=this.fading,e.globalCompositeOperation="destination-in",e.fillRect(0,0,r.width,r.height),e.globalAlpha=1,e.globalCompositeOperation="source-over"}advanceParticles(t,e){if(n=this.uvBuffer.extent,r=t.extent,o=this.viewportWithDataExtent,i=o||[1/0,1/0,-1/0,-1/0],function(t,e){return t[0]<=e[2]&&t[2]>=e[0]&&t[1]<=e[3]&&t[3]>=e[1]}(n,r)?(n[0]>r[0]?i[0]=n[0]:i[0]=r[0],n[1]>r[1]?i[1]=n[1]:i[1]=r[1],n[2]<r[2]?i[2]=n[2]:i[2]=r[2],n[3]<r[3]?i[3]=n[3]:i[3]=r[3]):function(t){!function(t,e,n,r,o){o&&(o[0]=t,o[1]=e,o[2]=n,o[3]=r)}(1/0,1/0,-1/0,-1/0,t)}(i),function(t){return t[2]<t[0]||t[3]<t[1]}(this.viewportWithDataExtent))return;var n,r,o,i;const a=this.pixel,s=t.viewState.resolution,p=t.pixelRatio;this.particles.forEach((n=>{0!==n.coordinates.length&&function(t,e){return function(t,e,n){return t[0]<=e&&e<=t[2]&&t[1]<=n&&n<=t[3]}(t,e[0],e[1])}(this.viewportWithDataExtent,n.coordinates)||mt(this.viewportWithDataExtent,n.coordinates),a[0]=n.coordinates[0],a[1]=n.coordinates[1],dt(t.coordinateToPixelTransform,a),e.fillRect(a[0]*p,a[1]*p,this.particleSize*p,this.particleSize*p),--n.ttl,n.ttl<0&&(mt(this.viewportWithDataExtent,n.coordinates),n.ttl=this.ttl);const[r,o]=this.uvBuffer.getUVSpeed(n.coordinates);n.coordinates[0]+=r*s,n.coordinates[1]+=o*s}))}}const wt=new Date,xt=[];for(let t=6;t>=0;t--){const e=new Date(wt);e.setDate(wt.getDate()-t);const n=e.toISOString().slice(0,10).replace(/-/g,"");xt.push(n)}var Et,St=[];function bt(t){Et=0,St=[];for(var e=xt.length-t,n=e=e<0?0:e;n<xt.length;n++){var r=xt[n];St.push(r)}}bt(1);var Ft,Lt,Pt,Rt,It,Mt=1,Ot=0;const Bt=[1/0,1/0,-1/0,-1/0];function Tt(){const e=document.getElementById("currentPositionLabel"),n=St[Et];e.textContent=`${n.substring(0,4)}-${n.substring(4,6)}-${n.substring(6,8)}`;const r=document.getElementById("progress"),o=(Et+1)/St.length*100;r.style.width=`${o}%`,Et++,layerWind&&map.removeLayer(layerWind),layerFlow&&map.removeLayer(layerFlow),layerWaveheight&&map.removeLayer(layerWaveheight),layerTempair&&map.removeLayer(layerTempair),layerTempwater&&map.removeLayer(layerTempwater);const i=St[Ot];fetch(`./getWeather.do?date=${i}`).then((t=>t.json())).then((e=>{const n=[],r=[],o=[],a=[];function s(t,e){return t.map((t=>t[e]))}const p=s(e,"lat"),c=s(e,"lon"),u=s(e,"ugrd10m"),l=s(e,"vgrd10m"),h=s(e,"u_current"),d=s(e,"v_current"),y=s(e,"fsdir"),f=s(e,"fshgt");for(let e=0;e<p.length;e++){const i=[parseFloat(c[e]),parseFloat(p[e])],s=u[e],v=l[e];var g,m;0==y[e]&&0==f[e]?(g="0.0",m="0.0"):(g=h[e],m=d[e]),n.push(s),r.push(v),o.push(g),a.push(m);const _=R(i);t(Bt,_)}const v=new Float32Array(n),_=new Float32Array(r),w=new Float32Array(o),x=new Float32Array(a),E=new M(v,_,161,101,Bt);window.uv1=E;const S=new M(w,x,161,101,Bt);window.uv2=S,layerWaveheight=new ol.layer.Vector({source:new ol.source.Vector({features:e.map((t=>{var e=parseInt(t.fsdir),n=parseFloat(t.fshgt);return new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([parseFloat(t.lon),parseFloat(t.lat)])),waveDeg:e,waveHeight:n})}))}),style:function(t){var e=(t.get("waveDeg")-90)*(Math.PI/180),n=Math.min(t.get("waveHeight")/2,1);return new ol.style.Style({image:new ol.style.Icon({src:"images/sk/icon_arrow_wave.png",anchor:[.5,.5],rotateWithView:!1,rotation:e,opacity:n})})}}),layerWind=new _t({map,uvBuffer1:E,particles:1e4,fading:.95,ttl:50}),layerFlow=new _t({map,uvBuffer2:S,particles:1e4,fading:.95,ttl:50}),layerTempair=new ol.layer.Heatmap({source:new ol.source.Vector({features:e.map((t=>{const e=(Math.min(Math.max(parseFloat(t.air_temp),-5),35)- -5)/40;return new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([parseFloat(t.lon),parseFloat(t.lat)])),weight:e})}))}),blur:15,radius:50,weight:function(t){return t.get("weight")},opacity:.5}),layerTempwater=new ol.layer.Heatmap({source:new ol.source.Vector({features:e.map((t=>{const e=(Math.min(Math.max(parseFloat(t.water_temp),-5),35)- -5)/40;return new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([parseFloat(t.lon),parseFloat(t.lat)])),weight:e})}))}),blur:15,radius:50,weight:function(t){return t.get("weight")},opacity:.5}),Ft&&map.addLayer(layerWind),Lt&&map.addLayer(layerFlow),Pt&&map.addLayer(layerWaveheight),Rt&&map.addLayer(layerTempair),It&&map.addLayer(layerTempwater);var b=new ol.Overlay({element:document.getElementById("popup")});map.addOverlay(b),map.on("click",(function(t){if(Ft||Lt||Pt||Rt||It){var e=t.coordinate,n=ol.proj.transform(e,"EPSG:3857","EPSG:4326");parseFloat(n[0])>=90&&parseFloat(n[0])<=170&&parseFloat(n[1])>=10&&parseFloat(n[1])<=60&&(n[0]=Math.round(10*n[0])/10,n[0]%1!=0&&(n[0]=Math.round(2*n[0])/2),n[1]=Math.round(10*n[1])/10,n[1]%1!=0&&(n[1]=Math.round(2*n[1])/2),fetch(`./getWeatherPopup.do?date=${encodeURIComponent(i)}&lat=${encodeURIComponent(n[1])}&lon=${encodeURIComponent(n[0])}`).then((t=>t.json())).then((t=>{var n="<p>위도 : "+convertToDMS(parseFloat(t[0].lat))+"</p><p>경도 : "+convertToDMS(parseFloat(t[0].lon))+"</p><p>풍향/풍속 U값 : "+parseFloat(t[0].ugrd10m)+"</p><p>풍향/풍속 V값 : "+parseFloat(t[0].vgrd10m)+"</p><p>유향/유속 U값 : "+parseFloat(t[0].u_current)+"</p><p>유향/유속 V값 : "+parseFloat(t[0].v_current)+"</p><p>파향 : "+parseFloat(t[0].fsdir)+"</p><p>파고 : "+parseFloat(t[0].fshgt)+"</p><p>기온 : "+parseFloat(t[0].air_temp)+"°C</p><p>수온 : "+parseFloat(t[0].water_temp)+"°C</p>";b.setPosition(e),document.getElementById("popup-content").innerHTML=n,isPopupOpen=!0,$("#popup").show()})))}else isPopupOpen=!1})),0==(Ot=(Ot+1)%St.length)?(cancelAnimationFrame(animationId),document.getElementById("animationContainer").style.display="none"):1!=Mt&&(animationId=setTimeout((()=>{Tt()}),1500))}))}Tt();var Ct=document.getElementById("daySelect");Ct.addEventListener("change",(function(){vt=Ct.value})),document.getElementById("stopAnimation").addEventListener("click",(function(){cancelAnimationFrame(animationId),Mt=1})),document.getElementById("startAnimation").addEventListener("click",(function(){(Ft||Lt||Pt||Rt||It)&&(document.getElementById("animationContainer").style.display="block",null==vt&&(vt=7),bt(vt),Mt=0,animationId=requestAnimationFrame(Tt))}));var At,Wt,kt,Gt=document.getElementById("checkWind"),jt=document.getElementById("checkFlow"),Ut=document.getElementById("checkWaveheight"),Dt=document.getElementById("checkTempair"),Kt=document.getElementById("checkTempwater");Gt.addEventListener("change",(function(){Gt.checked?(Ft=!0,map.addLayer(layerWind)):(Ft=!1,map.removeLayer(layerWind))})),jt.addEventListener("change",(function(){jt.checked?(Lt=!0,map.addLayer(layerFlow)):(Lt=!1,map.removeLayer(layerFlow))})),Ut.addEventListener("change",(function(){if(Ut.checked){Pt=!0,map.addLayer(layerWaveheight);const t=document.createElement("div");t.id="waveheight",t.style.position="absolute",1==Wt?2==kt?(t.style.top="570px",At=3):(t.style.top="300px",At=2):1==kt?2==Wt?(t.style.top="570px",At=3):(t.style.top="300px",At=2):(t.style.top="30px",At=1),t.style.right="0px",t.style.width="180px",t.style.height="204px",t.style.backgroundImage="url(../images/sk/legend_waveheight.png)",t.style.opacity="0.4",document.body.appendChild(t)}else{Pt=!1,map.removeLayer(layerWaveheight);const t=document.querySelector("#waveheight"),e=document.querySelector("#tempair"),n=document.querySelector("#tempwater");t.remove(),At=0,2==Wt?(e.style.top="30px",Wt=1):3==Wt&&(e.style.top="300px",Wt=2),2==kt?(n.style.top="30px",kt=1):3==kt&&(n.style.top="300px",kt=2)}})),Dt.addEventListener("change",(function(){if(Dt.checked){Rt=!0,map.addLayer(layerTempair);const t=document.createElement("div");t.id="tempair",t.style.position="absolute",1==At?2==kt?(t.style.top="570px",Wt=3):(t.style.top="300px",Wt=2):1==kt?(At=2)?(t.style.top="570px",Wt=3):(t.style.top="300px",Wt=2):(t.style.top="30px",Wt=1),t.style.right="0px",t.style.width="180px",t.style.height="204px",t.style.backgroundImage="url(../images/sk/legend_temp.png)",t.style.opacity="0.4",document.body.appendChild(t)}else{Rt=!1,map.removeLayer(layerTempair);const t=document.querySelector("#waveheight"),e=document.querySelector("#tempair"),n=document.querySelector("#tempwater");e.remove(),Wt=0,2==At?(t.style.top="30px",At=1):3==At&&(t.style.top="300px",At=2),2==kt?(n.style.top="30px",kt=1):3==kt&&(n.style.top="300px",kt=2)}})),Kt.addEventListener("change",(function(){if(Kt.checked){It=!0,map.addLayer(layerTempwater);const t=document.createElement("div");t.id="tempwater",t.style.position="absolute",1==At?2==Wt?(t.style.top="570px",kt=3):(t.style.top="300px",kt=2):1==Wt?2==At?(t.style.top="570px",kt=3):(t.style.top="300px",kt=2):(t.style.top="30px",kt=1),t.style.right="0px",t.style.width="180px",t.style.height="204px",t.style.backgroundImage="url(../images/sk/legend_temp.png)",t.style.opacity="0.4",document.body.appendChild(t)}else{It=!1,map.removeLayer(layerTempwater);const t=document.querySelector("#waveheight"),e=document.querySelector("#tempair");document.querySelector("#tempwater").remove(),kt=0,2==At?(t.style.top="30px",At=1):3==At&&(t.style.top="300px",At=2),2==Wt?(e.style.top="30px",Wt=1):3==Wt&&(e.style.top="300px",Wt=2)}}))})();