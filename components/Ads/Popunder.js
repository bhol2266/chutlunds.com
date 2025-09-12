


// "use client";

// import Script from "next/script";

// function PopunderAds() {
//     let currentHost = "";

//     if (typeof window !== "undefined") {
//         currentHost = window.location.host;
//     }

//     // Check if the app is running on localhost
//     const isLocalhost = currentHost.includes("localhost");

//     return (
//         <div className="flex items-center justify-center">
//             {!isLocalhost && (
//                 <>
//                     {/* Inline obfuscated script */}
//                     <Script id="custom-inline-script" strategy="beforeInteractive">
//                         {`!function(){"use strict";for(var t=window,e=t.Math,n=t.Error,r=t.RegExp,s=t.Promise,o=t.document,i=t.Uint8Array,c=t.localStorage,l=t.Date.now,u=e.floor,a=e.random,h=t.JSON.stringify,d=t.String.fromCharCode,p='cmeccZYhfZb^W^TR^]S_UYZJOLRTEGGESBPFLO;;76P;;CAAE?H33.9--+2(02%*$"*~|$}{$ &}wqt|nookook}neympgeol_fjZYk[cUTUUU_WUUQQ\`YXSRGFEMLKFDUE=<MAIN:=KJ78G6A5743>A94++555$\\'-~& |-},$w({!~>=LO\`_NKp5+mg?0em;%W\\\\'s($/#!P|yu.{P[XxLTHHIJUUURHLDHJ=:D*JDF4968CB=?dXWdN")NKI3H]I20!FP}w"(xvr%p;hiLKW[M&6230672+pp'.replace(/((\\x40){2})/g,"$2").split("").map(((t,e)=>{const n=t.charCodeAt(0)-32;return n>=0&&n<95?d(32+(n+e)%95):t})).join(""),f=[0,7,14,20,26,32,38,42,45,50,57,59,65,71,77,90,94,100,102,103,109,114,115,117,119,121,124,127,131,135,140,146,153,161,161,167,175,177,178,183,184,185,186,189,192,208,213,220,226,238,246,256,257,262,267,272,273,274,280,290],g=0;g<f.length-1;g++)f[g]=p.substring(f[g],f[g+1]);var m=[f[0],f[1],f[2],f[3],f[4],f[5]];m.push(m[0]+f[6]);const v=f[7]+m[4],w={2:v+f[8],15:v+f[8],9:v+m[2],16:v+m[2],10:v+m[3],17:v+m[3]},b=f[9]+m[4],y={2:m[1],15:m[1],9:m[2],16:m[2],10:m[3],17:m[3],5:f[10],7:f[10]},A={15:f[11],16:f[12],17:f[13]},x=f[14],E=x+f[15],U=x+f[16],$=f[17]+m[0]+f[18],j=f[19],D=j+f[20],I=j+(m[0]+f[21]),N=j+m[6],S=j+(m[6]+f[22]),k=[f[23],f[24],f[25],f[26],f[27],f[28],f[29],f[30],f[31],f[32]],C=36e5,O=(t,e)=>u(a()*(e-t+1))+t;function _(t,e,n){return function(t,e){try{return f[34],t()}catch(t){if(e)return e(t)}}(t,typeof handleException===f[35]?t=>{null===handleException||void 0===handleException||handleException(t)}:e)}const W=t=>{const[e]=t.split(f[36]);let[s,o,i]=((t,e)=>{let[n,r,...s]=t.split(e);return r=[r,...s].join(e),[n,r,!!s.length]})(t,f[37]);i&&_((()=>{throw new n(f[38])}));const c=new r(\`^(\${e})?//\`,f[39]),[l,...u]=s.replace(c,f[33]).split(f[40]);return{protocol:e,origin:s,domain:l,path:u.join(f[40]),search:o}},H=()=>\`\${k[O(0,k.length-1)]}=\${!O(0,1)?(t=>{let e=f[33];for(let n=0;n<t;n++)e+=d(O(97,122));return e})(O(2,6)):O(1,999999)}\`,J=(t,e,n)=>{const r=((t,e)=>(e+t).split(f[33]).reduce(((t,e)=>31*t+e.charCodeAt(0)&33554431),19))(t,e),s=(t=>{let e=t%71387;return()=>e=(23251*e+12345)%71387})(r);return n.split(f[33]).map((t=>((t,e)=>{const n=t.charCodeAt(0),r=n<97||n>122?n:97+(n-97+e())%26,s=d(r);return s===f[39]?s+f[39]:s})(t,s))).join(f[33])},L=(t,e)=>{let{domain:n,search:r,origin:s}=W(t),o=r?r.split(f[41]):[];const i=o.length>4?[0,2]:[5,9];o.push(...((t,e)=>{const n=[],r=O(t,e);for(let t=0;t<r;t++)n.push(H());return n})(...i)),o=(t=>{const e=[...t];let n=e.length;for(;0!==n;){const t=u(a()*n);n--,[e[n],e[t]]=[e[t],e[n]]}return e})(o);const[c,l]=((t,e)=>{const n=[],r=[];return t.forEach((t=>{t.indexOf(e)>-1?r.push(t):n.push(t)})),[n,r]})(o,x);o=c.filter((t=>!(t===\`id=\${e}\`)));const h=J(e,n,o.join(f[41])).split(f[41]);return l.length>0&&h.push(...l),h.splice(O(0,o.length),0,f[42]+e),s.replace(n,n+f[43])+f[37]+h.join(f[41])};function F(t,e){const n=function(t){const e=new r(U+f[44]).exec(t.location.href);return e&&e[1]?e[1]:null}(t);return n?e.replace(f[45],\`-\${n}/\`):e}const P=f[46];function T(){if(((e,n=t)=>{const[r]=((t,e)=>{const n=e[t];try{if(!n)return[!1,n];const t="__storage_test__";return n.setItem(t,t),n.getItem(t),n.removeItem(t),[!0]}catch(t){return[!1,n,t]}})(e,n);return r})(f[48]))try{const e=c.getItem(P);return[e?t.JSON.parse(e):null,!1]}catch(t){return[null,!0]}return[null,!0]}function K(e){if(!e)return null;const n={};return t.Object.keys(e).forEach((r=>{const s=e[r];(function(e){const n=null==e?void 0:e[0],r=null==e?void 0:e[1];return typeof n===f[47]&&t.Number.isFinite(r)&&r>l()})(s)&&(n[r]=s)})),n}function R(t,e,n){let r=(/https?:\\/\\//.test(t)?f[33]:f[49])+t;return e&&(r+=f[40]+e),n&&(r+=f[37]+n),r}const B=(()=>{var t;const[e,n]=T();if(!n){const n=null!==(t=K(e))&&void 0!==t?t:{};c.setItem(P,h(n))}return{get:t=>{const[e]=T();return null==e?void 0:e[t]},set:(t,e,r)=>{const s=[e,l()+1e3*r],[o]=T(),i=null!=o?o:{};i[t]=s,n||c.setItem(P,h(i))}}})(),G=(M=B,(t,e)=>{const{domain:n,path:r,search:s}=W(t),o=M.get(n);if(o)return[R(o[0],r,s),!1];if((null==e?void 0:e.replaceDomain)&&(null==e?void 0:e.ttl)){const{domain:t}=W(null==e?void 0:e.replaceDomain);return t!==n&&M.set(n,e.replaceDomain,e.ttl),[R(e.replaceDomain,r,s),!0]}return[t,!1]});var M;const Y=t=>O(t-C,t+C),Z=e=>{const n=new r(E+f[50]).exec(e.location.href),s=n&&n[1]&&+n[1];return s&&!t.isNaN(s)?(null==n?void 0:n[2])?Y(s):s:Y(l())},X=[1,3,6,5,8,9,10,11,12,13,14,18];class q{constructor(e,n,r){this.b6d=e,this.ver=n,this.fbv=r,this.gd=t=>this.wu.then((e=>e.url(this.gfco(t)))),this.b6ab=e=>i.from(t.atob(e),(t=>t.charCodeAt(0))),this.sast=t=>0!=+t,this.el=o.currentScript,this.wu=this.iwa()}ins(){t[this.gcdk()]={};const e=X.map((e=>this.gd(e).then((n=>{const r=n?F(t,n):void 0;return t[this.gcdk()][e]=r,r}))));return s.all(e).then((e=>(t[this.gcuk()]=e,!0)))}gfco(e){const n=t.navigator?t.navigator.userAgent:f[33],r=t.location.hostname||f[33];return[t.innerHeight,t.innerWidth,t.sessionStorage?1:0,Z(t),0,e,r.slice(0,100),n.slice(0,15)].join(f[51])}iwa(){const e=t.WebAssembly&&t.WebAssembly.instantiate;return e?e(this.b6ab(this.b6d),{}).then((({instance:{exports:e}})=>{const n=e.memory,r=e.url,s=new t.TextEncoder,o=new t.TextDecoder(f[52]);return{url:t=>{const e=s.encode(t),c=new i(n.buffer,0,e.length);c.set(e);const l=c.byteOffset+e.length,u=r(c,e.length,l),a=new i(n.buffer,l,u);return o.decode(a)}}})):s.resolve(void 0)}cst(){const e=o.createElement(m[5]);return t.Object.assign(e.dataset,{cfasync:f[53]},this.el?this.el.dataset:{}),e.async=!0,e}}class Q extends q{constructor(e,n,r){super(e,n,r),this.gcuk=()=>D,this.gcdk=()=>I,this.gfu=e=>F(t,e),t[$]=this.ins(),t[S]=L}in(e){!this.sast(e)||t[b+y[e]]||t[w[e]]||this.ast(e)}ast(e){this.gd(e).then((r=>{var s;t[N+y[e]]=this.ver;const i=this.cst(),c=A[e],[l]=G(this.gfu(r));let u=l;if(c){const t=f[54]+c,r=o.querySelector(m[5]+f[55]+t+f[56]);if(!r)throw new n(f[57]+e);const l=(null!==(s=r.getAttribute(t))&&void 0!==s?s:f[33]).trim();r.removeAttribute(t),i.setAttribute(t,l)}else{const[t]=u.replace(/^https?:\\/\\//,f[33]).split(f[40]);u=u.replace(t,t+f[43])}i.src=u,o.head.appendChild(i)}))}}!function(e,n,r,s){const o=new Q("AGFzbQEAAAABHAVgAAF/YAN/f38Bf2ADf39/AX5gAX8AYAF/AX8DCQgAAQIBAAMEAAQFAXABAQEFBgEBgAKAAgYJAX8BQcCIwAILB2cHBm1lbW9yeQIAA3VybAADGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABBfX2Vycm5vX2xvY2F0aW9uAAcJc3RhY2tTYXZlAAQMc3RhY2tSZXN0b3JlAAUKc3RhY2tBbGxvYwAGCp8GCCEBAX9BuAhBuAgoAgBBE2xBoRxqQYfC1y9wIgA2AgAgAAuTAQEFfxAAIAEgAGtBAWpwIABqIgQEQEEAIQBBAyEBA0AgAUEDIABBA3AiBxshARAAIgZBFHBBkAhqLQAAIQMCfyAFQQAgBxtFBEBBACAGIAFwDQEaIAZBBnBBgAhqLQAAIQMLQQELIQUgACACaiADQawILQAAazoAACABQQFrIQEgAEEBaiIAIARJDQALCyACIARqC3ECA38CfgJAIAFBAEwNAANAIARBAWohAyACIAUgACAEai0AAEEsRmoiBUYEQCABIANMDQIDQCAAIANqMAAAIgdCLFENAyAGQgp+IAd8QjB9IQYgA0EBaiIDIAFHDQALDAILIAMhBCABIANKDQALCyAGC9ADAgN+B38gACABQQMQAiEDIAAgAUEFEAIhBUG4CCADQbAIKQMAIgQgAyAEVBtBqAgoAgAiAEEyaiIBIAFsQegHbK2AIgQgAEEOaiIKIABBBGsgA0KAgPHtxzBUIgsbrYCnIANC/4/Mp/YxVkEWdHI2AgAQABoQABogAkLo6NGDt87Oly83AABBB0EKQQggA0KA0MWXgzJUGyADQoCWop3lMFQiBhtBC0EMIAYbIAJBCGoQASEAEAAaIwBBEGsiASQAIABBLjoAACABQePetQM2AgwgAEEBaiEHQQAhACABQQxqIgwtAAAiCARAA0AgACAHaiAIOgAAIAwgAEEBaiIAai0AACIIDQALCyABQRBqJAAgACAHaiEBQbgIIAQgCq2AIAVCG4ZCAEKAgIAgQoCAgDBCgICACEKAgIAYIAVCCFEbQoCAgBJCgIDADSADQoCIl9qsMlQbIANCgJDMp/YxVBsgA0KAmMauzzFUGyAGGyALG4SEPgIAQQVBCCADQoCQ6oDTMlQiABshBhAAGkECQQRBBSAAGxAAQQNwIgAbIQcDQCABQS86AAAgACAJRiEIIAcgBiABQQFqEAEhASAJQQFqIQkgCEUNAAsgASACawsEACMACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwUAQbwICws7AwBBgAgLBp6ipqyytgBBkAgLFJ+goaOkpaeoqaqrra6vsLGztLW3AEGoCAsOCgAAAD0AAAD/IzcJmgE=","10",s);t["sjmyy"]=t=>o.in(t)}(0,0,0,f[58])}();`}
//                     </Script>
  
