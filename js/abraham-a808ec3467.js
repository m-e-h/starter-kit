"use strict";!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,i=(t.document||t.ownerDocument).querySelectorAll(e),n=0;i[n]&&i[n]!==t;)++n;return Boolean(i[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);var jsFocusRing=function(e){var t={text:1,search:1,url:1,tel:1,email:1,password:1,number:1,date:1,month:1,week:1,time:1,datetime:1,"datetime-local":1},i=void 0;(e=e||window).addEventListener("blur",function(e){e.target instanceof Element&&(e.target.removeAttribute("js-focus"),e.target.removeAttribute("js-focus-ring"))},!0),e.addEventListener("focus",function(n){var s=document.activeElement;s instanceof Element&&"BODY"!==s.tagName&&(s.setAttribute("js-focus",""),(i||e===n.target||"INPUT"===s.tagName&&t[s.type]&&!s.readonly||"TEXTAREA"===s.tagName&&!s.readonly||"true"===s.contentEditable)&&s.setAttribute("js-focus-ring",""))},!0),e.addEventListener("keydown",function(){i=clearTimeout(i)||setTimeout(function(){i=0},100)},!0)}(),onClickOrTap=function(e,t){if(t&&"function"==typeof t){var i,n,s,a,o;e.addEventListener("touchstart",function(e){i=!0,n=e.changedTouches[0].pageX,s=e.changedTouches[0].pageY},!1),e.addEventListener("touchend",function(e){a=e.changedTouches[0].pageX-n,o=e.changedTouches[0].pageY-s,Math.abs(a)>=7||Math.abs(o)>=10||t(e)},!1),e.addEventListener("click",function(e){i?i=!1:t(e)},!1)}},_createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Detabinator=function(){function e(t){if(_classCallCheck(this,e),!t)throw new Error("Missing required argument. new Detabinator needs an element reference");this._inert=!1,this._focusableElementsString="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]",this._focusableElements=Array.from(t.querySelectorAll(this._focusableElementsString))}return _createClass(e,[{key:"inert",get:function(){return this._inert},set:function(e){this._inert!==e&&(this._inert=e,this._focusableElements.forEach(function(t){if(e)t.hasAttribute("tabindex")&&(t.__savedTabindex=t.tabIndex),t.setAttribute("tabindex",-1);else{if(0===t.__savedTabindex||t.__savedTabindex)return t.setAttribute("tabindex",t.__savedTabindex);t.removeAttribute("tabindex")}}))}}]),e}();!function(){var e,t,i,n,s,a;if((e=document.getElementById("menu-primary"))&&void 0!==(t=e.getElementsByTagName("button")[0]))if(void 0!==(i=e.getElementsByTagName("ul")[0])){for(i.setAttribute("aria-expanded","false"),-1===i.className.indexOf("nav-menu")&&(i.className+=" nav-menu"),t.onclick=function(){-1!==e.className.indexOf("toggled")?(e.className=e.className.replace(" toggled",""),t.setAttribute("aria-expanded","false"),i.setAttribute("aria-expanded","false")):(e.className+=" toggled",t.setAttribute("aria-expanded","true"),i.setAttribute("aria-expanded","true"))},s=0,a=(n=i.getElementsByTagName("a")).length;s<a;s++)n[s].addEventListener("focus",o,!0),n[s].addEventListener("blur",o,!0);!function(t){var i,n,s=e.querySelectorAll(".menu-item-has-children > a, .page_item_has_children > a");if("ontouchstart"in window)for(i=function(e){var t,i=this.parentNode;if(i.classList.contains("focus"))i.classList.remove("focus");else{for(e.preventDefault(),t=0;t<i.parentNode.children.length;++t)i!==i.parentNode.children[t]&&i.parentNode.children[t].classList.remove("focus");i.classList.add("focus")}},n=0;n<s.length;++n)s[n].addEventListener("touchstart",i,!1)}()}else t.style.display="none";function o(){for(var e=this;-1===e.className.indexOf("nav-menu");)"li"===e.tagName.toLowerCase()&&(-1!==e.className.indexOf("focus")?e.className=e.className.replace(" focus",""):e.className+=" focus"),e=e.parentElement}}();_createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var SideNav=function(){function e(){_classCallCheck(this,e),this.body=document.body,this.showButtonEl=document.querySelector(".js-menu-show"),this.hideButtonEl=document.querySelector(".js-menu-hide"),this.sideNavEl=document.querySelector(".js-side-nav"),this.sideNavContainerEl=document.querySelector(".js-side-nav-container"),this.detabinator=new Detabinator(this.sideNavContainerEl),this.detabinator.inert=!0,this.showSideNav=this.showSideNav.bind(this),this.hideSideNav=this.hideSideNav.bind(this),this.blockClicks=this.blockClicks.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onTransitionEnd=this.onTransitionEnd.bind(this),this.update=this.update.bind(this),this.startX=0,this.currentX=0,this.touchingSideNav=!1,this.supportsPassive=void 0,this.addEventListeners()}return _createClass(e,[{key:"applyPassive",value:function(){if(void 0!==this.supportsPassive)return!!this.supportsPassive&&{passive:!0};var e=!1;try{document.addEventListener("test",null,{get passive(){e=!0}})}catch(e){}return this.supportsPassive=e,this.applyPassive()}},{key:"addEventListeners",value:function(){this.showButtonEl.addEventListener("click",this.showSideNav),this.hideButtonEl.addEventListener("click",this.hideSideNav),this.sideNavEl.addEventListener("click",this.hideSideNav),this.sideNavContainerEl.addEventListener("click",this.blockClicks),this.sideNavEl.addEventListener("touchstart",this.onTouchStart,this.applyPassive()),this.sideNavEl.addEventListener("touchmove",this.onTouchMove,this.applyPassive()),this.sideNavEl.addEventListener("touchend",this.onTouchEnd)}},{key:"onTouchStart",value:function(e){this.sideNavEl.classList.contains("side-nav--visible")&&(this.startX=e.touches[0].pageX,this.currentX=this.startX,this.touchingSideNav=!0,requestAnimationFrame(this.update))}},{key:"onTouchMove",value:function(e){this.touchingSideNav&&(this.currentX=e.touches[0].pageX)}},{key:"onTouchEnd",value:function(e){if(this.touchingSideNav){this.touchingSideNav=!1;var t=Math.min(0,this.currentX-this.startX);this.sideNavContainerEl.style.transform="",t<-100&&this.hideSideNav()}}},{key:"update",value:function(){if(this.touchingSideNav){requestAnimationFrame(this.update);var e=Math.min(0,this.currentX-this.startX);this.sideNavContainerEl.style.transform="translateX("+e+"px)"}}},{key:"blockClicks",value:function(e){e.stopPropagation()}},{key:"onTransitionEnd",value:function(e){this.sideNavEl.classList.remove("side-nav--animatable"),this.sideNavEl.removeEventListener("transitionend",this.onTransitionEnd)}},{key:"showSideNav",value:function(){this.body.classList.add("u-overflow-hidden"),this.sideNavEl.classList.add("side-nav--animatable"),this.sideNavEl.classList.add("side-nav--visible"),this.detabinator.inert=!1,this.sideNavEl.addEventListener("transitionend",this.onTransitionEnd)}},{key:"hideSideNav",value:function(){this.body.classList.remove("u-overflow-hidden"),this.sideNavEl.classList.add("side-nav--animatable"),this.sideNavEl.classList.remove("side-nav--visible"),this.detabinator.inert=!0,this.sideNavEl.addEventListener("transitionend",this.onTransitionEnd)}}]),e}();document.body.classList.contains("has-oc-sidebar")&&new SideNav;