
var Module = (() => {
  var _scriptDir = import.meta.url;
  
  return (
async function(moduleArg = {}) {

var f=moduleArg,aa,r,readyPromise=new Promise((a,b)=>{aa=a;r=b}),ba=Object.assign({},f),ca="object"==typeof window,t="function"==typeof importScripts,da="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,u="",ea,v,A;
if(da){const {createRequire:a}=await import("module");var require=a(import.meta.url),fs=require("fs"),fa=require("path");t?u=fa.dirname(u)+"/":u=require("url").fileURLToPath(new URL("./",import.meta.url));ea=(b,c)=>{b=B(b)?new URL(b):fa.normalize(b);return fs.readFileSync(b,c?void 0:"utf8")};A=b=>{b=ea(b,!0);b.buffer||(b=new Uint8Array(b));return b};v=(b,c,d,e=!0)=>{b=B(b)?new URL(b):fa.normalize(b);fs.readFile(b,e?void 0:"utf8",(h,l)=>{h?d(h):c(e?l.buffer:l)})};process.argv.slice(2)}else if(ca||
t)t?u=self.location.href:"undefined"!=typeof document&&document.currentScript&&(u=document.currentScript.src),_scriptDir&&(u=_scriptDir),u.startsWith("blob:")?u="":u=u.substr(0,u.replace(/[?#].*/,"").lastIndexOf("/")+1),ea=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},t&&(A=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),v=(a,b,c)=>{var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType=
"arraybuffer";d.onload=()=>{200==d.status||0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)};f.print||console.log.bind(console);var C=f.printErr||console.error.bind(console);Object.assign(f,ba);ba=null;var D;f.wasmBinary&&(D=f.wasmBinary);var F,ha=!1,ia,G,H,I,J,L,ja,ka;
function la(){var a=F.buffer;f.HEAP8=ia=new Int8Array(a);f.HEAP16=H=new Int16Array(a);f.HEAPU8=G=new Uint8Array(a);f.HEAPU16=I=new Uint16Array(a);f.HEAP32=J=new Int32Array(a);f.HEAPU32=L=new Uint32Array(a);f.HEAPF32=ja=new Float32Array(a);f.HEAPF64=ka=new Float64Array(a)}var ma=[],na=[],oa=[];function qa(){var a=f.preRun.shift();ma.unshift(a)}var M=0,ra=null,N=null;
function sa(a){f.onAbort?.(a);a="Aborted("+a+")";C(a);ha=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");r(a);throw a;}var ta=a=>a.startsWith("data:application/octet-stream;base64,"),B=a=>a.startsWith("file://"),O;if(f.locateFile){if(O="silk_wasm.wasm",!ta(O)){var ua=O;O=f.locateFile?f.locateFile(ua,u):u+ua}}else O=(new URL("silk_wasm.wasm",import.meta.url)).href;
function va(a){if(a==O&&D)return new Uint8Array(D);if(A)return A(a);throw"both async and sync fetching of the wasm failed";}function wa(a){if(!D&&(ca||t)){if("function"==typeof fetch&&!B(a))return fetch(a,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw`failed to load wasm binary file at '${a}'`;return b.arrayBuffer()}).catch(()=>va(a));if(v)return new Promise((b,c)=>{v(a,d=>b(new Uint8Array(d)),c)})}return Promise.resolve().then(()=>va(a))}
function xa(a,b,c){return wa(a).then(d=>WebAssembly.instantiate(d,b)).then(c,d=>{C(`failed to asynchronously prepare wasm: ${d}`);sa(d)})}function ya(a,b){var c=O;return D||"function"!=typeof WebAssembly.instantiateStreaming||ta(c)||B(c)||da||"function"!=typeof fetch?xa(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){C(`wasm streaming compile failed: ${e}`);C("falling back to ArrayBuffer instantiation");return xa(c,a,b)}))}
var za=a=>{for(;0<a.length;)a.shift()(f)};class Aa{constructor(a){this.C=a-24}}
var Ba=0,Ca=0,Da,P=a=>{for(var b="";G[a];)b+=Da[G[a++]];return b},Q={},R={},S={},T,Ea=a=>{throw new T(a);},Fa,Ga=(a,b)=>{function c(g){g=b(g);if(g.length!==d.length)throw new Fa("Mismatched type converter count");for(var m=0;m<d.length;++m)U(d[m],g[m])}var d=[];d.forEach(function(g){S[g]=a});var e=Array(a.length),h=[],l=0;a.forEach((g,m)=>{R.hasOwnProperty(g)?e[m]=R[g]:(h.push(g),Q.hasOwnProperty(g)||(Q[g]=[]),Q[g].push(()=>{e[m]=R[g];++l;l===h.length&&c(e)}))});0===h.length&&c(e)};
function Ha(a,b,c={}){var d=b.name;if(!a)throw new T(`type "${d}" must have a positive integer typeid pointer`);if(R.hasOwnProperty(a)){if(c.F)return;throw new T(`Cannot register type '${d}' twice`);}R[a]=b;delete S[a];Q.hasOwnProperty(a)&&(b=Q[a],delete Q[a],b.forEach(e=>e()))}function U(a,b,c={}){if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");return Ha(a,b,c)}
var Ia=[],V=[],Ja=a=>{9<a&&0===--V[a+1]&&(V[a]=void 0,Ia.push(a))},Ka=a=>{if(!a)throw new T("Cannot use deleted val. handle = "+a);return V[a]},La=a=>{switch(a){case void 0:return 2;case null:return 4;case !0:return 6;case !1:return 8;default:const b=Ia.pop()||V.length;V[b]=a;V[b+1]=1;return b}};function Ma(a){return this.fromWireType(L[a>>2])}
var Na={name:"emscripten::val",fromWireType:a=>{var b=Ka(a);Ja(a);return b},toWireType:(a,b)=>La(b),argPackAdvance:8,readValueFromPointer:Ma,B:null},Oa=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(ja[c>>2])};case 8:return function(c){return this.fromWireType(ka[c>>3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},W=(a,b)=>Object.defineProperty(b,"name",{value:a}),Pa=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};
function Qa(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].B)return!0;return!1}function Ra(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=W(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
for(var Sa=(a,b)=>{if(void 0===f[a].A){var c=f[a];f[a]=function(...d){if(!f[a].A.hasOwnProperty(d.length))throw new T(`Function '${b}' called with an invalid number of arguments (${d.length}) - expects one of (${f[a].A})!`);return f[a].A[d.length].apply(this,d)};f[a].A=[];f[a].A[c.D]=c}},Ta=(a,b,c)=>{if(f.hasOwnProperty(a)){if(void 0===c||void 0!==f[a].A&&void 0!==f[a].A[c])throw new T(`Cannot register public name '${a}' twice`);Sa(a,a);if(f.hasOwnProperty(c))throw new T(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
f[a].A[c]=b}else f[a]=b,void 0!==c&&(f[a].H=c)},Ua=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(L[b+4*d>>2]);return c},X=[],Xa,Ya=a=>{var b=X[a];b||(a>=X.length&&(X.length=a+1),X[a]=b=Xa.get(a));return b},Za=(a,b,c=[])=>{a.includes("j")?(a=a.replace(/p/g,"i"),b=(0,f["dynCall_"+a])(b,...c)):b=Ya(b)(...c);return b},$a=(a,b)=>(...c)=>Za(a,b,c),ab=(a,b)=>{a=P(a);var c=a.includes("j")?$a(a,b):Ya(b);if("function"!=typeof c)throw new T(`unknown function pointer with signature ${a}: ${b}`);return c},bb,db=a=>
{a=cb(a);var b=P(a);Y(a);return b},eb=(a,b)=>{function c(h){e[h]||R[h]||(S[h]?S[h].forEach(c):(d.push(h),e[h]=!0))}var d=[],e={};b.forEach(c);throw new bb(`${a}: `+d.map(db).join([", "]));},fb=a=>{a=a.trim();const b=a.indexOf("(");return-1!==b?a.substr(0,b):a},gb=(a,b,c)=>{switch(b){case 1:return c?d=>ia[d]:d=>G[d];case 2:return c?d=>H[d>>1]:d=>I[d>>1];case 4:return c?d=>J[d>>2]:d=>L[d>>2];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},hb="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):
void 0,ib="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0,jb=(a,b)=>{var c=a>>1;for(var d=c+b/2;!(c>=d)&&I[c];)++c;c<<=1;if(32<c-a&&ib)return ib.decode(G.subarray(a,c));c="";for(d=0;!(d>=b/2);++d){var e=H[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c},kb=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)H[b>>1]=a.charCodeAt(e),b+=2;H[b>>1]=0;return b-d},lb=a=>2*a.length,mb=(a,b)=>{for(var c=0,d="";!(c>=b/4);){var e=
J[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},nb=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var h=a.charCodeAt(e);if(55296<=h&&57343>=h){var l=a.charCodeAt(++e);h=65536+((h&1023)<<10)|l&1023}J[b>>2]=h;b+=4;if(b+4>c)break}J[b>>2]=0;return b-d},ob=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b},pb=[],qb=a=>{var b=pb.length;
pb.push(a);return b},rb=(a,b)=>{var c=R[a];if(void 0===c)throw a=`${b} has unknown type ${db(a)}`,new T(a);return c},sb=(a,b)=>{for(var c=Array(a),d=0;d<a;++d)c[d]=rb(L[b+4*d>>2],"parameter "+d);return c},tb=(a,b,c)=>{var d=[];a=a.toWireType(d,c);d.length&&(L[b>>2]=La(d));return a},ub=Array(256),vb=0;256>vb;++vb)ub[vb]=String.fromCharCode(vb);Da=ub;T=f.BindingError=class extends Error{constructor(a){super(a);this.name="BindingError"}};
Fa=f.InternalError=class extends Error{constructor(a){super(a);this.name="InternalError"}};V.push(0,1,void 0,1,null,1,!0,1,!1,1);f.count_emval_handles=()=>V.length/2-5-Ia.length;
bb=f.UnboundTypeError=((a,b)=>{var c=W(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,"UnboundTypeError");
var xb={k:(a,b,c)=>{var d=new Aa(a);L[d.C+16>>2]=0;L[d.C+4>>2]=b;L[d.C+8>>2]=c;Ba=a;Ca++;throw Ba;},o:()=>{},i:(a,b,c,d)=>{b=P(b);U(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,h){return h?c:d},argPackAdvance:8,readValueFromPointer:function(e){return this.fromWireType(G[e])},B:null})},s:a=>U(a,Na),h:(a,b,c)=>{b=P(b);U(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,argPackAdvance:8,readValueFromPointer:Oa(b,c),B:null})},d:(a,b,c,d,e,h,l)=>{var g=Ua(b,c);a=P(a);a=fb(a);e=ab(d,
e);Ta(a,function(){eb(`Cannot call ${a} due to unbound types`,g)},b-1);Ga(g,m=>{var k=[m[0],null].concat(m.slice(1));m=a;var n=a;var q=e,p=k.length;if(2>p)throw new T("argTypes array size mismatch! Must at least get return value and 'this' types!");var x=null!==k[1]&&!1,E=Qa(k),y="void"!==k[0].name;q=[n,Ea,q,h,Pa,k[0],k[1]];for(var w=0;w<p-2;++w)q.push(k[w+2]);if(!E)for(w=x?1:2;w<k.length;++w)null!==k[w].B&&q.push(k[w].B);E=Qa(k);w=k.length;var z="",K="";for(p=0;p<w-2;++p)z+=(0!==p?", ":"")+"arg"+
p,K+=(0!==p?", ":"")+"arg"+p+"Wired";z=`\n        return function (${z}) {\n        if (arguments.length !== ${w-2}) {\n          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${w-2}');\n        }`;E&&(z+="var destructors = [];\n");var Va=E?"destructors":"null",pa="humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");x&&(z+="var thisWired = classParam['toWireType']("+Va+", this);\n");for(p=0;p<w-2;++p)z+="var arg"+
p+"Wired = argType"+p+"['toWireType']("+Va+", arg"+p+");\n",pa.push("argType"+p);x&&(K="thisWired"+(0<K.length?", ":"")+K);z+=(y||l?"var rv = ":"")+"invoker(fn"+(0<K.length?", ":"")+K+");\n";if(E)z+="runDestructors(destructors);\n";else for(p=x?1:2;p<k.length;++p)x=1===p?"thisWired":"arg"+(p-2)+"Wired",null!==k[p].B&&(z+=`${x}_dtor(${x});\n`,pa.push(`${x}_dtor`));y&&(z+="var ret = retType['fromWireType'](rv);\nreturn ret;\n");let [Wa,zb]=[pa,z+"}\n"];Wa.push(zb);k=Ra(Wa)(...q);n=W(n,k);k=b-1;if(!f.hasOwnProperty(m))throw new Fa("Replacing nonexistent public symbol");
void 0!==f[m].A&&void 0!==k?f[m].A[k]=n:(f[m]=n,f[m].D=k);return[]})},b:(a,b,c,d,e)=>{b=P(b);-1===e&&(e=4294967295);e=g=>g;if(0===d){var h=32-8*c;e=g=>g<<h>>>h}var l=b.includes("unsigned")?function(g,m){return m>>>0}:function(g,m){return m};U(a,{name:b,fromWireType:e,toWireType:l,argPackAdvance:8,readValueFromPointer:gb(b,c,0!==d),B:null})},a:(a,b,c)=>{function d(h){return new e(ia.buffer,L[h+4>>2],L[h>>2])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];
c=P(c);U(a,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{F:!0})},g:(a,b)=>{b=P(b);var c="std::string"===b;U(a,{name:b,fromWireType:function(d){var e=L[d>>2],h=d+4;if(c)for(var l=h,g=0;g<=e;++g){var m=h+g;if(g==e||0==G[m]){if(l){var k=l;var n=G,q=k+(m-l);for(l=k;n[l]&&!(l>=q);)++l;if(16<l-k&&n.buffer&&hb)k=hb.decode(n.subarray(k,l));else{for(q="";k<l;){var p=n[k++];if(p&128){var x=n[k++]&63;if(192==(p&224))q+=String.fromCharCode((p&31)<<6|x);else{var E=n[k++]&63;p=224==(p&240)?(p&
15)<<12|x<<6|E:(p&7)<<18|x<<12|E<<6|n[k++]&63;65536>p?q+=String.fromCharCode(p):(p-=65536,q+=String.fromCharCode(55296|p>>10,56320|p&1023))}}else q+=String.fromCharCode(p)}k=q}}else k="";if(void 0===y)var y=k;else y+=String.fromCharCode(0),y+=k;l=m+1}}else{y=Array(e);for(g=0;g<e;++g)y[g]=String.fromCharCode(G[h+g]);y=y.join("")}Y(d);return y},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var h,l="string"==typeof e;if(!(l||e instanceof Uint8Array||e instanceof Uint8ClampedArray||
e instanceof Int8Array))throw new T("Cannot pass non-string to std::string");var g;if(c&&l)for(h=g=0;h<e.length;++h){var m=e.charCodeAt(h);127>=m?g++:2047>=m?g+=2:55296<=m&&57343>=m?(g+=4,++h):g+=3}else g=e.length;h=g;g=wb(4+h+1);m=g+4;L[g>>2]=h;if(c&&l){if(l=m,m=h+1,h=G,0<m){m=l+m-1;for(var k=0;k<e.length;++k){var n=e.charCodeAt(k);if(55296<=n&&57343>=n){var q=e.charCodeAt(++k);n=65536+((n&1023)<<10)|q&1023}if(127>=n){if(l>=m)break;h[l++]=n}else{if(2047>=n){if(l+1>=m)break;h[l++]=192|n>>6}else{if(65535>=
n){if(l+2>=m)break;h[l++]=224|n>>12}else{if(l+3>=m)break;h[l++]=240|n>>18;h[l++]=128|n>>12&63}h[l++]=128|n>>6&63}h[l++]=128|n&63}}h[l]=0}}else if(l)for(l=0;l<h;++l){k=e.charCodeAt(l);if(255<k)throw Y(m),new T("String has UTF-16 code units that do not fit in 8 bits");G[m+l]=k}else for(l=0;l<h;++l)G[m+l]=e[l];null!==d&&d.push(Y,g);return g},argPackAdvance:8,readValueFromPointer:Ma,B(d){Y(d)}})},e:(a,b,c)=>{c=P(c);if(2===b){var d=jb;var e=kb;var h=lb;var l=g=>I[g>>1]}else 4===b&&(d=mb,e=nb,h=ob,l=g=>
L[g>>2]);U(a,{name:c,fromWireType:g=>{for(var m=L[g>>2],k,n=g+4,q=0;q<=m;++q){var p=g+4+q*b;if(q==m||0==l(p))n=d(n,p-n),void 0===k?k=n:(k+=String.fromCharCode(0),k+=n),n=p+b}Y(g);return k},toWireType:(g,m)=>{if("string"!=typeof m)throw new T(`Cannot pass non-string to C++ string type ${c}`);var k=h(m),n=wb(4+k+b);L[n>>2]=k/b;e(m,n+4,k+b);null!==g&&g.push(Y,n);return n},argPackAdvance:8,readValueFromPointer:Ma,B(g){Y(g)}})},j:(a,b)=>{b=P(b);U(a,{G:!0,name:b,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>
{}})},r:(a,b,c)=>G.copyWithin(a,b,b+c),m:(a,b,c,d)=>{a=pb[a];b=Ka(b);return a(null,b,c,d)},c:Ja,n:(a,b,c)=>{b=sb(a,b);var d=b.shift();a--;var e="return function (obj, func, destructorsRef, args) {\n",h=0,l=[];0===c&&l.push("obj");for(var g=["retType"],m=[d],k=0;k<a;++k)l.push("arg"+k),g.push("argType"+k),m.push(b[k]),e+=`  var arg${k} = argType${k}.readValueFromPointer(args${h?"+"+h:""});\n`,h+=b[k].argPackAdvance;e+=`  var rv = ${1===c?"new func":"func.call"}(${l.join(", ")});\n`;d.G||(g.push("emval_returnValue"),
m.push(tb),e+="  return emval_returnValue(retType, destructorsRef, rv);\n");g.push(e+"};\n");a=Ra(g)(...m);c=`methodCaller<(${b.map(n=>n.name).join(", ")}) => ${d.name}>`;return qb(W(c,a))},f:a=>{9<a&&(V[a+1]+=1)},l:a=>{var b=Ka(a);Pa(b);Ja(a)},t:(a,b)=>{a=rb(a,"_emval_take_value");a=a.readValueFromPointer(b);return La(a)},p:()=>{sa("")},q:a=>{var b=G.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,
2147483648,d+(65536-d%65536)%65536)-F.buffer.byteLength+65535)/65536;try{F.grow(e);la();var h=1;break a}catch(l){}h=void 0}if(h)return!0}return!1}},Z=function(){function a(c){Z=c.exports;F=Z.u;la();Xa=Z.x;na.unshift(Z.v);M--;f.monitorRunDependencies?.(M);0==M&&(null!==ra&&(clearInterval(ra),ra=null),N&&(c=N,N=null,c()));return Z}var b={a:xb};M++;f.monitorRunDependencies?.(M);if(f.instantiateWasm)try{return f.instantiateWasm(b,a)}catch(c){C(`Module.instantiateWasm callback failed with error: ${c}`),
r(c)}ya(b,function(c){a(c.instance)}).catch(r);return{}}(),cb=a=>(cb=Z.w)(a),wb=a=>(wb=Z.y)(a),Y=a=>(Y=Z.z)(a),yb;N=function Ab(){yb||Bb();yb||(N=Ab)};
function Bb(){function a(){if(!yb&&(yb=!0,f.calledRun=!0,!ha)){za(na);aa(f);if(f.onRuntimeInitialized)f.onRuntimeInitialized();if(f.postRun)for("function"==typeof f.postRun&&(f.postRun=[f.postRun]);f.postRun.length;){var b=f.postRun.shift();oa.unshift(b)}za(oa)}}if(!(0<M)){if(f.preRun)for("function"==typeof f.preRun&&(f.preRun=[f.preRun]);f.preRun.length;)qa();za(ma);0<M||(f.setStatus?(f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("")},1);a()},1)):a())}}
if(f.preInit)for("function"==typeof f.preInit&&(f.preInit=[f.preInit]);0<f.preInit.length;)f.preInit.pop()();Bb();


  return readyPromise
}
);
})();
export default Module;