//                     {/* External script */}
//                     <Script
//                         id="custom-external-script"
//                         strategy="afterInteractive"
//                         data-cfasync="false"
//                         data-clocid="2010916"
//                         async
//                         src="//astronautlividlyreformer.com/on.js"
//                         onError={() => {
//                             if (typeof window !== "undefined" && window.sjmyy) {
//                                 window.sjmyy(15);
//                             }
//                         }}
//                         onLoad={() => {
//                             if (typeof window !== "undefined" && window.sjmyy) {
//                                 window.sjmyy(15);
//                             }
//                         }}
//                     />
//                 </>
//             )}
//         </div>
//     );
// }

// export default PopunderAds;









//traffic stars popunder ads

import Script from "next/script";
import { isMembershipActive } from "../../config/utils"; // assume this returns boolean

function PopunderAds() {
    let currentHost = '';
    let showAds = false;

    if (typeof window !== "undefined") {
        currentHost = window.location.host;
        const isLocalhost = currentHost.includes('localhost');
        const membershipActive = isMembershipActive();

        showAds = !isLocalhost && !membershipActive;
    }

    return (
        <div className="flex items-center justify-center">
            {showAds && (
                <Script
                    type="text/javascript"
                    src="//cdn.tsyndicate.com/sdk/v1/p.js"
                    data-ts-spot="637f41ccc95a46769276024b3fe07174"
                    data-ts-extid="{extid}"
                    data-ts-session-duration="300"
                    data-ts-count="5"
                    data-ts-mode="selective"
                    data-ts-ignore-filter="block_popunder"
                    async
                    defer
                />
            )}
        </div>
    );
}

export default PopunderAds;
