(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fcc9e94"],{1371:function(t,e,n){"use strict";var r=n("262d"),i=n.n(r);i.a},2332:function(t,e,n){"use strict";var r=n("77a3"),i=n.n(r);i.a},"262d":function(t,e,n){},5362:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"musicList"},[t.list.length>0?[n("div",{staticClass:"list-item list-header"},[n("span",{staticClass:"list-name"},[t._v("歌曲")]),n("span",{staticClass:"list-artist"},[t._v("歌手")]),1===t.listType?n("span",{staticClass:"list-time"},[t._v("时长")]):n("span",{staticClass:"list-album"},[t._v("专辑")])]),n("div",{ref:"listContent",staticClass:"list-content",on:{scroll:function(e){return t.listScroll(e)}}},[t._l(t.list,(function(e,r){return n("div",{key:e.id,staticClass:"list-item",class:{on:t.playing&&t.currentMusic.id===e.id},on:{dblclick:function(n){return t.selectItem(e,r,n)}}},[n("span",{staticClass:"list-num",domProps:{textContent:t._s(r+1)}}),n("div",{staticClass:"list-name"},[n("span",[t._v(t._s(e.name))]),n("div",{staticClass:"list-menu"},[n("mm-icon",{staticClass:"hover",attrs:{type:t.getPlayIconType(e),size:40},on:{click:function(n){return n.stopPropagation(),t.selectItem(e,r)}}})],1)]),n("span",{staticClass:"list-artist"},[t._v(t._s(e.singer))]),1===t.listType?n("span",{staticClass:"list-time"},[t._v(" "+t._s(t._f("format")(e.duration%3600))+" "),n("mm-icon",{staticClass:"hover list-menu-icon-del",attrs:{type:"delete-mini",size:40},on:{click:function(e){return e.stopPropagation(),t.deleteItem(r)}}})],1):n("span",{staticClass:"list-album"},[t._v(t._s(e.album))])])})),t._t("listBtn")],2)]:n("mm-no-result",{attrs:{title:"弄啥呢，怎么啥也没有！！！"}})],2)},i=[],a=(n("a9e3"),n("5530")),o=n("2f62"),s=n("ca00"),c=n("5af1"),l={name:"MusicList",components:{MmNoResult:c["a"]},filters:{format:s["b"]},props:{list:{type:Array,default:function(){return[]}},listType:{type:Number,default:0}},data:function(){return{lockUp:!0}},computed:Object(a["a"])({},Object(o["c"])(["playing","currentMusic"])),watch:{list:function(t,e){2===this.listType&&(t.length!==e.length||t[t.length-1].id!==e[e.length-1].id)&&(this.lockUp=!1)}},activated:function(){this.scrollTop&&this.$refs.listContent&&(this.$refs.listContent.scrollTop=this.scrollTop)},methods:Object(a["a"])({listScroll:function(t){var e=t.target.scrollTop;if(this.scrollTop=e,2===this.listType&&!this.lockUp){var n=t.target,r=n.scrollHeight,i=n.offsetHeight;e+i>=r-50&&(this.lockUp=!0,this.$emit("pullUp"))}},scrollTo:function(){this.$refs.listContent.scrollTop=0},selectItem:function(t,e,n){n&&/list-menu-icon-del/.test(n.target.className)||(this.currentMusic.id&&t.id===this.currentMusic.id?this.setPlaying(!this.playing):this.$emit("select",t,e))},getPlayIconType:function(t){var e=t.id,n=this.playing,r=this.currentMusic.id;return n&&r===e?"pause-mini":"play-mini"},deleteItem:function(t){this.$emit("del",t)}},Object(o["d"])({setPlaying:"SET_PLAYING"}))},u=l,h=(n("7786"),n("2877")),f=Object(h["a"])(u,r,i,!1,null,"707b2810",null);e["a"]=f.exports},"5af1":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mm-no-result"},[n("p",{staticClass:"mm-no-result-text"},[t._v(t._s(t.title))])])},i=[],a={name:"MmNoResult",props:{title:{type:String,default:""}}},o=a,s=(n("9673"),n("2877")),c=Object(s["a"])(o,r,i,!1,null,null,null);e["a"]=c.exports},"650b":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search"},[n("mm-loading",{model:{value:t.mmLoadShow,callback:function(e){t.mmLoadShow=e},expression:"mmLoadShow"}}),n("div",{staticClass:"search-head"},[t._l(t.Artists,(function(e,r){return n("span",{key:r,on:{click:function(n){return t.clickHot(e.first)}}},[t._v(" "+t._s(e.first)+" ")])})),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchValue,expression:"searchValue",modifiers:{trim:!0}}],staticClass:"search-input",attrs:{type:"text",placeholder:"音乐/歌手"},domProps:{value:t.searchValue},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter(e)},input:function(e){e.target.composing||(t.searchValue=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})],2),n("music-list",{ref:"musicList",attrs:{list:t.list,"list-type":2},on:{select:t.selectItem,pullUp:t.pullUpLoad}})],1)},i=[];n("99af"),n("fb6a"),n("ac1f"),n("5319"),n("96cf"),n("d3b7"),n("e6cf");function a(t,e,n,r,i,a,o){try{var s=t[a](o),c=s.value}catch(l){return void n(l)}s.done?e(c):Promise.resolve(c).then(r,i)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function s(t){a(o,r,i,s,c,"next",t)}function c(t){a(o,r,i,s,c,"throw",t)}s(void 0)}))}}var s=n("2909"),c=n("5530"),l=n("2f62"),u=n("365c"),h=n("eb4d"),f=n("f904"),p=n("5362"),d=n("ac0d"),m=n("ca00"),v={name:"Search",components:{MmLoading:f["a"],MusicList:p["a"]},mixins:[d["a"]],data:function(){return{searchValue:"",Artists:[],list:[],page:0,lockUp:!0}},computed:Object(c["a"])({},Object(l["c"])(["playing","currentMusic"])),watch:{list:function(t,e){(t.length!==e.length||t[t.length-1].id!==e[e.length-1].id)&&(this.lockUp=!1)}},created:function(){var t=this;Object(u["i"])().then((function(e){200===e.data.code&&(t.Artists=e.data.result.hots.slice(0,5),t.mmLoadShow=!1)}))},methods:Object(c["a"])(Object(c["a"])({clickHot:function(t){this.searchValue=t,this.onEnter()},onEnter:function(){var t=this;""!==this.searchValue.replace(/(^\s+)|(\s+$)/g,"")?(this.mmLoadShow=!0,this.page=0,this.list.length>0&&this.$refs.musicList.scrollTo(),Object(u["h"])(this.searchValue).then((function(e){200===e.data.code&&(t.list=Object(h["b"])(e.data.result.songs),t._hideLoad())}))):this.$mmToast("搜索内容不能为空！")},pullUpLoad:function(){var t=this;this.page+=1,Object(u["h"])(this.searchValue,this.page).then((function(e){if(200===e.data.code){if(!e.data.result.songs)return void t.$mmToast("没有更多歌曲啦！");t.list=[].concat(Object(s["a"])(t.list),Object(s["a"])(Object(h["b"])(e.data.result.songs)))}}))},selectItem:function(t){var e=this;return o(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e._getMusicDetail(t.id);case 2:r=n.sent,t.image=Object(m["f"])(r),e.selectAddPlay(t);case 5:case"end":return n.stop()}}),n)})))()},_getMusicDetail:function(t){return Object(u["c"])(t).then((function(t){if(200===t.data.code)return t.data.songs[0].al.picUrl}))}},Object(l["d"])({setPlaying:"SET_PLAYING"})),Object(l["b"])(["selectAddPlay"]))},y=v,g=(n("1371"),n("2877")),w=Object(g["a"])(y,r,i,!1,null,"7a93b3c6",null);e["default"]=w.exports},7786:function(t,e,n){"use strict";var r=n("7915"),i=n.n(r);i.a},"77a3":function(t,e,n){},7915:function(t,e,n){},9673:function(t,e,n){"use strict";var r=n("f045"),i=n.n(r);i.a},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n,r){var i=e&&e.prototype instanceof m?e:m,a=Object.create(i.prototype),o=new E(r||[]);return a._invoke=O(t,n,o),a}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=c;var u="suspendedStart",h="suspendedYield",f="executing",p="completed",d={};function m(){}function v(){}function y(){}var g={};g[a]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(T([])));b&&b!==n&&r.call(b,a)&&(g=b);var _=y.prototype=m.prototype=Object.create(g);function L(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function x(t,e){function n(i,a,o,s){var c=l(t[i],t,a);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,o,s)}),(function(t){n("throw",t,o,s)})):e.resolve(h).then((function(t){u.value=t,o(u)}),(function(t){return n("throw",t,o,s)}))}s(c.arg)}var i;function a(t,r){function a(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(a,a):a()}this._invoke=a}function O(t,e,n){var r=u;return function(i,a){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw a;return P()}n.method=i,n.arg=a;while(1){var o=n.delegate;if(o){var s=j(o,n);if(s){if(s===d)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===u)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=l(t,e,n);if("normal"===c.type){if(r=n.done?p:h,c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}function j(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,j(t,n),"throw"===n.method))return d;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var i=l(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,d;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,d):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,d)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function T(t){if(t){var n=t[a];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:P}}function P(){return{value:e,done:!0}}return v.prototype=_.constructor=y,y.constructor=v,y[s]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},L(x.prototype),x.prototype[o]=function(){return this},t.AsyncIterator=x,t.async=function(e,n,r,i,a){void 0===a&&(a=Promise);var o=new x(c(e,n,r,i),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},L(_),_[s]="Generator",_[a]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=T,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),l=r.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;k(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},ac0d:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n("5530"),i=n("2f62"),a=(Object(r["a"])({},Object(i["c"])(["playing","currentMusic"])),Object(r["a"])(Object(r["a"])({selectItem:function(t,e){t.id===this.currentMusic.id&&this.playing?this.setPlaying(!1):this.selectPlay({list:this.list,index:e})}},Object(i["d"])({setPlaying:"SET_PLAYING"})),Object(i["b"])(["selectPlay"])),{data:function(){return{mmLoadShow:!0}},methods:{_hideLoad:function(){var t,e=this;clearTimeout(t),t=setTimeout((function(){e.mmLoadShow=!1}),200)}}})},f045:function(t,e,n){},f904:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],staticClass:"mm-loading",style:{backgroundColor:t.loadingBgColor}},[n("div",{staticClass:"mm-loading-content"},[n("svg",{staticClass:"circular",attrs:{viewBox:"25 25 50 50"}},[n("circle",{staticClass:"path",attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])])])},i=[],a={name:"MmLoading",props:{value:{type:Boolean,default:!0},loadingBgColor:{type:String,default:""}}},o=a,s=(n("2332"),n("2877")),c=Object(s["a"])(o,r,i,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-3fcc9e94.710ef6cf.js.map