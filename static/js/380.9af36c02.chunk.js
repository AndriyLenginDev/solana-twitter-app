(self.webpackChunksolana_twitter_app=self.webpackChunksolana_twitter_app||[]).push([[380],{3141:function(t,r,n){"use strict";n.d(r,{T:function(){return o}});var e=n(5245),o=function(){return(0,e.I0)()}},8684:function(t,r,n){"use strict";n.d(r,{C:function(){return e}});var e=n(5245).v9},8720:function(t,r,n){"use strict";n.d(r,{u:function(){return o}});var e=n(9961),o=(0,n(3959).P1)((function(t){return t.tweets.tweets}),(function(t){return(0,e.Z)(t).sort((function(t,r){return r.timestamp.cmp(t.timestamp)}))}))},6722:function(t,r,n){"use strict";n.d(r,{A:function(){return a},a:function(){return i}});var e=n(7994),o=n.n(e),a=function(t){return{memcmp:{offset:8,bytes:t}}},i=function(t){return{memcmp:{offset:52,bytes:o().encode(Buffer.from(t))}}}},7655:function(t,r,n){"use strict";n.d(r,{Z:function(){return l}});n(3358);var e=n(5413),o=n(4203),a=n(725),i=n.n(a),s=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"...";if(t.length<=r)return t;var e=n.length,o=r-e,a=Math.ceil(o/2),i=Math.floor(o/2);return"".concat(t.substr(0,a)).concat(n).concat(t.substr(t.length-i))},c=n(2281),u=n(2885),f=function(t){var r,n,e,a=t.tweet;return(0,u.jsxs)("div",{className:"px-6 py-4",children:[(0,u.jsxs)("div",{className:"mb-2 flex justify-between",children:[(0,u.jsx)(o.OL,{className:"text-gray-700 font-semibold hover:underline",to:(e=a.author,"".concat(c.s2.USERS,"/").concat(e.toBase58())),children:s(a.author.toBase58())}),(0,u.jsx)("span",{className:"text-gray-400 text-sm",children:(n=a.timestamp,i()(1e3*n.toNumber()).fromNow())})]}),(0,u.jsx)("p",{children:a.content}),a.topic&&(0,u.jsxs)(o.OL,{className:"text-blue-500 mt-1 hover:underline",to:(r=a.topic,"".concat(c.s2.TOPICS,"/").concat(r)),children:["#",a.topic]})]})},l=function(t){var r=t.tweets,n=t.loading;return(0,u.jsxs)("div",{className:"divide-y",children:[r.map((function(t){return(0,u.jsx)(f,{tweet:t},t.key)})),n&&(0,u.jsx)(e.Z,{})]})}},918:function(t,r,n){"use strict";n.d(r,{Z:function(){return _}});var e,o=n(9677),a=n(9382),i=n(3358),s={btn:"Button_btn__Nl0XW","btn--primary":"Button_btn--primary__wQaO+",loader_color:"Button_loader_color__uKVIQ","btn--secondary":"Button_btn--secondary__-FVi7",btn__loader:"Button_btn__loader__M8Ir4",btn__txt:"Button_btn__txt__1DO3e"},c=n(2727),u=n(9051),f=n(5583),l=n(2885),d=["children","className","loading","variant"];!function(t){t.PRIMARY="primary",t.SECONDARY="secondary"}(e||(e={}));var _=function(t){var r=t.children,n=t.className,_=t.loading,m=t.variant,h=void 0===m?e.PRIMARY:m,p=(0,a.Z)(t,d),v=(0,i.useRef)(null),w=(0,i.useMemo)((function(){return s["btn--".concat(h)]}),[h]);return(0,i.useEffect)((function(){if(v.current){var t=v.current.offsetWidth;v.current.style.width="".concat(t,"px")}}),[]),(0,l.jsx)("button",(0,o.Z)((0,o.Z)({ref:v},p),{},{className:[s.btn,w,n].join(" "),children:(0,l.jsx)(u.Z,{mode:"out-in",children:(0,l.jsx)(f.Z,{addEndListener:function(t,r){t.addEventListener("transitionend",r,!1)},classNames:"fade",unmountOnExit:!0,children:_?(0,l.jsx)("div",{className:s.btn__loader,children:(0,l.jsx)(c.Z,{className:s.loader_color})}):(0,l.jsx)("div",{className:s.btn__txt,children:r})},_?"loader":"btn")})}))}},8599:function(t,r,n){"use strict";n.d(r,{Z:function(){return c}});var e=n(9677),o=n(9382),a=(n(3358),{input:"Input_input__+UP2D"}),i=n(2885),s=["className"],c=function(t){var r=t.className,n=(0,o.Z)(t,s);return(0,i.jsx)("input",(0,e.Z)((0,e.Z)({},n),{},{className:[a.input,r].join(" ")}))}},3751:function(t,r,n){"use strict";var e=n(9677),o=(n(3358),n(2885));r.Z=function(t){return(0,o.jsx)("svg",(0,e.Z)((0,e.Z)({xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"1em",height:"1em",viewBox:"0 0 24 24"},t),{},{children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 18H15V15H13.3C12.2 17.4 9.7 19 7 19C3.1 19 0 15.9 0 12S3.1 5 7 5C9.7 5 12.2 6.6 13.3 9H24V15H21V18M17 16H19V13H22V11H11.9L11.7 10.3C11 8.3 9.1 7 7 7C4.2 7 2 9.2 2 12S4.2 17 7 17C9.1 17 11 15.7 11.7 13.7L11.9 13H17V16M7 15C5.3 15 4 13.7 4 12S5.3 9 7 9 10 10.3 10 12 8.7 15 7 15M7 11C6.4 11 6 11.4 6 12S6.4 13 7 13 8 12.6 8 12 7.6 11 7 11Z"})}))}},3380:function(t,r,n){"use strict";n.r(r),n.d(r,{default:function(){return y}});var e=n(3358),o=n(3680),a=n(8599),i=n(918),s=n(3751),c={form__wrapper:"UsersForm_form__wrapper__+DdGz",key__wrapper:"UsersForm_key__wrapper__O-cQm",key__icon:"UsersForm_key__icon__el3a0",form__input:"UsersForm_form__input__5U-uD",form__btn:"UsersForm_form__btn__tMKt5"},u=n(4430),f=n(3141),l=n(8684),d=n(5874),_=n(2281),m=n(6722),h=n(2885),p=function(t){var r=t.className,n=t.publicKeyParam,p=(0,u.s0)(),v=(0,f.T)(),w=(0,l.C)((function(t){return t.tweets.loading})),y=(0,e.useState)(n||""),x=(0,o.Z)(y,2),b=x[0],g=x[1];(0,e.useEffect)((function(){g(n||"")}),[n]);var j=(0,e.useMemo)((function(){return!b.length||n===b}),[b,n]);return(0,h.jsxs)("form",{className:[c.form__wrapper,r].join(" "),children:[(0,h.jsx)("div",{className:c.key__wrapper,children:(0,h.jsx)(s.Z,{className:c.key__icon})}),(0,h.jsx)(a.Z,{className:c.form__input,placeholder:"Public key",value:b,onChange:function(t){g(t.target.value)}}),(0,h.jsx)(i.Z,{disabled:j,className:c.form__btn,loading:w,onClick:function(t){t.preventDefault(),w||(v(d.A3.getTweets([(0,m.A)(b)])),p("".concat(_.s2.USERS,"/").concat(b)))},children:"Search"})]})},v=n(7655),w=n(8720),y=function(){var t=(0,f.T)(),r=(0,l.C)((function(t){return t.tweets.loading})),n=(0,l.C)(w.u),o=(0,u.UO)().publicKey;return(0,e.useEffect)((function(){return o&&t(d.A3.getTweets([(0,m.A)(o)])),function(){t(d.A3.setTweets([]))}}),[t,o]),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p,{publicKeyParam:o}),(0,h.jsx)(v.Z,{tweets:n,loading:r})]})}},8306:function(t){"use strict";t.exports=function(t){if(t.length>=255)throw new TypeError("Alphabet too long");for(var r=new Uint8Array(256),n=0;n<r.length;n++)r[n]=255;for(var e=0;e<t.length;e++){var o=t.charAt(e),a=o.charCodeAt(0);if(255!==r[a])throw new TypeError(o+" is ambiguous");r[a]=e}var i=t.length,s=t.charAt(0),c=Math.log(i)/Math.log(256),u=Math.log(256)/Math.log(i);function f(t){if("string"!==typeof t)throw new TypeError("Expected String");if(0===t.length)return new Uint8Array;for(var n=0,e=0,o=0;t[n]===s;)e++,n++;for(var a=(t.length-n)*c+1>>>0,u=new Uint8Array(a);t[n];){var f=r[t.charCodeAt(n)];if(255===f)return;for(var l=0,d=a-1;(0!==f||l<o)&&-1!==d;d--,l++)f+=i*u[d]>>>0,u[d]=f%256>>>0,f=f/256>>>0;if(0!==f)throw new Error("Non-zero carry");o=l,n++}for(var _=a-o;_!==a&&0===u[_];)_++;for(var m=new Uint8Array(e+(a-_)),h=e;_!==a;)m[h++]=u[_++];return m}return{encode:function(r){if(r instanceof Uint8Array||(ArrayBuffer.isView(r)?r=new Uint8Array(r.buffer,r.byteOffset,r.byteLength):Array.isArray(r)&&(r=Uint8Array.from(r))),!(r instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(0===r.length)return"";for(var n=0,e=0,o=0,a=r.length;o!==a&&0===r[o];)o++,n++;for(var c=(a-o)*u+1>>>0,f=new Uint8Array(c);o!==a;){for(var l=r[o],d=0,_=c-1;(0!==l||d<e)&&-1!==_;_--,d++)l+=256*f[_]>>>0,f[_]=l%i>>>0,l=l/i>>>0;if(0!==l)throw new Error("Non-zero carry");e=d,o++}for(var m=c-e;m!==c&&0===f[m];)m++;for(var h=s.repeat(n);m<c;++m)h+=t.charAt(f[m]);return h},decodeUnsafe:f,decode:function(t){var r=f(t);if(r)return r;throw new Error("Non-base"+i+" character")}}}},7994:function(t,r,n){var e=n(8306);t.exports=e("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")}}]);
//# sourceMappingURL=380.9af36c02.chunk.js.map