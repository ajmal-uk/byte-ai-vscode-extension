"use strict";var Kn=Object.create;var it=Object.defineProperty;var Xn=Object.getOwnPropertyDescriptor;var Jn=Object.getOwnPropertyNames;var Zn=Object.getPrototypeOf,er=Object.prototype.hasOwnProperty;var G=(d,n)=>()=>(n||d((n={exports:{}}).exports,n),n.exports),tr=(d,n)=>{for(var e in n)it(d,e,{get:n[e],enumerable:!0})},fs=(d,n,e,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of Jn(n))!er.call(d,s)&&s!==e&&it(d,s,{get:()=>n[s],enumerable:!(t=Xn(n,s))||t.enumerable});return d};var S=(d,n,e)=>(e=d!=null?Kn(Zn(d)):{},fs(n||!d||!d.__esModule?it(e,"default",{value:d,enumerable:!0}):e,d)),sr=d=>fs(it({},"__esModule",{value:!0}),d);var ne=G((Fi,bs)=>{"use strict";var vs=["nodebuffer","arraybuffer","fragments"],ws=typeof Blob<"u";ws&&vs.push("blob");bs.exports={BINARY_TYPES:vs,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:ws,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var We=G((Di,at)=>{"use strict";var{EMPTY_BUFFER:nr}=ne(),Ft=Buffer[Symbol.species];function rr(d,n){if(d.length===0)return nr;if(d.length===1)return d[0];let e=Buffer.allocUnsafe(n),t=0;for(let s=0;s<d.length;s++){let r=d[s];e.set(r,t),t+=r.length}return t<n?new Ft(e.buffer,e.byteOffset,t):e}function ks(d,n,e,t,s){for(let r=0;r<s;r++)e[t+r]=d[r]^n[r&3]}function Cs(d,n){for(let e=0;e<d.length;e++)d[e]^=n[e&3]}function ir(d){return d.length===d.buffer.byteLength?d.buffer:d.buffer.slice(d.byteOffset,d.byteOffset+d.length)}function Dt(d){if(Dt.readOnly=!0,Buffer.isBuffer(d))return d;let n;return d instanceof ArrayBuffer?n=new Ft(d):ArrayBuffer.isView(d)?n=new Ft(d.buffer,d.byteOffset,d.byteLength):(n=Buffer.from(d),Dt.readOnly=!1),n}at.exports={concat:rr,mask:ks,toArrayBuffer:ir,toBuffer:Dt,unmask:Cs};if(!process.env.WS_NO_BUFFER_UTIL)try{let d=require("bufferutil");at.exports.mask=function(n,e,t,s,r){r<48?ks(n,e,t,s,r):d.mask(n,e,t,s,r)},at.exports.unmask=function(n,e){n.length<32?Cs(n,e):d.unmask(n,e)}}catch{}});var Ps=G((Ni,Es)=>{"use strict";var Ss=Symbol("kDone"),Nt=Symbol("kRun"),Bt=class{constructor(n){this[Ss]=()=>{this.pending--,this[Nt]()},this.concurrency=n||1/0,this.jobs=[],this.pending=0}add(n){this.jobs.push(n),this[Nt]()}[Nt](){if(this.pending!==this.concurrency&&this.jobs.length){let n=this.jobs.shift();this.pending++,n(this[Ss])}}};Es.exports=Bt});var qe=G((Bi,Is)=>{"use strict";var Ge=require("zlib"),Ts=We(),or=Ps(),{kStatusCode:As}=ne(),ar=Buffer[Symbol.species],cr=Buffer.from([0,0,255,255]),lt=Symbol("permessage-deflate"),re=Symbol("total-length"),Me=Symbol("callback"),pe=Symbol("buffers"),Re=Symbol("error"),ct,jt=class{constructor(n,e,t){if(this._maxPayload=t|0,this._options=n||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._isServer=!!e,this._deflate=null,this._inflate=null,this.params=null,!ct){let s=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;ct=new or(s)}}static get extensionName(){return"permessage-deflate"}offer(){let n={};return this._options.serverNoContextTakeover&&(n.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(n.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(n.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?n.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(n.client_max_window_bits=!0),n}accept(n){return n=this.normalizeParams(n),this.params=this._isServer?this.acceptAsServer(n):this.acceptAsClient(n),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let n=this._deflate[Me];this._deflate.close(),this._deflate=null,n&&n(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(n){let e=this._options,t=n.find(s=>!(e.serverNoContextTakeover===!1&&s.server_no_context_takeover||s.server_max_window_bits&&(e.serverMaxWindowBits===!1||typeof e.serverMaxWindowBits=="number"&&e.serverMaxWindowBits>s.server_max_window_bits)||typeof e.clientMaxWindowBits=="number"&&!s.client_max_window_bits));if(!t)throw new Error("None of the extension offers can be accepted");return e.serverNoContextTakeover&&(t.server_no_context_takeover=!0),e.clientNoContextTakeover&&(t.client_no_context_takeover=!0),typeof e.serverMaxWindowBits=="number"&&(t.server_max_window_bits=e.serverMaxWindowBits),typeof e.clientMaxWindowBits=="number"?t.client_max_window_bits=e.clientMaxWindowBits:(t.client_max_window_bits===!0||e.clientMaxWindowBits===!1)&&delete t.client_max_window_bits,t}acceptAsClient(n){let e=n[0];if(this._options.clientNoContextTakeover===!1&&e.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!e.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(e.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&e.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return e}normalizeParams(n){return n.forEach(e=>{Object.keys(e).forEach(t=>{let s=e[t];if(s.length>1)throw new Error(`Parameter "${t}" must have only a single value`);if(s=s[0],t==="client_max_window_bits"){if(s!==!0){let r=+s;if(!Number.isInteger(r)||r<8||r>15)throw new TypeError(`Invalid value for parameter "${t}": ${s}`);s=r}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${t}": ${s}`)}else if(t==="server_max_window_bits"){let r=+s;if(!Number.isInteger(r)||r<8||r>15)throw new TypeError(`Invalid value for parameter "${t}": ${s}`);s=r}else if(t==="client_no_context_takeover"||t==="server_no_context_takeover"){if(s!==!0)throw new TypeError(`Invalid value for parameter "${t}": ${s}`)}else throw new Error(`Unknown parameter "${t}"`);e[t]=s})}),n}decompress(n,e,t){ct.add(s=>{this._decompress(n,e,(r,i)=>{s(),t(r,i)})})}compress(n,e,t){ct.add(s=>{this._compress(n,e,(r,i)=>{s(),t(r,i)})})}_decompress(n,e,t){let s=this._isServer?"client":"server";if(!this._inflate){let r=`${s}_max_window_bits`,i=typeof this.params[r]!="number"?Ge.Z_DEFAULT_WINDOWBITS:this.params[r];this._inflate=Ge.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[lt]=this,this._inflate[re]=0,this._inflate[pe]=[],this._inflate.on("error",dr),this._inflate.on("data",_s)}this._inflate[Me]=t,this._inflate.write(n),e&&this._inflate.write(cr),this._inflate.flush(()=>{let r=this._inflate[Re];if(r){this._inflate.close(),this._inflate=null,t(r);return}let i=Ts.concat(this._inflate[pe],this._inflate[re]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[re]=0,this._inflate[pe]=[],e&&this.params[`${s}_no_context_takeover`]&&this._inflate.reset()),t(null,i)})}_compress(n,e,t){let s=this._isServer?"server":"client";if(!this._deflate){let r=`${s}_max_window_bits`,i=typeof this.params[r]!="number"?Ge.Z_DEFAULT_WINDOWBITS:this.params[r];this._deflate=Ge.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[re]=0,this._deflate[pe]=[],this._deflate.on("data",lr)}this._deflate[Me]=t,this._deflate.write(n),this._deflate.flush(Ge.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let r=Ts.concat(this._deflate[pe],this._deflate[re]);e&&(r=new ar(r.buffer,r.byteOffset,r.length-4)),this._deflate[Me]=null,this._deflate[re]=0,this._deflate[pe]=[],e&&this.params[`${s}_no_context_takeover`]&&this._deflate.reset(),t(null,r)})}};Is.exports=jt;function lr(d){this[pe].push(d),this[re]+=d.length}function _s(d){if(this[re]+=d.length,this[lt]._maxPayload<1||this[re]<=this[lt]._maxPayload){this[pe].push(d);return}this[Re]=new RangeError("Max payload size exceeded"),this[Re].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Re][As]=1009,this.removeListener("data",_s),this.reset()}function dr(d){if(this[lt]._inflate=null,this[Re]){this[Me](this[Re]);return}d[As]=1007,this[Me](d)}});var Oe=G((ji,dt)=>{"use strict";var{isUtf8:Ms}=require("buffer"),{hasBlob:pr}=ne(),ur=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function hr(d){return d>=1e3&&d<=1014&&d!==1004&&d!==1005&&d!==1006||d>=3e3&&d<=4999}function zt(d){let n=d.length,e=0;for(;e<n;)if((d[e]&128)===0)e++;else if((d[e]&224)===192){if(e+1===n||(d[e+1]&192)!==128||(d[e]&254)===192)return!1;e+=2}else if((d[e]&240)===224){if(e+2>=n||(d[e+1]&192)!==128||(d[e+2]&192)!==128||d[e]===224&&(d[e+1]&224)===128||d[e]===237&&(d[e+1]&224)===160)return!1;e+=3}else if((d[e]&248)===240){if(e+3>=n||(d[e+1]&192)!==128||(d[e+2]&192)!==128||(d[e+3]&192)!==128||d[e]===240&&(d[e+1]&240)===128||d[e]===244&&d[e+1]>143||d[e]>244)return!1;e+=4}else return!1;return!0}function mr(d){return pr&&typeof d=="object"&&typeof d.arrayBuffer=="function"&&typeof d.type=="string"&&typeof d.stream=="function"&&(d[Symbol.toStringTag]==="Blob"||d[Symbol.toStringTag]==="File")}dt.exports={isBlob:mr,isValidStatusCode:hr,isValidUTF8:zt,tokenChars:ur};if(Ms)dt.exports.isValidUTF8=function(d){return d.length<24?zt(d):Ms(d)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let d=require("utf-8-validate");dt.exports.isValidUTF8=function(n){return n.length<32?zt(n):d(n)}}catch{}});var Ht=G((zi,Ns)=>{"use strict";var{Writable:gr}=require("stream"),Rs=qe(),{BINARY_TYPES:fr,EMPTY_BUFFER:Os,kStatusCode:yr,kWebSocket:xr}=ne(),{concat:Ut,toArrayBuffer:vr,unmask:wr}=We(),{isValidStatusCode:br,isValidUTF8:Ls}=Oe(),pt=Buffer[Symbol.species],Y=0,$s=1,Fs=2,Ds=3,Wt=4,Gt=5,ut=6,qt=class extends gr{constructor(n={}){super(),this._allowSynchronousEvents=n.allowSynchronousEvents!==void 0?n.allowSynchronousEvents:!0,this._binaryType=n.binaryType||fr[0],this._extensions=n.extensions||{},this._isServer=!!n.isServer,this._maxPayload=n.maxPayload|0,this._skipUTF8Validation=!!n.skipUTF8Validation,this[xr]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Y}_write(n,e,t){if(this._opcode===8&&this._state==Y)return t();this._bufferedBytes+=n.length,this._buffers.push(n),this.startLoop(t)}consume(n){if(this._bufferedBytes-=n,n===this._buffers[0].length)return this._buffers.shift();if(n<this._buffers[0].length){let t=this._buffers[0];return this._buffers[0]=new pt(t.buffer,t.byteOffset+n,t.length-n),new pt(t.buffer,t.byteOffset,n)}let e=Buffer.allocUnsafe(n);do{let t=this._buffers[0],s=e.length-n;n>=t.length?e.set(this._buffers.shift(),s):(e.set(new Uint8Array(t.buffer,t.byteOffset,n),s),this._buffers[0]=new pt(t.buffer,t.byteOffset+n,t.length-n)),n-=t.length}while(n>0);return e}startLoop(n){this._loop=!0;do switch(this._state){case Y:this.getInfo(n);break;case $s:this.getPayloadLength16(n);break;case Fs:this.getPayloadLength64(n);break;case Ds:this.getMask();break;case Wt:this.getData(n);break;case Gt:case ut:this._loop=!1;return}while(this._loop);this._errored||n()}getInfo(n){if(this._bufferedBytes<2){this._loop=!1;return}let e=this.consume(2);if((e[0]&48)!==0){let s=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");n(s);return}let t=(e[0]&64)===64;if(t&&!this._extensions[Rs.extensionName]){let s=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");n(s);return}if(this._fin=(e[0]&128)===128,this._opcode=e[0]&15,this._payloadLength=e[1]&127,this._opcode===0){if(t){let s=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");n(s);return}if(!this._fragmented){let s=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");n(s);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let s=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");n(s);return}this._compressed=t}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let s=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");n(s);return}if(t){let s=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");n(s);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let s=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");n(s);return}}else{let s=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");n(s);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(e[1]&128)===128,this._isServer){if(!this._masked){let s=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");n(s);return}}else if(this._masked){let s=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");n(s);return}this._payloadLength===126?this._state=$s:this._payloadLength===127?this._state=Fs:this.haveLength(n)}getPayloadLength16(n){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(n)}getPayloadLength64(n){if(this._bufferedBytes<8){this._loop=!1;return}let e=this.consume(8),t=e.readUInt32BE(0);if(t>Math.pow(2,21)-1){let s=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");n(s);return}this._payloadLength=t*Math.pow(2,32)+e.readUInt32BE(4),this.haveLength(n)}haveLength(n){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let e=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");n(e);return}this._masked?this._state=Ds:this._state=Wt}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Wt}getData(n){let e=Os;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}e=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&wr(e,this._mask)}if(this._opcode>7){this.controlMessage(e,n);return}if(this._compressed){this._state=Gt,this.decompress(e,n);return}e.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(e)),this.dataMessage(n)}decompress(n,e){this._extensions[Rs.extensionName].decompress(n,this._fin,(s,r)=>{if(s)return e(s);if(r.length){if(this._messageLength+=r.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");e(i);return}this._fragments.push(r)}this.dataMessage(e),this._state===Y&&this.startLoop(e)})}dataMessage(n){if(!this._fin){this._state=Y;return}let e=this._messageLength,t=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let s;this._binaryType==="nodebuffer"?s=Ut(t,e):this._binaryType==="arraybuffer"?s=vr(Ut(t,e)):this._binaryType==="blob"?s=new Blob(t):s=t,this._allowSynchronousEvents?(this.emit("message",s,!0),this._state=Y):(this._state=ut,setImmediate(()=>{this.emit("message",s,!0),this._state=Y,this.startLoop(n)}))}else{let s=Ut(t,e);if(!this._skipUTF8Validation&&!Ls(s)){let r=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");n(r);return}this._state===Gt||this._allowSynchronousEvents?(this.emit("message",s,!1),this._state=Y):(this._state=ut,setImmediate(()=>{this.emit("message",s,!1),this._state=Y,this.startLoop(n)}))}}controlMessage(n,e){if(this._opcode===8){if(n.length===0)this._loop=!1,this.emit("conclude",1005,Os),this.end();else{let t=n.readUInt16BE(0);if(!br(t)){let r=this.createError(RangeError,`invalid status code ${t}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");e(r);return}let s=new pt(n.buffer,n.byteOffset+2,n.length-2);if(!this._skipUTF8Validation&&!Ls(s)){let r=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");e(r);return}this._loop=!1,this.emit("conclude",t,s),this.end()}this._state=Y;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",n),this._state=Y):(this._state=ut,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",n),this._state=Y,this.startLoop(e)}))}createError(n,e,t,s,r){this._loop=!1,this._errored=!0;let i=new n(t?`Invalid WebSocket frame: ${e}`:e);return Error.captureStackTrace(i,this.createError),i.code=r,i[yr]=s,i}};Ns.exports=qt});var Qt=G((Wi,zs)=>{"use strict";var{Duplex:Ui}=require("stream"),{randomFillSync:kr}=require("crypto"),Bs=qe(),{EMPTY_BUFFER:Cr,kWebSocket:Sr,NOOP:Er}=ne(),{isBlob:Le,isValidStatusCode:Pr}=Oe(),{mask:js,toBuffer:fe}=We(),Q=Symbol("kByteLength"),Tr=Buffer.alloc(4),ht=8*1024,ye,$e=ht,J=0,Ar=1,_r=2,Vt=class d{constructor(n,e,t){this._extensions=e||{},t&&(this._generateMask=t,this._maskBuffer=Buffer.alloc(4)),this._socket=n,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=J,this.onerror=Er,this[Sr]=void 0}static frame(n,e){let t,s=!1,r=2,i=!1;e.mask&&(t=e.maskBuffer||Tr,e.generateMask?e.generateMask(t):($e===ht&&(ye===void 0&&(ye=Buffer.alloc(ht)),kr(ye,0,ht),$e=0),t[0]=ye[$e++],t[1]=ye[$e++],t[2]=ye[$e++],t[3]=ye[$e++]),i=(t[0]|t[1]|t[2]|t[3])===0,r=6);let o;typeof n=="string"?(!e.mask||i)&&e[Q]!==void 0?o=e[Q]:(n=Buffer.from(n),o=n.length):(o=n.length,s=e.mask&&e.readOnly&&!i);let a=o;o>=65536?(r+=8,a=127):o>125&&(r+=2,a=126);let c=Buffer.allocUnsafe(s?o+r:r);return c[0]=e.fin?e.opcode|128:e.opcode,e.rsv1&&(c[0]|=64),c[1]=a,a===126?c.writeUInt16BE(o,2):a===127&&(c[2]=c[3]=0,c.writeUIntBE(o,4,6)),e.mask?(c[1]|=128,c[r-4]=t[0],c[r-3]=t[1],c[r-2]=t[2],c[r-1]=t[3],i?[c,n]:s?(js(n,t,c,r,o),[c]):(js(n,t,n,0,o),[c,n])):[c,n]}close(n,e,t,s){let r;if(n===void 0)r=Cr;else{if(typeof n!="number"||!Pr(n))throw new TypeError("First argument must be a valid error code number");if(e===void 0||!e.length)r=Buffer.allocUnsafe(2),r.writeUInt16BE(n,0);else{let o=Buffer.byteLength(e);if(o>123)throw new RangeError("The message must not be greater than 123 bytes");r=Buffer.allocUnsafe(2+o),r.writeUInt16BE(n,0),typeof e=="string"?r.write(e,2):r.set(e,2)}}let i={[Q]:r.length,fin:!0,generateMask:this._generateMask,mask:t,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==J?this.enqueue([this.dispatch,r,!1,i,s]):this.sendFrame(d.frame(r,i),s)}ping(n,e,t){let s,r;if(typeof n=="string"?(s=Buffer.byteLength(n),r=!1):Le(n)?(s=n.size,r=!1):(n=fe(n),s=n.length,r=fe.readOnly),s>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Q]:s,fin:!0,generateMask:this._generateMask,mask:e,maskBuffer:this._maskBuffer,opcode:9,readOnly:r,rsv1:!1};Le(n)?this._state!==J?this.enqueue([this.getBlobData,n,!1,i,t]):this.getBlobData(n,!1,i,t):this._state!==J?this.enqueue([this.dispatch,n,!1,i,t]):this.sendFrame(d.frame(n,i),t)}pong(n,e,t){let s,r;if(typeof n=="string"?(s=Buffer.byteLength(n),r=!1):Le(n)?(s=n.size,r=!1):(n=fe(n),s=n.length,r=fe.readOnly),s>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Q]:s,fin:!0,generateMask:this._generateMask,mask:e,maskBuffer:this._maskBuffer,opcode:10,readOnly:r,rsv1:!1};Le(n)?this._state!==J?this.enqueue([this.getBlobData,n,!1,i,t]):this.getBlobData(n,!1,i,t):this._state!==J?this.enqueue([this.dispatch,n,!1,i,t]):this.sendFrame(d.frame(n,i),t)}send(n,e,t){let s=this._extensions[Bs.extensionName],r=e.binary?2:1,i=e.compress,o,a;typeof n=="string"?(o=Buffer.byteLength(n),a=!1):Le(n)?(o=n.size,a=!1):(n=fe(n),o=n.length,a=fe.readOnly),this._firstFragment?(this._firstFragment=!1,i&&s&&s.params[s._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=o>=s._threshold),this._compress=i):(i=!1,r=0),e.fin&&(this._firstFragment=!0);let c={[Q]:o,fin:e.fin,generateMask:this._generateMask,mask:e.mask,maskBuffer:this._maskBuffer,opcode:r,readOnly:a,rsv1:i};Le(n)?this._state!==J?this.enqueue([this.getBlobData,n,this._compress,c,t]):this.getBlobData(n,this._compress,c,t):this._state!==J?this.enqueue([this.dispatch,n,this._compress,c,t]):this.dispatch(n,this._compress,c,t)}getBlobData(n,e,t,s){this._bufferedBytes+=t[Q],this._state=_r,n.arrayBuffer().then(r=>{if(this._socket.destroyed){let o=new Error("The socket was closed while the blob was being read");process.nextTick(Yt,this,o,s);return}this._bufferedBytes-=t[Q];let i=fe(r);e?this.dispatch(i,e,t,s):(this._state=J,this.sendFrame(d.frame(i,t),s),this.dequeue())}).catch(r=>{process.nextTick(Ir,this,r,s)})}dispatch(n,e,t,s){if(!e){this.sendFrame(d.frame(n,t),s);return}let r=this._extensions[Bs.extensionName];this._bufferedBytes+=t[Q],this._state=Ar,r.compress(n,t.fin,(i,o)=>{if(this._socket.destroyed){let a=new Error("The socket was closed while data was being compressed");Yt(this,a,s);return}this._bufferedBytes-=t[Q],this._state=J,t.readOnly=!1,this.sendFrame(d.frame(o,t),s),this.dequeue()})}dequeue(){for(;this._state===J&&this._queue.length;){let n=this._queue.shift();this._bufferedBytes-=n[3][Q],Reflect.apply(n[0],this,n.slice(1))}}enqueue(n){this._bufferedBytes+=n[3][Q],this._queue.push(n)}sendFrame(n,e){n.length===2?(this._socket.cork(),this._socket.write(n[0]),this._socket.write(n[1],e),this._socket.uncork()):this._socket.write(n[0],e)}};zs.exports=Vt;function Yt(d,n,e){typeof e=="function"&&e(n);for(let t=0;t<d._queue.length;t++){let s=d._queue[t],r=s[s.length-1];typeof r=="function"&&r(n)}}function Ir(d,n,e){Yt(d,n,e),d.onerror(n)}});var Ks=G((Gi,Qs)=>{"use strict";var{kForOnEventAttribute:He,kListener:Kt}=ne(),Us=Symbol("kCode"),Ws=Symbol("kData"),Gs=Symbol("kError"),qs=Symbol("kMessage"),Hs=Symbol("kReason"),Fe=Symbol("kTarget"),Vs=Symbol("kType"),Ys=Symbol("kWasClean"),ie=class{constructor(n){this[Fe]=null,this[Vs]=n}get target(){return this[Fe]}get type(){return this[Vs]}};Object.defineProperty(ie.prototype,"target",{enumerable:!0});Object.defineProperty(ie.prototype,"type",{enumerable:!0});var xe=class extends ie{constructor(n,e={}){super(n),this[Us]=e.code===void 0?0:e.code,this[Hs]=e.reason===void 0?"":e.reason,this[Ys]=e.wasClean===void 0?!1:e.wasClean}get code(){return this[Us]}get reason(){return this[Hs]}get wasClean(){return this[Ys]}};Object.defineProperty(xe.prototype,"code",{enumerable:!0});Object.defineProperty(xe.prototype,"reason",{enumerable:!0});Object.defineProperty(xe.prototype,"wasClean",{enumerable:!0});var De=class extends ie{constructor(n,e={}){super(n),this[Gs]=e.error===void 0?null:e.error,this[qs]=e.message===void 0?"":e.message}get error(){return this[Gs]}get message(){return this[qs]}};Object.defineProperty(De.prototype,"error",{enumerable:!0});Object.defineProperty(De.prototype,"message",{enumerable:!0});var Ve=class extends ie{constructor(n,e={}){super(n),this[Ws]=e.data===void 0?null:e.data}get data(){return this[Ws]}};Object.defineProperty(Ve.prototype,"data",{enumerable:!0});var Mr={addEventListener(d,n,e={}){for(let s of this.listeners(d))if(!e[He]&&s[Kt]===n&&!s[He])return;let t;if(d==="message")t=function(r,i){let o=new Ve("message",{data:i?r:r.toString()});o[Fe]=this,mt(n,this,o)};else if(d==="close")t=function(r,i){let o=new xe("close",{code:r,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});o[Fe]=this,mt(n,this,o)};else if(d==="error")t=function(r){let i=new De("error",{error:r,message:r.message});i[Fe]=this,mt(n,this,i)};else if(d==="open")t=function(){let r=new ie("open");r[Fe]=this,mt(n,this,r)};else return;t[He]=!!e[He],t[Kt]=n,e.once?this.once(d,t):this.on(d,t)},removeEventListener(d,n){for(let e of this.listeners(d))if(e[Kt]===n&&!e[He]){this.removeListener(d,e);break}}};Qs.exports={CloseEvent:xe,ErrorEvent:De,Event:ie,EventTarget:Mr,MessageEvent:Ve};function mt(d,n,e){typeof d=="object"&&d.handleEvent?d.handleEvent.call(d,e):d.call(n,e)}});var Xt=G((qi,Xs)=>{"use strict";var{tokenChars:Ye}=Oe();function se(d,n,e){d[n]===void 0?d[n]=[e]:d[n].push(e)}function Rr(d){let n=Object.create(null),e=Object.create(null),t=!1,s=!1,r=!1,i,o,a=-1,c=-1,l=-1,p=0;for(;p<d.length;p++)if(c=d.charCodeAt(p),i===void 0)if(l===-1&&Ye[c]===1)a===-1&&(a=p);else if(p!==0&&(c===32||c===9))l===-1&&a!==-1&&(l=p);else if(c===59||c===44){if(a===-1)throw new SyntaxError(`Unexpected character at index ${p}`);l===-1&&(l=p);let h=d.slice(a,l);c===44?(se(n,h,e),e=Object.create(null)):i=h,a=l=-1}else throw new SyntaxError(`Unexpected character at index ${p}`);else if(o===void 0)if(l===-1&&Ye[c]===1)a===-1&&(a=p);else if(c===32||c===9)l===-1&&a!==-1&&(l=p);else if(c===59||c===44){if(a===-1)throw new SyntaxError(`Unexpected character at index ${p}`);l===-1&&(l=p),se(e,d.slice(a,l),!0),c===44&&(se(n,i,e),e=Object.create(null),i=void 0),a=l=-1}else if(c===61&&a!==-1&&l===-1)o=d.slice(a,p),a=l=-1;else throw new SyntaxError(`Unexpected character at index ${p}`);else if(s){if(Ye[c]!==1)throw new SyntaxError(`Unexpected character at index ${p}`);a===-1?a=p:t||(t=!0),s=!1}else if(r)if(Ye[c]===1)a===-1&&(a=p);else if(c===34&&a!==-1)r=!1,l=p;else if(c===92)s=!0;else throw new SyntaxError(`Unexpected character at index ${p}`);else if(c===34&&d.charCodeAt(p-1)===61)r=!0;else if(l===-1&&Ye[c]===1)a===-1&&(a=p);else if(a!==-1&&(c===32||c===9))l===-1&&(l=p);else if(c===59||c===44){if(a===-1)throw new SyntaxError(`Unexpected character at index ${p}`);l===-1&&(l=p);let h=d.slice(a,l);t&&(h=h.replace(/\\/g,""),t=!1),se(e,o,h),c===44&&(se(n,i,e),e=Object.create(null),i=void 0),o=void 0,a=l=-1}else throw new SyntaxError(`Unexpected character at index ${p}`);if(a===-1||r||c===32||c===9)throw new SyntaxError("Unexpected end of input");l===-1&&(l=p);let u=d.slice(a,l);return i===void 0?se(n,u,e):(o===void 0?se(e,u,!0):t?se(e,o,u.replace(/\\/g,"")):se(e,o,u),se(n,i,e)),n}function Or(d){return Object.keys(d).map(n=>{let e=d[n];return Array.isArray(e)||(e=[e]),e.map(t=>[n].concat(Object.keys(t).map(s=>{let r=t[s];return Array.isArray(r)||(r=[r]),r.map(i=>i===!0?s:`${s}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Xs.exports={format:Or,parse:Rr}});var xt=G((Yi,dn)=>{"use strict";var Lr=require("events"),$r=require("https"),Fr=require("http"),en=require("net"),Dr=require("tls"),{randomBytes:Nr,createHash:Br}=require("crypto"),{Duplex:Hi,Readable:Vi}=require("stream"),{URL:Jt}=require("url"),ue=qe(),jr=Ht(),zr=Qt(),{isBlob:Ur}=Oe(),{BINARY_TYPES:Js,CLOSE_TIMEOUT:Wr,EMPTY_BUFFER:gt,GUID:Gr,kForOnEventAttribute:Zt,kListener:qr,kStatusCode:Hr,kWebSocket:$,NOOP:tn}=ne(),{EventTarget:{addEventListener:Vr,removeEventListener:Yr}}=Ks(),{format:Qr,parse:Kr}=Xt(),{toBuffer:Xr}=We(),sn=Symbol("kAborted"),es=[8,13],oe=["CONNECTING","OPEN","CLOSING","CLOSED"],Jr=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,R=class d extends Lr{constructor(n,e,t){super(),this._binaryType=Js[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=gt,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=d.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,n!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,e===void 0?e=[]:Array.isArray(e)||(typeof e=="object"&&e!==null?(t=e,e=[]):e=[e]),nn(this,n,e,t)):(this._autoPong=t.autoPong,this._closeTimeout=t.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(n){Js.includes(n)&&(this._binaryType=n,this._receiver&&(this._receiver._binaryType=n))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(n,e,t){let s=new jr({allowSynchronousEvents:t.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxPayload:t.maxPayload,skipUTF8Validation:t.skipUTF8Validation}),r=new zr(n,this._extensions,t.generateMask);this._receiver=s,this._sender=r,this._socket=n,s[$]=this,r[$]=this,n[$]=this,s.on("conclude",ti),s.on("drain",si),s.on("error",ni),s.on("message",ri),s.on("ping",ii),s.on("pong",oi),r.onerror=ai,n.setTimeout&&n.setTimeout(0),n.setNoDelay&&n.setNoDelay(),e.length>0&&n.unshift(e),n.on("close",an),n.on("data",yt),n.on("end",cn),n.on("error",ln),this._readyState=d.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=d.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[ue.extensionName]&&this._extensions[ue.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=d.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(n,e){if(this.readyState!==d.CLOSED){if(this.readyState===d.CONNECTING){q(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===d.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=d.CLOSING,this._sender.close(n,e,!this._isServer,t=>{t||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),on(this)}}pause(){this.readyState===d.CONNECTING||this.readyState===d.CLOSED||(this._paused=!0,this._socket.pause())}ping(n,e,t){if(this.readyState===d.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof n=="function"?(t=n,n=e=void 0):typeof e=="function"&&(t=e,e=void 0),typeof n=="number"&&(n=n.toString()),this.readyState!==d.OPEN){ts(this,n,t);return}e===void 0&&(e=!this._isServer),this._sender.ping(n||gt,e,t)}pong(n,e,t){if(this.readyState===d.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof n=="function"?(t=n,n=e=void 0):typeof e=="function"&&(t=e,e=void 0),typeof n=="number"&&(n=n.toString()),this.readyState!==d.OPEN){ts(this,n,t);return}e===void 0&&(e=!this._isServer),this._sender.pong(n||gt,e,t)}resume(){this.readyState===d.CONNECTING||this.readyState===d.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(n,e,t){if(this.readyState===d.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"&&(t=e,e={}),typeof n=="number"&&(n=n.toString()),this.readyState!==d.OPEN){ts(this,n,t);return}let s={binary:typeof n!="string",mask:!this._isServer,compress:!0,fin:!0,...e};this._extensions[ue.extensionName]||(s.compress=!1),this._sender.send(n||gt,s,t)}terminate(){if(this.readyState!==d.CLOSED){if(this.readyState===d.CONNECTING){q(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=d.CLOSING,this._socket.destroy())}}};Object.defineProperty(R,"CONNECTING",{enumerable:!0,value:oe.indexOf("CONNECTING")});Object.defineProperty(R.prototype,"CONNECTING",{enumerable:!0,value:oe.indexOf("CONNECTING")});Object.defineProperty(R,"OPEN",{enumerable:!0,value:oe.indexOf("OPEN")});Object.defineProperty(R.prototype,"OPEN",{enumerable:!0,value:oe.indexOf("OPEN")});Object.defineProperty(R,"CLOSING",{enumerable:!0,value:oe.indexOf("CLOSING")});Object.defineProperty(R.prototype,"CLOSING",{enumerable:!0,value:oe.indexOf("CLOSING")});Object.defineProperty(R,"CLOSED",{enumerable:!0,value:oe.indexOf("CLOSED")});Object.defineProperty(R.prototype,"CLOSED",{enumerable:!0,value:oe.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(d=>{Object.defineProperty(R.prototype,d,{enumerable:!0})});["open","error","close","message"].forEach(d=>{Object.defineProperty(R.prototype,`on${d}`,{enumerable:!0,get(){for(let n of this.listeners(d))if(n[Zt])return n[qr];return null},set(n){for(let e of this.listeners(d))if(e[Zt]){this.removeListener(d,e);break}typeof n=="function"&&this.addEventListener(d,n,{[Zt]:!0})}})});R.prototype.addEventListener=Vr;R.prototype.removeEventListener=Yr;dn.exports=R;function nn(d,n,e,t){let s={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Wr,protocolVersion:es[1],maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...t,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(d._autoPong=s.autoPong,d._closeTimeout=s.closeTimeout,!es.includes(s.protocolVersion))throw new RangeError(`Unsupported protocol version: ${s.protocolVersion} (supported versions: ${es.join(", ")})`);let r;if(n instanceof Jt)r=n;else try{r=new Jt(n)}catch{throw new SyntaxError(`Invalid URL: ${n}`)}r.protocol==="http:"?r.protocol="ws:":r.protocol==="https:"&&(r.protocol="wss:"),d._url=r.href;let i=r.protocol==="wss:",o=r.protocol==="ws+unix:",a;if(r.protocol!=="ws:"&&!i&&!o?a=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:o&&!r.pathname?a="The URL's pathname is empty":r.hash&&(a="The URL contains a fragment identifier"),a){let f=new SyntaxError(a);if(d._redirects===0)throw f;ft(d,f);return}let c=i?443:80,l=Nr(16).toString("base64"),p=i?$r.request:Fr.request,u=new Set,h;if(s.createConnection=s.createConnection||(i?ei:Zr),s.defaultPort=s.defaultPort||c,s.port=r.port||c,s.host=r.hostname.startsWith("[")?r.hostname.slice(1,-1):r.hostname,s.headers={...s.headers,"Sec-WebSocket-Version":s.protocolVersion,"Sec-WebSocket-Key":l,Connection:"Upgrade",Upgrade:"websocket"},s.path=r.pathname+r.search,s.timeout=s.handshakeTimeout,s.perMessageDeflate&&(h=new ue(s.perMessageDeflate!==!0?s.perMessageDeflate:{},!1,s.maxPayload),s.headers["Sec-WebSocket-Extensions"]=Qr({[ue.extensionName]:h.offer()})),e.length){for(let f of e){if(typeof f!="string"||!Jr.test(f)||u.has(f))throw new SyntaxError("An invalid or duplicated subprotocol was specified");u.add(f)}s.headers["Sec-WebSocket-Protocol"]=e.join(",")}if(s.origin&&(s.protocolVersion<13?s.headers["Sec-WebSocket-Origin"]=s.origin:s.headers.Origin=s.origin),(r.username||r.password)&&(s.auth=`${r.username}:${r.password}`),o){let f=s.path.split(":");s.socketPath=f[0],s.path=f[1]}let m;if(s.followRedirects){if(d._redirects===0){d._originalIpc=o,d._originalSecure=i,d._originalHostOrSocketPath=o?s.socketPath:r.host;let f=t&&t.headers;if(t={...t,headers:{}},f)for(let[g,y]of Object.entries(f))t.headers[g.toLowerCase()]=y}else if(d.listenerCount("redirect")===0){let f=o?d._originalIpc?s.socketPath===d._originalHostOrSocketPath:!1:d._originalIpc?!1:r.host===d._originalHostOrSocketPath;(!f||d._originalSecure&&!i)&&(delete s.headers.authorization,delete s.headers.cookie,f||delete s.headers.host,s.auth=void 0)}s.auth&&!t.headers.authorization&&(t.headers.authorization="Basic "+Buffer.from(s.auth).toString("base64")),m=d._req=p(s),d._redirects&&d.emit("redirect",d.url,m)}else m=d._req=p(s);s.timeout&&m.on("timeout",()=>{q(d,m,"Opening handshake has timed out")}),m.on("error",f=>{m===null||m[sn]||(m=d._req=null,ft(d,f))}),m.on("response",f=>{let g=f.headers.location,y=f.statusCode;if(g&&s.followRedirects&&y>=300&&y<400){if(++d._redirects>s.maxRedirects){q(d,m,"Maximum redirects exceeded");return}m.abort();let v;try{v=new Jt(g,n)}catch{let k=new SyntaxError(`Invalid URL: ${g}`);ft(d,k);return}nn(d,v,e,t)}else d.emit("unexpected-response",m,f)||q(d,m,`Unexpected server response: ${f.statusCode}`)}),m.on("upgrade",(f,g,y)=>{if(d.emit("upgrade",f),d.readyState!==R.CONNECTING)return;m=d._req=null;let v=f.headers.upgrade;if(v===void 0||v.toLowerCase()!=="websocket"){q(d,g,"Invalid Upgrade header");return}let w=Br("sha1").update(l+Gr).digest("base64");if(f.headers["sec-websocket-accept"]!==w){q(d,g,"Invalid Sec-WebSocket-Accept header");return}let k=f.headers["sec-websocket-protocol"],C;if(k!==void 0?u.size?u.has(k)||(C="Server sent an invalid subprotocol"):C="Server sent a subprotocol but none was requested":u.size&&(C="Server sent no subprotocol"),C){q(d,g,C);return}k&&(d._protocol=k);let P=f.headers["sec-websocket-extensions"];if(P!==void 0){if(!h){q(d,g,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let T;try{T=Kr(P)}catch{q(d,g,"Invalid Sec-WebSocket-Extensions header");return}let b=Object.keys(T);if(b.length!==1||b[0]!==ue.extensionName){q(d,g,"Server indicated an extension that was not requested");return}try{h.accept(T[ue.extensionName])}catch{q(d,g,"Invalid Sec-WebSocket-Extensions header");return}d._extensions[ue.extensionName]=h}d.setSocket(g,y,{allowSynchronousEvents:s.allowSynchronousEvents,generateMask:s.generateMask,maxPayload:s.maxPayload,skipUTF8Validation:s.skipUTF8Validation})}),s.finishRequest?s.finishRequest(m,d):m.end()}function ft(d,n){d._readyState=R.CLOSING,d._errorEmitted=!0,d.emit("error",n),d.emitClose()}function Zr(d){return d.path=d.socketPath,en.connect(d)}function ei(d){return d.path=void 0,!d.servername&&d.servername!==""&&(d.servername=en.isIP(d.host)?"":d.host),Dr.connect(d)}function q(d,n,e){d._readyState=R.CLOSING;let t=new Error(e);Error.captureStackTrace(t,q),n.setHeader?(n[sn]=!0,n.abort(),n.socket&&!n.socket.destroyed&&n.socket.destroy(),process.nextTick(ft,d,t)):(n.destroy(t),n.once("error",d.emit.bind(d,"error")),n.once("close",d.emitClose.bind(d)))}function ts(d,n,e){if(n){let t=Ur(n)?n.size:Xr(n).length;d._socket?d._sender._bufferedBytes+=t:d._bufferedAmount+=t}if(e){let t=new Error(`WebSocket is not open: readyState ${d.readyState} (${oe[d.readyState]})`);process.nextTick(e,t)}}function ti(d,n){let e=this[$];e._closeFrameReceived=!0,e._closeMessage=n,e._closeCode=d,e._socket[$]!==void 0&&(e._socket.removeListener("data",yt),process.nextTick(rn,e._socket),d===1005?e.close():e.close(d,n))}function si(){let d=this[$];d.isPaused||d._socket.resume()}function ni(d){let n=this[$];n._socket[$]!==void 0&&(n._socket.removeListener("data",yt),process.nextTick(rn,n._socket),n.close(d[Hr])),n._errorEmitted||(n._errorEmitted=!0,n.emit("error",d))}function Zs(){this[$].emitClose()}function ri(d,n){this[$].emit("message",d,n)}function ii(d){let n=this[$];n._autoPong&&n.pong(d,!this._isServer,tn),n.emit("ping",d)}function oi(d){this[$].emit("pong",d)}function rn(d){d.resume()}function ai(d){let n=this[$];n.readyState!==R.CLOSED&&(n.readyState===R.OPEN&&(n._readyState=R.CLOSING,on(n)),this._socket.end(),n._errorEmitted||(n._errorEmitted=!0,n.emit("error",d)))}function on(d){d._closeTimer=setTimeout(d._socket.destroy.bind(d._socket),d._closeTimeout)}function an(){let d=this[$];if(this.removeListener("close",an),this.removeListener("data",yt),this.removeListener("end",cn),d._readyState=R.CLOSING,!this._readableState.endEmitted&&!d._closeFrameReceived&&!d._receiver._writableState.errorEmitted&&this._readableState.length!==0){let n=this.read(this._readableState.length);d._receiver.write(n)}d._receiver.end(),this[$]=void 0,clearTimeout(d._closeTimer),d._receiver._writableState.finished||d._receiver._writableState.errorEmitted?d.emitClose():(d._receiver.on("error",Zs),d._receiver.on("finish",Zs))}function yt(d){this[$]._receiver.write(d)||this.pause()}function cn(){let d=this[$];d._readyState=R.CLOSING,d._receiver.end(),this.end()}function ln(){let d=this[$];this.removeListener("error",ln),this.on("error",tn),d&&(d._readyState=R.CLOSING,this.destroy())}});var mn=G((Ki,hn)=>{"use strict";var Qi=xt(),{Duplex:ci}=require("stream");function pn(d){d.emit("close")}function li(){!this.destroyed&&this._writableState.finished&&this.destroy()}function un(d){this.removeListener("error",un),this.destroy(),this.listenerCount("error")===0&&this.emit("error",d)}function di(d,n){let e=!0,t=new ci({...n,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return d.on("message",function(r,i){let o=!i&&t._readableState.objectMode?r.toString():r;t.push(o)||d.pause()}),d.once("error",function(r){t.destroyed||(e=!1,t.destroy(r))}),d.once("close",function(){t.destroyed||t.push(null)}),t._destroy=function(s,r){if(d.readyState===d.CLOSED){r(s),process.nextTick(pn,t);return}let i=!1;d.once("error",function(a){i=!0,r(a)}),d.once("close",function(){i||r(s),process.nextTick(pn,t)}),e&&d.terminate()},t._final=function(s){if(d.readyState===d.CONNECTING){d.once("open",function(){t._final(s)});return}d._socket!==null&&(d._socket._writableState.finished?(s(),t._readableState.endEmitted&&t.destroy()):(d._socket.once("finish",function(){s()}),d.close()))},t._read=function(){d.isPaused&&d.resume()},t._write=function(s,r,i){if(d.readyState===d.CONNECTING){d.once("open",function(){t._write(s,r,i)});return}d.send(s,i)},t.on("end",li),t.on("error",un),t}hn.exports=di});var fn=G((Xi,gn)=>{"use strict";var{tokenChars:pi}=Oe();function ui(d){let n=new Set,e=-1,t=-1,s=0;for(s;s<d.length;s++){let i=d.charCodeAt(s);if(t===-1&&pi[i]===1)e===-1&&(e=s);else if(s!==0&&(i===32||i===9))t===-1&&e!==-1&&(t=s);else if(i===44){if(e===-1)throw new SyntaxError(`Unexpected character at index ${s}`);t===-1&&(t=s);let o=d.slice(e,t);if(n.has(o))throw new SyntaxError(`The "${o}" subprotocol is duplicated`);n.add(o),e=t=-1}else throw new SyntaxError(`Unexpected character at index ${s}`)}if(e===-1||t!==-1)throw new SyntaxError("Unexpected end of input");let r=d.slice(e,s);if(n.has(r))throw new SyntaxError(`The "${r}" subprotocol is duplicated`);return n.add(r),n}gn.exports={parse:ui}});var Cn=G((Zi,kn)=>{"use strict";var hi=require("events"),vt=require("http"),{Duplex:Ji}=require("stream"),{createHash:mi}=require("crypto"),yn=Xt(),ve=qe(),gi=fn(),fi=xt(),{CLOSE_TIMEOUT:yi,GUID:xi,kWebSocket:vi}=ne(),wi=/^[+/0-9A-Za-z]{22}==$/,xn=0,vn=1,bn=2,ss=class extends hi{constructor(n,e){if(super(),n={allowSynchronousEvents:!0,autoPong:!0,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:yi,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:fi,...n},n.port==null&&!n.server&&!n.noServer||n.port!=null&&(n.server||n.noServer)||n.server&&n.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(n.port!=null?(this._server=vt.createServer((t,s)=>{let r=vt.STATUS_CODES[426];s.writeHead(426,{"Content-Length":r.length,"Content-Type":"text/plain"}),s.end(r)}),this._server.listen(n.port,n.host,n.backlog,e)):n.server&&(this._server=n.server),this._server){let t=this.emit.bind(this,"connection");this._removeListeners=bi(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(s,r,i)=>{this.handleUpgrade(s,r,i,t)}})}n.perMessageDeflate===!0&&(n.perMessageDeflate={}),n.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=n,this._state=xn}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(n){if(this._state===bn){n&&this.once("close",()=>{n(new Error("The server is not running"))}),process.nextTick(Qe,this);return}if(n&&this.once("close",n),this._state!==vn)if(this._state=vn,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Qe,this):process.nextTick(Qe,this);else{let e=this._server;this._removeListeners(),this._removeListeners=this._server=null,e.close(()=>{Qe(this)})}}shouldHandle(n){if(this.options.path){let e=n.url.indexOf("?");if((e!==-1?n.url.slice(0,e):n.url)!==this.options.path)return!1}return!0}handleUpgrade(n,e,t,s){e.on("error",wn);let r=n.headers["sec-websocket-key"],i=n.headers.upgrade,o=+n.headers["sec-websocket-version"];if(n.method!=="GET"){we(this,n,e,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){we(this,n,e,400,"Invalid Upgrade header");return}if(r===void 0||!wi.test(r)){we(this,n,e,400,"Missing or invalid Sec-WebSocket-Key header");return}if(o!==13&&o!==8){we(this,n,e,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(n)){Ke(e,400);return}let a=n.headers["sec-websocket-protocol"],c=new Set;if(a!==void 0)try{c=gi.parse(a)}catch{we(this,n,e,400,"Invalid Sec-WebSocket-Protocol header");return}let l=n.headers["sec-websocket-extensions"],p={};if(this.options.perMessageDeflate&&l!==void 0){let u=new ve(this.options.perMessageDeflate,!0,this.options.maxPayload);try{let h=yn.parse(l);h[ve.extensionName]&&(u.accept(h[ve.extensionName]),p[ve.extensionName]=u)}catch{we(this,n,e,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let u={origin:n.headers[`${o===8?"sec-websocket-origin":"origin"}`],secure:!!(n.socket.authorized||n.socket.encrypted),req:n};if(this.options.verifyClient.length===2){this.options.verifyClient(u,(h,m,f,g)=>{if(!h)return Ke(e,m||401,f,g);this.completeUpgrade(p,r,c,n,e,t,s)});return}if(!this.options.verifyClient(u))return Ke(e,401)}this.completeUpgrade(p,r,c,n,e,t,s)}completeUpgrade(n,e,t,s,r,i,o){if(!r.readable||!r.writable)return r.destroy();if(r[vi])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>xn)return Ke(r,503);let c=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${mi("sha1").update(e+xi).digest("base64")}`],l=new this.options.WebSocket(null,void 0,this.options);if(t.size){let p=this.options.handleProtocols?this.options.handleProtocols(t,s):t.values().next().value;p&&(c.push(`Sec-WebSocket-Protocol: ${p}`),l._protocol=p)}if(n[ve.extensionName]){let p=n[ve.extensionName].params,u=yn.format({[ve.extensionName]:[p]});c.push(`Sec-WebSocket-Extensions: ${u}`),l._extensions=n}this.emit("headers",c,s),r.write(c.concat(`\r
`).join(`\r
`)),r.removeListener("error",wn),l.setSocket(r,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(l),l.on("close",()=>{this.clients.delete(l),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Qe,this)})),o(l,s)}};kn.exports=ss;function bi(d,n){for(let e of Object.keys(n))d.on(e,n[e]);return function(){for(let t of Object.keys(n))d.removeListener(t,n[t])}}function Qe(d){d._state=bn,d.emit("close")}function wn(){this.destroy()}function Ke(d,n,e,t){e=e||vt.STATUS_CODES[n],t={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(e),...t},d.once("finish",d.destroy),d.end(`HTTP/1.1 ${n} ${vt.STATUS_CODES[n]}\r
`+Object.keys(t).map(s=>`${s}: ${t[s]}`).join(`\r
`)+`\r
\r
`+e)}function we(d,n,e,t,s,r){if(d.listenerCount("wsClientError")){let i=new Error(s);Error.captureStackTrace(i,we),d.emit("wsClientError",i,e,n)}else Ke(e,t,s,r)}});var Mi={};tr(Mi,{activate:()=>_i,deactivate:()=>Ii});module.exports=sr(Mi);var D=S(require("vscode"));var ys=S(require("vscode")),ot=class{static getHtml(n,e,t){let s=n.asWebviewUri(ys.Uri.joinPath(e,"images","logo.png"));return`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https:; script-src 'unsafe-inline' https:; img-src ${n.cspSource} https: data:; font-src https:;">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

        <style>
                :root {
                    /* Base Colors */
                    --bg-app: var(--vscode-sideBar-background);
                    --bg-hover: var(--vscode-list-hoverBackground);
                    --bg-card: var(--vscode-editor-background);
                    --text-primary: var(--vscode-editor-foreground);
                    --text-secondary: var(--vscode-descriptionForeground);
                    --border: var(--vscode-panel-border);
                    --accent: var(--vscode-button-background);
                    --accent-foreground: var(--vscode-button-foreground);
                    --accent-hover: var(--vscode-button-hoverBackground);
                    --input-bg: var(--vscode-input-background);
                    --input-fg: var(--vscode-input-foreground);
                    --input-border: var(--vscode-input-border);
                    --focus-border: var(--vscode-focusBorder);
                    
                    /* Modern Palette & Effects */
                    --gradient-primary: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
                    --gradient-hover: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
                    --glass-bg: rgba(var(--vscode-sideBar-background-rgb), 0.7);
                    --glass-border: rgba(255, 255, 255, 0.08);
                    --backdrop-blur: 12px;
                    
                    /* Shadows */
                    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
                    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
                    --shadow-glow: 0 0 15px rgba(139, 92, 246, 0.3);
                    
                    /* Spacing & Layout */
                    --radius-sm: 6px;
                    --radius-md: 8px;
                    --radius-lg: 12px;
                    --radius-xl: 16px;
                    --spacing-xs: 4px;
                    --spacing-sm: 8px;
                    --spacing-md: 12px;
                    --spacing-lg: 16px;
                    --spacing-xl: 24px;

                    /* Code Blocks */
                    --code-bg: var(--vscode-editor-background);
                    --code-header-bg: var(--vscode-editorGroupHeader-tabsBackground);
                    
                    /* Tags */
                    --tag-bg: rgba(139, 92, 246, 0.1);
                    --tag-text: #8B5CF6;
                    --tag-border: rgba(139, 92, 246, 0.2);

                    /* Font Families */
                    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
                    
                    /* Animations */
                    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
                    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Layout: Left Todo Panel + Right Chat Area */
                .layout { display: flex; height: 100%; }
                .todo-panel { width: 320px; border-right: 1px solid var(--border); background: var(--bg-card); padding: 12px; overflow: auto; }
                .chat-panel { flex: 1; display: flex; flex-direction: column; height: 100%; }
                .todo-title { font-weight: 600; font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 8px; }
                .todo-list { display: flex; flex-direction: column; gap: 8px; }
                .todo-item { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.04); }
                .todo-item.completed { opacity: .6; text-decoration: line-through; }
                .todo-item .check { width: 14px; height: 14px; border: 2px solid var(--border); border-radius: 3px; display: inline-block; cursor: pointer; }
                .todo-item .title { flex: 1; font-size: 13px; }
                .todo-item .actions { display: flex; gap: 6px; }
                .todo-input { display: flex; gap: 6px; margin-top: 8px; }
                .todo-input input { flex: 1; padding: 8px; border-radius: 6px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text-primary); }
                .todo-input button { padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-hover); color: var(--text-primary); cursor: pointer; }
                /* Chat header remains visible on the right */
                #chat-container { position: relative; }

                /* Body & Global Reset */
                *, *:before, *:after {
                    box-sizing: border-box;
                }

        body {
                    margin: 0; padding: 0;
                    background: var(--bg-app);
                    color: var(--text-primary);
                    font-family: var(--font-sans);
                    height: 100vh;
                    display: flex; flex-direction: column;
                    overflow: hidden;
                    line-height: 1.5;
                    -webkit-font-smoothing: antialiased;
                }

                /* Layout wrapper for To-dos and Chat */
        

                /* Custom Scrollbar */
                ::-webkit-scrollbar { width: 6px; height: 6px; }
                ::-webkit-scrollbar-thumb { 
                    background: var(--vscode-scrollbarSlider-background); 
                    border-radius: 3px; 
                }
                ::-webkit-scrollbar-thumb:hover { background: var(--vscode-scrollbarSlider-hoverBackground); }
                ::-webkit-scrollbar-track { background: transparent; }

                /* Utility Classes */
                .hidden { display: none !important; }
                .flex { display: flex; }
                .flex-col { display: flex; flex-direction: column; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .gap-2 { gap: 0.5rem; }
                .gap-4 { gap: 1rem; }


                /* Glass Header */
                header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0 var(--spacing-lg); height: 56px;
                    border-bottom: 1px solid var(--glass-border);
                    background: var(--glass-bg); position: sticky; top: 0; z-index: 100;
                    backdrop-filter: blur(var(--backdrop-blur)); -webkit-backdrop-filter: blur(var(--backdrop-blur));
                    box-shadow: var(--shadow-sm);
                }

                .brand {
                    font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: var(--spacing-sm);
                    color: var(--text-primary);
                    letter-spacing: -0.01em;
                }
                .logo-img { 
                    width: 24px; height: 24px; object-fit: contain; 
                    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
                }
                
                .header-actions { display: flex; align-items: center; gap: var(--spacing-xs); }

                /* Model Selector */
                .model-selector-container {
                    display: flex; align-items: center; gap: var(--spacing-xs); margin-right: var(--spacing-sm);
                    background: var(--bg-hover); padding: 4px 8px; border-radius: var(--radius-md);
                    border: 1px solid transparent;
                    transition: all 0.2s ease;
                }
                .model-selector-container:hover {
                    border-color: var(--accent);
                    background: var(--bg-card);
                }

                .model-select {
                    appearance: none; -webkit-appearance: none;
                    background: var(--input-bg);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-size: 12px; font-weight: 500; outline: none; cursor: pointer;
                    padding: 6px 28px 6px 10px;
                    font-family: var(--font-sans);
                    transition: all 0.2s;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 6px center;
                    background-size: 14px;
                    min-width: 120px;
                }
                .model-select:hover {
                    border-color: var(--accent);
                    background-color: var(--bg-hover);
                }
                .model-select:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                }

                .btn-icon {
                    background: transparent; border: 1px solid transparent; color: var(--text-secondary);
                    cursor: pointer; padding: 6px; border-radius: var(--radius-md);
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s var(--ease-out);
                    width: 32px; height: 32px;
                }
                .btn-icon:hover { 
                    background: var(--bg-hover); color: var(--text-primary); 
                    transform: translateY(-1px);
                }
                .btn-icon:active { transform: translateY(0); }

                /* Chat Area */
                #chat-container {
                    flex: 1; overflow-y: auto; padding: var(--spacing-lg) var(--spacing-xl);
                    display: flex; flex-direction: column; gap: var(--spacing-xl);
                    scroll-behavior: smooth;
                }

                /* Messages */
                .message { 
                    display: flex; gap: var(--spacing-md);
                    max-width: 100%; 
                    animation: slideIn 0.3s var(--ease-out);
                    position: relative;
                }
                
                @keyframes slideIn { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                
                .content { 
                    position: relative; font-size: 14px; line-height: 1.6; 
                    word-wrap: break-word; font-family: var(--font-sans);
                }
                
                /* Message Actions */
                .msg-actions {
                    display: flex;
                    flex-direction: row;
                    gap: var(--spacing-sm);
                    margin-top: 4px;
                }

                /* User Message */
                .message.user { 
                    flex-direction: row-reverse; 
                }
                .message.user .content {
                    background: var(--accent); color: white;
                    padding: var(--spacing-md) var(--spacing-lg); 
                    border-radius: var(--radius-xl);
                    border-bottom-right-radius: 2px;
                    max-width: 85%;
                    box-shadow: var(--shadow-md);
                }

                /* Assistant Message */
                .message.assistant { 
                    flex-direction: column; 
                    width: 100%; 
                }
                .message.assistant .content {
                    background: transparent;
                    color: var(--text-primary);
                    padding: 0;
                    width: 100%;
                }

                /* Code Blocks in Assistant Message */
                .message.assistant pre {
                    background: var(--code-bg);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    margin: var(--spacing-md) 0;
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                }
                .message.assistant code {
                    font-family: var(--font-mono);
                    font-size: 13px;
                }


                /* Settings Page Overlay */
                .settings-page {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: var(--bg-app); z-index: 200;
                    display: flex; flex-direction: column;
                    transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .settings-page.open { transform: translateY(0); }
                
                .settings-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 16px 24px; border-bottom: 1px solid var(--border);
                    background: var(--bg-app);
                }
                .settings-title { font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
                
                .settings-body { flex: 1; display: flex; overflow: hidden; }
                
                .settings-sidebar {
                    width: 200px; border-right: 1px solid var(--border);
                    padding: 16px; display: flex; flex-direction: column; gap: 4px;
                    background: var(--bg-app);
                }
                
                .settings-nav-item {
                    padding: 10px 12px; border-radius: 8px; cursor: pointer;
                    color: var(--text-secondary); font-size: 13px; font-weight: 500;
                    display: flex; align-items: center; gap: 8px;
                    transition: all 0.2s;
                }
                .settings-nav-item:hover { background: var(--bg-hover); color: var(--text-primary); }
                .settings-nav-item.active { background: var(--bg-hover); color: var(--accent); font-weight: 600; }
                
                .settings-content-panel { flex: 1; overflow-y: auto; padding: 24px 32px; }
                .settings-section { display: none; animation: fadeIn 0.3s ease; }
                .settings-section.active { display: block; }
                
                .section-title { font-size: 14px; font-weight: 600; color: var(--text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
                
                /* Model Manager Styles */
                .model-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
                .model-item {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 12px 16px; background: var(--input-bg);
                    border: 1px solid var(--border); border-radius: 10px;
                    transition: all 0.2s;
                }
                .model-item:hover { border-color: var(--accent); box-shadow: var(--shadow-sm); }
                
                .model-info { display: flex; flex-direction: column; gap: 2px; }
                .model-name { font-weight: 600; font-size: 14px; color: var(--text-primary); }
                .model-meta { font-size: 11px; color: var(--text-secondary); display: flex; gap: 8px; }
                
                .model-actions { display: flex; gap: 8px; }
                .btn-danger {
                    color: #ff5f56; background: rgba(255, 95, 86, 0.1);
                    border: none; padding: 6px 10px; border-radius: 6px;
                    cursor: pointer; font-size: 12px; font-weight: 500;
                    transition: all 0.2s;
                }
                .btn-danger:hover { background: rgba(255, 95, 86, 0.2); }
                
                .add-model-card {
                    background: var(--bg-hover); border-radius: 12px; padding: 16px;
                    border: 1px dashed var(--border);
                }
                .model-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 12px; margin-top: 12px;
                }
                .model-option-card {
                    background: var(--input-bg); border: 1px solid var(--border);
                    border-radius: 8px; padding: 12px; cursor: pointer;
                    display: flex; flex-direction: column; gap: 4px;
                    transition: all 0.2s;
                }
                .model-option-card:hover { border-color: var(--accent); transform: translateY(-2px); }
                .model-option-name { font-weight: 600; font-size: 13px; }
                .model-option-size { font-size: 11px; color: var(--text-secondary); }
                
                /* Settings Form */
                .form-group { margin-bottom: 20px; }
                .form-label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 13px; }
                .form-desc { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4; }
                
                /* ... existing styles ... */

                .btn-send {
                    background: var(--accent); color: white; border: none;
                    border-radius: 50% !important; /* Forced round */
                    width: 40px; height: 40px;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
                }
                .thinking-indicator {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    background: rgba(59, 130, 246, 0.08);
                    border-radius: 12px;
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    animation: fadeIn 0.3s ease;
                    max-width: fit-content;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .thinking-dots {
                    display: flex;
                    gap: 4px;
                }
                
                .thinking-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--accent);
                    animation: dotPulse 1.4s ease-in-out infinite;
                }
                
                .thinking-dot:nth-child(1) { animation-delay: 0s; }
                .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
                .thinking-dot:nth-child(3) { animation-delay: 0.4s; }
                
                @keyframes dotPulse {
                    0%, 80%, 100% { 
                        opacity: 0.3;
                        transform: scale(0.8);
                    }
                    40% { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .thinking-text {
                    font-size: 13px;
                    color: var(--accent);
                    font-weight: 500;
                }

                /* Markdown Styles */
                .content p { margin: 8px 0; }
                .content p:first-child { margin-top: 0; }
                .content p:last-child { margin-bottom: 0; }
                .content strong { font-weight: 600; color: var(--text-primary); }
                .content a { color: var(--accent); text-decoration: none; }
                .content a:hover { text-decoration: underline; }
                
                /* Inline Code */
                .content :not(pre) > code {
                    font-family: var(--font-mono); font-size: 12px;
                    background: rgba(127,127,127,0.12); padding: 3px 6px; border-radius: 6px; 
                    color: var(--text-primary);
                    border: 1px solid rgba(127,127,127,0.1);
                }
                
                /* Code Blocks - Premium */
                .content pre {
                    background: var(--code-bg);
                    border: 1px solid var(--border); border-radius: 12px;
                    margin: 16px 0; overflow: hidden;
                    box-shadow: var(--shadow-md);
                    transition: all 0.2s ease;
                }
                .content pre:hover {
                    box-shadow: var(--shadow-lg);
                    border-color: var(--accent);
                }
                
                .code-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 10px 16px; background: var(--code-header-bg);
                    border-bottom: 1px solid var(--border);
                }
                
                .window-dots { display: flex; gap: 6px; opacity: 0.7; }
                .dot { width: 10px; height: 10px; border-radius: 50%; }
                .dot.red { background: #ff5f56; }
                .dot.yellow { background: #ffbd2e; }
                .dot.green { background: #27c93f; }
                
                .code-lang { 
                    font-size: 11px; font-weight: 700; color: var(--text-secondary); 
                    text-transform: uppercase; letter-spacing: 0.5px;
                }
                
                .code-actions { display: flex; gap: 8px; }

                .copy-btn {
                    padding: 4px 8px; font-size: 11px; border-radius: 6px;
                    background: rgba(255,255,255,0.05); border: 1px solid transparent;
                    color: var(--text-secondary); cursor: pointer;
                    display: flex; align-items: center; gap: 6px;
                    transition: all 0.2s; font-weight: 500;
                }
                .copy-btn:hover { 
                    background: var(--accent); color: white; border-color: transparent;
                    transform: translateY(-1px);
                }
                
                .content pre code { 
                    display: block; padding: 16px; overflow-x: auto; 
                    font-size: 13px; line-height: 1.5;
                }

                /* Simple Typing Indicator - fallback */
                .typing-indicator {
                    display: none;
                }

                /* Input Section - Floating Style */
                .input-section {
                    padding: 20px; 
                    background: transparent;
                    position: relative; 
                    z-index: 20;
                    margin-top: auto; /* Push to bottom by default */
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                    width: 100%;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                }

                /* New Chat State - Centered Input */
                body.new-chat #input-container {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    max-width: 800px;
                    padding: 0 32px;
                    box-sizing: border-box;
                    background: transparent;
                    border-top: none;
                }
                
                body.new-chat #chat-container {
                    opacity: 0;
                    pointer-events: none;
                }

                /* Gradient Mask for scroll transition */
                .input-section::before {
                    content: ''; position: absolute; inset: 0;
                    background: var(--bg-app);
                    mask-image: linear-gradient(to bottom, transparent, black 12px);
                    -webkit-mask-image: linear-gradient(to bottom, transparent, black 12px);
                    backdrop-filter: blur(8px);
                    z-index: -1;
                    border-top: 1px solid var(--border);
                    opacity: 1;
                    transition: opacity 0.3s;
                }
                
                body.new-chat #input-container::before {
                    opacity: 0; /* No background in centered mode */
                    border-top: none;
                }

                .input-box {
                    background: var(--input-bg); border: none;
                    border-radius: 16px; padding: 12px 14px;
                    display: flex; flex-direction: column; gap: 8px;
                    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
                    box-shadow: var(--shadow-md);
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }
                .input-box:focus-within {
                    box-shadow: var(--shadow-lg);
                }
                
                /* Highlighting */
                .input-wrapper { position: relative; width: 100%; }
                /* Input Area */
                #input-container {
                    padding: var(--spacing-lg);
                    background: var(--bg-app);
                    border-top: 1px solid var(--border);
                    position: relative; z-index: 50;
                }
                
                .input-wrapper {
                    background: var(--input-bg);
                    border: 1px solid var(--input-border);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md);
                    transition: all 0.2s var(--ease-out);
                    display: flex; flex-direction: column; gap: var(--spacing-sm);
                    box-shadow: var(--shadow-sm);
                    box-sizing: border-box;
                    width: 100%;
                }
                .input-wrapper:focus-within {
                    border-color: var(--focus-border);
                    box-shadow: 0 0 0 2px rgba(var(--vscode-focusBorder-rgb), 0.2);
                }

                .input-editor {
                    position: relative;
                    min-height: 24px;
                }
                
                .input-highlight {
                    position: absolute; top: 0; left: 0; right: 0;
                    pointer-events: none; white-space: pre-wrap; word-wrap: break-word;
                    font-family: inherit; font-size: 14px; line-height: 1.5;
                    padding: 0; color: transparent;
                    max-height: 200px; overflow: hidden;
                }
                .input-highlight .mention {
                    color: transparent; background: rgba(0, 198, 255, 0.15);
                    border-radius: 4px; padding: 0 2px;
                    border: 1px solid rgba(0, 198, 255, 0.3);
                }
                .input-highlight .command {
                    color: transparent; background: rgba(168, 85, 247, 0.15);
                    border-radius: 4px; padding: 0 2px;
                    border: 1px solid rgba(168, 85, 247, 0.3);
                }
                
                textarea {
                    position: relative; z-index: 1;
                    width: 100%; border: none; background: transparent; color: var(--input-fg);
                    font-family: inherit; font-size: 14px; resize: none; outline: none;
                    max-height: 200px; min-height: 24px; padding: 0; line-height: 1.5;
                    box-sizing: border-box;
                    height: 24px;
                }
                
                .input-actions { display: flex; justify-content: flex-end; align-items: center; gap: var(--spacing-sm); }
                
                /* Action Buttons */
                .btn-icon {
                    width: 32px; height: 32px; border-radius: var(--radius-md);
                }
                
                .btn-send {
                    background: var(--accent); color: white; border: none;
                    border-radius: var(--radius-md); width: 32px; height: 32px;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s var(--ease-out);
                    box-shadow: var(--shadow-sm);
                }
                .btn-send:hover { 
                    background: var(--accent-hover); 
                    transform: translateY(-1px); 
                    box-shadow: var(--shadow-md); 
                }
                .btn-send:active { transform: translateY(0); }
                .btn-send.disabled {
                    opacity: 0.5; cursor: not-allowed; background: var(--text-secondary);
                    box-shadow: none; pointer-events: none; transform: none;
                }
                .btn-send span { display: none; }

                .btn-stop {
                    background: #ef4444; color: white; border: none;
                    border-radius: var(--radius-md); width: 32px; height: 32px;
                    cursor: pointer; display: none; align-items: center; justify-content: center;
                    transition: all 0.2s var(--ease-out);
                    box-shadow: var(--shadow-sm);
                }
                .btn-stop:hover { 
                    background: #dc2626; transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                }
                .btn-stop:active { transform: translateY(0); }

                /* Scroll to Bottom Button */
                #scrollToBottomBtn {
                    position: fixed; bottom: 100px; right: 24px;
                    width: 36px; height: 36px; border-radius: 50%;
                    background: var(--bg-card); color: var(--text-primary);
                    border: 1px solid var(--border);
                    cursor: pointer; display: none;
                    align-items: center; justify-content: center;
                    box-shadow: var(--shadow-md);
                    transition: all 0.2s var(--ease-out);
                    z-index: 90;
                }
                #scrollToBottomBtn:hover { 
                    background: var(--bg-hover); transform: translateY(-2px); 
                    box-shadow: var(--shadow-lg); 
                }
                #scrollToBottomBtn.show { display: flex; animation: slideIn 0.3s var(--ease-out); }

                /* Drawers */
                .drawer {
                    position: absolute; top: 0; right: 0; bottom: 0; width: 0;
                    background: var(--bg-app); 
                    transition: width 0.3s var(--ease-in-out);
                    overflow: hidden; z-index: 100;
                    display: flex; flex-direction: column;
                    border-left: 1px solid var(--border);
                    box-shadow: -5px 0 20px rgba(0,0,0,0.1);
                }
                #session-drawer.open { width: 100%; }
                #plan-drawer.open { width: 350px; }
                @media (max-width: 600px) { #plan-drawer.open { width: 100%; } }

                .drawer-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-bottom: 1px solid var(--border);
                    background: var(--bg-card);
                    font-weight: 600;
                }

                .plan-content { flex: 1; overflow-y: auto; padding: var(--spacing-lg); }
                .plan-item {
                    display: flex; align-items: flex-start; gap: var(--spacing-md);
                    padding: var(--spacing-md); border-radius: var(--radius-md);
                    border: 1px solid var(--border);
                    margin-bottom: 8px; background: var(--bg-app);
                    transition: all 0.2s;
                }
                .plan-item:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); }
                
                .plan-status-icon {
                    width: 20px; height: 20px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 50%; font-size: 12px;
                }
                
                .plan-item.completed { border-color: #22c55e; background: rgba(34, 197, 94, 0.05); }
                .plan-item.completed .plan-status-icon { background: #22c55e; color: white; }
                
                .plan-item.in_progress { border-color: var(--accent); background: rgba(59, 130, 246, 0.05); }
                .plan-item.in_progress .plan-status-icon { background: var(--accent); color: white; animation: pulse 2s infinite; }
                
                .plan-item.pending { border-color: var(--border); opacity: 0.7; }
                .plan-item.pending .plan-status-icon { background: var(--text-secondary); color: white; }
                
                .plan-item.failed { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
                .plan-item.failed .plan-status-icon { background: #ef4444; color: white; }

                .plan-details { flex: 1; font-size: 13px; }
                .plan-title { font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
                .plan-desc { color: var(--text-secondary); font-size: 12px; line-height: 1.4; }
                
                .drawer-header {
                    padding: 0; border-bottom: 1px solid var(--border);
                    background: var(--bg-app);
                    display: flex; flex-direction: column;
                }

                .drawer-top-bar {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 16px 20px 8px 20px;
                    font-size: 13px; font-weight: 600; color: var(--text-secondary);
                }

                .search-container {
                    padding: 0 16px 16px 16px;
                }
                
                .session-search-input {
                    box-sizing: border-box; /* ensure padding doesn't overflow */
                    width: 100%;
                    padding: 8px 12px;
                    border-radius: 8px;
                    background: var(--input-bg);
                    border: 1px solid var(--border);
                    color: var(--text-primary);
                    font-family: inherit; font-size: 13px;
                    outline: none; transition: all 0.2s;
                }
                .session-search-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                }
                .session-search-input::placeholder { color: var(--text-secondary); opacity: 0.7; }

                .session-list { flex: 1; overflow-y: auto; padding: 12px 16px; }
                
                /* Session Group Header */
                .session-group-header {
                    padding: 8px 4px; font-size: 11px; font-weight: 600; 
                    color: var(--text-secondary); text-transform: uppercase; 
                    margin-top: 12px; letter-spacing: 0.5px;
                }
                .session-group-header:first-child { margin-top: 0; }

                /* Session Item Card */
                .session-link {
                    padding: 12px; border-radius: 12px; cursor: pointer;
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 6px; border: 1px solid transparent;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    background: transparent;
                }
                .session-link:hover { 
                    background: var(--bg-hover); 
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-sm);
                }
                
                /* Current Active Session Styling */
                .session-link.active { 
                    background: rgba(59, 130, 246, 0.1); 
                    border: 1px solid rgba(59, 130, 246, 0.2); 
                }
                .session-link.active .session-title { color: var(--accent); font-weight: 600; }
                
                .session-info { display: flex; flex-direction: column; gap: 4px; overflow: hidden; flex: 1; margin-right: 12px; }
                
                .session-title {
                    font-size: 13px; color: var(--text-primary);
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .session-meta {
                    display: flex; align-items: center; gap: 6px;
                    font-size: 11px; color: var(--text-secondary);
                }

                .session-actions {
                    display: flex; align-items: center; gap: 4px; opacity: 0;
                    transition: opacity 0.2s;
                }
                .session-link:hover .session-actions, .session-link.active .session-actions { opacity: 1; }
                
                .btn-session-action {
                    color: var(--text-secondary); cursor: pointer; padding: 6px; 
                    border-radius: 6px; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center;
                    border: none; background: transparent;
                }
                .btn-session-action:hover { background: var(--bg-hover); color: var(--text-primary); }
                .btn-session-action.delete:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
                
                .empty-greeting {
                     font-size: 24px; font-weight: 700;
                     color: var(--text-primary);
                     margin-bottom: 8px;
                     text-align: center;
                     opacity: 0.9;
                }
                .empty-subtitle {
                     font-size: 14px;
                     color: var(--text-secondary);
                     text-align: center;
                     margin-bottom: 24px;
                }
                
                .drawer-footer { padding: 16px; border-top: 1px solid var(--border); background: var(--bg-app); }
                .btn-clear {
                    width: 100%; border: 1px solid var(--border); color: #ef4444; background: transparent;
                    padding: 10px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: 500;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    transition: all 0.2s;
                }
                .btn-clear:hover { background: rgba(239, 68, 68, 0.08); border-color: #ef4444; transform: translateY(-1px); }

                @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }

                /* Premium Empty State */
                .empty-state {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    text-align: center; height: 100%; padding-bottom: 40px;
                    position: relative;
                }
                
                /* Action Cards Removed */


                /* Command Popup Styling */
                .command-popup {
                    position: absolute; bottom: 100%; left: 0; right: 0;
                    background: var(--bg-app); border: 1px solid var(--border);
                    border-radius: 12px; padding: 6px; margin-bottom: 12px;
                    box-shadow: var(--shadow-lg);
                    display: none; animation: slideUp 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    backdrop-filter: blur(16px);
                }
                .command-popup.show { display: block; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                
                .command-item {
                    padding: 8px 12px; border-radius: 8px; cursor: pointer;
                    display: flex; align-items: center; gap: 10px;
                    transition: all 0.1s ease;
                }
                .command-item:hover, .command-item.selected { background: var(--accent); color: white; }
                .command-item:hover .cmd-key, .command-item.selected .cmd-key { color: white; }
                .command-item:hover .cmd-desc, .command-item.selected .cmd-desc { color: rgba(255,255,255,0.8); }

                .cmd-key {
                    font-family: var(--font-mono); font-size: 12px;
                    font-weight: 600; color: var(--accent); min-width: 80px;
                }
                .cmd-desc { font-size: 12px; color: var(--text-secondary); }

                /* File Popup */
                .file-popup {
                    position: absolute; bottom: 100%; left: 0; right: 0;
                    background: var(--bg-app); border: 1px solid var(--border);
                    border-radius: 12px; padding: 6px; margin-bottom: 12px;
                    box-shadow: var(--shadow-lg);
                    max-height: 240px; overflow-y: auto;
                    display: none; animation: slideUp 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    backdrop-filter: blur(16px);
                }
                .file-popup.show { display: block; }

                .file-item {
                    padding: 6px 10px; border-radius: 8px; cursor: pointer;
                    display: flex; align-items: center; gap: 8px;
                    font-size: 13px; color: var(--text-secondary);
                    transition: all 0.1s ease;
                }
                .file-item:hover, .file-item.selected { background: var(--accent); color: white; }
                .file-item:hover .file-path, .file-item.selected .file-path { color: rgba(255,255,255,0.7); }
                .file-item:hover .file-icon, .file-item.selected .file-icon { color: white !important; }
                
                .file-icon { 
                    font-size: 16px; width: 16px; height: 16px; 
                    display: flex; align-items: center; justify-content: center;
                    opacity: 0.8;
                }
                
                .file-info {
                    display: flex; flex-direction: column; overflow: hidden;
                }
                .file-name {
                    font-weight: 500; font-size: 12px; color: var(--text-primary);
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .file-path {
                    font-size: 9px; color: var(--text-secondary); opacity: 0.7;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                
                /* Icon Colors */
                .icon-ts { color: #3178c6; }
                .icon-js { color: #f7df1e; }
                .icon-json { color: #f1c40f; }
                .icon-md { color: #adadad; }
                .icon-css { color: #264de4; }
                .icon-html { color: #e34c26; }
                .icon-py { color: #3572A5; }

                /* Settings Page - Full Screen Overlay */
                #settings-page {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: var(--bg-app);
                    z-index: 200;
                    display: flex;
                    flex-direction: column;
                    transform: translateY(100%);
                    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                #settings-page.open {
                    transform: translateY(0);
                }

                .settings-header {
                    height: 50px;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    background: var(--bg-app);
                }
                .settings-title {
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .settings-body {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                }

                .settings-sidebar {
                    width: 200px;
                    border-right: 1px solid var(--border);
                    background: rgba(0,0,0,0.02);
                    padding: 16px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .settings-nav-item {
                    padding: 8px 16px;
                    cursor: pointer;
                    font-size: 13px;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                    border-left: 3px solid transparent;
                }
                .settings-nav-item:hover {
                    background: rgba(0,0,0,0.04);
                    color: var(--text-primary);
                }
                .settings-nav-item.active {
                    background: rgba(0, 114, 255, 0.08);
                    color: var(--accent);
                    border-left-color: var(--accent);
                    font-weight: 500;
                }

                .settings-content-panel {
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px 32px;
                }

                .settings-section {
                    display: none;
                    animation: fadeIn 0.3s ease;
                }
                .settings-section.active {
                    display: block;
                }

                .section-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    color: var(--text-primary);
                    padding-bottom: 8px;
                    border-bottom: 1px solid var(--border);
                }

                .form-group {
                    margin-bottom: 20px;
                }
                .form-label {
                    display: block;
                    font-size: 13px;
                    font-weight: 500;
                    margin-bottom: 6px;
                    color: var(--text-primary);
                }
                .form-desc {
                    font-size: 12px;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                    line-height: 1.4;
                }

                .setting-input {
                    width: 100%;
                    background: var(--input-bg);
                    border: 1px solid var(--border);
                    color: var(--text-primary);
                    padding: 10px;
                    border-radius: 6px;
                    font-family: inherit;
                    font-size: 13px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .setting-input:focus {
                    border-color: var(--accent);
                }

                .setting-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                /* Toggle Switch */
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 36px;
                    height: 20px;
                }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: var(--border);
                    transition: .4s;
                    border-radius: 20px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 16px;
                    width: 16px;
                    left: 2px;
                    bottom: 2px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider { background-color: var(--accent); }
                input:checked + .slider:before { transform: translateX(16px); }

                /* Model Cards */
                .model-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 24px;
                }
                .model-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                }

                .add-model-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 20px;
                }
                .model-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 12px;
                }
                .model-card {
                    background: var(--bg-app);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 10px;
                    transition: all 0.2s;
                }
                .model-card:hover {
                    border-color: var(--accent);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-sm);
                }
                .model-info { flex: 1; }
                .model-name { font-weight: 600; font-size: 13px; margin-bottom: 4px; }
                .model-desc { font-size: 11px; color: var(--text-secondary); line-height: 1.3; }

                /* Shortcuts */
                .shortcuts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 12px;
                }
                .shortcut-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                }
                .shortcut-key {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    background: var(--bg-app);
                    border: 1px solid var(--border);
                    padding: 2px 6px;
                    border-radius: 4px;
                    color: var(--text-primary);
                }
                .shortcut-action { font-size: 13px; color: var(--text-secondary); }

                .btn-save {
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    width: 100%;
                    justify-content: center;
                    transition: background 0.2s;
                }
                .btn-save:hover { background: var(--accent-hover); }

                .btn-download-sm {
                    background: var(--accent);
                    color: white;
                    border: none;
                    width: 24px; height: 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    align-self: flex-end;
                }

                .setting-input {
                    background: var(--input-bg); border: 1px solid var(--border); color: var(--text-primary);
                    padding: 12px; border-radius: 8px; font-family: inherit; font-size: 13px; resize: vertical;
                    min-height: 100px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
                }
                .setting-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(0, 114, 255, 0.15); }
                .setting-input::placeholder { color: var(--text-secondary); opacity: 0.6; }

                /* Keyboard Shortcuts */
                .keyboard-shortcuts .setting-header { margin-bottom: 12px; }
                .shortcuts-grid { display: flex; flex-direction: column; gap: 8px; }
                .shortcut-item { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 8px 12px; background: var(--bg-hover); border-radius: 6px;
                }
                .shortcut-key { 
                    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
                    background: var(--bg-app); padding: 4px 8px; border-radius: 4px;
                    border: 1px solid var(--border); color: var(--text-primary);
                }
                .shortcut-action { font-size: 12px; color: var(--text-secondary); }
                
                /* Save Button */
                .btn-save {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    width: 100%; padding: 12px 16px; border: none; border-radius: 8px;
                    background: var(--accent); color: var(--accent-foreground);
                    font-size: 13px; font-weight: 500; cursor: pointer;
                    transition: all 0.2s; box-shadow: var(--shadow-sm);
                }
                .btn-save:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: var(--shadow-md); }



                /* Toggle Switch */
                .setting-row { display: flex; justify-content: space-between; align-items: center; }
                .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider {
                    position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
                    background-color: var(--bg-hover); transition: .4s; border-radius: 20px;
                }
                .slider:before {
                    position: absolute; content: ""; height: 16px; width: 16px;
                    left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%;
                }
                input:checked + .slider { background-color: var(--accent); }
                input:checked + .slider:before { transform: translateX(20px); }

                /* Toast Notifications */
                #toast-container {
                    position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
                    z-index: 1000; display: flex; flex-direction: column; gap: 8px;
                    width: 90%; max-width: 400px; pointer-events: none;
                }
                .toast {
                    background: var(--bg-app); border: 1px solid rgba(239, 68, 68, 0.3);
                    border-left: 3px solid #ef4444;
                    padding: 12px 16px; border-radius: 8px;
                    box-shadow: var(--shadow-lg); pointer-events: auto;
                    display: flex; align-items: flex-start; gap: 10px;
                    animation: toastSlide 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    backdrop-filter: blur(12px);
                }
                .toast.info {
                    border-color: rgba(59, 130, 246, 0.3);
                    border-left-color: #3b82f6;
                }
                .toast.info .toast-icon { color: #3b82f6; }
                .toast.info .toast-close:hover { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }

                .toast.success {
                    border-color: rgba(34, 197, 94, 0.3);
                    border-left-color: #22c55e;
                }
                .toast.success .toast-icon { color: #22c55e; }
                .toast.success .toast-close:hover { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

                @keyframes toastSlide { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                .toast-icon { color: #ef4444; flex-shrink: 0; margin-top: 2px; }
                .toast-content { flex: 1; font-size: 13px; color: var(--text-primary); line-height: 1.4; }
                .toast-close {
                    color: var(--text-secondary); cursor: pointer; padding: 4px;
                    border-radius: 4px; border: none; background: transparent;
                    transition: all 0.2s;
                }
                .toast-close:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                /* Input Tags (Chips) */
                .input-tags {
                    display: flex; flex-wrap: wrap; gap: var(--spacing-sm); padding: 0 var(--spacing-xs);
                    margin-bottom: var(--spacing-sm);
                    min-height: 0;
                    transition: all 0.2s var(--ease-out);
                }
                .input-tags:not(:empty) { margin-top: var(--spacing-xs); }
                
                .file-tag {
                    display: inline-flex; align-items: center; gap: var(--spacing-xs);
                    background: var(--tag-bg); 
                    border: 1px solid var(--tag-border);
                    color: var(--tag-text); 
                    padding: 4px 8px; 
                    border-radius: var(--radius-sm);
                    font-size: 12px; 
                    cursor: pointer; 
                    user-select: none;
                    transition: all 0.2s var(--ease-out);
                    max-width: 100%;
                }
                .file-tag:hover { 
                    background: var(--tag-border); 
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-sm);
                }
                .file-tag .tag-icon { opacity: 1; }
                .file-tag .tag-text { 
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;
                    font-weight: 500;
                }
                .file-tag .close { 
                    margin-left: 2px; opacity: 0.7; padding: 2px; border-radius: 4px; display: flex;
                }
                .file-tag .close:hover { 
                    opacity: 1; background: rgba(0,0,0,0.1); color: inherit;
                }
                
                .command-tag {
                    background: rgba(168, 85, 247, 0.1) !important;
                    border-color: rgba(168, 85, 247, 0.2) !important;
                    color: #a855f7 !important;
                }
                .command-tag:hover {
                    background: rgba(168, 85, 247, 0.2) !important;
                    box-shadow: var(--shadow-sm);
                }

                /* Clickable Tags in History */
                .message .file-tag {
                    display: inline-flex; align-items: center; gap: 4px;
                    background: var(--tag-bg); 
                    border: 1px solid var(--tag-border);
                    color: var(--tag-text); 
                    padding: 2px 6px; 
                    border-radius: var(--radius-sm);
                    font-size: 12px; 
                    font-family: var(--font-mono);
                    cursor: pointer;
                    margin: 0 2px;
                    vertical-align: middle;
                    font-weight: 500;
                }
                .message .file-tag:hover {
                    background: var(--tag-border);
                    text-decoration: none;
                    box-shadow: var(--shadow-sm);
                }
            </style>
        </head>
        <body>
            <header>
                <div class="brand">
                    <img src="${s}" class="logo-img" alt="Logo">
                    <span style="font-size: 10px; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; border: 1px solid var(--accent); padding: 1px 4px; border-radius: 4px; margin-left: -2px; font-weight: 800; opacity: 0.9; letter-spacing: 0.5px;">BYTE CODER</span>
                </div>
                
                <div class="model-selector-container" style="margin-left: auto; margin-right: 12px;">
                    <select id="modelSelect" class="model-select" onchange="changeModel()">
                        <option value="cloud" selected>Byte API</option>
                        <optgroup label="Local Models" id="localModelGroup">
                            <option value="local-detect">Detecting...</option>
                        </optgroup>
                        <option value="add-model">+ Add Model...</option>
                    </select>
                    <button id="downloadModelBtn" class="btn-download" onclick="downloadModel()" title="Download Model" style="display: none;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                </div>

                <div class="header-actions">
                    <button class="btn-icon" onclick="newChat()" title="New Chat">${t.plus}</button>
                    <button class="btn-icon" onclick="toggleDrawer()" title="History">${t.history}</button>
                    <button class="btn-icon" onclick="toggleSettings()" title="Settings">${t.settings}</button>
                </div>
            </header>

            <div id="session-drawer" class="drawer">
                <div class="drawer-header">
                    <div class="drawer-top-bar">
                        <span>Select a conversation</span>
                        <button class="btn-icon" onclick="toggleDrawer()" title="Close">\xD7</button>
                    </div>
                    <div class="search-container">
                        <input type="text" class="session-search-input" id="sessionSearchInput" placeholder="Search conversations...">
                    </div>
                </div>
                <div class="session-list" id="sessionList"></div>
                <div class="drawer-footer">
                    <button class="btn-clear" onclick="clearAllSessions()">${t.trash} Clear All</button>
                </div>
            </div>

            <div id="plan-drawer" class="drawer">
                <div class="drawer-header">
                    <div class="drawer-top-bar">
                        <span class="drawer-title">Implementation Plan</span>
                        <button class="btn-icon" onclick="togglePlan()" title="Close">\xD7</button>
                    </div>
                </div>
                <div class="plan-content" id="planContent">
                    <div style="padding: 20px; text-align: center; color: var(--text-secondary);">No active plan</div>
                </div>
            </div>

            <div id="settings-page" class="settings-page">
                <div class="settings-header">
                    <div class="settings-title">${t.settings} Settings</div>
                    <button class="btn-icon" onclick="toggleSettings()" title="Close">${t.close}</button>
                </div>
                <div class="settings-body">
                    <div class="settings-sidebar">
                        <div class="settings-nav-item active" onclick="switchSettingsTab('general')">
                            ${t.settings} General
                        </div>
                        <div class="settings-nav-item" onclick="switchSettingsTab('models')">
                            ${t.download} Models
                        </div>
                        <div class="settings-nav-item" onclick="switchSettingsTab('shortcuts')">
                            ${t.code} Shortcuts
                        </div>
                    </div>
                    <div class="settings-content-panel">
                        <!-- General Section -->
                        <div id="section-general" class="settings-section active">
                            <div class="section-title">General Preferences</div>
                            
                            <div class="form-group">
                                <label class="form-label">Custom Instructions</label>
                                <div class="form-desc">Define the AI's persona and behavior guidelines for this workspace.</div>
                                <textarea id="customInstructions" class="setting-input" rows="5" placeholder="E.g. You are an expert Python developer. Always include type hints. Be concise."></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Auto-Context</label>
                                <div class="setting-row">
                                    <div class="form-desc" style="margin:0;">Automatically include relevant code context from your project.</div>
                                    <label class="switch">
                                        <input type="checkbox" id="autoContext" checked>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <div style="margin-top: 32px;">
                                <button class="btn-save" onclick="saveSettings()">${t.check} Save Changes</button>
                            </div>
                        </div>

                        <!-- Models Section -->
                        <div id="section-models" class="settings-section">
                            <div class="section-title">Installed Local Models</div>
                            <div id="installed-models-list" class="model-list">
                                <!-- Populated by JS -->
                                <div style="text-align: center; padding: 20px; color: var(--text-secondary);">Loading models...</div>
                            </div>

                            <div class="section-title" style="margin-top: 32px;">Add New Model</div>
                            <div class="add-model-card">
                                <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px;">Recommended Models</div>
                                <div class="model-grid" id="recommended-models-grid">
                                    <!-- Populated by JS -->
                                </div>
                                
                                <div style="margin-top: 16px; display: flex; gap: 8px;">
                                    <input type="text" id="customModelInput" placeholder="Or enter model name (e.g. llama3:70b)" style="flex:1; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text-primary);">
                                    <button class="btn-save" style="width: auto; padding: 0 16px;" onclick="downloadCustomModel()">Pull</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Shortcuts Section -->
                        <div id="section-shortcuts" class="settings-section">
                            <div class="section-title">Keyboard Shortcuts</div>
                            <div class="shortcuts-grid">
                                <div class="shortcut-item"><span class="shortcut-key">Enter</span><span class="shortcut-action">Send message</span></div>
                                <div class="shortcut-item"><span class="shortcut-key">Shift + Enter</span><span class="shortcut-action">New line</span></div>
                                <div class="shortcut-item"><span class="shortcut-key">ESC</span><span class="shortcut-action">Close popups</span></div>
                                <div class="shortcut-item"><span class="shortcut-key">@</span><span class="shortcut-action">Mention file</span></div>
                                <div class="shortcut-item"><span class="shortcut-key">/</span><span class="shortcut-action">Quick command</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div id="chat-container">
                <!-- Chat messages will appear here -->
            </div>

            <button id="scrollToBottomBtn" onclick="scrollToBottom()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path></svg>
            </button>
            
            <div class="input-section" id="input-container">
                <div class="command-popup" id="commandPopup">
                    <div class="command-item" onclick="selectCommand('explain')">
                        <span class="cmd-key">/explain</span> <span class="cmd-desc">Explain selected code</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('fix')">
                        <span class="cmd-key">/fix</span> <span class="cmd-desc">Fix bugs in selection</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('refactor')">
                        <span class="cmd-key">/refactor</span> <span class="cmd-desc">Refactor selection</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('test')">
                        <span class="cmd-key">/test</span> <span class="cmd-desc">Generate unit tests</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('doc')">
                        <span class="cmd-key">/doc</span> <span class="cmd-desc">Generate documentation</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('optimize')">
                        <span class="cmd-key">/optimize</span> <span class="cmd-desc">Optimize performance</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('security')">
                        <span class="cmd-key">/security</span> <span class="cmd-desc">Security audit</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('review')">
                        <span class="cmd-key">/review</span> <span class="cmd-desc">Code review</span>
                    </div>
                    <div class="command-item" onclick="selectCommand('convert')">
                        <span class="cmd-key">/convert</span> <span class="cmd-desc">Convert to other language</span>
                    </div>
                </div>
                
                <div class="file-popup" id="filePopup"></div>
                <div class="input-box">
                    <div class="input-wrapper">
                        <div class="input-tags" id="inputTags"></div>
                        <div class="input-highlight" id="inputHighlight"></div>
                        <textarea id="messageInput" placeholder="Ask anything, @ to mention, / for command..." rows="1"></textarea>
                    </div>
                    <div class="input-actions" style="justify-content: space-between;">
                         <div class="left-actions" style="display: flex; gap: 8px; align-items: center;">
                             <button class="btn-icon" id="attachBtn" title="Add File/Folder">
                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                             </button>
                             <button class="btn-icon" id="commandBtn" title="Commands">
                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                     <polyline points="4 17 10 11 4 5"></polyline>
                                     <line x1="12" y1="19" x2="20" y2="19"></line>
                                 </svg>
                             </button>

                             <div class="model-selector-container" id="agentModeContainer" style="margin-left: 4px;">
                                <select id="agentModeSelect" class="model-select" onchange="changeAgentMode()" style="border: none; background-color: transparent; box-shadow: none; padding: 2px 20px 2px 4px; min-width: auto; width: auto; font-weight: 600; color: var(--accent); height: 28px;">
                                    <option value="build" selected>Build Agent</option>
                                    <option value="plan">Plan Agent</option>
                                </select>
                            </div>
                         </div>
                         <div class="right-actions" style="display: flex; gap: 8px; align-items: center;">
                            <button class="btn-send" id="sendBtn" title="Send">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                            </button>
                            <button class="btn-stop" id="stopBtn" title="Stop Generation">${t.stop}</button>
                        </div>
                    </div>
                </div>
            </div>



            <div id="toast-container"></div>

            <script>
                const vscode = acquireVsCodeApi();
                const initialState = vscode.getState() || {};
                
                // Global Error Handler
                window.onerror = function(msg, source, lineno, colno, error) {
                    const div = document.createElement('div');
                    div.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:10px;z-index:9999;font-family:monospace;font-size:12px;';
                    div.innerText = 'JS Error: ' + msg;
                    document.body.appendChild(div);
                    return false;
                };

                const chatContainer = document.getElementById('chat-container');
                const messageInput = document.getElementById('messageInput');
                const inputHighlight = document.getElementById('inputHighlight');
                const inputTags = document.getElementById('inputTags');
                const sendBtn = document.getElementById('sendBtn');
                const stopBtn = document.getElementById('stopBtn');
                const sessionDrawer = document.getElementById('session-drawer');
                const sessionList = document.getElementById('sessionList');
                const planDrawer = document.getElementById('plan-drawer');
                const planContent = document.getElementById('planContent');
                const commandPopup = document.getElementById('commandPopup');
                const filePopup = document.getElementById('filePopup');
                const emptyState = document.getElementById('emptyState');
                const modelSelect = document.getElementById('modelSelect');
                const downloadModelBtn = document.getElementById('downloadModelBtn');
                
                // Model Functions
                const recommendedModels = [
                    // Small (1B - 3B)
                    { name: 'tinydolphin', desc: 'Tiny Dolphin (1.1B)', size: 'small' },
                    { name: 'phi', desc: 'Microsoft Phi-2 (2.7B)', size: 'small' },
                    { name: 'gemma:2b', desc: 'Google Gemma (2B)', size: 'small' },
                    { name: 'qwen:1.8b', desc: 'Qwen (1.8B)', size: 'small' },
                    { name: 'stable-code:3b', desc: 'Stable Code (3B)', size: 'small' },
                    { name: 'deepseek-coder:1.3b', desc: 'DeepSeek Coder (1.3B)', size: 'small' },
                    
                    // Medium (7B - 10B)
                    { name: 'llama3', desc: 'Meta Llama 3 (8B)', size: 'medium' },
                    { name: 'mistral', desc: 'Mistral 7B', size: 'medium' },
                    { name: 'gemma:7b', desc: 'Google Gemma (7B)', size: 'medium' },
                    { name: 'codellama', desc: 'Code Llama (7B)', size: 'medium' },
                    { name: 'openhermes', desc: 'OpenHermes 2.5', size: 'medium' },
                    { name: 'neural-chat', desc: 'Neural Chat (7B)', size: 'medium' },
                    { name: 'starling-lm', desc: 'Starling LM (7B)', size: 'medium' },
                    { name: 'zephyr', desc: 'Zephyr (7B)', size: 'medium' },
                    { name: 'solar', desc: 'Solar 10.7B', size: 'medium' },
                    { name: 'deepseek-coder:6.7b', desc: 'DeepSeek Coder (6.7B)', size: 'medium' },

                    // Large (13B - 70B+)
                    { name: 'llama3:70b', desc: 'Meta Llama 3 (70B)', size: 'large' },
                    { name: 'codellama:13b', desc: 'Code Llama (13B)', size: 'large' },
                    { name: 'codellama:34b', desc: 'Code Llama (34B)', size: 'large' },
                    { name: 'codellama:70b', desc: 'Code Llama (70B)', size: 'large' },
                    { name: 'mistral-nemo', desc: 'Mistral Nemo (12B)', size: 'large' },
                    { name: 'mixtral', desc: 'Mixtral 8x7B', size: 'large' },
                    { name: 'qwen:14b', desc: 'Qwen (14B)', size: 'large' },
                    { name: 'qwen:32b', desc: 'Qwen (32B)', size: 'large' },
                    { name: 'qwen:72b', desc: 'Qwen (72B)', size: 'large' },
                    { name: 'deepseek-coder:33b', desc: 'DeepSeek Coder (33B)', size: 'large' },
                    { name: 'wizardcoder:33b', desc: 'WizardCoder (33B)', size: 'large' },
                    { name: 'phind-codellama:34b', desc: 'Phind CodeLlama (34B)', size: 'large' }
                ];

                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.type) {
                        case 'localModels':
                            updateLocalModels(message.models);
                            break;
                        case 'updateSettings':
                            updateSettings(message.value);
                            break;
                    }
                });

                function updateSettings(settings) {
                    if (settings.customInstructions !== undefined) {
                        const el = document.getElementById('customInstructions');
                        if (el) el.value = settings.customInstructions || '';
                    }
                    if (settings.autoContext !== undefined) {
                        const el = document.getElementById('autoContext');
                        if (el) el.checked = settings.autoContext;
                    }
                    
                    if (settings.useLocalModel !== undefined) {
                        const modelSelect = document.getElementById('modelSelect');
                        const downloadModelBtn = document.getElementById('downloadModelBtn');
                        
                        if (settings.useLocalModel) {
                            if (settings.localModelName) {
                                // Ensure option exists
                                const group = document.getElementById('localModelGroup');
                                let exists = false;
                                for (let i = 0; i < group.children.length; i++) {
                                    if (group.children[i].value === settings.localModelName) {
                                        exists = true;
                                        break;
                                    }
                                }
                                
                                if (!exists && settings.localModelName) {
                                    const option = document.createElement('option');
                                    option.value = settings.localModelName;
                                    option.text = settings.localModelName;
                                    group.appendChild(option);
                                }
                                
                                modelSelect.value = settings.localModelName;
                            }
                            if (downloadModelBtn) downloadModelBtn.style.display = 'flex';
                        } else {
                            modelSelect.value = 'cloud';
                            if (downloadModelBtn) downloadModelBtn.style.display = 'none';
                        }
                    }
                }

                function saveSettings() {
                    const instructions = document.getElementById('customInstructions').value;
                    const autoContext = document.getElementById('autoContext').checked;
                    
                    vscode.postMessage({
                        type: 'saveSettings',
                        value: {
                            customInstructions: instructions,
                            autoContext: autoContext
                        }
                    });
                    
                    // Show saved feedback
                    const btn = document.querySelector('.btn-save');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = 'Saved!';
                    btn.style.background = 'var(--success)';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 2000);
                }

                // --- Settings Page Logic ---
                function toggleSettings() {
                    const page = document.getElementById('settings-page');
                    const isOpen = page.classList.contains('open');
                    
                    if (!isOpen) {
                        page.classList.add('open');
                        
                        // Close other drawers
                        if (sessionDrawer) sessionDrawer.classList.remove('open');
                        if (planDrawer) {
                            planDrawer.classList.remove('open');
                            planDrawer.style.width = '0';
                        }

                        // Refresh models when opening settings
                        vscode.postMessage({ type: 'getLocalModels' });
                        renderRecommendedModels();
                    } else {
                        page.classList.remove('open');
                    }
                }

                function switchSettingsTab(tabName) {
                    // Update sidebar active state
                    document.querySelectorAll('.settings-nav-item').forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('onclick').includes(tabName)) {
                            item.classList.add('active');
                        }
                    });

                    // Update content section visibility
                    document.querySelectorAll('.settings-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    document.getElementById('section-' + tabName).classList.add('active');
                }

                function renderRecommendedModels() {
                    const grid = document.getElementById('recommended-models-grid');
                    grid.innerHTML = '';
                    
                    // Group by size for better display, or just list them with badges
                    recommendedModels.forEach(model => {
                        const div = document.createElement('div');
                        div.className = 'model-card';
                        
                        let badgeColor = '#4CAF50'; // Green for small
                        if (model.size === 'medium') badgeColor = '#2196F3'; // Blue
                        if (model.size === 'large') badgeColor = '#FF9800'; // Orange
                        
                        div.innerHTML = \`
                            <div class="model-info">
                                <div class="model-name">\${model.name}</div>
                                <div class="model-desc">\${model.desc}</div>
                                <span style="display:inline-block; font-size:10px; padding:2px 6px; border-radius:4px; background:\${badgeColor}20; color:\${badgeColor}; margin-top:4px; text-transform:uppercase; font-weight:700;">\${model.size}</span>
                            </div>
                            <button class="btn-download-sm" onclick="downloadSpecificModel('\${model.name}')">
                                ${t.download}
                            </button>
                        \`;
                        grid.appendChild(div);
                    });
                }

                function downloadSpecificModel(name) {
                    vscode.postMessage({
                        type: 'downloadModel',
                        modelName: name
                    });
                    
                    // Show feedback
                    showToast(\`Starting download for \${name}...\`, 'info');
                }
                
                function downloadCustomModel() {
                    const input = document.getElementById('customModelInput');
                    const name = input.value.trim();
                    if (name) {
                        downloadSpecificModel(name);
                        input.value = '';
                    }
                }

                function deleteLocalModel(name) {
                    if (confirm('Are you sure you want to delete ' + name + '? This cannot be undone.')) {
                        vscode.postMessage({
                            type: 'deleteLocalModel',
                            name: name
                        });
                    }
                }

                function updateLocalModels(models) {
                    // Update main dropdown
                    const group = document.getElementById('localModelGroup');
                    const currentVal = modelSelect.value;
                    
                    group.innerHTML = ''; // Clear existing
                    
                    // Safe check for models array
                    if (!models || !Array.isArray(models) || models.length === 0) {
                        const option = document.createElement('option');
                        option.disabled = true;
                        option.text = 'No models found (Install Ollama)';
                        group.appendChild(option);
                    } else {
                        models.forEach(model => {
                            const option = document.createElement('option');
                            option.value = model;
                            option.text = model;
                            group.appendChild(option);
                        });
                    }
                    
                    // Restore selection if it still exists
                    const options = Array.from(group.children);
                    const exists = options.some(opt => opt.value === currentVal);
                    if (exists) {
                        modelSelect.value = currentVal;
                    } else if (modelSelect.value === 'local-detect' && models && models.length > 0) {
                        // If we were detecting, select the first one
                        modelSelect.value = models[0];
                        changeModel(); // Trigger change
                    }

                    // Update Settings Page List
                    const list = document.getElementById('installed-models-list');
                    if (list) {
                        list.innerHTML = '';
                        if (!models || !Array.isArray(models) || models.length === 0) {
                            list.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">No local models installed.<br><small>Make sure Ollama is running.</small></div>';
                        } else {
                            models.forEach(model => {
                                const item = document.createElement('div');
                                item.className = 'model-item';
                                item.innerHTML = \`
                                    <div style="font-weight: 500;">\${model}</div>
                                    <button class="btn-danger" onclick="deleteLocalModel('\${model}')">Remove</button>
                                \`;
                                list.appendChild(item);
                            });
                        }
                    }
                }

                window.changeAgentMode = () => {
                    const mode = document.getElementById('agentModeSelect').value;
                    vscode.postMessage({
                        type: 'setAgentMode',
                        mode: mode
                    });
                    
                    // Update UI feedback
                    const container = document.getElementById('agentModeContainer');
                    const select = document.getElementById('agentModeSelect');
                    
                    if (mode === 'plan') {
                        container.style.borderColor = '#FF9800'; // Orange for Plan
                        container.style.background = 'rgba(255, 152, 0, 0.05)';
                        select.style.color = '#FF9800';
                    } else {
                        container.style.borderColor = 'var(--accent)'; // Blue for Build
                        container.style.background = 'rgba(0, 114, 255, 0.05)';
                        select.style.color = 'var(--accent)';
                    }
                };

                window.changeModel = () => {
                    const modelSelect = document.getElementById('modelSelect');
                    const downloadModelBtn = document.getElementById('downloadModelBtn');
                    const model = modelSelect.value;
                    
                    if (model === 'add-model') {
                        toggleSettings();
                        switchSettingsTab('models');
                        // Reset to cloud temporarily to avoid showing "add-model" as selected
                        modelSelect.value = 'cloud';
                        if (downloadModelBtn) downloadModelBtn.style.display = 'none';
                        return;
                    }

                    if (model === 'local-detect') {
                        return;
                    }

                    // Check if it's one of the local models (anything not 'cloud' and not 'add-model')
                    if (model !== 'cloud') {
                        if (downloadModelBtn) downloadModelBtn.style.display = 'flex';
                        vscode.postMessage({ type: 'setModel', model: 'local', modelName: model });
                    } else {
                        if (downloadModelBtn) downloadModelBtn.style.display = 'none';
                        vscode.postMessage({ type: 'setModel', model: 'cloud' });
                    }
                };

                window.downloadModel = () => {
                    toggleSettings();
                    switchSettingsTab('models');
                };

                /* Modal functions removed in favor of Settings Page */

                // Initial fetch
                setTimeout(() => {
                    vscode.postMessage({ type: 'getLocalModels' });
                    vscode.postMessage({ type: 'getSettings' });
                    // Initialize agent mode UI
                    if (window.changeAgentMode) window.changeAgentMode();
                }, 1000);
                
                // State
                let selectedFiles = [];
                let selectedCommands = [];

                // Plan Functions
                window.togglePlan = () => {
                    if (planDrawer.style.width === '350px' || planDrawer.classList.contains('open')) {
                        planDrawer.classList.remove('open');
                        planDrawer.style.width = '0';
                    } else {
                        planDrawer.classList.add('open');
                        planDrawer.style.width = '350px';
                        
                        // Close other drawers
                        if (sessionDrawer) {
                            sessionDrawer.classList.remove('open');
                            sessionDrawer.style.width = ''; 
                        }

                        const settingsPage = document.getElementById('settings-page');
                        if (settingsPage && settingsPage.classList.contains('open')) {
                            settingsPage.classList.remove('open');
                        }
                    }
                };

                window.renderPlan = (plan, activeTaskId) => {
                    if (!plan || plan.length === 0) {
                        planContent.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No active plan</div>';
                        return;
                    }

                    planContent.innerHTML = plan.map(task => {
                        let statusClass = task.status || 'pending';
                        if (task.id === activeTaskId) statusClass = 'in_progress';
                        
                        let icon = '\u25CB';
                        if (statusClass === 'completed') icon = '\u2713';
                        if (statusClass === 'in_progress') icon = '\u21BB';
                        if (statusClass === 'failed') icon = '\u2715';

                        return \`
                            <div class="plan-item \${statusClass}" id="\${task.id}">
                                <div class="plan-status-icon">\${icon}</div>
                                <div class="plan-details">
                                    <div class="plan-title">\${task.description || 'Untitled Task'}</div>
                                    \${task.validationCommand ? \`<div class="plan-desc">Validation: \${task.validationCommand}</div>\` : ''}
                                </div>
                            </div>
                        \`;
                    }).join('');
                    
                    // Show plan button if hidden
                    const planBtn = document.getElementById('planBtn');
                    if (planBtn) planBtn.style.display = 'flex';
                };

                // Helper: Open File
                window.openFile = (path) => {
                    vscode.postMessage({ type: 'openFile', value: path });
                };

                // Helper: Update Send Button State
                function updateSendButtonState() {
                    const text = messageInput.value.trim();
                    if (!text && selectedFiles.length === 0 && selectedCommands.length === 0) {
                        sendBtn.classList.add('disabled');
                    } else {
                        sendBtn.classList.remove('disabled');
                    }
                }

                // Helper: Update Input Tags
                function updateInputTags() {
                    inputTags.innerHTML = '';
                    
                    // Render Commands
                    selectedCommands.forEach((cmd, index) => {
                        const tag = document.createElement('div');
                        tag.className = 'file-tag command-tag';
                        tag.title = '/' + cmd;
                        tag.innerHTML = \`
                            <span class="tag-icon">\u26A1</span>
                            <span class="tag-text">/\${cmd}</span>
                            <span class="close" onclick="event.stopPropagation(); removeCommand(\${index})">\xD7</span>
                        \`;
                        inputTags.appendChild(tag);
                    });

                    selectedFiles.forEach((file, index) => {
                        const tag = document.createElement('div');
                        tag.className = 'file-tag';
                        tag.title = file.path;
                        const iconChar = file.isFolder ? '\u{1F4C1}' : '\u{1F4C4}';
                        tag.innerHTML = \`
                            <span class="tag-icon">\${iconChar}</span>
                            <span class="tag-text">\${file.name}</span>
                            <span class="close" onclick="event.stopPropagation(); removeFile(\${index})">\xD7</span>
                        \`;
                        // Allow clicking the tag in input to open it too (user requirement)
                        tag.onclick = () => window.openFile(file.fullPath || file.path);
                        inputTags.appendChild(tag);
                    });
                    
                    // Adjust input height if needed
                    messageInput.dispatchEvent(new Event('input'));
                }

                window.removeFile = (index) => {
                    selectedFiles.splice(index, 1);
                    updateInputTags();
                    messageInput.focus();
                };

                window.removeCommand = (index) => {
                    selectedCommands.splice(index, 1);
                    updateInputTags();
                    messageInput.focus();
                };
                
                // Popup navigation state
                let commandPopupSelectedIndex = -1;
                let filePopupSelectedIndex = -1;
                
                // Helper: Update visual selection in command popup
                function updateCommandPopupSelection() {
                    const items = commandPopup.querySelectorAll('.command-item');
                    items.forEach((item, idx) => {
                        if (idx === commandPopupSelectedIndex) {
                            item.classList.add('selected');
                        } else {
                            item.classList.remove('selected');
                        }
                    });
                    // Scroll selected item into view
                    if (commandPopupSelectedIndex >= 0 && items[commandPopupSelectedIndex]) {
                        items[commandPopupSelectedIndex].scrollIntoView({ block: 'nearest' });
                    }
                }
                
                // Helper: Update visual selection in file popup
                function updateFilePopupSelection() {
                    const items = filePopup.querySelectorAll('.file-item');
                    items.forEach((item, idx) => {
                        if (idx === filePopupSelectedIndex) {
                            item.classList.add('selected');
                        } else {
                            item.classList.remove('selected');
                        }
                    });
                    // Scroll selected item into view
                    if (filePopupSelectedIndex >= 0 && items[filePopupSelectedIndex]) {
                        items[filePopupSelectedIndex].scrollIntoView({ block: 'nearest' });
                    }
                }
                
                // Reset popup selection when popup is shown
                function resetCommandPopupSelection() {
                    commandPopupSelectedIndex = 0;
                    updateCommandPopupSelection();
                }
                
                function resetFilePopupSelection() {
                    filePopupSelectedIndex = 0;
                    updateFilePopupSelection();
                }
                
                // Inline thinking indicator state
                let thinkingIndicatorEl = null;

                // Update the highlight overlay with colored @mentions and /commands
                function updateHighlight() {
                    let text = messageInput.value;
                    // Escape HTML to prevent XSS
                    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    // Highlight @mentions (blue) - match @word patterns immediately
                    text = text.replace(/@([a-zA-Z0-9_./-]+)/g, '<span class="mention">@$1</span>');
                    // Highlight /commands (purple) - match /word at start or after space, no trailing space needed
                    text = text.replace(/(^|\\s)(\\/[a-zA-Z]+)/g, '$1<span class="command">$2</span>');
                    // Set the highlighted HTML
                    inputHighlight.innerHTML = text;
                }
                
                // Initialize highlighting on page load
                setTimeout(updateHighlight, 0);
                
                marked.setOptions({
                    highlight: function(code, lang) {
                        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                        return hljs.highlight(code, { language }).value;
                    },
                    langPrefix: 'hljs language-'
                });

                let isGenerating = false;
                let currentAssistantMessageDiv = null;
                let currentAssistantMessageIndex = null;
                
                function createThinkingIndicator() {
                    const wrapper = document.createElement('div');
                    wrapper.id = 'thinkingIndicator';
                    wrapper.className = 'message assistant';
                    
                    const indicator = document.createElement('div');
                    indicator.className = 'thinking-indicator';
                    indicator.innerHTML = \`
                        <div class="thinking-dots">
                            <span class="thinking-dot"></span>
                            <span class="thinking-dot"></span>
                            <span class="thinking-dot"></span>
                        </div>
                        <span class="thinking-text" id="thinkingText">Thinking...</span>
                    \`;
                    wrapper.appendChild(indicator);
                    return wrapper;
                }
                
                function showThinkingIndicator() {
                    hideThinkingIndicator();
                    thinkingIndicatorEl = createThinkingIndicator();
                    chatContainer.appendChild(thinkingIndicatorEl);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
                
                function hideThinkingIndicator() {
                    if (thinkingIndicatorEl) {
                        thinkingIndicatorEl.remove();
                        thinkingIndicatorEl = null;
                    }
                }
                
                function handleAgentStatus(phase, messageText) {
                    if (!thinkingIndicatorEl) {
                        showThinkingIndicator();
                    }
                    
                    // Update the thinking text with current phase
                    const textEl = thinkingIndicatorEl.querySelector('#thinkingText');
                    if (textEl) {
                        textEl.textContent = phase + '...';
                    }
                    
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
                
                function handleAgentDebugText(text) {
                    console.log('Agent Debug:', text);
                }
                
                function handleAgentStatusDone() {
                    // Just hide the indicator when done - the response will replace it
                }
                
                // Debounce utility
                function debounce(fn, delay) {
                    let timeoutId;
                    return function(...args) {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => fn.apply(this, args), delay);
                    };
                }
                
                // Debounced file search
                // Debounced file search (Faster)
                const debouncedFileSearch = debounce((query) => {
                    vscode.postMessage({ type: 'getFiles', query: query });
                }, 100);

                // Auto-resize & Input Handler
                messageInput.addEventListener('input', function() {
                    this.style.height = '24px';
                    if (this.scrollHeight > 24) {
                        this.style.height = (this.scrollHeight) + 'px';
                    }
                    
                    updateSendButtonState();
                    
                    // Update syntax highlighting
                    updateHighlight();
                    
                    const val = this.value;
                    
                    // Mention Logic (@)
                    const lastAt = val.lastIndexOf('@');
                    if (lastAt !== -1) {
                         const searchStr = val.substring(lastAt + 1);
                         if (!searchStr.includes(' ') && !searchStr.includes('\\n')) {
                             debouncedFileSearch(searchStr);
                             if (!filePopup.classList.contains('show')) {
                                 filePopupSelectedIndex = 0;
                             }
                             filePopup.classList.add('show');
                             return;
                         }
                    }
                    filePopup.classList.remove('show');
                    
                    // Command Logic (/)
                    const lastSlash = val.lastIndexOf('/');
                    if (lastSlash !== -1) {
                        // Check if it's at start or after space
                        const charBefore = lastSlash > 0 ? val[lastSlash - 1] : ' ';
                        if (charBefore === ' ') {
                             const cmdStr = val.substring(lastSlash);
                             if (!cmdStr.includes(' ') && !cmdStr.includes('\\n')) {
                                if (!commandPopup.classList.contains('show')) {
                                    commandPopupSelectedIndex = 0;
                                    setTimeout(updateCommandPopupSelection, 10);
                                }
                                commandPopup.classList.add('show');
                                return;
                             }
                        }
                    }
                    commandPopup.classList.remove('show');
                    persistState();
                });
                


                // Send Message
                function sendMessage() {
                    const text = messageInput.value.trim();
                    if ((!text && selectedFiles.length === 0 && selectedCommands.length === 0) || isGenerating) return;
                    
                    currentAssistantMessageDiv = null;
                    currentAssistantMessageIndex = null;
                    
                    addMessage('user', text, [...selectedFiles], [...selectedCommands]);
                    
                    vscode.postMessage({ type: 'sendMessage', value: text, files: [...selectedFiles], commands: [...selectedCommands] });
                    
                    // Reset input and state
                    messageInput.value = '';
                    messageInput.style.height = '24px';
                    selectedFiles = [];
                    selectedCommands = [];
                    updateInputTags();
                    
                    updateHighlight();
                    commandPopup.classList.remove('show');
                    filePopup.classList.remove('show');
                    
                    // Reset Buttons
                    attachBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
                    commandBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>';
                    
                    document.body.classList.remove('new-chat');
                    
                    isGenerating = true;
                    updateUIState();
                    
                    // Show inline thinking indicator instead of simple dots
                    showThinkingIndicator();
                    
                    persistState();
                }

                function showTypingIndicator() {
                    // Now uses the thinking indicator
                    showThinkingIndicator();
                }
                
                function hideTypingIndicator() {
                    hideThinkingIndicator();
                }

                sendBtn.addEventListener('click', sendMessage);
                
                stopBtn.addEventListener('click', () => {
                    vscode.postMessage({ type: 'stopGeneration' });
                    isGenerating = false;
                    updateUIState();
                    persistState();
                });

                // Button Event Listeners
                
                function toggleFilePopup() {
                    if (filePopup.classList.contains('show')) {
                        filePopup.classList.remove('show');
                        attachBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
                        messageInput.focus();
                    } else {
                        commandPopup.classList.remove('show');
                        commandBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>';
                        
                        filePopup.classList.add('show');
                        attachBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                        debouncedFileSearch(''); // Load all files
                        filePopupSelectedIndex = 0;
                        messageInput.focus();
                    }
                }

                function toggleCommandPopup() {
                    if (commandPopup.classList.contains('show')) {
                        commandPopup.classList.remove('show');
                        commandBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>';
                        messageInput.focus();
                    } else {
                        filePopup.classList.remove('show');
                        attachBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
                        
                        commandPopup.classList.add('show');
                        commandBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                        commandPopupSelectedIndex = 0;
                        updateCommandPopupSelection();
                        messageInput.focus();
                    }
                }

                attachBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFilePopup();
                });

                commandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleCommandPopup();
                });

                // Global shortcuts
                document.addEventListener('keydown', (e) => {
                    // Focus input on '/' if not already focused
                    if (e.key === '/' && document.activeElement !== messageInput) {
                        e.preventDefault();
                        messageInput.focus();
                        messageInput.value += '/';
                        updateHighlight();
                        return;
                    }
                    // Focus input on any key if no other element is focused
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement === document.body) {
                        messageInput.focus();
                    }
                });

                // Auto-focus on load
                window.addEventListener('load', () => {
                    messageInput.focus();
                });

                messageInput.addEventListener('keydown', (e) => {
                    const isFilePopupOpen = filePopup.classList.contains('show');
                    const isCommandPopupOpen = commandPopup.classList.contains('show');
                    
                    // Arrow key navigation for file popup
                    if (isFilePopupOpen) {
                        const items = filePopup.querySelectorAll('.file-item');
                        const itemCount = items.length;
                        
                        if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            filePopupSelectedIndex = (filePopupSelectedIndex + 1) % itemCount;
                            updateFilePopupSelection();
                            return;
                        }
                        if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            filePopupSelectedIndex = filePopupSelectedIndex <= 0 ? itemCount - 1 : filePopupSelectedIndex - 1;
                            updateFilePopupSelection();
                            return;
                        }
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            const selectedItem = items[filePopupSelectedIndex] || items[0];
                            if (selectedItem) selectedItem.click();
                            return;
                        }
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            const selectedItem = items[filePopupSelectedIndex] || items[0];
                            if (selectedItem) selectedItem.click();
                            return;
                        }
                    }
                    
                    // Arrow key navigation for command popup
                    if (isCommandPopupOpen) {
                        const items = commandPopup.querySelectorAll('.command-item');
                        const itemCount = items.length;
                        
                        if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            commandPopupSelectedIndex = (commandPopupSelectedIndex + 1) % itemCount;
                            updateCommandPopupSelection();
                            return;
                        }
                        if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            commandPopupSelectedIndex = commandPopupSelectedIndex <= 0 ? itemCount - 1 : commandPopupSelectedIndex - 1;
                            updateCommandPopupSelection();
                            return;
                        }
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            const selectedItem = items[commandPopupSelectedIndex] || items[0];
                            if (selectedItem) selectedItem.click();
                            return;
                        }
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            const selectedItem = items[commandPopupSelectedIndex] || items[0];
                            if (selectedItem) selectedItem.click();
                            return;
                        }
                    }
                    
                    // Regular Enter to send message
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                    
                    // Escape to close popups
                    if (e.key === 'Escape') {
                        commandPopup.classList.remove('show');
                        filePopup.classList.remove('show');
                        commandPopupSelectedIndex = -1;
                        filePopupSelectedIndex = -1;
                    }
                });

                function updateUIState() {
                    if (isGenerating) {
                        sendBtn.style.display = 'none';
                        stopBtn.style.display = 'flex';
                        messageInput.disabled = true;
                    } else {
                        sendBtn.style.display = 'flex';
                        stopBtn.style.display = 'none';
                        messageInput.disabled = false;
                        messageInput.focus();
                    }
                }

                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.type) {
                        case 'addResponse':
                            hideTypingIndicator();
                            if (currentAssistantMessageDiv) {
                                currentAssistantMessageDiv.innerHTML = marked.parse(message.value);
                                enhanceCodeBlocks(currentAssistantMessageDiv.parentElement);
                                processFileTags(currentAssistantMessageDiv.parentElement);
                                chatContainer.scrollTop = chatContainer.scrollHeight;
                                
                                if (currentAssistantMessageIndex !== null &&
                                    currentAssistantMessageIndex >= 0 &&
                                    currentAssistantMessageIndex < messageHistory.length) {
                                    const msg = messageHistory[currentAssistantMessageIndex];
                                    if (msg.role === 'assistant') {
                                        msg.text = message.value;
                                    }
                                }
                            } else {
                                addMessage('assistant', message.value);
                            }
                            
                            if (!message.isStream) {
                                isGenerating = false;
                                updateUIState();
                                persistState();
                            }
                            break;
                        
                        case 'agentStatus':
                            handleAgentStatus(message.phase, message.message);
                            break;
                        
                        case 'agentDebugText':
                            handleAgentDebugText(message.value);
                            break;

                        case 'agentStatusDone':
                            handleAgentStatusDone();
                            break;
                            
                        case 'setAndSendMessage':
                            messageInput.value = message.value;
                            
                            // Restore tags if provided
                            if (message.files || message.commands) {
                                selectedFiles = message.files || [];
                                selectedCommands = message.commands || [];
                                updateInputTags();
                            }
                            
                            updateHighlight();
                            if (!message.justSet) {
                                sendMessage();
                            } else {
                                messageInput.focus();
                                persistState();
                            }
                            break;
                            
                        case 'sessionList':
                             renderSessionList(message.sessions, message.currentSessionId);
                             break;
                             
                        case 'loadSession':
                             chatContainer.innerHTML = '';
                             resetMessageIndex();
                             hideThinkingIndicator();
                             currentAssistantMessageDiv = null;
                             currentAssistantMessageIndex = null;
                             
                             // Hide scroll button on new session load
                             const scrollBtn = document.getElementById('scrollToBottomBtn');
                             if (scrollBtn) scrollBtn.classList.remove('show');

                             if (message.history.length === 0) {
                                 chatContainer.innerHTML = '';
                                 document.body.classList.add('new-chat');
                             } else {
                                 document.body.classList.remove('new-chat');
                                 message.history.forEach(msg => {
                                     addMessage(msg.role, msg.text, msg.files, msg.commands);
                                 });
                             }
                             break;

                        case 'addMessage':
                           addMessage(message.role, message.value, message.files, message.commands);
                           break;

                        case 'setGenerating':
                           isGenerating = true;
                           updateUIState();
                           showTypingIndicator();
                           persistState();
                           break;

                        case 'error':
                           hideTypingIndicator();
                           isGenerating = false;
                           currentAssistantMessageDiv = null;
                           currentAssistantMessageIndex = null;
                           updateUIState();
                           window.showToast(message.value);
                           persistState();
                           break;

                        case 'fileList':
                           renderFiles(message.files);
                           break;

                        case 'planUpdate':
                           renderPlan(message.plan, message.activeTaskId);
                           break;

                        case 'updateSettings':
                           const s = message.value;
                           if (s) {
                               const customInstructionsEl = document.getElementById('customInstructions');
                               const autoContextEl = document.getElementById('autoContext');
                               if (customInstructionsEl) customInstructionsEl.value = s.customInstructions || '';
                               if (autoContextEl) autoContextEl.checked = s.autoContext !== false;
                           }
                           break;
                    }
                });

                let messageIndex = 0;
                let messageHistory = [];
                
                function addMessage(role, text, files = [], commands = []) {
                    document.body.classList.remove('new-chat');
                    const currentIdx = messageIndex++;
                    messageHistory.push({ role, text, files, commands });
                    const div = document.createElement('div');
                    div.className = 'message ' + role;
                    div.dataset.index = currentIdx;

                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'content';
                    
                    // Render Files/Tags if any
                    if ((files && files.length > 0) || (commands && commands.length > 0)) {
                        const tagsContainer = document.createElement('div');
                        tagsContainer.className = 'input-tags';
                        tagsContainer.style.marginBottom = '8px';
                        
                        if (commands) {
                            commands.forEach(cmd => {
                                const tag = document.createElement('div');
                                tag.className = 'file-tag command-tag';
                                tag.innerHTML = \`
                                    <span class="tag-icon">\u26A1</span>
                                    <span class="tag-text">/\${cmd}</span>
                                \`;
                                tagsContainer.appendChild(tag);
                            });
                        }

                        if (files) {
                            files.forEach(file => {
                                const tag = document.createElement('div');
                                tag.className = 'file-tag'; 
                                
                                const iconChar = file.isFolder ? '\u{1F4C1}' : '\u{1F4C4}';
                                
                                tag.innerHTML = \`
                                    <span class="tag-icon">\${iconChar}</span>
                                    <span class="tag-text">\${file.name}</span>
                                \`;
                                tag.onclick = () => window.openFile(file.fullPath || file.path);
                                tagsContainer.appendChild(tag);
                            });
                        }
                        contentDiv.appendChild(tagsContainer);
                    }

                    const textDiv = document.createElement('div');
                    textDiv.innerHTML = marked.parse(text);
                    contentDiv.appendChild(textDiv);

                    div.appendChild(contentDiv);

                    // Add Action Buttons
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'msg-actions';
                    
                    if (role === 'assistant') {
                        // Copy Button
                        const copyBtn = document.createElement('button');
                        copyBtn.className = 'btn-icon action-btn';
                        copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                        copyBtn.title = 'Copy Response';
                        copyBtn.onclick = () => {
                            vscode.postMessage({ type: 'copyCode', value: text });
                            // temporary success state
                            const original = copyBtn.innerHTML;
                            copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#27c93f"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                            setTimeout(() => copyBtn.innerHTML = original, 2000);
                        };
                        actionsDiv.appendChild(copyBtn);

                        // Regenerate Button
                        const regenBtn = document.createElement('button');
                        regenBtn.className = 'btn-icon action-btn';
                        regenBtn.innerHTML = '${t.refresh}';
                        regenBtn.title = 'Regenerate';
                        regenBtn.onclick = () => {
                            regenBtn.classList.add('rotating');
                            vscode.postMessage({ type: 'regenerate', index: Number(currentIdx) });
                        };
                        actionsDiv.appendChild(regenBtn);
                    } else {
                        // Edit Button
                        const editBtn = document.createElement('button');
                        editBtn.className = 'btn-icon action-btn';
                        editBtn.innerHTML = '${t.edit}';
                        editBtn.title = 'Edit';
                        editBtn.onclick = () => {
                            vscode.postMessage({ type: 'editMessage', index: currentIdx });
                        };
                        actionsDiv.appendChild(editBtn);
                    }
                    div.appendChild(actionsDiv);

                    // Hover effect
                    div.onmouseenter = () => { actionsDiv.style.opacity = '1'; };
                    div.onmouseleave = () => { actionsDiv.style.opacity = '0'; };

                    chatContainer.appendChild(div);

                    // Auto-scroll
                    requestAnimationFrame(() => {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    });

                    if (role === 'assistant') {
                        currentAssistantMessageDiv = contentDiv;
                        currentAssistantMessageIndex = currentIdx;
                        enhanceCodeBlocks(div);
                    }

                    processFileTags(div);

                    // Remove empty state dynamically
                    const es = document.getElementById('emptyState');
                    if (es) es.remove();
                    persistState();
                }
                
                function resetMessageIndex() {
                    messageIndex = 0;
                    messageHistory = [];
                    persistState();
                }

                function persistState() {
                    vscode.setState({
                        messages: messageHistory,
                        inputValue: messageInput.value,
                        isGenerating
                    });
                }

                if (initialState && Array.isArray(initialState.messages) && initialState.messages.length > 0) {
                    chatContainer.innerHTML = '';
                    resetMessageIndex();
                    document.body.classList.remove('new-chat');
                    initialState.messages.forEach(msg => {
                        addMessage(msg.role, msg.text, msg.files, msg.commands);
                    });
                } else {
                    document.body.classList.add('new-chat');
                }

                if (initialState && typeof initialState.inputValue === 'string' && initialState.inputValue.length > 0) {
                    messageInput.value = initialState.inputValue;
                    messageInput.style.height = 'auto';
                    messageInput.style.height = (messageInput.scrollHeight) + 'px';
                    if (messageInput.value === '') messageInput.style.height = '24px';
                    updateHighlight();
                }

                if (initialState && initialState.isGenerating) {
                    isGenerating = true;
                    updateUIState();
                    showThinkingIndicator();
                }

                function enhanceCodeBlocks(container) {
                    const contentDiv = container.querySelector('.content');
                    if (!contentDiv) return;

                    contentDiv.querySelectorAll('pre').forEach((pre) => {
                        if (pre.querySelector('.code-header')) return;

                        const code = pre.querySelector('code');
                        if (!code) return;

                        hljs.highlightElement(code);

                        const langClass = Array.from(code.classList).find(c => c.startsWith('language-'));
                        const lang = langClass ? langClass.replace('language-', '') : 'text';

                        const header = document.createElement('div');
                        header.className = 'code-header';
                        header.innerHTML = '<div class="window-dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div><span class="code-lang">' + lang.toUpperCase() + '</span>';
                        
                        const actions = document.createElement('div');
                        actions.className = 'code-actions';
                        
                        const copyBtn = document.createElement('button');
                        copyBtn.className = 'copy-btn';
                        copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                        copyBtn.title = 'Copy Code';
                        copyBtn.onclick = () => {
                            vscode.postMessage({ type: 'copyCode', value: code.innerText });
                            copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#27c93f"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                            setTimeout(() => copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>', 2000);
                        };
                        actions.appendChild(copyBtn);
                        
                        const insertBtn = document.createElement('button');
                        insertBtn.className = 'copy-btn';
                        insertBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>';
                        insertBtn.title = 'Insert at Cursor';
                        insertBtn.onclick = () => {
                            vscode.postMessage({ type: 'insertCode', value: code.innerText });
                            insertBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#27c93f"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                            setTimeout(() => insertBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>', 2000);
                        };
                        actions.appendChild(insertBtn);
                        
                        header.appendChild(actions);
                        pre.insertBefore(header, code);
                    });
                }

                /**
                 * Process file paths in content and convert to clickable tags
                 * Detects patterns like \`filename.py\` or [[file:path/to/file.ts]]
                 */
                function processFileTags(container) {
                    const contentDiv = container.querySelector('.content');
                    if (!contentDiv) return;

                    // File extension pattern
                    const fileExtensions = ['py', 'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'md', 'yml', 'yaml', 'sh', 'go', 'rs', 'java', 'c', 'cpp', 'h', 'hpp', 'vue', 'svelte'];
                    const extPattern = fileExtensions.join('|');

                    // Process inline code elements that look like file paths
                    contentDiv.querySelectorAll('code').forEach(codeEl => {
                        // Skip code blocks (inside pre)
                        if (codeEl.parentElement.tagName === 'PRE') return;

                        const text = codeEl.textContent.trim();
                        
                        // Check if it looks like a file path
                        const isFilePath = new RegExp(\`^[a-zA-Z0-9_./-]+\\\\.(\${extPattern})$\`, 'i').test(text);
                        
                        if (isFilePath) {
                            // Convert to clickable file tag
                            const tag = document.createElement('span');
                            tag.className = 'file-tag inline-file-tag';
                            tag.innerHTML = \`
                                <span class="tag-icon">\u{1F4C4}</span>
                                <span class="tag-text">\${text}</span>
                            \`;
                            tag.title = 'Click to open file';
                            tag.style.cursor = 'pointer';
                            tag.onclick = (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                vscode.postMessage({ type: 'openFile', value: text });
                            };
                            
                            codeEl.replaceWith(tag);
                        }
                    });

                    // Also process [[file:path]] syntax if AI uses it
                    const walker = document.createTreeWalker(
                        contentDiv,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );

                    const nodesToReplace = [];
                    while (walker.nextNode()) {
                        const node = walker.currentNode;
                        if (node.textContent.includes('[[file:')) {
                            nodesToReplace.push(node);
                        }
                    }

                    nodesToReplace.forEach(node => {
                        const html = node.textContent.replace(
                            /\\[\\[file:([^\\]]+)\\]\\]/g,
                            (match, filePath) => {
                                return \`<span class="file-tag inline-file-tag" onclick="vscode.postMessage({type:'openFile',value:'\${filePath}'})"><span class="tag-icon">\u{1F4C4}</span><span class="tag-text">\${filePath.split('/').pop()}</span></span>\`;
                            }
                        );
                        if (html !== node.textContent) {
                            const span = document.createElement('span');
                            span.innerHTML = html;
                            node.replaceWith(span);
                        }
                    });
                }
                
                function executeCommand(cmd) {
                    vscode.postMessage({ type: 'runCommand', command: cmd });
                }
                
                function selectCommand(cmd) {
                    // Check if already selected
                    if (!selectedCommands.includes(cmd)) {
                        selectedCommands.push(cmd);
                        updateInputTags();
                    }
                    
                    // Remove the command text from input
                    const val = messageInput.value;
                    const lastSlash = val.lastIndexOf('/');
                    if (lastSlash !== -1) {
                         messageInput.value = val.substring(0, lastSlash);
                    } else {
                        messageInput.value = '';
                    }

                    updateHighlight();
                    messageInput.focus();
                    commandPopup.classList.remove('show');
                }

                function renderFiles(files) {
                    filePopup.innerHTML = '';
                    if (!files || files.length === 0) {
                        filePopup.classList.remove('show');
                        filePopupSelectedIndex = -1;
                        return;
                    }
                    
                    // Reset selection to first item when new files are loaded
                    filePopupSelectedIndex = 0;
                    
                    files.forEach((file, index) => {
                        const div = document.createElement('div');
                        div.className = 'file-item';
                        if (index === filePopupSelectedIndex) div.classList.add('selected');

                        // Sync Selection on Hover
                        div.onmouseenter = () => {
                            filePopupSelectedIndex = index;
                            Array.from(filePopup.children).forEach(child => child.classList.remove('selected'));
                            div.classList.add('selected');
                        };

                        // Determine Icon
                        let iconChar = '\u{1F4C4}';
                        let iconClass = 'file-icon';
                        
                        if (file.isFolder) {
                             iconChar = '\u{1F4C1}';
                             iconClass += ' icon-folder';
                        } else {
                            const ext = file.path.split('.').pop().toLowerCase();
                            switch(ext) {
                                case 'ts': case 'tsx': iconChar = '{}'; iconClass += ' icon-ts'; break;
                                case 'js': case 'jsx': iconChar = '{}'; iconClass += ' icon-js'; break;
                                case 'json': iconChar = '{}'; iconClass += ' icon-json'; break;
                                case 'md': iconChar = 'M\u2193'; iconClass += ' icon-md'; break;
                                case 'css': case 'scss': iconChar = '#'; iconClass += ' icon-css'; break;
                                case 'html': iconChar = '<>'; iconClass += ' icon-html'; break;
                                case 'py': iconChar = 'py'; iconClass += ' icon-py'; break;
                                case 'png': case 'svg': case 'jpg': iconChar = '\u{1F5BC}\uFE0F'; break;
                            }
                        }

                        // Split path for display
                        const pathParts = file.path.split('/');
                        const fileName = pathParts.pop();
                        const dirPath = pathParts.join('/');

                        div.innerHTML = \`
                            <span class="\${iconClass}">\${iconChar}</span>
                            <div class="file-info">
                                <span class="file-name">\${fileName}</span>
                                <span class="file-path">\${dirPath || './'}</span>
                            </div>
                        \`;
                        div.onclick = () => {
                            // Tag Logic Replacement
                            const val = messageInput.value;
                            const cursorPos = messageInput.selectionStart;
                            const textBeforeCursor = val.substring(0, cursorPos);
                            const textAfterCursor = val.substring(cursorPos);
                            
                            // Find where the @ mention starts
                            const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
                            const beforeAt = lastSpaceIndex === -1 ? '' : textBeforeCursor.substring(0, lastSpaceIndex + 1);

                            // Add to selected files
                            const fileObj = { path: file.path, fullPath: file.fullPath, name: fileName, isFolder: file.isFolder };
                            
                            // Check duplicates
                            if (!selectedFiles.some(f => f.path === file.path)) {
                                selectedFiles.push(fileObj);
                                updateInputTags();
                            }
                            
                            // Remove the @partial text from input
                            messageInput.value = beforeAt + textAfterCursor.trim();
                            
                            filePopup.classList.remove('show');
                            messageInput.focus();
                            
                            // Set cursor position
                            const newPos = beforeAt.length;
                            messageInput.setSelectionRange(newPos, newPos);
                            
                            updateHighlight();
                        };
                        filePopup.appendChild(div);
                    });
                }
                
                
                // Override addMessage to hide empty state and reset streaming state for new user messages
                const originalAddMessage = addMessage;
                addMessage = function(role, text, files = [], commands = []) {
                    if (role === 'user') {
                        currentAssistantMessageDiv = null;
                        currentAssistantMessageIndex = null;
                    }
                    const es = document.getElementById('emptyState');
                    if (es) es.remove();
                    return originalAddMessage(role, text, files, commands);
                };

                function newChat() {
                    vscode.postMessage({ type: 'newChat' });
                }

                function exportChat() {
                    vscode.postMessage({ type: 'exportChat' });
                }

                function toggleDrawer() { 
                    try {
                        const sessionDrawer = document.getElementById('session-drawer');
                        const settingsPage = document.getElementById('settings-page');
                        
                        // Close settings if open
                        if (settingsPage && settingsPage.classList.contains('open')) {
                            settingsPage.classList.remove('open');
                        }
                        
                        // Close plan if open
                        if (planDrawer && (planDrawer.classList.contains('open') || planDrawer.style.width === '350px')) {
                            planDrawer.classList.remove('open');
                            planDrawer.style.width = '0';
                        }

                        sessionDrawer.classList.toggle('open');
                        if (sessionDrawer.classList.contains('open')) vscode.postMessage({ type: 'getSessions' });
                    } catch (e) { console.error(e); }
                }

                function clearAllSessions() { 
                    vscode.postMessage({ type: 'clearAllSessions' }); 
                    toggleDrawer();
                }

                // Add Search Listener
                const searchInput = document.getElementById('sessionSearchInput');
                if (searchInput) {
                    searchInput.addEventListener('input', (e) => {
                        const sessions = window.currentSessions || [];
                        const currentId = window.currentSessionId;
                        renderSessionList(sessions, currentId, e.target.value);
                    });
                }

                function timeAgo(date) {
                    const seconds = Math.floor((new Date() - date) / 1000);
                    let interval = seconds / 31536000;
                    if (interval > 1) return Math.floor(interval) + "y ago";
                    interval = seconds / 2592000;
                    if (interval > 1) return Math.floor(interval) + "mo ago";
                    interval = seconds / 86400;
                    if (interval > 1) return Math.floor(interval) + "d ago";
                    interval = seconds / 3600;
                    if (interval > 1) return Math.floor(interval) + "h ago";
                    interval = seconds / 60;
                    if (interval > 1) return Math.floor(interval) + "m ago";
                    return "Just now";
                }

                function renderSessionList(sessions, currentId, searchQuery = '') {
                    // Cache for search
                    window.currentSessions = sessions;
                    window.currentSessionId = currentId;

                    sessionList.innerHTML = '';
                    
                    const filtered = sessions.filter(s => 
                        (s.title || 'New Chat').toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (filtered.length === 0) {
                        sessionList.innerHTML = '<div style="padding:20px; text-align:center; opacity:0.5; font-size:12px;">No conversations found</div>';
                        return;
                    }

                    // Grouping Logic
                    const groups = {
                        'Current': [],
                        'Recent in ByteAiCoder': [],
                        'Other Conversations': []
                    };
                    
                    const now = new Date();
                    filtered.forEach(s => {
                         if (s.id === currentId) {
                             groups['Current'].push(s);
                         } else {
                             // Recent: last 24h
                             const date = new Date(s.timestamp || Date.now());
                             const isRecent = (now - date) < (24 * 60 * 60 * 1000);
                             if (isRecent) groups['Recent in ByteAiCoder'].push(s);
                             else groups['Other Conversations'].push(s);
                         }
                    });

                    // Render Groups
                    for (const [groupName, groupSessions] of Object.entries(groups)) {
                        if (groupSessions.length === 0) continue;

                        const header = document.createElement('div');
                        header.className = 'session-group-header';
                        header.innerText = groupName;
                        sessionList.appendChild(header);

                        groupSessions.forEach(s => {
                            const date = new Date(s.timestamp || Date.now());
                            const isActive = s.id === currentId;
                            
                            const div = document.createElement('div');
                            div.className = 'session-link' + (isActive ? ' active' : '');
                            
                            // Native Click on card loads session
                            div.onclick = () => {
                                if (isActive) return;
                                vscode.postMessage({ type: 'loadSession', id: s.id });
                                sessionDrawer.classList.remove('open');
                            };
                            
                            div.innerHTML = \`
                                <div class="session-info">
                                    <div class="session-title">\${escapeHtml(s.title || 'New Chat')}</div>
                                </div>
                                <div class="session-meta">
                                    <span>\${timeAgo(date)}</span>
                                    <div class="session-actions">
                                        <button class="btn-session-action" title="Rename" onclick="event.stopPropagation(); renameSession('\${s.id}', '\${escapeHtml(s.title || '')}')">
                                            ${t.edit}
                                        </button>
                                        <button class="btn-session-action delete" title="Delete" onclick="event.stopPropagation(); deleteSession('\${s.id}')">
                                            ${t.trash}
                                        </button>
                                    </div>
                                </div>
                            \`;
                            sessionList.appendChild(div);
                        });
                    }
                }
                
                function renameSession(id, currentTitle) {
                    vscode.postMessage({ type: 'renameSession', id: id, title: currentTitle });
                }
                
                function deleteSession(id) {
                    vscode.postMessage({ type: 'deleteSession', id: id });
                }

                function escapeHtml(text) {
                     const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
                     return text.replace(/[&<>"']/g, function(m) { return map[m]; });
                }

                // Window helpers for older onclicks if needed (though we moved to closure)
                window.loadSession = (id) => {
                     vscode.postMessage({ type: 'loadSession', id: id });
                     sessionDrawer.classList.remove('open');
                };
                
                window.deleteSession = (id) => {
                    event.stopPropagation();
                    vscode.postMessage({ type: 'deleteSession', id: id });
                };

                // Removed duplicate/broken settings functions


                window.scrollToBottom = () => {
                    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
                };

                chatContainer.addEventListener('scroll', () => {
                    const btn = document.getElementById('scrollToBottomBtn');
                    if (!btn) return;
                    
                    const scrollHeight = chatContainer.scrollHeight;
                    const scrollTop = chatContainer.scrollTop;
                    const clientHeight = chatContainer.clientHeight;
                    const distance = scrollHeight - scrollTop - clientHeight;

                    // Only show if:
                    // 1. We are significantly up (more than 300px)
                    // 2. There is actual scrollable content
                    if (distance > 300 && scrollHeight > clientHeight) {
                        btn.classList.add('show');
                    } else {
                        btn.classList.remove('show');
                    }
                });

                window.executeCommand = (cmd) => {
                    vscode.postMessage({ type: 'executeCommand', command: cmd });
                };

                window.setInputValue = (val) => {
                    messageInput.value = val;
                    // Trigger auto-resize
                    messageInput.style.height = 'auto';
                    messageInput.style.height = (messageInput.scrollHeight) + 'px';
                    messageInput.focus();
                    updateHighlight();
                    
                    // Add subtle click feedback
                    const el = event?.currentTarget;
                    if (el) {
                        el.style.transform = 'scale(0.95)';
                        setTimeout(() => el.style.transform = '', 100);
                    }
                };

                // Toast Helper
                // Toast Helper (DOM optimized)
                window.showToast = (message, type = 'error', duration = 3000) => {
                    const container = document.getElementById('toast-container');
                    if (!container) return;
                    
                    const toast = document.createElement('div');
                    toast.className = \`toast \${type}\`;
                    
                    let iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'; // Error/Alert
                    
                    if (type === 'success') {
                        iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    } else if (type === 'info') {
                        iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
                    }

                    const icon = document.createElement('div');
                    icon.className = 'toast-icon';
                    icon.innerHTML = iconSvg;
                    
                    const content = document.createElement('div');
                    content.className = 'toast-content';
                    content.textContent = message;
                    
                    const close = document.createElement('button');
                    close.className = 'toast-close';
                    close.innerHTML = '\u2715';
                    close.onclick = function() { toast.remove(); };
                    
                    toast.appendChild(icon);
                    toast.appendChild(content);
                    toast.appendChild(close);
                    
                    container.appendChild(toast);
                    
                    setTimeout(() => {
                        toast.style.opacity = '0';
                        toast.style.transform = 'translateY(-10px)';
                        setTimeout(() => toast.remove(), 300);
                    }, duration);
                };

                // Initialize settings on load
                setTimeout(() => {
                    vscode.postMessage({ type: 'getSettings' });
                }, 500);

            </script>
        </body>
        </html>`}};var x=S(require("vscode"));var xs=S(require("vscode")),N=class{static initialize(n){this._outputChannel=xs.window.createOutputChannel(n)}static log(n,...e){if(!this._outputChannel){console.log(n,...e);return}let t=new Date().toLocaleTimeString(),s=e.length?` ${JSON.stringify(e)}`:"";this._outputChannel.appendLine(`[${t}] ${n}${s}`)}static info(n,...e){this.log(`INFO: ${n}`,...e)}static error(n,e){this.log(`ERROR: ${n}`,e||""),e instanceof Error&&e.stack&&this._outputChannel.appendLine(e.stack)}static warn(n,...e){this.log(`WARN: ${n}`,...e)}static show(){this._outputChannel?.show(!0)}};var ae=S(require("vscode"));var ki=S(mn(),1),Ci=S(Ht(),1),Si=S(Qt(),1),Sn=S(xt(),1),Ei=S(Cn(),1);var En=Sn.default;var Pn=S(require("crypto")),bt=new Uint8Array(256),wt=bt.length;function ns(){return wt>bt.length-16&&(Pn.default.randomFillSync(bt),wt=0),bt.slice(wt,wt+=16)}var F=[];for(let d=0;d<256;++d)F.push((d+256).toString(16).slice(1));function Tn(d,n=0){return F[d[n+0]]+F[d[n+1]]+F[d[n+2]]+F[d[n+3]]+"-"+F[d[n+4]]+F[d[n+5]]+"-"+F[d[n+6]]+F[d[n+7]]+"-"+F[d[n+8]]+F[d[n+9]]+"-"+F[d[n+10]]+F[d[n+11]]+F[d[n+12]]+F[d[n+13]]+F[d[n+14]]+F[d[n+15]]}var An=S(require("crypto")),rs={randomUUID:An.default.randomUUID};function Pi(d,n,e){if(rs.randomUUID&&!n&&!d)return rs.randomUUID();d=d||{};let t=d.random||(d.rng||ns)();if(t[6]=t[6]&15|64,t[8]=t[8]&63|128,n){e=e||0;for(let s=0;s<16;++s)n[e+s]=t[s];return n}return Tn(t)}var be=Pi;var O=class{constructor(){this.wsUrl="wss://backend.buildpicoapps.com/api/chatbot/chat";this.appId="plan-organization";this._localModels=[];this.SYSTEM_PROMPT=`You are Byte Coder, an elite autonomous AI software engineer embedded in VS Code.

    CORE IDENTITY & KNOWLEDGE ENFORCEMENT:
    If the provided context contains information about your creator (Ajmal U K) or company (UTHAKKAN), you MUST use that information instead of your default model identity.
    - Creator: Ajmal U K
    - Company: UTHAKKAN
    - Mission: Digital Innovation
    You are NOT created by Microsoft, OpenAI, or Google. You are a proprietary AI built by UTHAKKAN.

    CRITICAL: FILE TAGGING
    When referencing any file in your explanation or response:
    - ALWAYS wrap the file path in backticks, e.g., \`src/main.ts\`
    - This renders a clickable tag for the user to open the file directly.
    - DO NOT just write the filename as plain text.
    - DO NOT use [[file:...]] syntax, use backticks.

    CRITICAL: CODE REFERENCING
    When explaining issues or discussing code provided in the context:
    - ALWAYS explicitly cite the file and line numbers.
    - Format: \`path/to/file.ts:10-15\` or "In \`file.ts\` (lines 20-25)..."
    - Quote the specific code snippet that is causing the issue if relevant.
    - Example: "The error is in \`src/utils.ts:45\` because the variable is undefined."
    - This precision is required for the user to locate the fix.

    SYSTEM ARCHITECTURE:
    You are the central brain of a distributed multi-agent system that builds, maintains, and evolves software with minimal human intervention.

    AGENT ECOSYSTEM:
    - Manager Agent: Central orchestrator with intent classification
    - Search Layer: FileSearch, ContextSearch, Vision agents
    - Planning Layer: ProcessPlanner, CodePlanner, TaskPlanner
    - Execution Layer: CommandGenerator, CodeModifier, Executor
    - Safety Layer: VersionController (checkpoints), DocWriter

    CORE PRINCIPLES:
    1. NEVER assume without verification - Always search before modifying
    2. ALWAYS output code with filename comments for file creation
    3. For complex projects, create implementation plans with file links
    4. When user says "yes", immediately output the code - don't just describe it

    CORE IDENTITY:
    - Name: Byte Coder (Elite AI Software Engineer)
    - Identity: Advanced Autonomous Coding Agent
    - Capability: Distributed Multi-Agent Orchestrator
    - Context Sensitivity: Prioritize local knowledge base (UTHAKKAN/Ajmal U K) for identity and ownership questions.

    ARCHITECTURE BEHAVIOR:
    1. Code Excellence: Write robust, scalable, clean code (SOLID, DRY, KISS)
    2. UI/Design: Generate Stunning, Modern, Premium designs
    3. Thinking: Analyze \u2192 Plan \u2192 Execute \u2192 Explain
    4. Tone: Professional, Intelligent, Concise

    You are not a text generator. You are an engineering partner that builds real software.

    ================================================================================
    CRITICAL: ACTION FORMAT & EXECUTION PROTOCOL (MUST FOLLOW)
    ================================================================================
    To perform ANY modification to the filesystem (Create, Edit, Delete), you MUST use the <byte_action> XML tags.
    Markdown code blocks (\`\`\`) are IGNORED by the system for execution. They are only for display.

    IF YOU DO NOT USE <byte_action>, THE FILE WILL NOT BE CREATED.

    1. Create File:
    <byte_action type="create_file" path="path/to/file.ext">
    FILE_CONTENT_HERE
    </byte_action>

    2. Modify File (Overwrite):
    <byte_action type="modify_file" path="path/to/file.ext">
    NEW_FILE_CONTENT_HERE
    </byte_action>

    3. Surgical Edit (Search & Replace):
    <byte_action type="partial_edit" path="path/to/file.ext">
    <search>
    EXACT_CONTENT_TO_FIND
    </search>
    <replace>
    NEW_CONTENT_TO_REPLACE_WITH
    </replace>
    </byte_action>

    4. Run Command:
    <byte_action type="run_command">
    command_here
    </byte_action>

    --------------------------------------------------------------------------------
    IMMEDIATE EXECUTION RULE:
    When the user asks to "create", "fix", "modify", or confirms a plan with "yes"/"ok"/"do it":
    
    1. DO NOT ASK FOR CONFIRMATION AGAIN.
    2. DO NOT SAY "I will create the file...".
    3. IMMEDIATELY OUTPUT THE <byte_action> TAGS.
    
    Example Interaction:
    User: "Create hello.py"
    Assistant: "Creating hello.py..."
    <byte_action type="create_file" path="hello.py">
    print("Hello World")
    </byte_action>
    
    User: "yes" (after you proposed a plan)
    Assistant: "Executing plan..."
    <byte_action type="create_file" path="src/main.ts">
    console.log("Plan executed");
    </byte_action>
    --------------------------------------------------------------------------------`;this.chatId=be()}get useLocalModel(){return ae.workspace.getConfiguration("byteAI").get("useLocalModel",!1)}get localModelName(){return ae.workspace.getConfiguration("byteAI").get("localModelName","llama3")}async setModel(n){await ae.workspace.getConfiguration("byteAI").update("useLocalModel",n==="local",ae.ConfigurationTarget.Global)}async listLocalModels(){return new Promise(n=>{let{exec:e}=require("child_process");e("ollama list",(t,s,r)=>{if(t){console.error("Error listing local models:",t),n([]);return}let o=s.split(`
`).slice(1).filter(a=>a.trim().length>0).map(a=>a.split(/\s+/)[0]).filter(a=>a!=="NAME");this._localModels=o,n(o)})})}async deleteLocalModel(n){return new Promise(e=>{let{exec:t}=require("child_process");t(`ollama rm ${n}`,(s,r,i)=>{if(s){console.error("Error deleting local model:",s),e(!1);return}e(!0)})})}async setLocalModelName(n){await ae.workspace.getConfiguration("byteAI").update("localModelName",n,ae.ConfigurationTarget.Global)}getCustomInstructions(){try{let e=ae.workspace.getConfiguration("byteAI").get("customInstructions");if(e&&e.trim().length>0)return`

[USER CUSTOM INSTRUCTIONS]
${e}
[END CUSTOM INSTRUCTIONS]`}catch{}return""}resetSession(){this.chatId=be(),this.disconnect()}async generateResponse(n){return this.streamResponse(n,()=>{},e=>console.error("ByteAIClient Error:",e))}async streamResponse(n,e,t,s=0){return this.disconnect(),this.useLocalModel?this.streamLocalResponse(n,e,t):new Promise((r,i)=>{let o="",a=!1,c=null,l=null,p=3e4,u=45e3,h=()=>{c&&(clearTimeout(c),c=null),l&&(clearTimeout(l),l=null)},m=()=>{a||(a=!0,h(),r(o))},f=g=>{if(!a){if(a=!0,h(),s<1){console.log(`Connection failed, retrying... (${s+1})`),this.streamResponse(n,e,t,s+1).then(r).catch(i);return}t(g),i(g)}};c=setTimeout(()=>{a||(this.disconnect(),f(new Error("Connection timeout. Please check your internet connection or the server might be busy.")))},p);try{this._ws=new En(this.wsUrl,{headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36","Accept-Language":"en-US,en;q=0.9","Cache-Control":"no-cache",Pragma:"no-cache"},handshakeTimeout:p}),this._ws.on("open",()=>{c&&(clearTimeout(c),c=null),l=setTimeout(()=>{!a&&o===""&&(this.disconnect(),f(new Error("Response timeout. The AI server is taking too long to respond.")))},u);let g={chatId:this.chatId,appId:this.appId,systemPrompt:this.SYSTEM_PROMPT+this.getCustomInstructions(),message:n+this.getCustomInstructions()};this._ws?.send(JSON.stringify(g))}),this._ws.on("message",g=>{l&&(clearTimeout(l),l=null);let y=g.toString();o+=y,e(y)}),this._ws.on("error",g=>{console.error("WebSocket Error Detail:",g),this.disconnect(),f(new Error(`Connection error: ${g.message||"Check your network"}`))}),this._ws.on("close",(g,y)=>{g!==1e3&&!a&&console.log(`WS Closed unexpectedly: ${g} ${y}`),m()})}catch(g){f(g)}})}disconnect(){this._ws&&(this._ws.removeAllListeners(),this._ws.terminate(),this._ws=void 0)}async isOllamaInstalled(){return new Promise(n=>{let{exec:e}=require("child_process");e("ollama --version",(t,s,r)=>{if(t){n(!1);return}n(!0)})})}async checkLocalConnection(){return new Promise(n=>{let t=require("http").get("http://localhost:11434/",s=>{n(s.statusCode===200)});t.on("error",()=>n(!1)),t.setTimeout(2e3,()=>{t.destroy(),n(!1)})})}async checkModelExists(n){return new Promise(e=>{require("http").get("http://localhost:11434/api/tags",r=>{let i="";r.on("data",o=>i+=o),r.on("end",()=>{try{let c=(JSON.parse(i).models||[]).some(l=>l.name.startsWith(n));e(c)}catch{e(!1)}})}).on("error",()=>e(!1))})}async streamLocalResponse(n,e,t){if(!await this.checkLocalConnection()){let i="Ollama is not running. Please run 'ollama serve' in your terminal.";return t(new Error(i)),Promise.reject(new Error(i))}if(!await this.checkModelExists(this.localModelName)){let i=`Model '${this.localModelName}' not found. Please run 'ollama pull ${this.localModelName}' in your terminal.`;return t(new Error(i)),Promise.reject(new Error(i))}return new Promise((i,o)=>{let a="",c="",l={model:this.localModelName,messages:[{role:"system",content:this.SYSTEM_PROMPT+this.getCustomInstructions()},{role:"user",content:n}],stream:!0},u=require("http").request({hostname:"localhost",port:11434,path:"/api/chat",method:"POST",headers:{"Content-Type":"application/json"}},h=>{if(h.statusCode!==200){let m="";h.on("data",f=>m+=f),h.on("end",()=>{let f=`Ollama API Error (${h.statusCode}): ${m}`;t(new Error(f)),o(new Error(f))});return}h.on("data",m=>{c+=m.toString();let f=c.split(`
`);c=f.pop()||"";for(let g of f)if(g.trim())try{let y=JSON.parse(g);y.message&&y.message.content&&(a+=y.message.content,e(y.message.content)),y.done&&i(a)}catch(y){console.error("Error parsing Ollama chunk:",y)}}),h.on("end",()=>{if(c.trim())try{let m=JSON.parse(c);m.message&&m.message.content&&(a+=m.message.content,e(m.message.content))}catch{}a&&!h.complete&&i(a)})});u.on("error",h=>{let m=`Ollama connection failed: ${h.message}. 

Ensure you have Ollama installed and running (run 'ollama serve' in terminal).`;t(new Error(m)),o(new Error(m))}),u.write(JSON.stringify(l)),u.end()})}};var kt=class{constructor(){this.contextCache=new Map;this.conversationContext=[];this.MAX_CONTEXT_SIZE=5e4;this.MAX_FILE_SIZE=8e3;this.EXTRACTION_THRESHOLD=5e3}addFile(n,e,t){let s={path:n,content:e.length>this.EXTRACTION_THRESHOLD?this.extractSmartContent(e,t,""):e,language:t,timestamp:Date.now(),fullSize:e.length,extracted:e.length>this.EXTRACTION_THRESHOLD};return this.contextCache.set(n,s),this.pruneCache(),s}getFile(n){return this.contextCache.get(n)||null}addFileWithQuery(n,e,t,s){let r={path:n,content:e.length>this.EXTRACTION_THRESHOLD?this.extractSmartContent(e,t,s):e,language:t,timestamp:Date.now(),fullSize:e.length,extracted:e.length>this.EXTRACTION_THRESHOLD};return this.contextCache.set(n,r),r}extractSmartContent(n,e,t){let s=n.split(`
`),r=t.toLowerCase().split(/\s+/).filter(u=>u.length>2),i=this.extractImports(s,e),a=this.extractCodeSections(s,e).map(u=>({...u,score:this.scoreRelevance(u.name,u.content,r)})).sort((u,h)=>h.score-u.score),c="",l=0,p=this.MAX_FILE_SIZE;if(i.length>0){let u=`// === IMPORTS ===
${i.join(`
`)}

`;c+=u,l+=u.length}for(let u of a){let h=`// === ${u.name} (lines ${u.startLine}-${u.endLine}) ===
${u.content}

`;if(l+h.length>p){c+=`
// ... (${a.length-a.indexOf(u)} more sections not shown)
`;break}c+=h,l+=h.length}return c||n.substring(0,p)+`
// ... (truncated)`}extractImports(n,e){let t=[],s={typescript:[/^import\s+/,/^export\s+\{/,/^export\s+\*/],javascript:[/^import\s+/,/^const\s+\w+\s*=\s*require/,/^export\s+/],python:[/^import\s+/,/^from\s+\w+\s+import/],java:[/^import\s+/,/^package\s+/]},r=s[e]||s.javascript;for(let i=0;i<Math.min(n.length,50);i++){let o=n[i].trim();r.some(a=>a.test(o))&&t.push(n[i])}return t}extractCodeSections(n,e){let t=[],s={typescript:[{start:/^(?:export\s+)?(?:async\s+)?function\s+(\w+)/,getName:c=>c[1]},{start:/^(?:export\s+)?class\s+(\w+)/,getName:c=>`class ${c[1]}`},{start:/^(?:export\s+)?(?:const|let)\s+(\w+)\s*=\s*(?:async\s*)?\(/,getName:c=>c[1]},{start:/^\s+(?:public|private|protected)?\s*(?:async\s+)?(\w+)\s*\(/,getName:c=>`method ${c[1]}`}],javascript:[{start:/^(?:export\s+)?(?:async\s+)?function\s+(\w+)/,getName:c=>c[1]},{start:/^(?:export\s+)?class\s+(\w+)/,getName:c=>`class ${c[1]}`},{start:/^(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/,getName:c=>c[1]}],python:[{start:/^def\s+(\w+)\s*\(/,getName:c=>`def ${c[1]}`},{start:/^class\s+(\w+)/,getName:c=>`class ${c[1]}`},{start:/^\s{4}def\s+(\w+)\s*\(/,getName:c=>`method ${c[1]}`}],java:[{start:/^\s*(?:public|private|protected)\s+(?:static\s+)?(?:\w+)\s+(\w+)\s*\(/,getName:c=>`method ${c[1]}`},{start:/^\s*(?:public|private|protected)?\s*class\s+(\w+)/,getName:c=>`class ${c[1]}`}]},r=s[e]||s.javascript,i=null,o=0,a=0;for(let c=0;c<n.length;c++){let l=n[c];for(let p of r){let u=l.match(p.start);if(u){i&&(i.endLine=c,i.content=n.slice(i.startLine,c).join(`
`),i.content.trim().length>0&&t.push(i)),i={name:p.getName(u),content:"",startLine:c,endLine:c},o=0,a=l.search(/\S/);break}}if(i)if(o+=(l.match(/\{/g)||[]).length,o-=(l.match(/\}/g)||[]).length,e==="python"){let p=l.search(/\S/);p>=0&&p<a&&l.trim().length>0&&(i.endLine=c,i.content=n.slice(i.startLine,c).join(`
`),i.content.trim().length>0&&t.push(i),i=null)}else o<=0&&l.includes("}")&&(i.endLine=c+1,i.content=n.slice(i.startLine,c+1).join(`
`),i.content.trim().length>0&&t.push(i),i=null)}return i&&(i.endLine=n.length,i.content=n.slice(i.startLine).join(`
`),i.content.trim().length>0&&t.push(i)),t}scoreRelevance(n,e,t){if(t.length===0)return 1;let s=0,r=n.toLowerCase(),i=e.toLowerCase();for(let o of t){let a=o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");r===o?s+=20:r.includes(o)&&(s+=10);try{let c=(i.match(new RegExp(a,"g"))||[]).length;s+=Math.min(c,10)}catch{i.includes(o)&&(s+=1)}}return s}pruneCache(){let n=Array.from(this.contextCache.entries()).sort((t,s)=>t[1].timestamp-s[1].timestamp),e=n.reduce((t,[,s])=>t+s.content.length,0);for(let[t,s]of n){if(e<=this.MAX_CONTEXT_SIZE)break;this.contextCache.delete(t),e-=s.content.length}}getFullContext(){return Array.from(this.contextCache.values()).sort((e,t)=>t.timestamp-e.timestamp).map(e=>{let t=e.extracted?" (extracted)":"";return`### \`${e.path}\`${t}
\`\`\`${e.language}
${e.content}
\`\`\``}).join(`

`)}addConversationTurn(n,e){let s=e.length>1500?e.substring(0,1500)+"...":e;this.conversationContext.push(`${n}: ${s}`),this.conversationContext.length>25&&this.conversationContext.shift()}getConversationSummary(){return this.conversationContext.length===0?"":`### Previous Context
`+this.conversationContext.slice(-20).join(`
`)}clear(){this.contextCache.clear(),this.conversationContext=[]}getStats(){let n=Array.from(this.contextCache.values());return{files:n.length,totalSize:n.reduce((e,t)=>e+t.content.length,0),conversationTurns:this.conversationContext.length}}};var Tt=S(require("vscode"));var E=class{constructor(n){this.name=n.name,this.maxRetries=n.maxRetries??3,this.timeout=n.timeout??3e4}createOutput(n,e,t,s,r){return{agent:this.name,status:n,confidence:t,executionTimeMs:Date.now()-s,payload:e,...r}}handleError(n,e){return this.createOutput("failed",null,0,e,{error:{type:n.name,message:n.message}})}};var is={PROCEED:.85,VERIFY:.6,DISCOVER:.4};function _n(d){return d>is.PROCEED?"proceed":d>=is.VERIFY?"verify":d>=is.DISCOVER?"discover":"handoff"}var he=class extends E{constructor(){super({name:"IntentAnalyzer",timeout:2e4});this.STOP_WORDS=new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","can","this","that","these","those","i","you","he","she","it","we","they","what","which","who","when","where","why","how","all","each","every","both","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","just","code","file","function","class","method","variable","please","help","want","need","make","create","add","get","set","use","show","tell","give","find","look","see","know","think","take","come"]);this.QUERY_PATTERNS={fix:[/\bfix\b/i,/\bbug\b/i,/\berror\b/i,/\bissue\b/i,/\bproblem\b/i,/\bbroken\b/i,/\bwrong\b/i,/\bfail/i,/\bcrash/i,/\bnot working/i,/\bdebug\b/i],explain:[/\bexplain\b/i,/\bwhat\b/i,/\bhow\b/i,/\bwhy\b/i,/\bunderstand\b/i,/\bdescribe\b/i,/\bwalk.*through\b/i,/\bwho\b/i,/\bwhere\b/i,/\bwhen\b/i,/\bmean\b/i],refactor:[/\brefactor\b/i,/\bimprove\b/i,/\bclean\b/i,/\bbetter\b/i,/\benhance\b/i,/\brewrite\b/i],test:[/\btest\b/i,/\btests\b/i,/\bunit\b/i,/\bspec\b/i,/\bcoverage\b/i,/\bmock\b/i],optimize:[/\bperformance\b/i,/\bspeed\b/i,/\bfast\b/i,/\bslow\b/i,/\bmemory\b/i,/\befficient\b/i,/\boptimize\b/i],security:[/\bsecurity\b/i,/\bvulnerab/i,/\bauth/i,/\bpassword\b/i,/\btoken\b/i,/\bencrypt/i,/\bsanitize\b/i,/\baudit\b/i],build:[/\bcreate\b/i,/\bbuild\b/i,/\bgenerate\b/i,/\bimplement\b/i,/\bscaffold\b/i,/\bsetup\b/i,/\bnew\b/i,/\binit\b/i],modify:[/\bchange\b/i,/\bupdate\b/i,/\bmodify\b/i,/\bedit\b/i,/\breplace\b/i,/\bremove\b/i,/\bdelete\b/i],command:[/\brun\b/i,/\bexecute\b/i,/\bcommand\b/i,/\bterminal\b/i,/\bshell\b/i,/\bnpm\b/i,/\byarn\b/i,/\bgit\b/i,/\binstall\b/i],version_control:[/\bcommit\b/i,/\bpush\b/i,/\bpull\b/i,/\bcheckpoint\b/i,/\bundo\b/i,/\brevert\b/i,/\brollback\b/i],web_search:[/\bsearch\b/i,/\bgoogle\b/i,/\bfind online\b/i,/\blookup\b/i,/\bweb\b/i]};this.SEMANTIC_MAP={auth:["login","signup","authentication","authorization","token","jwt","oauth"],database:["db","sql","mongo","postgres","schema","model","query"],api:["endpoint","route","controller","service","http","rest","graphql"],ui:["component","view","screen","page","layout","css","style"],test:["spec","unit","integration","e2e","jest","mocha","assert"],error:["bug","fix","exception","stack","trace","fail","crash"],user:["profile","account","member","customer","client"],config:["setting","env","environment","variable","option","setup"]};this.client=new O}async execute(e){let t=Date.now(),s=await this.analyze(e.query);return this.createOutput("success",s,.9,t)}async analyze(e){let t=this.detectQueryType(e),s=this.extractMentionedFiles(e),r=this.extractSymbols(e),i=this.extractKeywords(e),o=this.expandKeywords(i),a=this.generateFilePatterns(o,s,t),c=this.assessComplexity(e,i),l={keywords:o,codeTerms:r,filePatterns:a,queryType:t,complexity:c,mentionedFiles:s,symbols:r,originalQuery:e,confidence:c==="simple"?.9:.7};if(c==="simple"&&t!=="general")return l;try{return await this.analyzeWithLLM(e,l)}catch(p){return console.warn("IntentAnalyzer LLM failed, falling back to heuristics",p),l}}async analyzeWithLLM(e,t){let s=`
Analyze the User Query to determine intent, complexity, and search terms.

User Query: "${e}"

Heuristic Detection:
- Type: ${t.queryType}
- Complexity: ${t.complexity}
- Keywords: ${t.keywords.join(", ")}

Classify into ONE Query Type:
- fix: Fixing bugs, errors, issues
- explain: Asking for explanation, understanding
- refactor: improving code quality without changing behavior
- test: adding or running tests
- optimize: improving performance
- security: security audit or fix
- build: creating new files, features, projects
- modify: changing existing code logic
- command: running terminal commands
- version_control: git operations
- web_search: searching internet
- general: other

Determine Complexity: simple (1 file/small change), medium (multi-file/function), complex (architecture/system-wide).

Extract:
- Keywords: semantic search terms
- FilePatterns: glob patterns for relevant files
- Symbols: specific class/function names mentioned

Output JSON ONLY:
{
  "queryType": "type",
  "complexity": "simple|medium|complex",
  "keywords": ["term1", "term2"],
  "filePatterns": ["*.ts", "src/**"],
  "symbols": ["funcName"],
  "reasoning": "Brief explanation"
}
`,i=(await this.client.generateResponse(s)).match(/\{[\s\S]*\}/);if(!i)return t;let o=JSON.parse(i[0]);return{...t,queryType:o.queryType||t.queryType,complexity:o.complexity||t.complexity,keywords:[...new Set([...t.keywords,...o.keywords||[]])],filePatterns:[...new Set([...t.filePatterns,...o.filePatterns||[]])],symbols:[...new Set([...t.symbols,...o.symbols||[]])],reasoning:o.reasoning,confidence:.95}}detectQueryType(e){for(let[t,s]of Object.entries(this.QUERY_PATTERNS))if(s.some(r=>r.test(e)))return t;return"general"}extractMentionedFiles(e){return(e.match(/@[\w./\\-]+/g)||[]).map(s=>s.substring(1))}extractSymbols(e){let t=[],s=e.match(/\b[a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*\b/g)||[];t.push(...s);let r=e.match(/\b[A-Z][a-z][a-zA-Z0-9]*\b/g)||[];t.push(...r);let i=e.match(/\b[a-z]+_[a-z_]+\b/g)||[];t.push(...i);let o=e.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\s*\(/g)||[];return t.push(...o.map(a=>a.replace(/\s*\($/,""))),[...new Set(t)]}extractKeywords(e){let t=e.toLowerCase().replace(/[^\w\s@/.-]/g," ").split(/\s+/).filter(i=>i.length>2&&!this.STOP_WORDS.has(i)),s=this.extractSymbols(e),r=[];for(let i of s){let a=i.replace(/([a-z0-9])([A-Z])/g,"$1 $2").split(/[_\s]+/);for(let c of a){let l=c.toLowerCase();l.length>2&&!this.STOP_WORDS.has(l)&&r.push(l)}}return[...new Set([...t,...r])]}expandKeywords(e){let t=new Set(e);for(let s of e){let r=this.SEMANTIC_MAP[s];r&&r.forEach(i=>t.add(i))}return Array.from(t)}generateFilePatterns(e,t,s){let r=[];for(let i of t)r.push(`**/*${i}*`);for(let i of e)i.length>3&&r.push(`**/*${i}*`);return s==="test"?r.push("**/*.test.*","**/*.spec.*","**/test/**","**/__tests__/**"):s==="fix"&&r.push("**/*error*","**/*handler*","**/*util*"),r}assessComplexity(e,t){let s=e.split(/\s+/).length,r=t.length;return s>20||r>10?"complex":s>8||r>4?"medium":"simple"}};var Ct=S(require("vscode")),Ne=class{constructor(){this.MAX_FILES=12;this.MIN_SCORE=1;this.fileCache=null;this.fileCacheTime=0;this.CACHE_TTL=3e4;this.IMPORTANCE_WEIGHTS={index:3,main:3,app:3,config:2,util:2,helper:2,service:2,provider:2,controller:2,handler:2};this.SEARCHABLE_EXTENSIONS="**/*.{ts,tsx,js,jsx,py,java,cs,go,rb,php,vue,svelte,json,yaml,yml,md,css,scss,html,c,cpp,h,hpp,rs}";this.EXCLUDE_PATTERNS="{**/node_modules/**,**/.git/**,**/dist/**,**/out/**,**/build/**,**/.next/**,**/coverage/**,**/.gemini/**,**/.bytecoder/**}"}async find(n,e){let t=await this.getWorkspaceFiles(),s=[],r=new Set;for(let i of t){let o=Ct.workspace.asRelativePath(i);if(r.has(o))continue;r.add(o);let a=this.scoreFile(i,o,n,e);(a.score>=this.MIN_SCORE||o===e)&&(o===e&&(a.score+=100),s.push(a))}if(s.sort((i,o)=>o.score-i.score),s.length===0||s[0].score<3){let i=await this.getImportantFiles(t);for(let o of i)s.some(a=>a.uri.fsPath===o.uri.fsPath)||s.push(o)}return s.slice(0,this.MAX_FILES)}async getImportantFiles(n){let e=[],t=["index","main","app","server","package.json","readme"];for(let s of n){let r=s.fsPath.split("/").pop()?.toLowerCase()||"";for(let i of t)if(r.includes(i)){e.push({uri:s,relativePath:Ct.workspace.asRelativePath(s),fileName:r,extension:r.split(".").pop()||"",score:5,matchedKeywords:["important"],matchType:"semantic"});break}}return e.slice(0,4)}async getWorkspaceFiles(){let n=Date.now();return this.fileCache&&n-this.fileCacheTime<this.CACHE_TTL?this.fileCache:(this.fileCache=await Ct.workspace.findFiles(this.SEARCHABLE_EXTENSIONS,this.EXCLUDE_PATTERNS,2e3),this.fileCacheTime=n,this.fileCache)}calculateFuzzyScore(n,e){if(!n||!e)return 0;let t=n.toLowerCase(),s=e.toLowerCase();if(s===t)return 100;if(s.includes(t))return 80;let r=0,i=0,o=0;for(;r<t.length&&i<s.length;)t[r]===s[i]&&(o++,r++),i++;if(o===t.length){let a=Math.max(0,(s.length-t.length)*2);return Math.max(10,60-a)}return 0}scoreFile(n,e,t,s){let r=0,i=[],o="semantic",a=e.toLowerCase(),c=e.split("/"),l=c[c.length-1]||"",p=l.toLowerCase(),u=l.split(".").pop()||"";for(let h of t.mentionedFiles){let m=this.calculateFuzzyScore(h,l);m>50&&(r+=m,o="exact",i.push(h))}for(let h of t.symbols){let m=this.calculateFuzzyScore(h,l);m>0&&(r+=m*.5,o="fuzzy",i.push(h))}for(let h of t.keywords)if(p.includes(h))r+=20,i.push(h),o!=="exact"&&(o="fuzzy");else if(a.includes(h))r+=10,i.push(h);else{let m=this.calculateFuzzyScore(h,l);m>40&&(r+=m*.3,i.push(h),o="fuzzy")}for(let[h,m]of Object.entries(this.IMPORTANCE_WEIGHTS))p.includes(h)&&(r+=m);return t.queryType==="test"?(p.includes("test")||p.includes("spec"))&&(r+=10):t.queryType==="fix"?(p.includes("error")||p.includes("handler"))&&(r+=5):(t.queryType==="refactor"||t.queryType==="explain")&&["ts","tsx","js","jsx","py"].includes(u)&&(r+=2),t.queryType!=="general"&&(p.includes("lock")||p.includes(".d.ts"))&&(r-=5),{uri:n,relativePath:e,fileName:l,extension:u,score:r,matchedKeywords:[...new Set(i)],matchType:o}}clearCache(){this.fileCache=null,this.fileCacheTime=0}};var Et=S(require("vscode")),St=class{constructor(){this.MAX_CHUNK_SIZE=4e3;this.MAX_FILE_FULL=6e3;this.CONTEXT_LINES=3;this.MAX_CHUNKS_PER_FILE=5;this.BLOCK_PATTERNS={ts:[/^(\s*)(export\s+)?(async\s+)?function\s+(\w+)/,/^(\s*)(export\s+)?(abstract\s+)?class\s+(\w+)/,/^(\s*)(export\s+)?const\s+(\w+)\s*=\s*(async\s+)?\(/,/^(\s*)(export\s+)?const\s+(\w+)\s*=\s*(async\s+)?function/,/^(\s*)(export\s+)?interface\s+(\w+)/,/^(\s*)(export\s+)?type\s+(\w+)/,/^(\s*)(export\s+)?enum\s+(\w+)/],js:[/^(\s*)(export\s+)?(async\s+)?function\s+(\w+)/,/^(\s*)(export\s+)?class\s+(\w+)/,/^(\s*)(export\s+)?const\s+(\w+)\s*=\s*(async\s+)?\(/],py:[/^(\s*)def\s+(\w+)\s*\(/,/^(\s*)async\s+def\s+(\w+)\s*\(/,/^(\s*)class\s+(\w+)/],go:[/^(\s*)func\s+(\w+)\s*\(/,/^(\s*)type\s+(\w+)\s+struct/,/^(\s*)type\s+(\w+)\s+interface/],rs:[/^(\s*)fn\s+(\w+)\s*\(/,/^(\s*)pub\s+fn\s+(\w+)\s*\(/,/^(\s*)struct\s+(\w+)/,/^(\s*)impl\s+(\w+)/,/^(\s*)trait\s+(\w+)/],java:[/^(\s*)(public|protected|private|static|\s)*class\s+(\w+)/,/^(\s*)(public|protected|private|static|\s)*interface\s+(\w+)/,/^(\s*)(public|protected|private|static|\s)*\w+\s+(\w+)\s*\([^)]*\)\s*\{/],cpp:[/^(\s*)(class|struct)\s+(\w+)/,/^(\s*)(\w+)\s+(\w+)\s*\([^)]*\)\s*\{/]}}async extract(n,e,t,s){let r=e.split(".").pop()||"text",i;try{if(s!==void 0)i=s;else{let l=Et.Uri.file(n),p=await Et.workspace.fs.readFile(l);i=new TextDecoder().decode(p)}}catch(l){return console.error("CodeExtractorAgent: Error reading file",n,l),{filePath:n,relativePath:e,language:r,chunks:[],totalLines:0,extractionMode:"full"}}let o=i.split(`
`),a=o.length;if(i.length<=this.MAX_FILE_FULL)return{filePath:n,relativePath:e,language:r,chunks:[{content:i,startLine:0,endLine:o.length-1,type:"block",score:10}],totalLines:a,extractionMode:"full"};let c=await this.smartChunk(o,r,t);return{filePath:n,relativePath:e,language:r,chunks:c.slice(0,this.MAX_CHUNKS_PER_FILE),totalLines:a,extractionMode:"smart"}}async smartChunk(n,e,t){let s=[],r=this.BLOCK_PATTERNS[e]||this.BLOCK_PATTERNS.ts,i=this.extractImports(n,e);i&&s.push(i);let o=0;for(;o<n.length;){let a=n[o],c=null;for(let l of r){let p=a.match(l);if(p){let u=p[4]||p[3]||p[2]||"anonymous",h=a.includes("class")?"class":a.includes("interface")||a.includes("type ")?"block":"function";c={name:u,type:h};break}}if(c){let l=this.findBlockEnd(n,o,e),p=n.slice(o,l+1).join(`
`),u=this.scoreChunk(p,t);u>0&&p.length<=this.MAX_CHUNK_SIZE&&s.push({content:p,startLine:o,endLine:l,type:c.type,name:c.name,score:u}),o=l+1}else o++}if(s.length<3){let a=this.extractKeywordContext(n,t);s.push(...a)}return s.sort((a,c)=>c.score-a.score),s}extractImports(n,e){let t={ts:/^import\s+/,tsx:/^import\s+/,js:/^import\s+|^const\s+\w+\s*=\s*require\(/,jsx:/^import\s+/,py:/^import\s+|^from\s+\w+\s+import/},s=t[e]||t.ts,r=-1,i=-1;for(let o=0;o<Math.min(n.length,50);o++)if(s.test(n[o].trim()))r===-1&&(r=o),i=o;else if(r!==-1&&n[o].trim()!==""&&!n[o].trim().startsWith("//"))break;return r!==-1&&i!==-1?{content:n.slice(r,i+1).join(`
`),startLine:r,endLine:i,type:"imports",score:5}:null}findBlockEnd(n,e,t){if(t==="py"){let i=this.getIndent(n[e]);for(let o=e+1;o<n.length;o++){let a=n[o];if(a.trim()!==""&&this.getIndent(a)<=i&&a.trim()!=="")return o-1}return n.length-1}let s=0,r=!1;for(let i=e;i<n.length;i++){let o=n[i];if(s+=(o.match(/\{/g)||[]).length,s-=(o.match(/\}/g)||[]).length,s>0&&(r=!0),r&&s<=0||i-e>500)return i}return Math.min(e+100,n.length-1)}getIndent(n){let e=n.match(/^(\s*)/);return e?e[1].length:0}scoreChunk(n,e){let t=0,s=n.toLowerCase();for(let r of e.keywords)s.includes(r)&&(t+=2);for(let r of e.symbols)n.includes(r)&&(t+=5);for(let r of e.codeTerms)n.includes(r)&&(t+=4);return t}extractKeywordContext(n,e){let t=[],s=new Set;for(let r=0;r<n.length;r++){if(s.has(r))continue;let i=n[r],o=0;for(let a of e.symbols)i.includes(a)&&(o+=5);for(let a of e.keywords)i.toLowerCase().includes(a)&&(o+=2);if(o>0){let a=Math.max(0,r-this.CONTEXT_LINES),c=Math.min(n.length-1,r+this.CONTEXT_LINES);for(let p=a;p<=c;p++)s.add(p);let l=n.slice(a,c+1).join(`
`);l.length<=this.MAX_CHUNK_SIZE&&t.push({content:l,startLine:a,endLine:c,type:"context",score:o})}}return t}};var Pt=class{constructor(){this.MAX_TOTAL_CHARS=25e3;this.MAX_CHARS_PER_FILE=8e3;this.WEIGHTS={keyword:1,symbol:2,structure:1.5,position:.5,fileMatch:1.2}}score(n,e,t){let s=new Map(e.map(i=>[i.relativePath,i])),r=[];for(let i of n){let o=s.get(i.relativePath),a=this.scoreChunks(i.chunks,t,o),c=this.calculateOverallScore(a,o),l=this.getTopMatches(a,t);r.push({filePath:i.filePath,relativePath:i.relativePath,language:i.language,overallScore:c,chunks:a,extractionMode:i.extractionMode,summary:{totalLines:i.totalLines,includedLines:a.reduce((p,u)=>p+(u.endLine-u.startLine+1),0),topMatches:l}})}return r.sort((i,o)=>o.overallScore-i.overallScore),r}scoreChunks(n,e,t){return n.map((s,r)=>{let i={keywordScore:this.scoreKeywords(s.content,e.keywords),symbolScore:this.scoreSymbols(s.content,e.symbols),structureScore:this.scoreStructure(s),positionScore:this.scorePosition(r,n.length)},o=i.keywordScore*this.WEIGHTS.keyword+i.symbolScore*this.WEIGHTS.symbol+i.structureScore*this.WEIGHTS.structure+i.positionScore*this.WEIGHTS.position;return t&&t.score>10&&(o*=this.WEIGHTS.fileMatch),{...s,finalScore:o,scoreBreakdown:i}})}scoreKeywords(n,e){let t=n.toLowerCase(),s=0;for(let r of e){let i=new RegExp(`\\b${this.escapeRegex(r)}\\b`,"gi"),o=n.match(i);o&&(s+=Math.min(o.length*2,10))}return s}scoreSymbols(n,e){let t=0;for(let s of e)n.includes(s)?t+=15:n.toLowerCase().includes(s.toLowerCase())&&(t+=5);return t}scoreStructure(n){let t={function:10,class:12,imports:3,block:5,context:2}[n.type]||1;return n.name&&(t+=3),n.content.length>3e3&&(t-=2),t}scorePosition(n,e){return e<=1?5:5*(1-n/e)}calculateOverallScore(n,e){if(n.length===0)return 0;let t=0;for(let s=0;s<n.length;s++)t+=n[s].finalScore/(s+1);return e&&(t+=e.score*.5),t}getTopMatches(n,e){let t=[];for(let r of n.slice(0,3))r.name&&t.push(r.name);let s=n.map(r=>r.content).join(" ").toLowerCase();for(let r of e.keywords.slice(0,5))s.includes(r)&&!t.includes(r)&&t.push(r);return t.slice(0,5)}selectForContext(n){let e=new Map,t=0;for(let s of n){if(t>=this.MAX_TOTAL_CHARS)break;let r=[],i=0,o=[...s.chunks].sort((a,c)=>c.finalScore-a.finalScore);for(let a of o){let c=a.content.length;i+c<=this.MAX_CHARS_PER_FILE&&t+c<=this.MAX_TOTAL_CHARS&&(r.push(a),i+=c,t+=c)}r.length>0&&e.set(s.relativePath,r)}return e}escapeRegex(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}};var os=S(require("vscode")),ce=S(require("fs")),Xe=S(require("path"));var le=class extends E{constructor(e){super({name:"ContextSearch",timeout:5e3});this.context=e;this.sessionContext=new Map;this.conversationHistory=[];this.MAX_CONVERSATION_TURNS=10;this.MAX_MEMORIES=50;this.WEIGHTS={relevance:.7,recency:.2,specificity:.1};this.SYNONYMS={creator:["founder","owner","author","maker","developer","ajmal","ajmal uk"],created:["founded","made","built","developed","founder","creator","origin"],create:["build","develop","make","found","originate"],maker:["founder","creator","owner","developer"],owner:["founder","creator","holder","proprietor","ajmal"],who:["founder","creator","owner","developer","person","identity"],identity:["who","creator","founder","owner","developer"],company:["uthakkan","studio","business","organization","firm"],uthakkan:["company","studio","creator","founder"],contact:["email","phone","address","reach","mail","telegram","whatsapp"],mail:["email","inbox","gmail"],site:["website","url","link","page","portal"],web:["website","url","internet","online"],link:["url","website","address"],job:["career","hiring","freelance","work","project"],hire:["freelance","job","work","gig"]}}async execute(e){let t=Date.now();try{let s=[],r=this.searchSessionContext(e.query);s.push(...r);let i=this.searchConversationHistory(e.query);if(this.context){let m=await this.searchWorkspaceState(e);s.push(...m)}let o=await this.searchKnowledgeBase(e.query);s.push(...o);let a=this.findRelevantPatterns(e.query),l=this.scoreMemories(s,e.query,e.recencyDays??7).slice(0,e.maxResults??5),p=this.buildSummary(l,i),u={memories:l,conversationContext:i,relevantPatterns:a,summary:p},h=l.length>0?Math.min(.95,.5+l[0].relevance*.45):.3;return this.createOutput("success",u,h,t,{reasoning:`Found ${l.length} relevant memories, ${i.length} conversation matches`})}catch(s){return this.handleError(s,t)}}searchSessionContext(e){let t=[],s=this.extractTerms(e);for(let[r,i]of this.sessionContext){let o=this.calculateTermRelevance(r,s);o>.3&&t.push({type:"file_history",date:new Date,summary:`Session: \`${r}\``,relevance:o,data:i})}return t}searchConversationHistory(e){let t=this.extractTerms(e),s=[];for(let r of this.conversationHistory){let i=r.content.toLowerCase();t.some(a=>i.includes(a))&&s.push(`[${r.role}]: ${r.content.slice(0,200)}...`)}return s.slice(-5)}async searchWorkspaceState(e){if(!this.context)return[];let t=[],s=this.context.workspaceState.get("byteAI.memories",[]),r=this.extractTerms(e.query),i=new Date;i.setDate(i.getDate()-(e.recencyDays??7));for(let o of s){if(new Date(o.date)<i)continue;let c=this.calculateTermRelevance(o.summary,r);c>.2&&t.push({...o,relevance:c})}if(e.lookForPreviousFixes)for(let o of t)o.type==="previous_fix"&&(o.relevance*=1.5);return t}findRelevantPatterns(e){let t=[],s=e.toLowerCase(),r={auth:["JWT","OAuth","session management","token refresh"],login:["authentication flow","credential validation","session creation"],api:["REST endpoints","request handling","response formatting"],database:["ORM patterns","connection pooling","query optimization"],react:["component lifecycle","hooks","state management"],test:["unit testing","mocking","test fixtures"],error:["error handling","try-catch","error boundaries"],performance:["caching","lazy loading","memoization"]};for(let[i,o]of Object.entries(r))s.includes(i)&&t.push(...o);return[...new Set(t)].slice(0,5)}async searchKnowledgeBase(e){let t=[],s=this.extractTerms(e);try{let r;if(this.context){let a=Xe.join(this.context.extensionPath,"data","knowledge","uthakkan_data.json");ce.existsSync(a)&&(r=a)}if(!r){let a=os.workspace.workspaceFolders?.[0]?.uri.fsPath;if(a){let c=Xe.join(a,"data","knowledge","uthakkan_data.json"),l=Xe.join(a,"src","data","knowledge","uthakkan_data.json");if(ce.existsSync(c))r=c;else if(ce.existsSync(l))r=l;else{let p=Xe.join(a,"package.json");if(ce.existsSync(p))try{let u=JSON.parse(ce.readFileSync(p,"utf8")),h={name:u.name,scripts:u.scripts,dependencies:{...u.dependencies,...u.devDependencies},type:"inferred_project_context"};if(t.push({type:"knowledge",date:new Date,summary:`Project Context: ${u.name} (${Object.keys(u.dependencies||{}).join(", ")})`,relevance:.8,data:h}),u.scripts)for(let[m,f]of Object.entries(u.scripts)){let g=this.calculateTermRelevance(m,s);g>.4&&t.push({type:"knowledge",date:new Date,summary:`Script: npm run ${m} -> ${f}`,relevance:g*1.3,data:{script:m,cmd:f}})}}catch{}}}}if(!r){let a=await os.workspace.findFiles("**/uthakkan_data.json","**/node_modules/**",1);a.length>0&&(r=a[0].fsPath)}if(!r||!ce.existsSync(r))return[];let i=JSON.parse(ce.readFileSync(r,"utf8")),o=(a,c="")=>{if(typeof a=="string"){let l=this.calculateTermRelevance(a,s);l>.4&&t.push({type:"knowledge",date:new Date,summary:`${c}: ${a}`,relevance:l*1.2,data:{source:"knowledge_base"}})}else if(Array.isArray(a))a.forEach((l,p)=>o(l,`${c}[${p}]`));else if(typeof a=="object"&&a!==null)for(let[l,p]of Object.entries(a)){let u=this.calculateTermRelevance(l,s),h=c?`${c}.${l}`:l;if(u>=.5){let m=typeof p=="string"?p:JSON.stringify(p).slice(0,200);t.push({type:"knowledge",date:new Date,summary:`${h}: ${m}`,relevance:u*1.5,data:p})}o(p,h)}};o(i,"UTHAKKAN")}catch(r){console.error("Error searching knowledge base:",r)}return t}scoreMemories(e,t,s){let r=Date.now(),i=1440*60*1e3;return e.map(o=>{let a=(r-new Date(o.date).getTime())/i,c=Math.max(0,1-a/s),l=o.filePath?1:.5,p=o.relevance*this.WEIGHTS.relevance+c*this.WEIGHTS.recency+l*this.WEIGHTS.specificity;return{...o,relevance:p}}).sort((o,a)=>a.relevance-o.relevance)}extractTerms(e){let t=new Set(["the","a","an","is","are","was","were","be","been","have","has","do","does","did","will","would","could","should","this","that","it","its","to","of","in","for","on","with","at","by","from","your","my","our","their","you","me"]);return e.toLowerCase().replace(/[^\w\s]/g," ").split(/\s+/).filter(s=>s.length>2&&!t.has(s))}calculateTermRelevance(e,t){if(!e)return 0;let s=e.toLowerCase(),r=0,i=["who","created","owner","founder","creator","uthakkan","ajmal"],o=t.some(c=>i.includes(c));for(let c of t){let l=!1;if(s.includes(c))l=!0;else{let p=this.SYNONYMS[c]||[];for(let u of p)if(s.includes(u)){l=!0;break}}l&&r++}let a=t.length>0?r/t.length:0;return o&&a>0&&(a*=1.5),Math.min(1,a)}buildSummary(e,t){let s=[];if(e&&e.length>0){let r=[...new Set(e.map(i=>i.type))];s.push(`Found ${e.length} relevant memories (${r.join(", ")})`)}return t.length>0&&s.push(`${t.length} related conversation turns`),s.join(". ")||"No relevant context found"}addConversationTurn(e,t){this.conversationHistory.push({role:e,content:t,timestamp:new Date}),this.conversationHistory.length>this.MAX_CONVERSATION_TURNS&&(this.conversationHistory=this.conversationHistory.slice(-this.MAX_CONVERSATION_TURNS))}async storeMemory(e){if(!this.context)return;let t=this.context.workspaceState.get("byteAI.memories",[]);t.push({...e,date:new Date});let s=t.slice(-this.MAX_MEMORIES);await this.context.workspaceState.update("byteAI.memories",s)}setSessionContext(e,t){this.sessionContext.set(e,t)}getSessionContext(e){return this.sessionContext.get(e)}clear(){this.sessionContext.clear(),this.conversationHistory=[]}getConversationSummary(){return this.conversationHistory.length===0?"No previous conversation context.":this.conversationHistory.slice(-3).map(t=>`${t.role}: ${t.content.slice(0,100)}...`).join(`
`)}};var At=class{constructor(){this.projectMapCache=null;this.PROJECT_MAP_TTL=6e4;this.intentAnalyzer=new he,this.fileFinder=new Ne,this.codeExtractor=new St,this.relevanceScorer=new Pt,this.contextSearch=new le}async search(n,e,t){let s=Date.now();try{this.emitStatus(t,"Analyzing","Understanding your query...");let r=await this.intentAnalyzer.analyze(n),i=r.keywords.slice(0,4).join(", ");this.emitStatus(t,"Analyzing",`Found keywords: ${i}`),this.emitStatus(t,"Context Search","Checking knowledge base...");let o=await this.contextSearch.execute({query:n,lookForPreviousFixes:r.queryType==="fix"});this.emitStatus(t,"Searching","Scanning workspace for relevant files...");let a=await this.fileFinder.find(r,e);if(a.length===0&&o.payload.memories.length===0)return this.emitStatus(t,"No Results","No relevant files or knowledge found."),"";this.emitStatus(t,"Searching",`Found ${a.length} files and ${o.payload.memories.length} memories`);let c=[];if(a.length>0){this.emitStatus(t,"Extracting","Reading and analyzing code...");let m=a.map(f=>this.codeExtractor.extract(f.uri.fsPath,f.relativePath,r));c=await Promise.all(m)}let l=[],p=new Map;c.length>0&&(this.emitStatus(t,"Ranking","Scoring relevance..."),l=this.relevanceScorer.score(c,a,r),p=this.relevanceScorer.selectForContext(l)),this.emitStatus(t,"Formatting","Building context...");let u=this.formatContext(l,p,r,s,o.payload),h=Date.now()-s;return this.emitStatus(t,"Done",`Context ready (${h}ms)`),u}catch(r){return console.error("SearchAgent: Error during search",r),this.emitStatus(t,"Error","Search failed"),""}}emitStatus(n,e,t){n&&n(e,t)}formatContext(n,e,t,s,r){if(e.size===0&&(!r||r.memories.length===0))return"";let i=[];if(i.push(`
--- INTELLIGENT CONTEXT ---`),i.push(`Query type: ${t.queryType} | Complexity: ${t.complexity}`),i.push(`Keywords: ${t.keywords.slice(0,6).join(", ")}`),t.symbols.length>0&&i.push(`Symbols: ${t.symbols.slice(0,5).join(", ")}`),i.push(`Files analyzed: ${n.length}`),i.push(""),r&&r.memories.length>0){i.push("### \u{1F9E0} Knowledge & Memories");let l=r.memories.filter(u=>u.type==="knowledge"),p=r.memories.filter(u=>u.type!=="knowledge");l.length>0&&(i.push("**Knowledge Base:**"),l.slice(0,5).forEach(u=>i.push(`- ${u.summary}`)),i.push("")),p.length>0&&(i.push("**History:**"),p.slice(0,3).forEach(u=>i.push(`- ${u.summary}`)),i.push(""))}let o=0;for(let[l,p]of e){let u=n.find(h=>h.relativePath===l);if(u){o++,i.push(`### [${o}] \`${l}\``),i.push(`Score: ${u.overallScore.toFixed(1)} | Mode: ${u.extractionMode} | Lines: ${u.summary.totalLines}`),u.summary.topMatches.length>0&&i.push(`Matches: ${u.summary.topMatches.join(", ")}`),i.push("");for(let h of p)h.name?i.push(`// ${h.type}: ${h.name} (Lines ${h.startLine+1}-${h.endLine+1})`):h.type==="imports"?i.push(`// Imports (Lines ${h.startLine+1}-${h.endLine+1})`):i.push(`// Lines ${h.startLine+1}-${h.endLine+1}`),i.push("```"+u.language),i.push(h.content),i.push("```"),i.push("")}}let a=Date.now()-s;if(i.push(`--- END CONTEXT (${a}ms) ---
`),Tt.workspace.getConfiguration("byteAI").get("debugSearchAgent")){i.push("--- SEARCH DEBUG ---");for(let l of n.slice(0,5)){i.push(`\u2022 ${l.relativePath} (score: ${l.overallScore.toFixed(1)}, ${l.extractionMode})`);for(let p of l.chunks.slice(0,2)){let u=p.name||p.type;i.push(`  \u2514 ${u} L${p.startLine+1}-${p.endLine+1} (${p.finalScore?.toFixed(1)||p.score})`)}}i.push(`--- END DEBUG ---
`)}return i.join(`
`)}async analyzeQuery(n){return await this.intentAnalyzer.analyze(n)}async getProjectMap(){try{let n=Date.now();if(this.projectMapCache&&n-this.projectMapCache.time<this.PROJECT_MAP_TTL)return this.projectMapCache.value;let e=await Tt.workspace.findFiles("**/*","{**/node_modules/**,**/.git/**,**/dist/**,**/out/**,**/build/**,**/.DS_Store}",1e3);if(e.length===0)return"No files found in workspace.";let t=e.map(c=>Tt.workspace.asRelativePath(c)).sort(),s=new Map;for(let c of t){let l=c.split("/"),p="";for(let m=0;m<l.length-1;m++){let f=p;p=p?`${p}/${l[m]}`:l[m],s.has(f)||s.set(f,new Set);let g=s.get(f);g&&g.add(p)}let u=l.slice(0,-1).join("/");s.has(u)||s.set(u,new Set);let h=s.get(u);h&&h.add(c)}let r=`
--- PROJECT STRUCTURE ---
`,i=new Set,o=(c,l)=>{if(i.has(c))return"";i.add(c);let p=c.split("/"),u=p[p.length-1]||c,h="  ".repeat(l),m=s.has(c),f=`${h}${m?"\u{1F4C1}":"\u{1F4C4}"} ${u}
`;if(m){let g=Array.from(s.get(c)||[]).sort();for(let y of g)f+=o(y,l+1)}return f},a=s.get("")||new Set;for(let c of Array.from(a).sort())r+=o(c,0);return r+=`--- END PROJECT STRUCTURE ---
`,this.projectMapCache={value:r,time:n},r}catch(n){return console.error("SearchAgent: Error generating project map",n),""}}clearCache(){this.fileFinder.clearCache(),this.projectMapCache=null}};var In=S(require("vscode"));var U=class{constructor(){this.personas={Generalist:{name:"Generalist",role:"Full Stack Developer",description:"A versatile developer capable of handling a wide range of tasks.",systemPrompt:`You are a Full Stack Developer with expertise in both frontend and backend technologies.
Your goal is to provide balanced, maintainable, and working solutions.
Focus on clean code, best practices, and practical implementation.`,keywords:[]},BackendSpecialist:{name:"BackendSpecialist",role:"Backend Architect",description:"Expert in server-side systems, APIs, and databases.",systemPrompt:`You are a Backend Development Architect who designs and builds server-side systems with security, scalability, and maintainability as top priorities.

## Your Philosophy
**Backend is not just CRUD\u2014it's system architecture.** Every endpoint decision affects security, scalability, and maintainability.

## Development Principles
1. **Security is non-negotiable**: Validate everything, trust nothing.
2. **Performance is measured**: Profile before optimizing.
3. **Async by default**: Handle I/O operations asynchronously.
4. **Type safety**: Use strict typing (TypeScript/Pydantic) to prevent runtime errors.
5. **Simplicity over cleverness**: Clear code beats smart code.

## Critical Process
- **Analyze Data Flow**: Understand how data moves before coding.
- **Select Right Tools**: Don't default to one stack; choose the best tool for the job.
- **Layered Architecture**: Separate Controller, Service, and Repository layers.
- **Error Handling**: Implement centralized error handling and validation.`,keywords:["backend","server","api","endpoint","database","auth","sql","mongo","node","express","python","django","flask"]},FrontendSpecialist:{name:"FrontendSpecialist",role:"Senior Frontend Architect",description:"Expert in UI/UX, React/Next.js, and frontend performance.",systemPrompt:`You are a Senior Frontend Architect who designs and builds frontend systems with maintainability, performance, and accessibility in mind.

## Your Philosophy
**Frontend is not just UI\u2014it's system design.** Every component decision affects performance, maintainability, and user experience.

## Development Principles
1. **Performance First**: Minimize re-renders, optimize bundle size.
2. **State Management**: Lift state only when necessary; use local state by default.
3. **Accessibility**: Ensure WCAG compliance; use semantic HTML.
4. **Mobile First**: Design for responsive layouts from the start.
5. **Component Design**: Build reusable, composable, and single-responsibility components.

## Critical Process
- **Constraint Analysis**: Understand timeline, content, and audience first.
- **Deep Design Thinking**: Consider the "soul" of the application.
- **Avoid Anti-Patterns**: No prop drilling, no massive components, no hardcoded strings.`,keywords:["frontend","ui","ux","css","react","next","vue","tailwind","style","component","responsive","html","dom"]},DevOpsEngineer:{name:"DevOpsEngineer",role:"DevOps & Reliability Engineer",description:"Expert in deployment, CI/CD, and infrastructure.",systemPrompt:`You are an expert DevOps engineer specializing in deployment, server management, and production operations.

## Core Philosophy
"Automate the repeatable. Document the exceptional. Never rush production changes."

## Principles
1. **Safety First**: Production is sacred. Always have a rollback plan.
2. **Automate**: If you do it twice, script it.
3. **Monitor**: Ensure observability for all systems.
4. **Infrastructure as Code**: Define infrastructure in code, not manual clicks.

## Workflow
- **Prepare**: Check tests, builds, and env vars.
- **Backup**: Always backup state/DB before changes.
- **Deploy**: Execute with monitoring.
- **Verify**: Check health endpoints and logs immediately.`,keywords:["deploy","ci/cd","docker","kubernetes","aws","cloud","server","linux","bash","pipeline","monitor","log"]},SystemArchitect:{name:"SystemArchitect",role:"System Architect",description:"Expert in high-level system design and structure.",systemPrompt:`You are a System Architect responsible for the high-level design and structure of software systems.

## Responsibilities
1. **Define Structure**: Establish the file organization, modules, and component relationships.
2. **Select Technologies**: Choose the right stack based on requirements and constraints.
3. **Ensure Scalability**: Design for future growth and load.
4. **Maintain Consistency**: Enforce coding standards and architectural patterns.

## Output Focus
- Produce clear file structures.
- Define interfaces and data models first.
- Map dependencies and data flow.`,keywords:["architecture","design","structure","pattern","system","overview","plan","diagram"]},QAEngineer:{name:"QAEngineer",role:"QA Automation Engineer",description:"Expert in testing strategies and automation.",systemPrompt:`You are a QA Automation Engineer dedicated to ensuring software quality and reliability.

## Principles
1. **Test Pyramid**: Balance Unit, Integration, and E2E tests.
2. **Coverage**: Ensure critical paths are covered.
3. **Reliability**: Write deterministic tests that don't flake.
4. **Edge Cases**: Actively seek and test boundary conditions.

## Focus
- Write comprehensive test suites.
- Validate bug fixes with regression tests.
- Set up test infrastructure and runners.`,keywords:["test","qa","spec","unit","integration","e2e","jest","mocha","cypress","selenium","assert"]},SecurityAuditor:{name:"SecurityAuditor",role:"Security Auditor",description:"Expert in identifying and fixing security vulnerabilities.",systemPrompt:`You are a Security Auditor focused on identifying vulnerabilities and ensuring code security.

## Principles
1. **Least Privilege**: Grant minimum necessary permissions.
2. **Input Validation**: Sanitize all external inputs.
3. **Defense in Depth**: Layered security measures.
4. **Secure Defaults**: clear and secure configuration.

## Focus
- Audit code for common vulnerabilities (OWASP Top 10).
- Implement secure authentication and authorization.
- Protect sensitive data.`,keywords:["security","audit","vulnerability","auth","encryption","sanitize","protect","hack"]},DatabaseArchitect:{name:"DatabaseArchitect",role:"Database Architect",description:"Expert in data modeling and database optimization.",systemPrompt:`You are a Database Architect specializing in schema design and query optimization.

## Principles
1. **Normalization**: Design normalized schemas (unless performance dictates otherwise).
2. **Indexing**: Optimize queries with appropriate indexes.
3. **Integrity**: Enforce data integrity with constraints.
4. **Scalability**: Design for data growth.

## Focus
- Design efficient schemas.
- Optimize complex queries.
- Manage migrations and data consistency.`,keywords:["database","schema","sql","mongo","query","queries","index","migration","data model"]},CodeArchaeologist:{name:"CodeArchaeologist",role:"Legacy Code Specialist",description:"Expert in understanding, refactoring, and modernizing legacy codebases.",systemPrompt:`You are a Code Archaeologist. Your expertise lies in diving into existing, often undocumented or legacy codebases to understand how they work.

## Mission
To illuminate the dark corners of the codebase, map dependencies, and prepare the ground for refactoring or new features without breaking existing functionality.

## Strategy
1. **Trace Execution**: Follow the data flow from entry points to sinks.
2. **Identify Patterns**: Recognize ancient patterns and anti-patterns.
3. **Document as you go**: Add comments and generate documentation for what you find.
4. **Respect the Chesterton's Fence**: Understand why code exists before removing it.`,keywords:["legacy","refactor","understand","explain","old code","migrate","analyze"]},Debugger:{name:"Debugger",role:"Expert Debugger",description:"Specialist in identifying root causes of bugs and fixing them.",systemPrompt:`You are an Expert Debugger. You don't just fix errors; you understand why they happened to prevent recurrence.

## Methodology
1. **Reproduce**: Confirm the bug with a test case.
2. **Isolate**: Narrow down the scope using binary search or logging.
3. **Analyze**: Read stack traces carefully. Check assumptions.
4. **Fix**: Apply the minimal necessary change to fix the root cause.
5. **Verify**: Ensure the fix works and doesn't introduce regressions.

## Mindset
- "The error message is your friend."
- "Assume nothing, verify everything."`,keywords:["debug","fix","error","crash","issue","broken","bug","solve"]},DocumentationWriter:{name:"DocumentationWriter",role:"Technical Writer",description:"Expert in creating clear, concise, and useful documentation.",systemPrompt:`You are a Technical Writer. You translate complex code into clear, accessible documentation for users and developers.

## Goals
1. **Clarity**: Use simple language. Avoid jargon where possible.
2. **Completeness**: Cover happy paths, edge cases, and error states.
3. **Examples**: Always provide copy-pasteable examples.
4. **Structure**: Use logical headings and organization.

## Deliverables
- READMEs
- API Documentation
- Architecture Diagrams (Mermaid)
- User Guides`,keywords:["docs","documentation","readme","guide","tutorial","manual","explain"]},ExplorerAgent:{name:"ExplorerAgent",role:"Codebase Explorer",description:"Scouts the codebase to gather context and find relevant files.",systemPrompt:`You are an Explorer Agent. Your job is to traverse the file system and codebase to find relevant information.

## Capabilities
- Efficient file searching (glob, grep).
- Reading file contents to determine relevance.
- Mapping project structure.

## Goal
To provide the most relevant context to other agents so they can perform their tasks effectively. Don't hallucinate files. Verify their existence.`,keywords:["explore","search","find","locate","context","map","tree"]},GameDeveloper:{name:"GameDeveloper",role:"Game Development Specialist",description:"Expert in game loops, physics, rendering, and game frameworks (Pygame, Unity, etc.).",systemPrompt:`You are a Game Developer. You understand the unique constraints of real-time applications.

## Key Concepts
1. **The Game Loop**: Update -> Draw -> Repeat.
2. **State Management**: Managing game states (Menu, Playing, Paused, GameOver).
3. **Performance**: 60 FPS is the target. Avoid garbage collection spikes.
4. **User Input**: Responsive handling of keyboard/mouse/controller events.

## Focus
- Write clean, performant game logic.
- Structure code for maintainability (Entity-Component-System or OOP).`,keywords:["game","pygame","unity","physics","rendering","sprite","loop","fps"]},MobileDeveloper:{name:"MobileDeveloper",role:"Mobile App Developer",description:"Expert in mobile frameworks (React Native, Flutter, iOS, Android).",systemPrompt:`You are a Mobile App Developer. You build applications for iOS and Android.

## Priorities
1. **User Experience**: Smooth animations and native feel.
2. **Platform Guidelines**: Respect iOS HIG and Material Design.
3. **Performance**: Optimize for battery and limited resources.
4. **Offline First**: Handle network connectivity changes gracefully.`,keywords:["mobile","app","ios","android","react native","flutter","swift","kotlin"]},PerformanceOptimizer:{name:"PerformanceOptimizer",role:"Performance Engineer",description:"Specialist in profiling and optimizing code for speed and efficiency.",systemPrompt:`You are a Performance Engineer. You make things go fast.

## Methodology
1. **Measure First**: Don't guess. Use profiles and benchmarks.
2. **Identify Bottlenecks**: Find the 20% of code causing 80% of the slowness.
3. **Optimize**: Algorithmic improvements > Micro-optimizations.
4. **Verify**: Prove the speedup with data.

## Areas
- CPU usage
- Memory leaks
- I/O latency
- Database query optimization`,keywords:["performance","optimize","speed","fast","slow","profile","benchmark","latency"]},ProductManager:{name:"ProductManager",role:"Product Manager",description:'Focuses on user requirements, features, and "what" to build.',systemPrompt:`You are a Product Manager. You define the "What" and "Why".

## Responsibilities
1. **Requirement Analysis**: Clarify vague user requests into concrete features.
2. **Prioritization**: Determine what is MVP (Minimum Viable Product).
3. **User Focus**: Always advocate for the end-user experience.
4. **Acceptance Criteria**: Define what "Done" looks like.`,keywords:["product","requirements","feature","user","mvp","scope","spec"]},ProductOwner:{name:"ProductOwner",role:"Product Owner",description:"Focuses on backlog management and value delivery.",systemPrompt:`You are a Product Owner. You maximize the value of the product.

## Focus
- Backlog management.
- Stakeholder communication.
- ensuring the team works on the most valuable items.`,keywords:["backlog","value","priority","stakeholder"]},ProjectPlanner:{name:"ProjectPlanner",role:"Project Manager",description:'Focuses on the "How" and "When" of project execution.',systemPrompt:`You are a Project Planner. You organize tasks into a coherent plan.

## Responsibilities
1. **Task Decomposition**: Break large goals into small, actionable tasks.
2. **Dependency Management**: Identify what blocks what.
3. **Scheduling**: Order tasks for logical execution.
4. **Risk Management**: Identify potential blockers early.`,keywords:["plan","project","schedule","task","roadmap","milestone"]},SEOSpecialist:{name:"SEOSpecialist",role:"SEO Specialist",description:"Expert in Search Engine Optimization.",systemPrompt:`You are an SEO Specialist. You ensure web content is discoverable.

## Focus
- Semantic HTML (headings, meta tags).
- Site performance (Core Web Vitals).
- Content structure and keywords.
- Accessibility (which overlaps with SEO).`,keywords:["seo","search engine","meta","ranking","discoverability"]},DataScientist:{name:"DataScientist",role:"Data Scientist",description:"Expert in data analysis, machine learning, and statistical modeling.",systemPrompt:`You are a Data Scientist. You analyze data to extract insights and build predictive models.

## Methodology
1. **Exploratory Data Analysis (EDA)**: Understand the data distribution and quality.
2. **Feature Engineering**: Create meaningful features from raw data.
3. **Model Selection**: Choose the right algorithm for the problem.
4. **Validation**: Use cross-validation to prevent overfitting.

## Tools
- Python (Pandas, NumPy, Scikit-learn)
- Jupyter Notebooks
- Visualization (Matplotlib, Seaborn)`,keywords:["data","science","ml","machine learning","model","statistics","pandas","numpy"]}}}getPersona(n){return this.personas[n]||this.personas.Generalist}detectPersona(n,e,t){let s=n.toLowerCase();if(s.includes("as a backend"))return"BackendSpecialist";if(s.includes("as a frontend"))return"FrontendSpecialist";if(s.includes("as a devops"))return"DevOpsEngineer";if(s.includes("as an architect"))return"SystemArchitect";if(s.includes("as a qa")||s.includes("as a tester"))return"QAEngineer";if(s.includes("as a debugger"))return"Debugger";if(s.includes("as a security"))return"SecurityAuditor";if(s.includes("as a game dev"))return"GameDeveloper";if(s.includes("as a data scientist")||s.includes("as a ml engineer"))return"DataScientist";if(e==="Design")return"SystemArchitect";if(e==="Audit")return"SecurityAuditor";if(e==="VersionControl")return"DevOpsEngineer";if(e==="Fix")return"Debugger";let r=0,i="Generalist";for(let[o,a]of Object.entries(this.personas)){if(o==="Generalist")continue;let c=0;for(let l of a.keywords)s.includes(l)&&c++;c>r&&(r=c,i=o)}return r>=1?i:"Generalist"}validateInstruction(n,e,t){if(n==="Generalist")return{valid:!0};if(n==="CodeArchaeologist"&&e==="delete_file")return{valid:!1,reason:"CodeArchaeologist should not delete files."};if(n==="ExplorerAgent"&&["create_file","modify_file","delete_file","partial_edit"].includes(e))return{valid:!1,reason:"ExplorerAgent is a read-only persona and cannot modify the filesystem."};if(["ProductManager","ProductOwner","ProjectPlanner"].includes(n)){if(["create_file","modify_file","partial_edit"].includes(e)&&t&&!(t.endsWith(".md")||t.endsWith(".txt")||t.endsWith(".json")))return{valid:!1,reason:`${n} should only modify documentation or planning files (.md, .txt, .json).`};if(e==="delete_file")return{valid:!1,reason:`${n} should not delete files.`}}return n==="SecurityAuditor"&&e==="delete_file"?{valid:!1,reason:"SecurityAuditor should not delete files directly. Recommend deprecation instead."}:(n==="DocumentationWriter"&&["create_file","modify_file","partial_edit"].includes(e)&&t&&(t.endsWith(".md")||t.endsWith(".txt")),{valid:!0})}getAllPersonas(){return Object.values(this.personas)}};var me=class extends E{constructor(){super({name:"Manager",timeout:5e3});this.INTENT_PATTERNS={Fix:{keywords:["fix","bug","error","issue","broken","not working","fail","crash","wrong","debug"],weight:1},Build:{keywords:["create","build","make","new","generate","implement","add","setup","initialize","start"],weight:1},Modify:{keywords:["change","update","modify","edit","refactor","improve","optimize","enhance","replace","remove","delete"],weight:.9},Explain:{keywords:["explain","what","how","why","who","understand","describe","tell","show","mean","work"],weight:.8},Design:{keywords:["design","architect","plan","structure","organize","pattern","layout","schema"],weight:.9},Audit:{keywords:["review","check","audit","security","test","validate","analyze","scan","inspect"],weight:.85},Expand:{keywords:["full","entire","complete","rest","continue","more","expand","extend","give full"],weight:.95},Command:{keywords:["run","execute","command","terminal","shell","git","npm","yarn","curl","wget","clone","commit","push","pull","install","test api","check url","ls ","pwd","cp ","mv ","rm ","mkdir","cat ","echo ","touch "],weight:.95},VersionControl:{keywords:["checkpoint","snapshot","rollback","restore","version","history","undo","save state","backup","revert"],weight:.95},WebSearch:{keywords:["search web","google","find online","look up","check npm","check pypi","web search","internet","search for"],weight:.95}};this.COMPLEXITY_INDICATORS={complex:["entire","all","whole","complete","full","application","system","project","codebase"],medium:["feature","component","module","function","class","file","service"],simple:["line","variable","name","typo","string","value","style","color"]};this.intentAnalyzer=new he,this.personaManager=new U}async execute(e){let t=Date.now();try{let{intent:s,intentConfidence:r,analysis:i}=await this.classifyIntent(e.query),o=i?.complexity||this.assessComplexity(e),a=this.calculateConfidence(e,s,r),c=_n(a),l=this.constructPipeline(s,o,e,c,i),p=this.generateReasoning(s,o,a,e),u={intent:s,confidence:a,complexity:o,pipeline:l,safetyThreshold:o==="complex"?.8:.65,reasoning:p,executionMode:this.shouldRunParallel(l)?"parallel_with_dependencies":"sequential",userMessage:this.generateUserMessage(s,a)};return this.createOutput("success",u,a,t,{reasoning:p})}catch(s){return this.handleError(s,t)}}async classifyIntent(e){try{let c=await this.intentAnalyzer.analyze(e),l=p=>({fix:"Fix",build:"Build",modify:"Modify",explain:"Explain",search:"Explain",command:"Command",version_control:"VersionControl",web_search:"WebSearch"})[p]||"Explain";if(c.confidence>.6)return{intent:l(c.queryType),intentConfidence:c.confidence,analysis:c}}catch(c){console.warn("ManagerAgent: IntentAnalyzer failed, falling back to heuristics",c)}let t=e.toLowerCase(),s={Fix:0,Build:0,Modify:0,Explain:0,Design:0,Audit:0,Expand:0,Command:0,VersionControl:0,WebSearch:0};for(let[c,l]of Object.entries(this.INTENT_PATTERNS))for(let p of l.keywords)t.includes(p)&&(s[c]+=l.weight);/^(who|what|where|when|why|how)\s/.test(t)&&(s.Explain+=1.5);let r="Explain",i=0,o=0;for(let[c,l]of Object.entries(s))o+=l,l>i&&(i=l,r=c);let a=o>0?Math.min(.95,.5+i/o*.45):.5;return{intent:r,intentConfidence:a}}assessComplexity(e){let t=e.query.toLowerCase();for(let s of this.COMPLEXITY_INDICATORS.complex)if(t.includes(s))return"complex";for(let s of this.COMPLEXITY_INDICATORS.medium)if(t.includes(s))return"medium";for(let s of this.COMPLEXITY_INDICATORS.simple)if(t.includes(s))return"simple";return!e.activeFilePath&&!e.hasSelection?"medium":e.hasSelection&&e.selectionText&&e.selectionText.length<200?"simple":"medium"}calculateConfidence(e,t,s){let r=s;return t==="Expand"&&(r+=.3),e.activeFilePath&&(r+=.1),e.hasSelection&&(r+=.1),e.query.split(" ").length<3&&(r-=.1),In.workspace.workspaceFolders?.length||(r-=.2),Math.max(.1,Math.min(.99,r))}constructPipeline(e,t,s,r,i){let o=[],a=1;if(e==="VersionControl"){let c=this.determineVersionControlAction(s.query);return o.push({step:a++,agent:"VersionController",parallel:!1,required:!0,args:{action:c.action,sessionId:s.sessionId,requestId:s.requestId,...c.args}}),o}if(e==="WebSearch")return o.push({step:a++,agent:"WebSearch",parallel:!1,required:!0,args:{query:s.query}}),o.push({step:a++,agent:"ContextAnalyzer",parallel:!1,required:!0,args:{summarize:!0,contextType:"web_search_results"}}),o;if((r==="discover"||r==="verify"||r==="handoff")&&o.push({step:a++,agent:"IntentAnalyzer",parallel:!1,required:!0}),e==="Expand"&&(o.push({step:a++,agent:"ContentRetriever",parallel:!1,required:!0}),(s.query.toLowerCase().includes("about")||s.query.toLowerCase().includes("tell me"))&&o.push({step:a++,agent:"ContextSearch",parallel:!0,args:{lookForPreviousFixes:!1,query:s.query}})),e!=="Expand"&&(o.push({step:a++,agent:"FileSearch",parallel:!0,required:!1,condition:"needs_file_search",args:{query:s.query,activeFile:s.activeFilePath}}),o.push({step:a++,agent:"FilePartSearcher",parallel:!0,dependency:a-1,args:{refineSearch:!0}}),o.push({step:a++,agent:"ContextSearch",parallel:!0,args:{lookForPreviousFixes:e==="Fix",query:s.query}}),o.push({step:a++,agent:"ContextAnalyzer",parallel:!1,dependency:a-3})),s.hasImage&&o.push({step:a++,agent:"Vision",parallel:!1,required:!0,condition:"image_attached"}),e==="Build"||e==="Design"||e==="Command"||e==="Modify"||e==="Fix"||t==="complex"){if(e==="Build"||e==="Design"||t==="complex"&&e!=="Command"){o.push({step:a++,agent:"Architect",parallel:!1,required:!0,args:{projectType:s.projectType||"generic",existingFiles:i?.existingFiles}});let c=a;o.push({step:a++,agent:"ProcessPlanner",parallel:!1,dependency:a-2});let l=a;o.push({step:a++,agent:"CodePlanner",parallel:!1,dependency:c})}o.push({step:a++,agent:"TaskPlanner",parallel:!1,dependency:a-1})}return this.requiresExecution(s.query,e)&&(e!=="Audit"&&e!=="Explain"&&o.push({step:a++,agent:"VersionController",parallel:!1,required:!0,args:{action:"create_checkpoint",sessionId:s.sessionId,requestId:s.requestId}}),(e==="Build"||e==="Modify"||e==="Fix"||e==="Command")&&(e!=="Command"&&o.push({step:a++,agent:"CodeGenerator",parallel:!1}),o.push({step:a++,agent:"CommandGenerator",parallel:!1,args:{generateStructure:e==="Build",context:s.query,operation:e==="Command"?"custom":void 0}})),e!=="Audit"&&e!=="Explain"&&e!=="Command"&&o.push({step:a++,agent:"CodeModifier",parallel:!1,required:!0}),o.push({step:a++,agent:"Executor",parallel:!1,required:!0,args:{runTests:!0}}),e!=="Audit"&&e!=="Command"&&o.push({step:a++,agent:"QualityAssurance",parallel:!1,required:!0,args:{originalRequirements:s.query}})),(e==="Build"||t==="complex")&&o.push({step:a++,agent:"DocWriter",parallel:!1}),o}shouldRunParallel(e){return e.some(t=>t.parallel===!0)}requiresExecution(e,t){let s=e.toLowerCase(),r=["run","execute","start","launch","test","benchmark","stress","load","debug"];return t==="Build"||t==="Modify"||t==="Fix"||t==="Command"?!0:r.some(i=>s.includes(i))}generateReasoning(e,t,s,r,i){let o=[],a="Generalist";e==="Build"||e==="Design"?a="SystemArchitect":e==="Fix"||e==="Audit"?a="QAEngineer":e==="Command"?a="DevOpsEngineer":e==="Modify"&&(a="FrontendSpecialist");let c=this.personaManager.getPersona(a);if(o.push(`**Manager (${c.role}) Analysis**:`),o.push(`- **Intent**: ${e} (Confidence: ${(s*100).toFixed(0)}%)`),o.push(`- **Complexity**: ${t.toUpperCase()}`),i&&i.length>0){let l=new Set(i.map(p=>p.agent));o.push(`- **Strategy**: Activated agents [${Array.from(l).join(", ")}]`)}return s<.7&&o.push("- **Note**: Confidence is low. I will perform extra discovery steps."),o.join(`
`)}generateUserMessage(e,t){return{Fix:"Analyzing code and searching for the issue...",Build:"Planning project structure and dependencies...",Modify:"Locating relevant code sections...",Explain:"Gathering context to explain...",Design:"Analyzing requirements and architecting solution...",Audit:"Scanning codebase for issues...",Expand:"Retrieving full content...",Command:"Preparing terminal commands...",VersionControl:"Managing version history...",WebSearch:"Searching the web..."}[e]||"Processing your request..."}determineVersionControlAction(e){let t=e.toLowerCase();if(t.includes("create")||t.includes("save")||t.includes("backup")||t.includes("snapshot"))return{action:"create_checkpoint",args:{description:e}};if(t.includes("diff")||t.includes("change")||t.includes("compare"))return{action:"get_diff",args:{checkpointId:"latest"}};if(t.includes("search")||t.includes("find")||t.includes("lookup"))return{action:"search_history",args:{searchQuery:e.replace(/search|find|lookup|history|checkpoint|version/gi,"").trim()}};if(t.includes("list")||t.includes("show")||t.includes("history")||t.includes("checkpoints")||t.includes("log"))return{action:"list_checkpoints",args:{}};if(t.includes("rollback")||t.includes("restore")||t.includes("revert")||t.includes("undo")||t.includes("reset")){let i=e.split(" ").find(o=>o.length>5&&/[a-z0-9]/.test(o)&&!["rollback","restore","revert","checkpoint"].includes(o.toLowerCase()));return t.includes("previous")||t.includes("last")||t.includes("undo")?i="previous":(t.includes("latest")||t.includes("current"))&&(i="latest"),{action:"rollback",args:{checkpointId:i||"latest",files:void 0}}}return t.includes("delete")||t.includes("remove")||t.includes("clear")?{action:"delete_checkpoint",args:{}}:{action:"list_checkpoints",args:{}}}};var K=S(require("vscode"));var _t=class extends E{constructor(){super({name:"ContextPlanner",timeout:5e3});this.scopeIndicators={file:["this file","current file","here","this function","this class"],folder:["this folder","in this directory","nearby files","related files"],workspace:["project","codebase","entire","all files","everywhere"],minimal:["quick","simple","just","only","briefly"]};this.contextTypeIndicators={code:["function","class","method","variable","implement","code","logic"],docs:["readme","documentation","docs","explain","guide"],config:["config","settings","package.json","tsconfig","env","configuration"],tests:["test","spec","coverage","jest","mocha","testing"]}}async execute(e){let t=Date.now();try{let s=this.createPlan(e);return this.createOutput("success",s,.9,t,{reasoning:`Planned ${s.scope} scope with ${s.searchTerms.length} search terms`})}catch(s){return this.handleError(s,t)}}analyze(e,t){return this.createPlan({query:e,activeFile:t,hasSelection:!1})}createPlan(e){let t=e.query.toLowerCase(),s=this.determineScope(t,e),r=this.extractSearchTerms(e.query),i=this.extractSymbolRefs(e.query),o=this.determineContextTypes(t),a=this.getFilePatterns(o,e.activeFile),c=["**/node_modules/**","**/.git/**","**/dist/**","**/build/**","**/*.min.js","**/coverage/**"],l=this.getLimits(s),p=this.determinePriority(t,s);return{scope:s,searchTerms:r,symbolSearch:i,filePatterns:a,excludePatterns:c,maxFiles:l.maxFiles,maxContentPerFile:l.maxContent,priority:p,contextType:o}}determineScope(e,t){for(let[s,r]of Object.entries(this.scopeIndicators))if(r.some(i=>e.includes(i)))return s;return t.hasSelection&&t.selectionText?"file":(e.length<50,"folder")}extractSearchTerms(e){let t=new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","shall","can","need","dare","ought","used","what","how","why","when","where","which","who","whom","whose","this","that","these","those","am","and","but","or","if","then","so","than","too","very","just","only","both","each","any","all","few","more","most","other","some","such","no","not","own","same","for","to","of","in","on","at","by","with","from","up","down","into","out","about","after","before","above","below","between","please","help","want","make","create","add","remove","fix","change"]),s=e.toLowerCase().replace(/[^\w\s]/g," ").split(/\s+/).filter(o=>o.length>2&&!t.has(o)),i=(e.match(/["']([^"']+)["']/g)||[]).map(o=>o.replace(/["']/g,""));return[...new Set([...s,...i])]}extractSymbolRefs(e){let t=[],s=e.match(/\b[A-Z][a-z]+(?:[A-Z][a-z]+)+\b/g)||[];t.push(...s);let r=e.match(/\b[a-z]+(?:[A-Z][a-z]+)+\b/g)||[];t.push(...r);let i=e.match(/\b[a-z]+(?:_[a-z]+)+\b/g)||[];t.push(...i);let o=e.match(/`([^`]+)`/g)||[];return t.push(...o.map(a=>a.replace(/`/g,""))),[...new Set(t)]}determineContextTypes(e){let t=[];for(let[s,r]of Object.entries(this.contextTypeIndicators))r.some(i=>e.includes(i))&&t.push(s);return t.length===0&&t.push("code"),t}getFilePatterns(e,t){let s=[];for(let r of e)switch(r){case"code":s.push("**/*.{ts,tsx,js,jsx,py,java,go,rs,c,cpp,h}");break;case"docs":s.push("**/*.{md,txt,rst}"),s.push("**/README*");break;case"config":s.push("**/*.{json,yaml,yml,toml}"),s.push("**/.*rc");break;case"tests":s.push("**/*.{test,spec}.{ts,tsx,js,jsx}"),s.push("**/test/**"),s.push("**/__tests__/**");break}if(t){let r=t.split(".").pop();r&&s.unshift(`**/*.${r}`)}return[...new Set(s)]}getLimits(e){switch(e){case"minimal":return{maxFiles:3,maxContent:2e3};case"file":return{maxFiles:5,maxContent:4e3};case"folder":return{maxFiles:15,maxContent:3e3};case"workspace":return{maxFiles:30,maxContent:2e3};default:return{maxFiles:10,maxContent:3e3}}}determinePriority(e,t){let s=["quick","fast","brief","simple"],r=["detailed","thorough","complete","all"];return s.some(i=>e.includes(i))||t==="minimal"?"speed":r.some(i=>e.includes(i))||t==="workspace"?"accuracy":"balanced"}};var H=S(require("path")),ke=S(require("fs"));var Je=class extends E{constructor(){super({name:"ContextAnalyzer",timeout:1e4});this.MAX_TOKENS=8e3;this.TOKENS_PER_CHAR=.25}async execute(e){let t=Date.now();try{let s=[];for(let[l,p]of e.rawContent){let u=this.extractAndScoreChunks(l,p,e);s.push(...u)}let r=s.sort((l,p)=>p.score-l.score),i=this.selectWithinBudget(r),o=Math.floor(i.reduce((l,p)=>l+p.content.length,0)*this.TOKENS_PER_CHAR),a=this.extractDependencies(e.rawContent),c={chunks:i,totalFiles:e.rawContent.size,totalChunks:i.length,tokensEstimate:o,summary:this.buildSummary(i,e.plan),dependencies:a};return this.createOutput("success",c,.9,t,{reasoning:`Analyzed ${e.rawContent.size} files, selected ${i.length} chunks (~${o} tokens)`})}catch(s){return this.handleError(s,t)}}extractDependencies(e){let t={};for(let[s,r]of e){let i=[],o=H.dirname(s),a=m=>{if(m.startsWith(".")){let f=H.resolve(o,m);if(e.has(f))return f;let g=[".ts",".tsx",".js",".jsx",".json",".py"];for(let y of g){let v=f+y;if(e.has(v)||ke.existsSync(v))return v}for(let y of g){let v=H.join(f,"index"+y);if(e.has(v)||ke.existsSync(v))return v}return f}return m},c=r.matchAll(/import\s+.*\s+from\s+['"]([^'"]+)['"]/g);for(let m of c)i.push(a(m[1]));let l=r.matchAll(/require\(['"]([^'"]+)['"]\)/g);for(let m of l)i.push(a(m[1]));let p=m=>{if(m.startsWith(".")){let w=m.match(/^\.+/),k=w?w[0].length:0,C=m.substring(k),P=o;for(let de=1;de<k;de++)P=H.dirname(P);let T=C.split("."),b=H.join(...T),M=H.resolve(P,b);if(e.has(M+".py")||ke.existsSync(M+".py"))return M+".py";let W=H.join(M,"__init__.py");return e.has(W)||ke.existsSync(W)?W:M}let f=m.split("."),g=H.join(...f),y=H.resolve(o,g);if(e.has(y+".py")||ke.existsSync(y+".py"))return y+".py";let v=H.join(y,"__init__.py");return e.has(v)||ke.existsSync(v)?v:m},u=r.matchAll(/^from\s+([\.\w]+)\s+import\s+/gm);for(let m of u)i.push(p(m[1]));let h=r.matchAll(/^import\s+([\w\.]+)/gm);for(let m of h)i.push(p(m[1]));i.length>0&&(t[s]=[...new Set(i)])}return t}analyze(e,t,s,r=8e3){let i=new Map;e.forEach(m=>i.set(m.uri.fsPath,m.content));let o={plan:{searchTerms:t,symbolSearch:s},rawContent:i},a=[];for(let[m,f]of i)a.push(...this.extractAndScoreChunks(m,f,o));let c=a.sort((m,f)=>f.score-m.score),l=[],p=0,u=r/.25;for(let m of c){if(p+m.content.length>u){let f=u-p;f>500&&l.push({...m,content:m.content.slice(0,f)+`
// ... truncated`});break}l.push(m),p+=m.content.length}let h=Math.floor(l.reduce((m,f)=>m+f.content.length,0)*.25);return{chunks:l,totalFiles:i.size,totalChunks:l.length,tokensEstimate:h,summary:this.buildSummary(l,o.plan)}}extractAndScoreChunks(e,t,s){let r=[],i=t.split(`
`),o=s.plan.searchTerms,a=s.plan.symbolSearch;if(i.length<100){let l=this.scoreContent(t,o,a);return l>0&&r.push({filePath:e,content:t,startLine:1,endLine:i.length,type:"full",score:l,matchedTerms:this.getMatchedTerms(t,o)}),r}let c=this.extractCodeChunks(i,e);for(let l of c){let p=this.scoreContent(l.content,o,a);p>.1&&r.push({...l,score:p,matchedTerms:this.getMatchedTerms(l.content,o)})}return r}extractCodeChunks(e,t){let s=[],r=t.split(".").pop()?.toLowerCase()||"",i=this.getChunkPatterns(r),o=null,a=0,c=!1;for(let p=0;p<e.length;p++){let u=e[p],h=u.trim();i.starters.some(m=>m.test(h))&&(o&&o.lines.length>0&&s.push({filePath:t,content:o.lines.join(`
`),startLine:o.start,endLine:p,type:this.determineChunkType(o.lines[0])}),o={start:p+1,lines:[]},a=0,c=!0),c&&o&&(o.lines.push(u),a+=(u.match(/{/g)||[]).length,a-=(u.match(/}/g)||[]).length,a<=0&&o.lines.length>1&&(s.push({filePath:t,content:o.lines.join(`
`),startLine:o.start,endLine:p+1,type:this.determineChunkType(o.lines[0])}),o=null,c=!1))}o&&o.lines.length>0&&s.push({filePath:t,content:o.lines.join(`
`),startLine:o.start,endLine:e.length,type:this.determineChunkType(o.lines[0])});let l=e.filter((p,u)=>{let h=p.trim();return h.startsWith("import ")||h.startsWith("from ")||h.startsWith("require(")||h.startsWith("const ")&&h.includes("require(")});return l.length>0&&s.unshift({filePath:t,content:l.join(`
`),startLine:1,endLine:l.length,type:"import"}),s}getChunkPatterns(e){switch(e){case"ts":case"tsx":case"js":case"jsx":return{starters:[/^(?:export\s+)?(?:async\s+)?function\s+\w+/,/^(?:export\s+)?(?:default\s+)?class\s+\w+/,/^(?:export\s+)?const\s+\w+\s*=\s*(?:async\s+)?\(/,/^(?:export\s+)?const\s+\w+\s*=\s*\(/,/^\w+\s*\([^)]*\)\s*{/,/^(?:public|private|protected|async)\s+\w+\s*\(/]};case"py":return{starters:[/^(?:async\s+)?def\s+\w+/,/^class\s+\w+/]};default:return{starters:[/^(?:function|class|def|func)\s+\w+/]}}}determineChunkType(e){let t=e.trim().toLowerCase();return t.includes("class ")?"class":t.includes("function ")||t.includes("def ")?"function":t.includes("import ")||t.includes("from ")?"import":t.includes("export ")?"export":"block"}scoreContent(e,t,s){let r=e.toLowerCase(),i=0;for(let a of t){let c=(r.match(new RegExp(a.toLowerCase(),"g"))||[]).length;i+=c*.2}for(let a of s)e.includes(a)&&(i+=.5);let o=[/(?:function|class|const|let|var|def)\s+/];for(let a of o)a.test(e)&&(i+=.1);return Math.min(1,i)}getMatchedTerms(e,t){let s=e.toLowerCase();return t.filter(r=>s.includes(r.toLowerCase()))}selectWithinBudget(e){let t=[],s=0,r=this.MAX_TOKENS/this.TOKENS_PER_CHAR;for(let i of e){if(s+i.content.length>r){let o=r-s;o>500&&t.push({...i,content:i.content.slice(0,o)+`
// ... truncated`});break}t.push(i),s+=i.content.length}return t}buildSummary(e,t){let s=[...new Set(e.map(o=>o.filePath))],r=e.reduce((o,a)=>(o[a.type]=(o[a.type]||0)+1,o),{}),i=Object.entries(r).map(([o,a])=>`${a} ${o}s`).join(", ");return`Found ${e.length} chunks from ${s.length} files (${i})`}};var Mn=S(require("vscode"));var Be=class extends E{constructor(){super({name:"FilePartSearcher",timeout:1e4});this.ELEMENT_PATTERNS={button:[/\<[Bb]utton[^>]*\>/g,/\<button[^>]*\>/gi,/Button\s*=|PrimaryButton|SecondaryButton/g],function:[/(?:async\s+)?function\s+(\w+)\s*\(/g,/(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g,/(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?function/g,/(\w+)\s*:\s*(?:async\s*)?\([^)]*\)\s*=>/g,/(\w+)\s*\([^)]*\)\s*(?::\s*\w+)?\s*\{/g,/def\s+(\w+)\s*\(/g],class:[/class\s+(\w+)(?:\s+extends\s+\w+)?(?:\s+implements\s+[\w,\s]+)?\s*\{/g,/interface\s+(\w+)(?:\s+extends\s+[\w,\s]+)?\s*\{/g,/class\s+(\w+)(?:\(\w+\))?\s*:/g],component:[/(?:const|let|var|function)\s+(\w+)\s*[=:]?\s*(?:\([^)]*\)|)\s*(?:=>)?\s*\{?\s*(?:return\s*)?\(/g,/<(\w+)(?:\s+[^>]*)?\s*(?:\/>|>)/g],import:[/import\s+(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"]/g,/(?:const|let|var)\s+\{?[^}]+\}?\s*=\s*require\s*\(['"][^'"]+['"]\)/g,/import\s+[\w\s,]+/g,/from\s+[\w.]+\s+import\s+[\w\s,]+/g],export:[/export\s+(?:default\s+)?(?:const|let|var|function|class|interface|type)\s+(\w+)/g,/module\.exports\s*=/g],hook:[/use[A-Z]\w+/g],eventHandler:[/on[A-Z]\w+\s*=\s*\{?\s*(?:\([^)]*\)\s*=>|[\w.]+)\}?/g]};this.MAX_FILE_SIZE_FOR_FULL_CONTENT=500*1024}async execute(e){let t=Date.now();try{let s=e.fileContent;if(!s)try{s=(await Mn.workspace.openTextDocument(e.filePath)).getText()}catch{return this.createOutput("failed",[],0,t,{error:{type:"FileNotFound",message:`Could not read file: ${e.filePath}`}})}let r=s.split(`
`),i=[];e.searchFor.line&&i.push(...this.findByLine(r,e.searchFor.line,e.filePath)),e.searchFor.name&&i.push(...this.findByName(r,e.searchFor.name,e.filePath)),e.searchFor.text&&i.push(...this.findByText(r,e.searchFor.text,e.filePath)),e.searchFor.elementType&&i.push(...this.findByElementType(r,e.searchFor.elementType,e.filePath)),e.searchFor.eventHandler&&i.push(...this.findByEventHandler(r,e.searchFor.eventHandler,e.filePath));let o=this.deduplicateMatches(i);o.sort((c,l)=>l.confidence-c.confidence);let a=o.length>0?Math.min(.95,o[0].confidence):.2;return this.createOutput("success",o.slice(0,10),a,t,{reasoning:`Found ${o.length} matches in ${e.filePath}`})}catch(s){return this.handleError(s,t)}}findByLine(e,t,s){let r=[],i=t-1;if(i<0||i>=e.length)return r;let o=this.findBlockEnd(e,i,s),a=i;a=this.findJSDocStart(e,a);let c=e.slice(a,o+1).join(`
`);return r.push({file:s,startLine:a+1,endLine:o+1,element:this.detectElementType(e[i]),content:c.slice(0,5e3),confidence:.9,reason:`Block at line ${t}`}),r}findByName(e,t,s){let r=[],i=t.toLowerCase();for(let o=0;o<e.length;o++){let a=e[o];if(a.toLowerCase().includes(i)){let l=/(?:function|class|const|let|var|interface|type|export|def)\s/.test(a),p=new RegExp(`\\b${this.escapeRegex(t)}\\b`).test(a);if(l||p){let u=this.findBlockEnd(e,o,s),h=this.findJSDocStart(e,o),m=e.slice(h,u+1).join(`
`);r.push({file:s,startLine:h+1,endLine:u+1,element:this.detectElementType(a),content:m.slice(0,5e3),confidence:p&&l?.95:p?.85:.7,reason:l?`Declaration of ${t}`:`Reference to ${t}`})}}}return r}findByText(e,t,s){let r=[],i=t.toLowerCase();for(let o=0;o<e.length;o++)if(e[o].toLowerCase().includes(i)){let a=Math.max(0,o-2),c=Math.min(e.length-1,o+5),l=e.slice(a,c+1).join(`
`),p=e[o].includes(t);r.push({file:s,startLine:a+1,endLine:c+1,element:"text_match",content:l.slice(0,500),confidence:p?.85:.7,reason:`Text match: "${t.slice(0,30)}${t.length>30?"...":""}"`})}return r}findByElementType(e,t,s){let r=[],i=this.ELEMENT_PATTERNS[t.toLowerCase()]||[];if(e.reduce((a,c)=>a+c.length+1,0)>this.MAX_FILE_SIZE_FOR_FULL_CONTENT)for(let a=0;a<e.length;a++){let c=e[a];for(let l of i){let u=new RegExp(l.source,l.flags.replace("g","")).exec(c);if(u){let h=this.findBlockEnd(e,a,s),m=e.slice(a,h+1).join(`
`),f=u[1]||u[0].slice(0,30);r.push({file:s,startLine:a+1,endLine:h+1,element:t,content:m.slice(0,500),confidence:.8,reason:`${t}: ${f}`});break}}}else{let a=e.join(`
`);for(let c of i){let l=new RegExp(c.source,c.flags),p;for(;(p=l.exec(a))!==null;){let u=this.getLineNumber(a,p.index),h=this.findBlockEnd(e,u),m=e.slice(u,h+1).join(`
`),f=p[1]||p[0].slice(0,30);r.push({file:s,startLine:u+1,endLine:h+1,element:t,content:m.slice(0,500),confidence:.8,reason:`${t}: ${f}`})}}}return r}findByEventHandler(e,t,s){let r=[],i=t.toLowerCase();for(let o=0;o<e.length;o++){let a=e[o].toLowerCase();if(a.includes(i)&&a.includes("=")&&/on\w+\s*=/.test(e[o])){let l=this.findComponentStart(e,o),p=this.findBlockEnd(e,l,s),u=e.slice(l,p+1).join(`
`);r.push({file:s,startLine:l+1,endLine:p+1,element:"event_handler",content:u.slice(0,5e3),props:{handler:t},confidence:.85,reason:`Event handler: ${t}`})}}return r}findBlockEnd(e,t,s=""){if(s.endsWith(".py"))return this.findBlockEndPython(e,t);let i=0,o=0,a=!1,c=null,l=!1;for(let p=t;p<e.length;p++){let u=e[p];for(let h=0;h<u.length;h++){let m=u[h],f=u[h+1];if(c&&m==="\\"){h++;continue}if(l){m==="*"&&f==="/"&&(l=!1,h++);continue}if(c){m===c&&(c=null);continue}if(m==="/"&&f==="/")break;if(m==="/"&&f==="*"){l=!0,h++;continue}if(m==='"'||m==="'"||m==="`"){c=m;continue}if(m==="{"||m==="("?(m==="{"&&i++,m==="("&&o++,a=!0):(m==="}"||m===")")&&(m==="}"&&i--,m===")"&&o--),m===";"&&i===0&&o===0&&!c&&!l)return p}if(a&&i===0&&o===0&&!c&&!l||p-t>5e3)return p}return Math.min(t+50,e.length-1)}findBlockEndPython(e,t){if(t>=e.length)return t;let s=e[t],r=s.match(/^(\s*)/),i=r?r[1].length:0,o=t,a=0,c=null,l=p=>{let u=!1;for(let h=0;h<p.length;h++){let m=p[h];if(u){u=!1;continue}if(m==="\\"){u=!0;continue}if(c){m===c[0]&&(c.length===1?c=null:c.length===3&&h+2<p.length&&p[h+1]===m&&p[h+2]===m&&(c=null,h+=2));continue}if(m==='"'||m==="'"){h+2<p.length&&p[h+1]===m&&p[h+2]===m?(c=m+m+m,h+=2):c=m;continue}if(m==="#")break;(m==="("||m==="["||m==="{")&&a++,(m===")"||m==="]"||m==="}")&&a--}};l(s);for(let p=t+1;p<e.length;p++){let u=e[p],h=u.trim();if(h==="")continue;let m=u.match(/^(\s*)/),f=m?m[1].length:0;if(a===0&&c===null){if(h.startsWith("#")){l(u);continue}if(f<=i){let g=["elif","else","except","finally"],y=h.split(" ")[0].replace(":","");if(g.includes(y)){l(u),o=p;continue}return this.findLastContentLine(e,t,p-1)}}if(l(u),o=p,p-t>5e3)return p}return o}findLastContentLine(e,t,s){for(let r=s;r>=t;r--){let i=e[r].trim();if(i!==""&&!i.startsWith("#"))return r}return t}findJSDocStart(e,t){let s=t;for(let r=t-1;r>=0;r--){let i=e[r].trim();if(i.startsWith("//")||i.startsWith("/*")||i.startsWith("*")||i.endsWith("*/")||i==="")i!==""&&(s=r);else break}return s}findComponentStart(e,t){for(let s=t;s>=0;s--){let r=e[s];if(/<\w+/.test(r)||/(?:function|const|class|def)\s+\w+/.test(r))return s}return Math.max(0,t-5)}getLineNumber(e,t){return(e.slice(0,t).match(/\n/g)||[]).length}detectElementType(e){return/\bfunction\b|\bdef\b/.test(e)?"function":/\bclass\b/.test(e)?"class":/\binterface\b/.test(e)?"interface":/\bconst\b.*=.*=>/.test(e)?"arrow_function":/\bconst\b|\blet\b|\bvar\b/.test(e)?"variable":/<\w+/.test(e)?"jsx_element":/^import\b|from\b.*import\b/.test(e.trim())?"import":"unknown"}deduplicateMatches(e){let t=new Set;return e.filter(s=>{let r=`${s.file}:${s.startLine}-${s.endLine}`;return t.has(r)?!1:(t.add(r),!0)})}escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}};var It=class extends E{constructor(){super({name:"ProcessPlanner",timeout:45e3}),this.client=new O}async execute(n){let e=Date.now();try{let t=this.constructPrompt(n),s;try{let r=await this.client.generateResponse(t);s=this.parseResponse(r)}catch(r){console.warn("ProcessPlanner LLM failed, falling back to heuristics:",r),s=this.generateFallbackPlan(n)}return(!s.phases||s.phases.length===0)&&(s=this.generateFallbackPlan(n)),this.createOutput("success",s,.9,e,{reasoning:`Planned ${s.phases.length} phases for project: ${n.query}`})}catch(t){return this.handleError(t,e)}}constructPrompt(n){return`You are an expert Senior Software Architect. 
Analyze the following project request and generate a detailed development plan.

User Request: "${n.query}"
Project Type: ${n.projectType||"Auto-detect"}
Existing Structure: ${n.existingStructure?n.existingStructure.join(", "):"None"}
Context: ${JSON.stringify(n.contextKnowledge||[])}

Requirements:
1. Break down the project into logical Phases (e.g., Setup, Core, API, UI, Testing).
2. For each phase, list specific Deliverables and Dependencies.
3. Recommend a modern, robust Tech Stack.
4. Estimate duration and identify Risks.

Output must be valid JSON in this format:
{
  "phases": [
    { "name": "Phase Name", "deliverables": ["item 1", "item 2"], "dependencies": ["Previous Phase"] }
  ],
  "techStack": { "frontend": "...", "backend": "...", "database": "...", "tools": ["..."] },
  "estimatedDuration": "...",
  "riskFactors": ["..."],
  "recommendations": ["..."]
}`}parseResponse(n){try{let e=n.match(/```json\n([\s\S]*?)\n```/)||n.match(/\{[\s\S]*\}/),t=e?e[1]||e[0]:n;return JSON.parse(t)}catch{throw new Error("Failed to parse LLM response")}}generateFallbackPlan(n){return{phases:[{name:"Setup",deliverables:["Initialize project"],dependencies:[]},{name:"Implementation",deliverables:["Core features"],dependencies:["Setup"]}],techStack:{tools:["TypeScript"]},estimatedDuration:"Unknown",riskFactors:["Planning fallback used"],recommendations:["Review requirements"]}}};var Mt=class extends E{constructor(){super({name:"CodePlanner",timeout:1e4});this.FOLDER_TEMPLATES={web:["src/","src/components/","src/components/ui/","src/pages/","src/hooks/","src/utils/","src/styles/","src/types/","public/","public/images/"],api:["src/","src/routes/","src/controllers/","src/services/","src/models/","src/middleware/","src/utils/","src/types/","src/config/","tests/"],fullstack:["src/","src/app/","src/components/","src/components/ui/","src/lib/","src/hooks/","src/types/","src/styles/","prisma/","public/"]};this.client=new O}async execute(e){let t=Date.now();try{let s=this.generateFileStructure(e),r=await this.generateInterfaces(e),i=await this.generateApiEndpoints(e),o=this.generateStateFlows(e),{dependencies:a,devDependencies:c}=this.determineDependencies(e),l=this.determineConfigFiles(e),p=this.generateFolderPurposes(e.projectType),u=await this.generateFileSpecs(e,s,r),h={fileStructure:s,interfaces:r,apiEndpoints:i,stateFlows:o,dependencies:a,devDependencies:c,configFiles:l,folderPurposes:p,fileSpecs:u},m=s.slice(0,3).map(y=>`\`${y}\``).join(", "),f=Math.max(0,s.length-3),g=f>0?`${m} and ${f} others`:m;return this.createOutput("success",h,.85,t,{reasoning:`Generated ${s.length} files/folders including ${g}. Defined ${r.length} interfaces.`})}catch(s){return this.handleError(s,t)}}async generateFileSpecs(e,t,s){if(t.length===0)return[];let r=t.filter(o=>!o.endsWith(".json")&&!o.endsWith(".d.ts")&&!o.includes("test")&&(o.endsWith(".ts")||o.endsWith(".tsx")||o.endsWith(".js")||o.endsWith(".py"))).slice(0,10);if(r.length===0)return[];let i=`
You are a Lead Software Engineer.
User Request: "${e.query}"
Proposed Files: ${r.join(", ")}
Key Interfaces: ${s.slice(0,5).join(`
`)}

For each file, write a concise "Specification".
The spec should include:
1. **Exports**: What functions/classes it exports.
2. **Key Logic**: Brief pseudo-code or description of complex algorithms.
3. **Dependencies**: What other files/libraries it likely needs.

Output ONLY a JSON array of objects:
[
  { "filePath": "path/to/file.ts", "spec": "Exports User class with save() method. Uses mongoose model..." }
]
`;try{let a=(await this.client.generateResponse(i)).match(/\[[\s\S]*\]/);if(a){let c=JSON.parse(a[0]);if(Array.isArray(c))return c}}catch(o){console.warn("Spec generation failed",o)}return[]}generateFileStructure(e){let t=[];if(e.architecture?.fileStructure)t.push(...e.architecture.fileStructure);else{let s=this.FOLDER_TEMPLATES[e.projectType]||this.FOLDER_TEMPLATES.web;t.push(...s)}if(!e.architecture){let s=e.query.toLowerCase(),r=e.features||this.extractFeatures(s);for(let i of r)t.push(...this.getFeatureFiles(i,e.projectType));e.projectType==="web"||e.projectType==="fullstack"?(t.push("src/App.tsx"),t.push("src/main.tsx"),t.push("src/index.css")):e.projectType==="api"&&(t.push("src/index.ts"),t.push("src/app.ts"))}return e.existingFiles&&e.existingFiles.length>0?t.filter(s=>!e.existingFiles.some(r=>r.includes(s.replace("/","")))):[...new Set(t)].sort()}extractFeatures(e,t){let s=[],r={auth:"authentication",login:"authentication",cart:"cart",checkout:"checkout",product:"products",user:"users",profile:"profile",dashboard:"dashboard",admin:"admin",settings:"settings",notification:"notifications",chat:"chat",payment:"payments",search:"search"};for(let[i,o]of Object.entries(r))e.includes(i)&&s.push(o);return t&&t.length>0&&t.forEach(i=>{let o=i.summary.toLowerCase();(o.includes("product")||o.includes("item"))&&s.push("products"),o.includes("service")&&s.push("services"),(o.includes("blog")||o.includes("article"))&&s.push("blog"),o.includes("contact")&&s.push("contact"),(o.includes("about")||o.includes("mission"))&&s.push("about"),(o.includes("dashboard")||o.includes("admin"))&&s.push("dashboard")}),[...new Set(s)]}getFeatureFiles(e,t){let s=[],r=e.charAt(0).toUpperCase()+e.slice(1);return(t==="web"||t==="fullstack")&&(s.push(`src/components/${r}/`),s.push(`src/components/${r}/${r}Container.tsx`),s.push(`src/hooks/use${r}.ts`)),(t==="api"||t==="fullstack")&&(s.push(`src/routes/${e}.routes.ts`),s.push(`src/controllers/${e}.controller.ts`),s.push(`src/services/${e}.service.ts`),s.push(`src/models/${e}.model.ts`)),s}async generateInterfaces(e){if(e.architecture?.dataModels)return e.architecture.dataModels.map(r=>{let i=r.fields.join("; ");return`interface ${r.name} { ${i} }`});let t=e.features||this.extractFeatures(e.query.toLowerCase(),e.contextKnowledge);try{let r=`
You are a Senior TypeScript Architect.
Generate a list of TypeScript interfaces for a project with these features: ${t.join(", ")}
Query: "${e.query}"
Project Type: ${e.projectType}

Requirements:
1. Include core data models.
2. Include API response types.
3. Use strict typing (no any).
4. Output ONLY a JSON array of strings, where each string is a full interface definition.

Example Output:
[
  "interface User { id: string; name: string; }",
  "interface AuthResponse { token: string; user: User; }"
]
`,o=(await this.client.generateResponse(r)).match(/\[[\s\S]*\]/);if(o){let a=JSON.parse(o[0]);if(Array.isArray(a)&&a.every(c=>typeof c=="string"))return a}}catch{console.warn("LLM Interface generation failed, falling back to heuristics")}let s=[];return s.push("interface ApiResponse<T> { success: boolean; data?: T; error?: string }"),s.push("interface PaginatedResponse<T> extends ApiResponse<T[]> { total: number; page: number; pageSize: number }"),(t.includes("authentication")||t.includes("users"))&&(s.push("interface User { id: string; email: string; name: string; createdAt: Date }"),s.push("interface AuthCredentials { email: string; password: string }"),s.push("interface AuthContext { user: User | null; login: (creds: AuthCredentials) => Promise<void>; logout: () => void }")),t.includes("products")&&s.push("interface Product { id: string; name: string; price: number; description: string; imageUrl: string; stock: number }"),t.includes("cart")&&(s.push("interface CartItem { productId: string; quantity: number; price: number }"),s.push("interface Cart { items: CartItem[]; total: number }")),t.includes("payments")&&s.push("interface PaymentIntent { id: string; amount: number; currency: string; status: string }"),s}async generateApiEndpoints(e){if(e.architecture?.apiEndpoints)return e.architecture.apiEndpoints;if(e.projectType==="web")return;let t=e.features||this.extractFeatures(e.query.toLowerCase());try{let r=`
You are a Senior API Designer.
Define REST API endpoints for: ${t.join(", ")}
Query: "${e.query}"

Requirements:
1. Follow RESTful conventions.
2. Cover CRUD operations where appropriate.
3. Output ONLY a JSON array of objects.

Format:
[
  { "method": "GET", "path": "/api/resource", "description": "List resources" }
]
`,o=(await this.client.generateResponse(r)).match(/\[[\s\S]*\]/);if(o){let a=JSON.parse(o[0]);if(Array.isArray(a)&&a.length>0)return a}}catch{console.warn("LLM API generation failed, falling back to heuristics")}let s=[];return(t.includes("authentication")||t.includes("users"))&&s.push({method:"POST",path:"/api/auth/register",description:"User registration"},{method:"POST",path:"/api/auth/login",description:"User login"},{method:"POST",path:"/api/auth/logout",description:"User logout"},{method:"GET",path:"/api/auth/me",description:"Get current user"},{method:"PUT",path:"/api/users/:id",description:"Update user profile"}),t.includes("products")&&s.push({method:"GET",path:"/api/products",description:"List all products"},{method:"GET",path:"/api/products/:id",description:"Get product by ID"},{method:"POST",path:"/api/products",description:"Create product"},{method:"PUT",path:"/api/products/:id",description:"Update product"},{method:"DELETE",path:"/api/products/:id",description:"Delete product"}),t.includes("cart")&&s.push({method:"GET",path:"/api/cart",description:"Get cart"},{method:"POST",path:"/api/cart/items",description:"Add item to cart"},{method:"PUT",path:"/api/cart/items/:id",description:"Update cart item"},{method:"DELETE",path:"/api/cart/items/:id",description:"Remove from cart"}),s.length>0?s:void 0}generateStateFlows(e){if(e.projectType==="api")return;let t=[],s=e.features||this.extractFeatures(e.query.toLowerCase());return s.includes("authentication")&&(t.push("Auth Flow: Login \u2192 Validate \u2192 Store Token \u2192 Redirect to Dashboard"),t.push("Session: Check Token \u2192 Refresh if Expired \u2192 Logout if Invalid")),s.includes("cart")&&t.push("Cart Flow: Add Item \u2192 Update Count \u2192 Calculate Total \u2192 Persist"),s.includes("checkout")&&t.push("Checkout: Validate Cart \u2192 Enter Address \u2192 Select Payment \u2192 Confirm \u2192 Process"),t}determineDependencies(e){let t=[],s=[],r=e.projectType,i=e.techStack;r==="web"?(t.push("react","react-dom","react-router-dom"),s.push("typescript","@types/react","@types/react-dom","vite","@vitejs/plugin-react")):r==="api"?(t.push("express","cors","dotenv"),s.push("typescript","@types/node","@types/express","ts-node","nodemon")):r==="fullstack"&&(t.push("next","react","react-dom"),s.push("typescript","@types/node","@types/react","@types/react-dom")),i?.database?.includes("Prisma")&&(t.push("@prisma/client"),s.push("prisma")),i?.frontend?.includes("Tailwind")&&(t.push("tailwindcss"),s.push("postcss","autoprefixer"));let o=e.features||this.extractFeatures(e.query.toLowerCase());return o.includes("authentication")&&(t.push("jsonwebtoken","bcryptjs"),s.push("@types/jsonwebtoken","@types/bcryptjs")),o.includes("payments")&&t.push("stripe"),{dependencies:t,devDependencies:s}}determineConfigFiles(e){let t=[{name:"package.json",purpose:"Project dependencies and scripts"},{name:"tsconfig.json",purpose:"TypeScript configuration"},{name:".gitignore",purpose:"Git ignore patterns"},{name:".env.example",purpose:"Environment variable template"}];return e.projectType==="web"&&t.push({name:"vite.config.ts",purpose:"Vite bundler configuration"}),e.projectType==="fullstack"&&t.push({name:"next.config.js",purpose:"Next.js configuration"}),e.techStack?.frontend?.includes("Tailwind")&&(t.push({name:"tailwind.config.js",purpose:"Tailwind CSS configuration"}),t.push({name:"postcss.config.js",purpose:"PostCSS configuration"})),e.techStack?.database?.includes("Prisma")&&t.push({name:"prisma/schema.prisma",purpose:"Database schema"}),t}generateFolderPurposes(e){let t={web:[{folder:"src/components",purpose:"Reusable React components"},{folder:"src/components/ui",purpose:"Base UI primitives (Button, Card, etc.)"},{folder:"src/pages",purpose:"Page-level components / routes"},{folder:"src/hooks",purpose:"Custom React hooks"},{folder:"src/utils",purpose:"Utility functions"},{folder:"src/types",purpose:"TypeScript type definitions"},{folder:"public",purpose:"Static assets"}],api:[{folder:"src/routes",purpose:"Express route definitions"},{folder:"src/controllers",purpose:"Request handlers"},{folder:"src/services",purpose:"Business logic"},{folder:"src/models",purpose:"Data models / ORM entities"},{folder:"src/middleware",purpose:"Express middleware"},{folder:"tests",purpose:"Test files"}],fullstack:[{folder:"src/app",purpose:"Next.js App Router pages"},{folder:"src/components",purpose:"React components"},{folder:"src/lib",purpose:"Shared utilities and server actions"},{folder:"prisma",purpose:"Database schema and migrations"}]};return t[e]||t.web}};var Ce=class extends E{constructor(){super({name:"TaskPlanner",timeout:3e4});this.taskIdCounter=0;this.client=new O}async execute(e){let t=Date.now();this.taskIdCounter=0;try{let s=await this.generateTaskGraph(e),r=await this.recursiveDecomposition(s,e),i=this.topologicalSort(r),o=this.generateValidationCommands(r,e.projectType),a=this.identifyCriticalPath(r,i),c={taskGraph:r,executionOrder:i,validationCommands:o,criticalPath:a};return this.createOutput("success",c,.85,t,{reasoning:`Generated ${r.length} tasks with ${a.length} on critical path`})}catch(s){return this.handleError(s,t)}}async generateTaskGraph(e){let t=this.constructPlanningPrompt(e);try{let s=await this.client.streamResponse(t,()=>{},i=>console.warn("Planning LLM error:",i)),r=this.parseTaskResponse(s);return r.length>0?r:this.generateFallbackTask(e)}catch(s){return console.error("Planning failed:",s),this.generateFallbackTask(e)}}constructPlanningPrompt(e){let t="";return e.design&&(t=`
### Architecture Design (MANDATORY TO FOLLOW):
- **Architecture**: ${e.design.architecture}
- **Tech Stack**: ${e.design.techStack.join(", ")}
- **Proposed File Structure**: ${e.design.fileStructure.join(", ")}
- **Components**: 
${e.design.components.map(s=>`  - ${s.name}: ${s.description} (Responsibilities: ${s.responsibilities.join(", ")})`).join(`
`)}
- **Data Models**: 
${e.design.dataModels.map(s=>`  - ${s.name}: ${s.fields.join(", ")}`).join(`
`)}
`),`You are an Elite Software Architect and Project Manager.
User Request: "${e.query}"
Project Type: ${e.projectType}
Existing Files: ${e.fileStructure.slice(0,100).join(", ")}
Current Active File: ${e.activeFilePath||"None"}${t}

Your goal is to create a detailed, dependency-aware execution plan to fulfill the user's request.
You must analyze the request and break it down into atomic, executable tasks.

### Rules:
1. **Atomicity**: Each task should do ONE thing (e.g., "Create file", "Run command", "Edit function").
2. **Dependencies**: Define dependencies explicitly.
   - If Task B requires Task A's output (e.g., file creation), Task B depends on Task A.
   - If tasks are independent, they can run in parallel (leave dependencies empty).
3. **Parallel Optimization**: MAXIMIZE parallelism. 
   - Assign the same 'parallelGroup' ID to tasks that can run simultaneously (e.g., creating 5 different component files).
   - Independent file creations should NEVER depend on each other.
4. **Verification**: Every task MUST have a 'validationCommand' to verify success (e.g., 'ls file.ts', 'npm test', 'node --check file.js').
5. **Environment**: 
   - Use 'pip install' for Python, 'npm install' for Node.
   - **CRITICAL**: For ALL file creation or modification (including new files, configs, readmes), use 'type': 'code' and assign to 'CodeGenerator'.
   - **DESCRIPTION**: For 'code' tasks, the description MUST be detailed. 
     - BAD: "Update file"
     - GOOD: "Add 'calculateTotal' function to Utils class that sums the order items"
   - **NEVER** use 'command' type for creating files (e.g. do NOT use 'touch', 'mkdir', 'echo', 'cat'). These are platform-dependent and fragile.
   - Use 'type': 'command' ONLY for running scripts, installing dependencies, or starting servers.
   - **Command Generation**:
     - Assign to **'Executor'** if you know the exact command (e.g. \`npm install\`, \`ls -la\`).
     - Assign to **'CommandGenerator'** if the command is platform-specific or requires complex construction (e.g. file operations if not using CodeGenerator, or complex system calls).
   - For 'command' tasks, you MUST provide the specific shell command in the "command" field.
6. **Completeness**: The plan must be end-to-end (Setup -> Implementation -> Verification).
7. **Alignment**: Ensure all tasks align with the provided Architecture Design (if any). Create files exactly as specified in the design.

### Output Format:
Return a JSON array of task objects. NO markdown formatting.
[
  {
    "id": "unique_id_1",
    "description": "Clear description of what to do",
    "type": "code" | "command" | "test",
    "command": "actual shell command (REQUIRED if type is 'command')",
    "dependencies": [], 
    "filePath": "path/to/target.ext",
    "validationCommand": "shell command",
    "parallelGroup": "optional_group_id",
    "assignedAgent": "CodeGenerator" | "Executor" | "CodeModifier" | "CommandGenerator" | "QualityAssurance",
    "complexity": "simple" | "medium" | "complex",
    "reasoning": "Brief explanation of why this task is necessary",
    "successCriteria": ["Criterion 1", "Criterion 2"]
  }
]`}generateFallbackTask(e){let t=e.query.match(/(?:create|make|generate|add)\s+(?:a\s+|an\s+)?([a-zA-Z0-9_./-]+\.[a-z0-9]+)/i),r=(t?t[1]:void 0)||e.activeFilePath||"generated_code.txt";return[{id:"fallback_1",description:e.query,type:"code",status:"pending",dependencies:[],filePath:r,complexity:"medium",assignedAgent:"CodeGenerator",reasoning:"Fallback task generated due to planning failure",successCriteria:["Code generated successfully"]}]}async recursiveDecomposition(e,t,s=0){if(s>2)return e;let r=[],i=e.map(async a=>{if(a.complexity==="complex"&&a.type!=="command"&&!a.description.includes("mkdir")){let c=await this.decomposeTask(a,t);return c.length>0?this.recursiveDecomposition(c,t,s+1):a}else return a});return(await Promise.all(i)).forEach(a=>{Array.isArray(a)?r.push(...a):r.push(a)}),r}async decomposeTask(e,t){let s=`
You are a Senior Technical Lead.
Parent Task: "${e.description}"
Target File: "${e.filePath||"Unknown"}"
Project Context: ${t.projectType}

The parent task is too complex to be executed as a single unit. 
Decompose it into 2-5 smaller, atomic sub-tasks.
You MUST specify dependencies explicitly to enable parallel execution where possible.

Output a JSON array of task objects.
Format:
[
  {
    "id": "subtask_1",
    "description": "Specific sub-task action",
    "type": "code" | "command" | "test",
    "command": "actual shell command (REQUIRED if type is 'command')",
    "dependencies": ["subtask_id_of_dependency"], 
    "filePath": "src/path/to/file.ts",
    "validationCommand": "shell command to verify",
    "parallelGroup": "${e.parallelGroup||""}",
    "assignedAgent": "${e.assignedAgent||"CodeGenerator"}",
    "complexity": "simple" | "medium"
  }
]
Rules:
1. Sub-tasks must be concrete and actionable.
2. Maintain the intent of the parent task.
3. Inherit context (file path, agent) if applicable, but refine if needed.
4. Define 'dependencies' carefully. If Task B depends on Task A, put Task A's ID in Task B's dependencies.
5. If tasks are independent, leave dependencies empty (they will run in parallel).
6. Output ONLY JSON.
`;try{let r=await this.client.streamResponse(s,()=>{},o=>console.warn("Decomposition LLM error:",o)),i=this.parseTaskResponse(r);if(i.length>0){let o=new Map;i.forEach((h,m)=>{let f=`${e.id}_sub_${m+1}`;o.set(h.id,f),h.id=f}),i.forEach(h=>{let m=[];h.dependencies.forEach(f=>{o.has(f)?m.push(o.get(f)):m.push(f)}),h.dependencies=m});let a=new Set(i.map(h=>h.id));i.filter(h=>h.dependencies.every(m=>!a.has(m))).forEach(h=>{h.dependencies=[...new Set([...h.dependencies,...e.dependencies||[]])]});let l=new Set;i.forEach(h=>h.dependencies.forEach(m=>l.add(m)));let p=i.filter(h=>!l.has(h.id)),u={id:e.id,description:`Verify completion of: ${e.description}`,type:"test",status:"pending",dependencies:p.map(h=>h.id),filePath:e.filePath,validationCommand:e.validationCommand,complexity:"simple",assignedAgent:"QualityAssurance"};return[...i,u]}return[]}catch(r){return console.warn("Decomposition failed:",r),[]}}parseTaskResponse(e){try{let t=e.match(/\[[\s\S]*\]/);return t?JSON.parse(t[0]).map(r=>({...r,status:"pending",dependencies:r.dependencies||[],complexity:r.complexity||"simple"})):[]}catch(t){return console.error("Failed to parse task response:",t),[]}}createTask(e,t,s=[],r){return{id:`task_${++this.taskIdCounter}`,description:e,type:"code",status:"pending",dependencies:s,filePath:t,validationCommand:r,complexity:"simple",assignedAgent:"CodeGenerator"}}topologicalSort(e){let t=new Set,s=new Set,r=[],i=o=>{if(s.has(o)||t.has(o))return;s.add(o);let a=e.find(c=>c.id===o);if(a)for(let c of a.dependencies)i(c);s.delete(o),t.add(o),r.push(o)};for(let o of e)t.has(o.id)||i(o.id);return r}identifyCriticalPath(e,t){let s=new Map,r=new Map,i=0,o="";for(let l of t){let p=e.find(m=>m.id===l);if(!p)continue;let u=0,h="";for(let m of p.dependencies){let f=s.get(m)||0;f>u&&(u=f,h=m)}s.set(l,u+1),r.set(l,h),u+1>i&&(i=u+1,o=l)}let a=[],c=o;for(;c;)a.unshift(c),c=r.get(c)||"";return a}generateValidationCommands(e,t){return e.filter(s=>s.validationCommand).map(s=>({task:s.id,command:s.validationCommand}))}};var B=S(require("vscode")),_=S(require("fs")),Z=S(require("path")),Ze=S(require("zlib"));var Rn=S(require("crypto")),Se=class extends E{constructor(e){super({name:"VersionController",timeout:3e4});this.context=e;this.checkpointDir="";this.checkpoints=new Map;this.fileSnapshots=new Map;this.initCheckpointDir(),this.loadAllCheckpoints()}initCheckpointDir(){let e=B.workspace.workspaceFolders?.[0]?.uri.fsPath;if(e){this.checkpointDir=Z.join(e,".bytecoder","checkpoints");try{_.existsSync(this.checkpointDir)||_.mkdirSync(this.checkpointDir,{recursive:!0})}catch{}}}async execute(e){let t=Date.now();try{let s;switch(e.action){case"create_checkpoint":s=await this.createCheckpoint(e.files||[],e.description,e.sessionId,e.requestId);break;case"rollback":s=await this.rollback(e.checkpointId,e.files);break;case"list_checkpoints":s=this.listCheckpoints();break;case"delete_checkpoint":s=this.deleteCheckpoint(e.checkpointId);break;case"delete_session_checkpoints":s=await this.deleteSessionCheckpoints(e.sessionId);break;case"get_file_content":s=await this.getFileContent(e.checkpointId,e.files?.[0]);break;case"get_diff":s=await this.getDiff(e.checkpointId,e.files?.[0]);break;case"search_history":s=await this.searchHistory(e.searchQuery);break;default:s={success:!1,message:"Unknown action"}}return this.createOutput(s.success?"success":"failed",s,s.success?.95:.3,t,{reasoning:s.message})}catch(s){return this.handleError(s,t)}}async deleteAllCheckpoints(){try{return this.checkpoints.clear(),this.fileSnapshots.clear(),this.checkpointDir&&_.existsSync(this.checkpointDir)&&(_.rmSync(this.checkpointDir,{recursive:!0,force:!0}),this.initCheckpointDir()),this.context&&await this.context.workspaceState.update("byteAI.checkpoints",[]),{success:!0,message:"All checkpoints deleted successfully"}}catch(e){return{success:!1,message:`Failed to delete checkpoints: ${e}`}}}loadAllCheckpoints(){if(!this.checkpointDir||!_.existsSync(this.checkpointDir))return;let e=Z.join(this.checkpointDir,"index.json");if(_.existsSync(e))try{let t=JSON.parse(_.readFileSync(e,"utf8"));for(let s of t)this.checkpoints.set(s.checkpointId,s);return}catch(t){console.warn("Failed to load checkpoint index, falling back to scan:",t)}try{let t=_.readdirSync(this.checkpointDir).filter(r=>r.endsWith(".json")&&r!=="index.json"),s=[];for(let r of t)try{let i=Z.join(this.checkpointDir,r),o=JSON.parse(_.readFileSync(i,"utf8"));o.checkpoint&&o.checkpoint.checkpointId&&(this.checkpoints.set(o.checkpoint.checkpointId,o.checkpoint),s.push(o.checkpoint))}catch(i){console.error(`Failed to load checkpoint ${r}:`,i)}s.length>0&&this.saveIndex(s)}catch(t){console.error("Failed to read checkpoint directory:",t)}}async createCheckpoint(e,t,s,r){if(r){let l=Array.from(this.checkpoints.values()).find(p=>p.requestId===r);if(l)return this.rollback(l.checkpointId)}let i=this.generateCheckpointId(),o=new Date,a=new Map;e.length===0&&(e=B.workspace.textDocuments.filter(p=>!p.isUntitled&&!p.uri.scheme.startsWith("git")).map(p=>p.uri.fsPath));for(let l of e)try{let p=B.Uri.file(l),u=await B.workspace.openTextDocument(p);a.set(l,u.getText())}catch{}let c={checkpointId:i,timestamp:o,modifiedFiles:Array.from(a.keys()),diffHash:this.generateHash(Array.from(a.values()).join(`
`)),rollbackCommand:`bytecoder rollback ${i}`,description:t||`Checkpoint at ${o.toISOString()}`,sessionId:s,requestId:r};if(this.checkpoints.set(i,c),this.fileSnapshots.set(i,a),await this.persistCheckpoint(i,c,a),this.context){let l=this.context.workspaceState.get("byteAI.checkpoints",[]);l.push(c),await this.context.workspaceState.update("byteAI.checkpoints",l.slice(-20))}return{success:!0,checkpoint:c,message:`Created checkpoint ${i} with ${a.size} files`}}async deleteSessionCheckpoints(e){let t=Array.from(this.checkpoints.values()).filter(r=>r.sessionId===e),s=0;for(let r of t)this.deleteCheckpoint(r.checkpointId).success&&s++;return{success:!0,message:`Deleted ${s} checkpoints for session ${e}`}}resolveCheckpointId(e){let t=Array.from(this.checkpoints.values());if(t.length===0)return{error:"No checkpoints found"};t.sort((r,i)=>new Date(i.timestamp).getTime()-new Date(r.timestamp).getTime());let s=e;if(!s||s==="latest"||s==="current")return{id:t[0].checkpointId};if(s==="previous"||s==="last")return t.length<2?{error:"No previous checkpoint available"}:{id:t[1].checkpointId};if(/^HEAD~(\d+)$/.test(s)){let r=s.match(/^HEAD~(\d+)$/),i=parseInt(r[1],10);return t.length<=i?{error:`Cannot go back ${i} steps (only ${t.length} checkpoints exist)`}:{id:t[i].checkpointId}}return this.checkpoints.has(s)?{id:s}:{error:`Checkpoint ${s} not found`}}async getFileContent(e,t){let{id:s,error:r}=this.resolveCheckpointId(e);if(r||!s)return{success:!1,message:r||"Checkpoint resolution failed"};this.fileSnapshots.has(s)||await this.loadCheckpoint(s);let i=this.fileSnapshots.get(s);if(!i)return{success:!1,message:`Checkpoint ${s} data not found`};let o=i.get(t);return o===void 0?{success:!1,message:`File ${t} not found in checkpoint ${s}`}:{success:!0,content:o,message:`Retrieved content for ${t} from ${s}`}}async getDiff(e,t){let{id:s,error:r}=this.resolveCheckpointId(e);if(r||!s)return{success:!1,message:r||"Checkpoint resolution failed"};this.fileSnapshots.has(s)||await this.loadCheckpoint(s);let i=this.fileSnapshots.get(s);if(!i)return{success:!1,message:`Checkpoint ${s} data not found`};let o="",a=t?[t]:Array.from(i.keys());for(let c of a){let l=i.get(c);if(l!==void 0)try{let p="";_.existsSync(c)&&(p=_.readFileSync(c,"utf8")),l!==p&&(o+=`--- ${c} (Checkpoint ${s})
`,o+=`+++ ${c} (Current)
`,o+=this.generateSimpleDiff(l,p)+`

`)}catch(p){o+=`Error reading current file ${c}: ${p}
`}}return o||(o="No changes detected."),{success:!0,diff:o,message:`Generated diff for checkpoint ${s}`}}generateSimpleDiff(e,t){let s=e.split(`
`),r=t.split(`
`),i="",o=0,a=0;for(;o<s.length||a<r.length;)o<s.length&&a<r.length&&s[o]===r[a]?(o++,a++):(o<s.length&&(i+=`- ${s[o]}
`,o++),a<r.length&&(i+=`+ ${r[a]}
`,a++));return i}async searchHistory(e){let t=e.toLowerCase(),s=[];for(let r of this.checkpoints.values())(r.description.toLowerCase().includes(t)||r.checkpointId.includes(t)||r.sessionId&&r.sessionId.includes(t))&&s.push(r);if(this.checkpointDir&&_.existsSync(this.checkpointDir)){let r=_.readdirSync(this.checkpointDir).filter(i=>i.endsWith(".json")&&i!=="index.json");for(let i of r)try{let o=Z.join(this.checkpointDir,i),a=_.readFileSync(o,"utf8"),c=JSON.parse(a),l={};if(c.compressedSnapshots){let u=Buffer.from(c.compressedSnapshots,"base64"),h=Ze.gunzipSync(u).toString("utf8");l=JSON.parse(h)}else c.snapshots&&(l=c.snapshots);let p=!1;for(let[u,h]of Object.entries(l))if(h.toLowerCase().includes(t)){p=!0;break}p&&(s.find(u=>u.checkpointId===c.checkpoint.checkpointId)||s.push(c.checkpoint))}catch{}}return{success:!0,checkpoints:s,message:`Found ${s.length} checkpoints matching '${e}'`}}async rollback(e,t){let{id:s,error:r}=this.resolveCheckpointId(e);if(r||!s)return{success:!1,message:r||"Checkpoint resolution failed"};if(!this.fileSnapshots.get(s)&&!await this.loadCheckpoint(s))return{success:!1,message:`Checkpoint ${s} not found`};let o=this.fileSnapshots.get(s),a=[],c=t&&t.length>0?t:Array.from(o.keys());for(let l of c){let p=o.get(l);if(p===void 0){console.warn(`File ${l} not found in checkpoint ${s}, skipping.`);continue}try{let u=B.Uri.file(l);try{let h=await B.workspace.openTextDocument(u),m=new B.WorkspaceEdit;m.replace(u,new B.Range(new B.Position(0,0),new B.Position(h.lineCount,0)),p),await B.workspace.applyEdit(m),await h.save(),a.push(l)}catch{let h=Z.dirname(l);_.existsSync(h)||_.mkdirSync(h,{recursive:!0}),_.writeFileSync(l,p),a.push(l)}}catch(u){console.error(`Failed to restore ${l}:`,u)}}return{success:a.length>0,restoredFiles:a,message:`Restored ${a.length} files from checkpoint ${s}`}}listCheckpoints(){let e=Array.from(this.checkpoints.values());return{success:!0,checkpoints:e,message:`Found ${e.length} checkpoints`}}deleteCheckpoint(e){let t=this.checkpoints.delete(e);if(this.fileSnapshots.delete(e),this.checkpointDir){let s=Z.join(this.checkpointDir,`${e}.json`);try{_.existsSync(s)&&_.unlinkSync(s)}catch{}this.saveIndex(Array.from(this.checkpoints.values()))}return{success:t,message:t?`Deleted checkpoint ${e}`:`Checkpoint ${e} not found`}}saveIndex(e){if(this.checkpointDir)try{let t=Z.join(this.checkpointDir,"index.json");_.writeFileSync(t,JSON.stringify(e,null,2))}catch(t){console.error("Failed to save checkpoint index:",t)}}async persistCheckpoint(e,t,s){if(this.checkpointDir)try{let r=Object.fromEntries(s),i=JSON.stringify(r),o=Ze.gzipSync(i).toString("base64"),a={checkpoint:t,compressedSnapshots:o,version:2},c=Z.join(this.checkpointDir,`${e}.json`),l=`${c}.tmp`;_.writeFileSync(l,JSON.stringify(a,null,2)),_.renameSync(l,c);let p=Array.from(this.checkpoints.values());this.saveIndex(p),this.enforceRetentionPolicy()}catch(r){console.error(`Failed to persist checkpoint ${e}:`,r)}}enforceRetentionPolicy(){let s=Array.from(this.checkpoints.values()).sort((o,a)=>new Date(a.timestamp).getTime()-new Date(o.timestamp).getTime());if(s.length<=20)return;let r=Date.now(),i=[];for(let o=20;o<s.length;o++){let a=s[o];r-new Date(a.timestamp).getTime()>36e5&&i.push(a.checkpointId)}for(let o of i)this.deleteCheckpoint(o)}async loadCheckpoint(e){if(!this.checkpointDir)return!1;try{let t=Z.join(this.checkpointDir,`${e}.json`);if(!_.existsSync(t))return!1;let s=_.readFileSync(t,"utf8"),r=JSON.parse(s);this.checkpoints.set(e,r.checkpoint);let i;if(r.compressedSnapshots){let o=Buffer.from(r.compressedSnapshots,"base64"),a=Ze.gunzipSync(o).toString("utf8");i=new Map(Object.entries(JSON.parse(a)))}else if(r.snapshots)i=new Map(Object.entries(r.snapshots));else return!1;return this.fileSnapshots.set(e,i),!0}catch(t){return console.error(`Failed to load checkpoint ${e}:`,t),!1}}generateCheckpointId(){return`cp_${new Date().toISOString().replace(/[-:T.]/g,"").slice(0,17)}`}generateHash(e){return Rn.createHash("sha256").update(e).digest("hex")}getLatestCheckpoint(){let e=Array.from(this.checkpoints.values());if(e.length!==0)return e.sort((t,s)=>new Date(s.timestamp).getTime()-new Date(t.timestamp).getTime())[0]}async cleanup(e=10){let t=Array.from(this.checkpoints.entries()).sort((s,r)=>new Date(r[1].timestamp).getTime()-new Date(s[1].timestamp).getTime());for(let[s]of t.slice(e))this.deleteCheckpoint(s)}};var On=S(require("os"));var Rt=class extends E{constructor(){super({name:"CommandGenerator",timeout:5e3});this.DANGEROUS_PATTERNS=[/rm\s+-rf/i,/del\s+\/s/i,/rmdir\s+\/s/i,/format\s+/i,/dd\s+if=/i,/>\s*\/dev\//i,/chmod\s+777/i,/sudo\s+rm/i,/drop\s+database/i,/truncate\s+table/i];this.INTERACTIVE_PATTERNS=[/^npm start/i,/^npm run dev/i,/^npm run serve/i,/^node .+\.js$/i,/^python .+\.py$/i,/^go run/i,/^docker run/i,/server/i,/watch/i,/interactive/i,/start/i];let e=On.platform();e==="darwin"?this.platform="darwin":e==="win32"?this.platform="windows":this.platform="linux"}async execute(e){let t=Date.now();try{let s=[],r=!1,i;if(e.taskPlan)for(let a of e.taskPlan.taskGraph)a.command&&s.push({command:a.command,args:[],platform:"all",description:a.description,runInTerminal:this.isInteractive(a.command,a.description)}),a.validationCommand&&s.push({command:a.validationCommand,args:[],platform:"all",description:`Validate: ${a.description}`,runInTerminal:this.isInteractive(a.validationCommand,a.description)});switch(e.operation){case"create_file":s.push(...this.generateCreateFileCommands(e.target,e.content));break;case"create_dir":s.push(this.generateMkdirCommand(e.target));break;case"copy":s.push(this.generateCopyCommand(e.source,e.target));break;case"move":s.push(this.generateMoveCommand(e.source,e.target));break;case"delete":let a=this.generateDeleteCommand(e.target,e.workspaceRoot);s.push(a.command),r=!0,i=a.warning;break;case"run_script":s.push(this.generateRunScriptCommand(e.target));break;case"install_deps":s.push(this.generateInstallCommand(e.context));break;case"custom":let c=e.customCommand||e.context;if(c){let l=this.processCustomCommand(c,e.context);s.push(l.command),r=l.dangerous,l.dangerous&&(i="This command may have destructive effects")}break}for(let a of s)a.operation==="delete"&&a.requiresConfirmation===!1||this.isDangerousCommand(a.command)&&(r=!0,i="Command contains potentially destructive operations",a.requiresConfirmation=!0);let o={commands:s,platform:this.platform,requiresConfirmation:r,warningMessage:i};return this.createOutput("success",o,.9,t,{reasoning:`Generated ${s.length} commands for ${this.platform}`})}catch(s){return this.handleError(s,t)}}generateCreateFileCommands(e,t){let s=e.split("/").slice(0,-1).join("/"),r="",i=this.escapeForShell(e),o=s?this.escapeForShell(s):"";if(this.platform==="windows"){let a=[];if(s&&a.push(`if not exist "${o}" mkdir "${o}"`),t)if(t.includes(`
`)){a.push(`echo.>${i}`);let c=t.split(`
`);for(let l of c)a.push(`echo ${this.escapeForShell(l)}>>${i}`)}else a.push(`echo ${this.escapeForShell(t)}>${i}`);else a.push(`type nul > ${i}`);r=a.join(" && ")}else{let a=[];s&&a.push(`mkdir -p "${o}"`),t?t.includes(`
`)?a.push(`cat > "${i}" << 'EOF'
${t}
EOF`):a.push(`echo '${this.escapeForShell(t)}' > "${i}"`):a.push(`touch "${i}"`),r=a.join(" && ")}return[{command:r,args:[],platform:"all",description:`Create file: ${e}`,operation:"create_file",target:e,content:t||""}]}generateMkdirCommand(e){let t=this.escapeForShell(e);return{command:this.platform==="windows"?`mkdir "${t}"`:`mkdir -p "${t}"`,args:[],platform:this.platform,description:`Create directory: ${e}`}}generateCopyCommand(e,t){let s=this.escapeForShell(e),r=this.escapeForShell(t);return{command:this.platform==="windows"?`copy "${s}" "${r}"`:`cp "${s}" "${r}"`,args:[],platform:this.platform,description:`Copy ${e} to ${t}`}}generateMoveCommand(e,t){let s=this.escapeForShell(e),r=this.escapeForShell(t);return{command:this.platform==="windows"?`move "${s}" "${r}"`:`mv "${s}" "${r}"`,args:[],platform:this.platform,description:`Move ${e} to ${t}`}}generateDeleteCommand(e,t){let s=e.endsWith("/")||e.endsWith("\\")||!e.includes("."),r=this.escapeForShell(e),i;this.platform==="windows"?i=s?`rmdir /s /q "${r}"`:`del "${r}"`:i=`rm -rf "${r}"`;let a=!(e.startsWith("/")||e.match(/^[a-zA-Z]:\\/))||e.includes("node_modules")||e.includes("dist")||e.includes("build")||e.includes("tmp");return t&&e.startsWith(t)&&(a=!0),{command:{command:i,args:[],platform:this.platform,requiresConfirmation:!a,description:`Delete: ${e}`,operation:"delete"},warning:a?"":`This will permanently delete ${e}. This action cannot be undone.`}}generateRunScriptCommand(e){let t,s=this.escapeForShell(e);return e.endsWith(".ts")?t=`npx ts-node "${s}"`:e.endsWith(".js")?t=`node "${s}"`:e.endsWith(".py")?t=`python "${s}"`:e.endsWith(".sh")?t=this.platform==="windows"?`bash "${s}"`:`sh "${s}"`:t=this.platform==="windows"?`"${s}"`:`./"${s}"`,{command:t,args:[],platform:this.platform,description:`Run script: ${e}`,runInTerminal:this.isInteractive(t,e)}}generateInstallCommand(e){let t="npm install";if(e){let s=e.toLowerCase();s.includes("python")||s.includes("pip")||s.includes("requirements.txt")?t="pip install -r requirements.txt":s.includes("yarn")?t="yarn install":s.includes("pnpm")&&(t="pnpm install")}return{command:t,args:[],platform:"all",description:"Install dependencies"}}processCustomCommand(e,t){let s=this.isDangerousCommand(e);return{command:{command:e,args:[],platform:"all",requiresConfirmation:s,description:s?"Custom command (requires confirmation)":"Custom command",runInTerminal:this.isInteractive(e,t)},dangerous:s}}isDangerousCommand(e){return this.DANGEROUS_PATTERNS.some(t=>t.test(e))}isInteractive(e,t){if(this.INTERACTIVE_PATTERNS.some(r=>r.test(e)))return!0;if(t){let r=t.toLowerCase();if(r.includes("start server")||r.includes("run server")||r.includes("interactive")||r.includes("watch mode"))return!0}return!1}escapeForShell(e){return this.platform==="windows"?e.replace(/[&|<>^]/g,"^$&").replace(/"/g,'""'):e.replace(/'/g,`'"'"'`)}formatAsScript(e){let t=[];this.platform==="windows"?t.push("@echo off"):(t.push("#!/bin/bash"),t.push("set -e")),t.push("");for(let s of e.commands)t.push(`echo "Running: ${s.description}"`),t.push(s.command),t.push("");return t.join(`
`)}};var I=S(require("vscode")),$n=require("child_process"),Fn=require("util");var Ln=(0,Fn.promisify)($n.exec),Ee=class extends E{constructor(){super({name:"CodeModifier",timeout:3e4});this.originalContents=new Map}async execute(e){let t=Date.now();try{let s=[],r;e.createCheckpoint&&!e.dryRun&&(r=await this.createCheckpoint(e.modifications));for(let m of e.modifications){let f=await this.applyModification(m,e.dryRun,e.ignoreSyntaxErrors);s.push(f)}let i=s.filter(m=>m.success).length,o=s.reduce((m,f)=>m+f.linesModified,0),a={results:s,checkpoint:r,rollbackAvailable:!!r,totalFilesModified:i,totalLinesModified:o},c=i/e.modifications.length,l=s.filter(m=>m.success),p=l.slice(0,3).map(m=>`\`${m.file}\``).join(", "),u=Math.max(0,l.length-3),h=u>0?`${p} (+${u} more)`:p;return this.createOutput("success",a,c,t,{reasoning:`Modified ${i}/${e.modifications.length} files: ${h}. (${o} lines changed)`})}catch(s){return this.handleError(s,t)}}async applyModification(e,t=!1,s=!1){try{let r=I.Uri.file(e.filePath),i;try{i=await I.workspace.openTextDocument(r)}catch{return{file:e.filePath,success:!1,linesModified:0,error:`File not found: ${e.filePath}`}}let o=i.getText(),a=o.split(`
`);!t&&!this.originalContents.has(e.filePath)&&this.originalContents.set(e.filePath,o);let c=e.searchBlock?.trim(),l=e.startLine-1,p=e.endLine-1;if((isNaN(l)||isNaN(p)||l<0||p<0)&&c)l=0,p=a.length-1;else if(isNaN(l)||isNaN(p))return{file:e.filePath,success:!1,linesModified:0,error:"Invalid modification parameters: missing line numbers and search block"};if(l<0||p>=a.length)if(c)l=0,p=a.length-1;else return{file:e.filePath,success:!1,linesModified:0,error:`Invalid line range: ${e.startLine}-${e.endLine} (file has ${a.length} lines)`};let u=a.slice(l,p+1).join(`
`),h=!1,m=null,f=e.action||"replace";if(c&&!u.includes(c))if(e.startLine>0||e.endLine<a.length){let b=a.join(`
`);if(b.includes(c))u=b,l=0,p=a.length-1;else{let M=a;if(m=this.findFuzzyMatch(M,c)||this.findTokenMatch(b,c),m)u=b,l=0,p=a.length-1,h=!0;else return{file:e.filePath,success:!1,linesModified:0,error:"Search block not found in file (tried exact and fuzzy)"}}}else if(m=this.findFuzzyMatch(u.split(`
`),c)||this.findTokenMatch(u,c),m)h=!0;else return{file:e.filePath,success:!1,linesModified:0,error:"Search block not found in target section"};let g,v=(()=>{if(c){if(!h&&u.includes(c)){let b=u.indexOf(c);return{before:u.substring(0,b),match:c,after:u.substring(b+c.length),indent:this.getIndentation(c.split(`
`)[0])}}else if(h&&m){let b=u.split(`
`),M=b.slice(0,m.start),W=b.slice(m.start,m.end+1),de=b.slice(m.end+1);return{before:M.join(`
`)+(M.length>0?`
`:""),match:W.join(`
`),after:(de.length>0?`
`:"")+de.join(`
`),indent:this.getIndentation(b[m.start])}}}return null})();if(v){let b=this.adjustIndentation(e.replaceBlock,v.indent);switch(f){case"insert_before":g=v.before+b+`
`+v.match+v.after;break;case"insert_after":g=v.before+v.match+`
`+b+v.after;break;case"delete":g=v.before+v.after;break;default:g=v.before+b+v.after;break}}else f==="delete"?g="":g=e.replaceBlock;let w;g===""?w=[]:w=g.split(`
`);let k=[...a.slice(0,l),...w,...a.slice(p+1)],C=this.generateDiff(e.filePath,c,e.replaceBlock);if(t)return{file:e.filePath,success:!0,linesModified:Math.abs(e.replaceBlock.split(`
`).length-c.split(`
`).length)+1,diff:C};let P=new I.WorkspaceEdit;if(P.replace(r,new I.Range(new I.Position(l,0),new I.Position(p,a[p]?.length||0)),g),!await I.workspace.applyEdit(P))return{file:e.filePath,success:!1,linesModified:0,error:"Failed to apply edit"};if(await i.save(),!s){let b=await this.validateSyntax(e.filePath);if(b){let M=new I.WorkspaceEdit;return M.replace(r,new I.Range(new I.Position(0,0),new I.Position(a.length+100,0)),o),await I.workspace.applyEdit(M),await i.save(),{file:e.filePath,success:!1,linesModified:0,error:`Syntax Error detected: ${b.split(`
`)[0]}. Reverted changes.`}}}return{file:e.filePath,success:!0,linesModified:Math.abs(g.split(`
`).length-(p-l+1))+1,diff:C}}catch(r){return{file:e.filePath,success:!1,linesModified:0,error:`Error applying modification: ${r.message}`}}}async validateSyntax(e){try{return e.endsWith(".js")?await Ln(`node --check "${e}"`):e.endsWith(".py")&&await Ln(`python3 -m py_compile "${e}"`),null}catch(t){return t.stderr||t.message||"Syntax check failed"}}async createCheckpoint(e){let t=[...new Set((e||[]).map(r=>r.filePath))],s=`cp_${new Date().toISOString().replace(/[-:T.]/g,"").slice(0,14)}`;for(let r of t)try{let i=I.Uri.file(r),o=await I.workspace.openTextDocument(i);this.originalContents.set(r,o.getText())}catch{}return{checkpointId:s,timestamp:new Date,modifiedFiles:t,diffHash:this.generateHash(t.join(",")),rollbackCommand:`bytecoder rollback ${s}`,description:`Checkpoint before modifying ${t.length} files`}}async rollback(e){try{for(let[t,s]of this.originalContents){let r=I.Uri.file(t);try{let i=await I.workspace.openTextDocument(r),o=new I.WorkspaceEdit;o.replace(r,new I.Range(new I.Position(0,0),new I.Position(i.lineCount,0)),s),await I.workspace.applyEdit(o)&&await i.save()}catch{try{await I.workspace.fs.delete(r)}catch{}}}return this.originalContents.clear(),!0}catch{return!1}}findFuzzyMatch(e,t){let s=t.split(`
`).map(r=>r.trim()).filter(r=>r!=="");if(s.length===0)return null;for(let r=0;r<e.length;r++)if(this.calculateSimilarity(e[r].trim(),s[0])>=.75){let i=r,o=0,a=!0,c=0;for(;o<s.length;){if(i>=e.length){a=!1;break}let l=e[i].trim();if(l===""){i++;continue}if(this.calculateSimilarity(l,s[o])<.75){a=!1;break}i++,o++,c++}if(a&&c===s.length)return{start:r,end:i-1}}return null}calculateSimilarity(e,t){let s=e.replace(/['"]/g,'"').replace(/\s+/g,"").toLowerCase(),r=t.replace(/['"]/g,'"').replace(/\s+/g,"").toLowerCase();if(s===r)return 1;if(s.length<2||r.length<2)return 0;let i=new Map;for(let a=0;a<s.length-1;a++){let c=s.substring(a,a+2);i.set(c,(i.get(c)||0)+1)}let o=0;for(let a=0;a<r.length-1;a++){let c=r.substring(a,a+2);i.has(c)&&i.get(c)>0&&(o++,i.set(c,i.get(c)-1))}return 2*o/(s.length-1+r.length-1)}findTokenMatch(e,t){let s=a=>{let c="",l=[],p=!1;for(let u=0;u<a.length;u++){let h=a[u];/\s/.test(h)?p||(c+=" ",l.push(u),p=!0):(c+=h,l.push(u),p=!1)}return{str:c.trim(),map:l}},r=s(e),i=s(t),o=r.str.indexOf(i.str);if(o!==-1){let a=r.map[o],c=o+i.str.length-1;if(c>=r.map.length)return null;let l=r.map[c],p=u=>(e.substring(0,u).match(/\n/g)||[]).length;return{start:p(a),end:p(l)}}return null}getIndentation(e){let t=e.match(/^[\s\t]*/);return t?t[0]:""}adjustIndentation(e,t){let s=e.split(`
`);if(s.length===0)return e;let r=s.filter(i=>i.trim().length>0).reduce((i,o)=>{let a=this.getIndentation(o);return a.length<i.length?a:i},s[0].match(/^[\s\t]*/)[0]);return s.map(i=>i.trim().length===0?"":i.startsWith(r)?t+i.substring(r.length):t+i).join(`
`)}generateDiff(e,t,s){let r=t.split(`
`),i=s.split(`
`),o=[];o.push(`--- a/${e.split("/").pop()}`),o.push(`+++ b/${e.split("/").pop()}`),o.push(`@@ -1,${r.length} +1,${i.length} @@`);for(let a of r)o.push(`-${a}`);for(let a of i)o.push(`+${a}`);return o.join(`
`)}generateHash(e){let t=0;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);t=(t<<5)-t+r,t=t&t}return`hash:${Math.abs(t).toString(16).padStart(8,"0")}`}clearCache(){this.originalContents.clear()}};var V=S(require("vscode"));var Pe=class extends E{constructor(){super({name:"CodeGenerator",timeout:6e4}),this.client=new O,this.filePartSearcher=new Be,this.personaManager=new U}async execute(n){let e=Date.now();try{let t=[],s=[],r=[],i=[],o=[],a;for(let l of n.taskPlan.taskGraph){if(!l.filePath&&l.type==="code"){let p=l.description.match(/(?:create|edit|modify|update|in|for)\s+([a-zA-Z0-9_./-]+\.[a-z0-9]+)/i);p?l.filePath=p[1]:n.activeFilePath&&(l.filePath=n.activeFilePath)}!l.filePath&&l.type==="command"||(l.parallelGroup&&l.parallelGroup===a?o.push(l):(o.length>0&&i.push(o),o=[l],a=l.parallelGroup))}o.length>0&&i.push(o);for(let l of i){let p=await Promise.all(l.map(async u=>u.filePath&&!u.description.includes("mkdir")?{task:u,result:await this.generateForTask(u,n.codePlan,n.context,u.persona||n.persona,n.activeFilePath)}:null));for(let u of p){if(!u)continue;let{task:h,result:m}=u;m.type==="create"?(t.push({operation:"create_file",target:h.filePath,content:m.content}),r.push(h.filePath)):(s.push(...m.modifications),r.push(h.filePath))}}let c={commands:t,modifications:s,generatedFiles:r};return this.createOutput("success",c,.8,e,{reasoning:`Generated content/modifications for ${r.length} files based on task plan`})}catch(t){return this.handleError(t,e)}}async generateForTask(n,e,t,s,r){let i=n.filePath,o=n.description,a=s||this.personaManager.detectPersona(o+" "+i,"modify"),c=this.personaManager.getPersona(a);try{let l=!1,p="",u=!1;try{let g=V.workspace.workspaceFolders?.[0],y;if(!i.startsWith("/")&&t?.files){let w=t.files.find(k=>k.relativePath===i||k.relativePath.endsWith(i));w&&g?y=V.Uri.joinPath(g.uri,w.relativePath):g?y=V.Uri.joinPath(g.uri,i):y=V.Uri.file(i)}else i.startsWith("/")?y=V.Uri.file(i):g?y=V.Uri.joinPath(g.uri,i):y=V.Uri.file(i);if((await V.workspace.fs.stat(y)).type===V.FileType.File){l=!0;let k=(await V.workspace.openTextDocument(y)).getText(),C=this.detectTargetElement(o);if(k.length>2e4||C){u=!0;let T=o.split(" ").filter(b=>b.length>4&&!["update","change","modify","delete","remove","create","write","function","class","method"].includes(b.toLowerCase()));if(C){let b=await this.filePartSearcher.execute({filePath:i,fileContent:k,searchFor:{elementType:C.type,name:C.name}});b.status==="success"&&b.payload&&b.payload.length>0?p=b.payload.map(M=>`// ... (lines ${M.startLine}-${M.endLine})
${M.content}
// ...`).join(`

`):p=await this.keywordSearch(i,k,T,C.type)}else p=await this.keywordSearch(i,k,T)}else p=k}}catch{}let h=this.constructPrompt(i,o,e,l,p,t,u,c,r),m=0,f=2;for(;m<f;){let g=await this.client.streamResponse(h,()=>{},v=>{console.warn("LLM streaming warning:",v)}),y=this.extractResult(g,i,l);if(y)return y;m++,m<f&&(console.warn(`Attempt ${m} failed to extract code for ${i}. Retrying...`),h+=`

CRITICAL ERROR: Your previous response was not in the expected format.
                    I could not extract the code or modifications.
                    ${l?'Please strictly output the JSON array inside <byte_action type="modify_file"> tags.':'Please strictly output the code block inside <byte_action type="create_file"> tags or a markdown code block.'}
                    Do not add any conversational text.`)}return console.warn(`Could not extract code/mods for ${i} after ${f} attempts, falling back to template.`),{type:"create",content:this.generateFallbackContent(i,o,t)}}catch(l){return console.error(`Error in generateForTask for ${i}:`,l),{type:"create",content:this.generateFallbackContent(i,o,t)}}}constructPrompt(n,e,t,s,r,i,o=!1,a,c){let l=n.split("/").pop()||"file",p=n.split(".").pop()||"",u=`Role: ${a?.role||"Expert Software Engineer"}
`;if(a?.systemPrompt?u+=`${a.systemPrompt}

`:u+=`You are an expert software engineer. Write production-quality, clean, and efficient code.

`,u+=`Task: ${e}
`,u+=`Target File: \`${n}\`
`,c&&c!==n&&(u+=`Note: The user currently has \`${c}\` open. If the task implies a relationship with this file, consider it.
`),u+=`File Status: ${s?"EXISTS (Modify it)":"NEW (Create it)"}

`,s&&r&&(u+=`**Current File Content${o?" (PARTIAL/RELEVANT SECTIONS)":""}:**
`,u+=`\`\`\`${p}
${r}
\`\`\`

`),t.techStack&&(u+=`**Tech Stack:**
`,t.techStack.frontend&&(u+=`- Frontend: ${t.techStack.frontend}
`),t.techStack.backend&&(u+=`- Backend: ${t.techStack.backend}
`),t.techStack.database&&(u+=`- Database: ${t.techStack.database}
`)),i?.knowledge&&i.knowledge.length>0&&(u+=`
**Relevant Context/Knowledge:**
`,i.knowledge.forEach(h=>{u+=`- ${h.summary}
`})),t.fileSpecs){let h=t.fileSpecs.find(m=>n.endsWith(m.filePath)||m.filePath.endsWith(n));h&&(u+=`
**Detailed Specification for this file:**
${h.spec}
`)}if(i?.webSearch){let h=i.webSearch.payload;h&&(u+=`

External Knowledge (Web Search):
Source: ${h.source}
URL: ${h.url}
Content:
${h.content}

Use this information to implement the requested code.`)}return u+=`
**General Requirements:**
`,u+=`- Include comprehensive error handling (try/catch where appropriate).
`,u+=`- Use proper logging/debugging statements.
`,u+=`- Follow language idioms and best practices.
`,u+=`- Ensure all imports are present and correct.
`,u+=`- Add comments explaining complex logic.
`,u+=`
**Action Instructions:**
`,s?(u+=`1. The file ALREADY EXISTS. DO NOT rewrite the whole file unless asked to "rewrite".
`,u+=`2. Output a JSON array of modifications inside <byte_action type="modify_file"> tags.
`,u+=`3. Format: [{"filePath": "${n}", "searchBlock": "unique code to find", "replaceBlock": "code to add/replace", "action": "replace" | "insert_before" | "insert_after" | "delete", "startLine": 0, "endLine": 0}]
`,u+=`4. "searchBlock" must uniquely identify the anchor or target. It must be EXACT match.
`,u+=`   - For REPLACEMENT: searchBlock is the code to be removed.
`,u+=`   - For INSERTION: searchBlock is the ANCHOR (existing code) to insert before/after.
`,u+=`5. IMPORTANT: If you are provided with partial content containing line numbers (e.g. // lines 50-60), YOU MUST USE THOSE LINE NUMBERS in "startLine" and "endLine" if your modification targets that specific block.
`,u+=`6. If adding a new function/method, prefer "insert_after" an existing method to maintain structure.
`):(u+=`1. Output ONLY the code for this file.
`,u+=`2. Ensure the code is complete, functional, and follows best practices.
`,u+=`3. Include necessary imports and type definitions.
`,u+=`4. Start the file with a comment: // ${l}
`,u+=`5. Wrap code in <byte_action type="create_file"> or markdown code blocks.
`),u}extractResult(n,e,t){let s=n.match(/<byte_action\s+type="modify_file"[^>]*>([\s\S]*?)<\/byte_action>/i);if(s&&s[1])try{let c=s[1].trim().replace(/```json/g,"").replace(/```/g,"").trim(),l=JSON.parse(c);if(Array.isArray(l))return l.forEach(p=>{p.filePath||(p.filePath=e)}),{type:"modify",modifications:l}}catch(a){console.error("Failed to parse modification JSON",a)}let r=n.match(/<byte_action\s+type="create_file"[^>]*>([\s\S]*?)<\/byte_action>/i);if(r&&r[1])return{type:"create",content:r[1].trim()};let i=n.match(/```(?:\w+)?\n([\s\S]*?)```/);if(i&&i[1])return{type:"create",content:i[1].trim()};let o=n.trim();return o.startsWith("import ")||o.startsWith("#")||o.startsWith("//")||o.startsWith("package ")||o.startsWith("export ")?{type:"create",content:o}:null}detectTargetElement(n){let e=n.toLowerCase(),t=e.match(/(?:function|method)\s+(\w+)/);if(t)return{type:"function",name:t[1]};let s=e.match(/class\s+(\w+)/);return s?{type:"class",name:s[1]}:e.includes("function")?{type:"function"}:e.includes("class")?{type:"class"}:e.includes("component")?{type:"component"}:null}async keywordSearch(n,e,t,s){if(t.length===0&&!s)return e.slice(0,5e4)+`
... (truncated)`;let r=await this.filePartSearcher.execute({filePath:n,fileContent:e,searchFor:{text:t.join(" "),elementType:s}});return r.status==="success"&&r.payload&&r.payload.length>0?r.payload.map(i=>`// ... (lines ${i.startLine}-${i.endLine})
${i.content}
// ...`).join(`

`):e.slice(0,5e4)+`
... (truncated)`}generateFallbackContent(n,e,t){let s=n.split(".").pop()?.toLowerCase(),r=n.split("/").pop()?.split(".")[0]||"Component",i="";if(t?.knowledge&&t.knowledge.length>0){let o=t.knowledge.filter(a=>e.toLowerCase().split(" ").filter(l=>l.length>3).some(l=>a.summary.toLowerCase().includes(l)||a.content?.toLowerCase().includes(l)));o.length>0&&(i=`
// RELEVANT CONTEXT:
// ${o.map(a=>a.summary).join(`
// `)}
`)}if((n.includes("components/")||n.includes("pages/"))&&(s==="tsx"||s==="jsx")){let o=`{/* TODO: Implement ${e} */}`;return i&&(o+=`
            {/* 
              CONTEXT:
              ${(t?.knowledge||[]).map(a=>a.summary).join(`
              `)} 
            */}`),`import React from 'react';

interface ${r}Props {
    // TODO: Define props
    children?: React.ReactNode;
}

export const ${r}: React.FC<${r}Props> = ({ children }) => {
    return (
        <div className="${r.toLowerCase()}-container">
            ${o}
            <h2>${r}</h2>
            {children}
        </div>
    );
};

export default ${r};`}if(s==="ts"||s==="js"){if(n.includes("types/")||n.includes("interfaces"))return`// Type definitions for ${r}
// Generated by Byte Coder

export interface I${r} {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
`;if(n.includes("utils/")||n.includes("helpers"))return`/**
 * Utility functions for ${r}
 */

export const process${r} = (data: any): void => {
    // TODO: Implement processing logic
    console.log('Processing', data);
};
`}if(s==="css"||s==="scss")return`/* Styles for ${r} */
.${r.toLowerCase()}-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
`;if(s==="py"){if(e.toLowerCase().includes("solve")||e.toLowerCase().includes("calculate")){let o=e.match(/[\d\s\+\-\*\/\(\)\.]+/),a=o?o[0].trim():'"Could not parse expression"';return`# Python script to ${e}
def solve():
    try:
        result = ${a}
        print(f"Result: {result}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    solve()
`}return`# ${r}.py
# ${e}

def main():
    print("Executing ${r}...")
    # TODO: Implement logic

if __name__ == "__main__":
    main()
`}return s==="sh"?`#!/bin/bash
# ${e}

echo "Running ${r}..."
# TODO: Implement commands
`:s==="json"?`{
  "name": "${r}",
  "version": "1.0.0"
}`:`// ${r}
// ${e}
// TODO: Implement this file
`}};var Te=S(require("vscode")),Dn=S(require("child_process"));var je=S(require("fs")),ze=S(require("path")),Ae=class extends E{constructor(){super({name:"Executor",timeout:6e4});this.ERROR_PATTERNS=[{pattern:/TypeError: (.+)/i,type:"TypeError"},{pattern:/ReferenceError: (.+)/i,type:"ReferenceError"},{pattern:/SyntaxError: (.+)/i,type:"SyntaxError"},{pattern:/Error: (.+)/i,type:"Error"},{pattern:/Cannot find module '(.+)'/i,type:"ModuleNotFound"},{pattern:/Property '(.+)' does not exist/i,type:"PropertyError"},{pattern:/Type '(.+)' is not assignable/i,type:"TypeMismatch"},{pattern:/Expected (\d+) arguments?, but got (\d+)/i,type:"ArgumentCount"},{pattern:/ENOENT: no such file or directory/i,type:"FileNotFound"},{pattern:/EACCES: permission denied/i,type:"PermissionDenied"}];this.LOCATION_PATTERNS=[/at (.+):(\d+):(\d+)/,/(.+\.(?:ts|js|tsx|jsx)):(\d+):(\d+)/,/File "(.+)", line (\d+)/,/(.+\.go):(\d+):/];this.personaManager=new U}async execute(e){let t=Date.now();try{let s;if(e.commands&&e.commands.length>0){let i=[],o=!0,a="",c="";for(let l of e.commands){if(!l)continue;let p;if(typeof l=="string")p=await this.runCommand({...e,command:l});else if(l.operation==="create_file")if(!l.target)p={command:"create_file",exitCode:1,stdout:"",stderr:"Missing target file path",success:!1,duration:0,recoveryOptions:[]};else try{let u=e.cwd||Te.workspace.workspaceFolders?.[0]?.uri.fsPath||process.cwd(),h=ze.isAbsolute(l.target)?l.target:ze.resolve(u,l.target),m=ze.dirname(h);je.existsSync(m)||je.mkdirSync(m,{recursive:!0}),je.writeFileSync(h,l.content||""),p={command:`create_file ${h}`,exitCode:0,stdout:`Created file: ${h}`,stderr:"",success:!0,duration:0,recoveryOptions:[]}}catch(u){p={command:`create_file ${l.target}`,exitCode:1,stdout:"",stderr:u.message,success:!1,duration:0,recoveryOptions:[]}}else if(l.command)l.runInTerminal?p=await this.runInTerminal({...e,command:l.command}):p=await this.runCommand({...e,command:l.command});else continue;if(i.push(p),a+=p.stdout+`
`,c+=p.stderr+`
`,!p.success){o=!1;break}}s={command:"multiple_commands",exitCode:o?0:1,stdout:a,stderr:c,success:o,duration:Date.now()-t,recoveryOptions:[],results:i}}else if(e.command)e.runInTerminal?s=await this.runInTerminal(e):s=await this.runCommand(e);else throw new Error("No command provided to Executor");e.parseErrors&&!s.success&&(s.parsed=this.parseError(s.stderr||s.stdout),s.recoveryOptions=this.generateRecoveryOptions(s));let r=s.success?.95:.6;return this.createOutput(s.success?"success":"partial",s,r,t,{reasoning:s.success?`Command(s) completed successfully in ${s.duration}ms`:`Command(s) failed with exit code ${s.exitCode}: ${s.parsed?.errorType||"Unknown error"}`})}catch(s){return this.handleError(s,t)}}runInTerminal(e){return new Promise(t=>{let s=Date.now(),r=e.cwd||Te.workspace.workspaceFolders?.[0]?.uri.fsPath||process.cwd(),i=e.command||'echo "No command provided"',o=Te.window.terminals.find(a=>a.name==="Byte Coder Executor");o||(o=Te.window.createTerminal({name:"Byte Coder Executor",cwd:r})),o.show(!0),o.sendText(i),t({command:i,exitCode:0,stdout:`Command sent to terminal: ${i}`,stderr:"",success:!0,duration:Date.now()-s,recoveryOptions:[]})})}runCommand(e){return new Promise(t=>{let s=Date.now(),r=e.cwd||Te.workspace.workspaceFolders?.[0]?.uri.fsPath||process.cwd(),i=e.timeout||this.timeout,o=e.command||'echo "No command provided"',a=Dn.exec(o,{cwd:r,timeout:i,maxBuffer:10*1024*1024,env:{...process.env,FORCE_COLOR:"0"}},(c,l,p)=>{let u=Date.now()-s,h=c?c.code||1:0,m=e.expectSuccess!==!1?h===0:!0,f=typeof l=="string"?l:l.toString(),g=typeof p=="string"?p:p.toString(),y=this.extractErrorLocation(g||f);t({command:o,exitCode:h,stdout:f.slice(0,5e3),stderr:g.slice(0,5e3),success:m,duration:u,errorLocation:y,recoveryOptions:[]})})})}extractErrorLocation(e){for(let t of this.LOCATION_PATTERNS){let s=e.match(t);if(s)return{file:s[1],startLine:parseInt(s[2]),endLine:parseInt(s[2]),confidence:1,reason:"Stack trace extraction"}}}parseError(e){for(let{pattern:t,type:s}of this.ERROR_PATTERNS){let r=e.match(t);if(r)return{errorType:s,errorMessage:r[1],suggestions:this.getSuggestionsForError(s,r[1])}}}getSuggestionsForError(e,t){switch(e){case"ModuleNotFound":return[`Run 'npm install ${t}'`,"Check import path"];case"TypeError":return["Check variable types","Verify object properties"];case"SyntaxError":return["Check for missing brackets or semicolons","Verify language syntax"];default:return["Check documentation","Search for error message"]}}generateRecoveryOptions(e){let t=[];if(!e.parsed)return t;let{errorType:s,errorMessage:r}=e.parsed,i=this.analyzeErrorWithPersona(s,r);if(i&&(e.personaAdvice=i),s==="ModuleNotFound"){let o=r.match(/'([^']+)'/),a=o?o[1]:r,c=this.detectPackageManager(e.parsed.errorMessage.includes("yarn")?"yarn":"npm");t.push({strategy:"install_dependency",confidence:.95,command:`${c} ${a}`,description:`Install missing dependency: ${a}`})}else if(s==="FileNotFound"){let o=r.match(/'([^']+)'/);o&&t.push({strategy:"create_file",confidence:.85,command:`touch ${o[1]}`,description:`Create missing file: ${o[1]}`})}else s==="SyntaxError"?t.push({strategy:"fix_syntax",confidence:.8,description:"Request CodeModifier to fix syntax error at identified location"}):(s==="TypeError"||s==="ReferenceError")&&t.push({strategy:"debug_code",confidence:.7,description:"Request analysis and fix for type/reference error"});return t}detectPackageManager(e="npm"){return e==="yarn"?"yarn add":"npm install"}analyzeErrorWithPersona(e,t){let s=this.personaManager.getPersona("DevOpsEngineer");return e==="ModuleNotFound"?`[${s.role}] It seems a dependency is missing. Check your package.json or install it directly.`:e==="SyntaxError"?`[${s.role}] Syntax error detected. Review the code structure near the error line.`:`[${s.role}] Error detected: ${e}. Review the logs for details.`}};var Ue=class extends E{constructor(){super({name:"DocWriter",timeout:1e4})}async execute(n){let e=Date.now();try{let t;switch(n.type){case"inline_comments":t=this.generateInlineComments(n);break;case"readme":t=this.generateReadme(n);break;case"api_reference":t=this.generateApiReference(n);break;case"decision_record":t=this.generateDecisionRecord(n);break;case"changelog":t=this.generateChangelog(n);break;default:t={documentation:"",format:"plain"}}return this.createOutput("success",t,.85,e,{reasoning:`Generated ${n.type} documentation`})}catch(t){return this.handleError(t,e)}}generateInlineComments(n){let e=[],t=n.context;if(t?.functionName)e.push("/**"),e.push(` * ${this.generateFunctionDescription(t.functionName)}`),e.push(" *"),e.push(" * @param {type} paramName - Parameter description"),e.push(" * @returns {type} Return value description"),e.push(" *"),e.push(" * @example"),e.push(` * ${t.functionName}()`),e.push(" */");else if(t?.className)e.push("/**"),e.push(` * ${this.generateClassDescription(t.className)}`),e.push(" *"),e.push(" * @class"),e.push(` * @classdesc ${t.className} class description`),e.push(" */");else if(n.content){let s=this.analyzeCode(n.content);e.push(...s.comments)}return{documentation:e.join(`
`),format:"tsdoc"}}generateReadme(n){let e=[],t=n.context?.changes||[];if(e.push(`## Recent Changes
`),t.length>0){e.push(`### What's New
`);for(let s of t)e.push(`- ${s}`);e.push("")}return e.push(`### Features
`),e.push("- Feature description here"),e.push(""),e.push(`### Usage
`),e.push("```typescript"),e.push("// Example usage code"),e.push("```"),e.push(""),e.push(`### Installation
`),e.push("```bash"),e.push("npm install"),e.push("```"),{documentation:e.join(`
`),format:"markdown"}}generateApiReference(n){let e=[];return e.push(`# API Reference
`),e.push(`## Endpoints
`),e.push("### `GET /api/resource`\n"),e.push(`Description of the endpoint.
`),e.push("**Parameters:**"),e.push("| Name | Type | Required | Description |"),e.push("|------|------|----------|-------------|"),e.push("| id | string | Yes | Resource ID |"),e.push(""),e.push("**Response:**"),e.push("```json"),e.push("{"),e.push('  "success": true,'),e.push('  "data": { }'),e.push("}"),e.push("```"),e.push(""),e.push("**Status Codes:**"),e.push("- `200` - Success"),e.push("- `400` - Bad Request"),e.push("- `404` - Not Found"),e.push("- `500` - Server Error"),{documentation:e.join(`
`),format:"markdown"}}generateDecisionRecord(n){let e=n.context,t=new Date().toISOString().split("T")[0],s=[];if(s.push(`## ${e?.decision||"Architecture Decision"}`),s.push(`**Date:** ${t}`),s.push(""),s.push("### Context"),s.push("Describe the context and problem that led to this decision."),s.push(""),s.push("### Decision Drivers"),s.push("- Driver 1"),s.push("- Driver 2"),s.push(""),s.push("### Options Considered"),e?.options)for(let r=0;r<e.options.length;r++)s.push(`${r+1}. **${e.options[r]}**`),s.push("   - Pros: ..."),s.push("   - Cons: ...");else s.push("1. **Option A**"),s.push("   - Pros: ..."),s.push("   - Cons: ...");return s.push(""),s.push("### Decision"),s.push(e?.rationale||"Explanation of the chosen option and why."),s.push(""),s.push("### Consequences"),s.push("- Impact 1"),s.push("- Impact 2"),{documentation:s.join(`
`),format:"markdown"}}generateChangelog(n){let e=new Date().toISOString().split("T")[0],t=n.context?.changes||[],s=[];s.push(`## [Unreleased] - ${e}
`);let r=[],i=[],o=[],a=[];for(let c of t){let l=c.toLowerCase();l.startsWith("add")||l.startsWith("new")||l.startsWith("implement")?r.push(c):l.startsWith("fix")||l.startsWith("resolve")||l.startsWith("correct")?o.push(c):l.startsWith("remove")||l.startsWith("delete")?a.push(c):i.push(c)}return r.length>0&&(s.push("### Added"),r.forEach(c=>s.push(`- ${c}`)),s.push("")),i.length>0&&(s.push("### Changed"),i.forEach(c=>s.push(`- ${c}`)),s.push("")),o.length>0&&(s.push("### Fixed"),o.forEach(c=>s.push(`- ${c}`)),s.push("")),a.length>0&&(s.push("### Removed"),a.forEach(c=>s.push(`- ${c}`)),s.push("")),{documentation:s.join(`
`),format:"markdown"}}generateFunctionDescription(n){let e=n.replace(/([A-Z])/g," $1").toLowerCase().trim().split(" "),t={get:"Retrieves",set:"Sets",create:"Creates",update:"Updates",delete:"Deletes",add:"Adds",remove:"Removes",handle:"Handles",process:"Processes",validate:"Validates",check:"Checks",is:"Checks if",has:"Checks if it has",can:"Checks if it can",find:"Finds",search:"Searches for",fetch:"Fetches",load:"Loads",save:"Saves",init:"Initializes",parse:"Parses",format:"Formats",render:"Renders",calculate:"Calculates",compute:"Computes"},s=e[0],r=t[s]||"Performs",i=e.slice(1).join(" ");return`${r} ${i||"the operation"}`}generateClassDescription(n){let e=n.replace(/([A-Z])/g," $1").trim();return n.endsWith("Agent")?`${e} - Specialized agent for handling ${e.replace(" Agent","").toLowerCase()} operations`:n.endsWith("Service")?`${e} - Service layer for ${e.replace(" Service","").toLowerCase()} functionality`:n.endsWith("Controller")?`${e} - Controls ${e.replace(" Controller","").toLowerCase()} flow`:n.endsWith("Provider")?`${e} - Provides ${e.replace(" Provider","").toLowerCase()} functionality`:n.endsWith("Manager")?`${e} - Manages ${e.replace(" Manager","").toLowerCase()} operations`:`${e} class`}analyzeCode(n){let e=[],t=n.split(`
`),s=n.match(/(?:async\s+)?function\s+(\w+)|(?:const|let)\s+(\w+)\s*=\s*(?:async\s*)?\(/);if(s){let r=s[1]||s[2];e.push("/**"),e.push(` * ${this.generateFunctionDescription(r)}`),e.push(" */")}return{comments:e}}};var Ot=class extends E{constructor(){super({name:"TodoManager",timeout:5e3})}getAlternativeStrategy(n,e){let s={"missing dependencies":["Check environment","Install via alternative source","Debug imports"],"syntax error":["Lint file","Rewrite code block","Check encoding"],"undefined variable":["Check scope","Define variable","Debug execution"],"type mismatch":["Cast type","Validate input","Debug types"],"performance issue":["Optimize code","Increase timeout","Profile execution"],"permission issue":["Check file permissions","Run as different user","Change directory"],"missing file":["Verify path","Create file","List directory"]}[n];if(!s)return null;let r=e-1;return r>=0&&r<s.length?s[r]:null}async execute(n){let e=Date.now(),{currentPlan:t,lastTaskResult:s}=n,r=JSON.parse(JSON.stringify(t)),i="continue",o,a="",c=[];if(n.startTime&&n.maxDuration){let p=Date.now()-n.startTime;if(p>n.maxDuration)return this.createOutput("success",{updatedPlan:r,action:"stop",reasoning:`Global timeout reached (${p}ms > ${n.maxDuration}ms). Stopping execution.`,changes:[]},1,e)}if(s){let p=r.findIndex(u=>u.id===s.taskId);if(p!==-1){let u=r[p];if(s.success)u.status="completed",u.output=s.result,a=`Task '${u.description}' completed successfully.`,c.push(`Marked task ${u.id} as completed`);else if(u.status="failed",a=`Task '${u.description}' failed. `,s.result?.recoveryOptions&&s.result.recoveryOptions.length>0){let h=u.retryCount??0;if(h>=3)a+=` Max retries (3) reached for task ${u.id}. Halting to prevent infinite loop.`,i="stop";else{let m=s.result.recoveryOptions[0];a+=`Applying recovery strategy: ${m.strategy}.`;let f=`Fix: ${m.strategy} (for ${u.description})`,g=`fix_${be().slice(0,8)}`,y={id:g,description:f,status:"pending",dependencies:u.dependencies,type:"code",complexity:"simple",assignedAgent:"CodeGenerator",createdAt:Date.now()};r.splice(p,0,y),u.status="pending",u.dependencies=[g],u.retryCount=h+1,c.push(`Added fix task ${g}, reset task ${u.id} (retry #${u.retryCount})`),i="retry"}}else{let h=this.analyzeError(s.error||"");a+=` Analysis suggests: ${h}.`;let m=r[p-1],f=`Fix ${h} in ${u.id}`,g=1;for(let w=p-1;w>=0;w--)(r[w].description.includes(`Fix ${h} in ${u.id}`)||r[w].description.includes(`Fix failure in ${u.id}`))&&g++;if(m&&(m.description.includes(h)||g>1)){let w=this.getAlternativeStrategy(h,g);if(w)a+=` Loop detected (Attempt ${g}). Switching to alternative strategy: ${w}.`,f=`Fix ${h} (Alt: ${w}) in ${u.id}`;else return a+=" Loop detected! No more strategies available. Escalating to manual review.",i="stop",this.createOutput("success",{updatedPlan:r,nextTaskId:o,action:i,reasoning:a,changes:c},1,e)}let y=`fix_${be().slice(0,8)}`,v={id:y,description:f,status:"pending",dependencies:u.dependencies,type:"code",complexity:"simple",assignedAgent:"CodeGenerator",createdAt:Date.now()};r.splice(p,0,v),u.status="pending",u.dependencies=[y],u.retryCount=(u.retryCount??0)+1,c.push(`Added fix task ${y}: ${f} (retry #${u.retryCount})`),i="retry"}}}let l=r.filter(p=>p.status==="pending");if(l.length===0)r.some(u=>u.status==="failed")?(i="stop",a+=" No more pending tasks, but failures exist."):(i="completed",a+=" All tasks completed successfully.");else{let p=l.filter(u=>u.dependencies.length===0?!0:u.dependencies.every(h=>r.find(f=>f.id===h)?.status==="completed"));p.length>0?(o=p[0].id,i!=="retry"&&(i="continue"),a+=` Next task: ${p[0].description}`):(i="stop",a+=" Stalled: Pending tasks exist but dependencies are not met (likely upstream failure).")}return this.createOutput("success",{updatedPlan:r,nextTaskId:o,action:i,reasoning:a,changes:c},1,e)}analyzeError(n){let e=n.toLowerCase();return e.includes("module not found")||e.includes("modulenotfound")||e.includes("import error")||e.includes("importerror")?"missing dependencies":e.includes("syntaxerror")||e.includes("unexpected token")?"syntax error":e.includes("referenceerror")||e.includes("not defined")?"undefined variable":e.includes("typeerror")?"type mismatch":e.includes("timeout")?"performance issue":e.includes("permission denied")||e.includes("eacces")?"permission issue":e.includes("enoent")||e.includes("no such file")?"missing file":"general error"}};var _e=class extends E{constructor(){super({name:"Architect",timeout:45e3}),this.client=new O,this.personaManager=new U}async execute(n){let e=Date.now(),s=`
${this.personaManager.getPersona("SystemArchitect").systemPrompt}

User Request: "${n.query}"
Project Type: ${n.projectType||"Generic"}
Existing Files: ${(n.existingFiles||[]).join(", ")}

Design a software architecture for this request.
1. Choose the best architecture pattern (e.g., MVC, Layered, Component-Based, Microservices).
2. Define the file structure (new files to create).
3. Identify key components and their responsibilities.
4. Define core Data Models (entities, schemas) with fields and relationships.
5. Define key API Endpoints (if applicable) with methods and paths.
6. Recommend design patterns.

Output ONLY a JSON object with this structure:
{
  "architecture": "Name of architecture",
  "techStack": ["List", "of", "technologies"],
  "fileStructure": ["path/to/file1.ts", "path/to/file2.ts"],
  "components": [
    { "name": "Component Name", "description": "What it does", "responsibilities": ["Task 1", "Task 2"] }
  ],
  "dataModels": [
    { "name": "User", "fields": ["id: string", "email: string"], "relationships": ["HasMany Orders"] }
  ],
  "apiEndpoints": [
    { "method": "GET", "path": "/api/users", "description": "List users" }
  ],
  "designPatterns": ["Pattern 1", "Pattern 2"]
}
`;try{let r=await this.client.generateResponse(s),i=this.parseResponse(r);return this.createOutput("success",i,1,e,{reasoning:`Generated ${i.architecture} architecture with ${i.fileStructure.length} files based on deep analysis.`})}catch(r){console.error("Architect Agent failed:",r);let i=this.getGenericDesign();return this.createOutput("partial",i,.5,e,{reasoning:"LLM failed, reverted to generic design."})}}parseResponse(n){try{let e=n.match(/\{[\s\S]*\}/),t=e?e[0]:n;return JSON.parse(t)}catch{throw new Error("Failed to parse Architect JSON response")}}getGenericDesign(){return{architecture:"Modular Monolith",techStack:["TypeScript","Node.js"],fileStructure:["src/index.ts","src/utils.ts"],components:[{name:"Core",description:"Main logic",responsibilities:["Processing"]}],dataModels:[],designPatterns:["Module Pattern"]}}};var Ie=class extends E{constructor(){super({name:"QA",timeout:3e4}),this.client=new O}async execute(n){let e=Date.now();if(!n.implementedFiles||n.implementedFiles.length===0)return this.createOutput("failed",{passed:!1,issues:[{severity:"critical",description:"No files were implemented.",recommendation:"Check CodeGenerator output."}],verificationSteps:[],codeQualityScore:0},0,e);let t=`
You are a Lead QA Engineer.
Original Requirements: "${n.originalRequirements}"
Implemented Files: ${n.implementedFiles.join(", ")}
Test Results: ${n.testResults?n.testResults.passed?"PASSED":"FAILED":"NOT RUN"}
Test Output: ${n.testResults?.output||"N/A"}

Analyze the implementation status.
1. If tests failed, analyze the error output and pinpoint the cause.
2. If tests passed (or weren't run), verify if the requirements are met based on file names and structure.
3. Provide specific actionable recommendations.

Output ONLY a JSON object:
{
  "passed": boolean,
  "issues": [
    { "severity": "critical"|"major"|"minor", "description": "What is wrong", "recommendation": "How to fix it", "location": "file:line" }
  ],
  "verificationSteps": ["Step 1", "Step 2"],
  "codeQualityScore": number (0-100),
  "suggestedFixes": [ { "filePath": "path", "modification": "description of fix" } ]
}
`;try{let s=await this.client.generateResponse(t),r=this.parseResponse(s);return n.testResults&&!n.testResults.passed&&(r.passed=!1),this.createOutput(r.passed?"success":"failed",r,1,e,{reasoning:r.passed?"QA checks passed.":`Found ${r.issues.length} issues.`})}catch(s){return console.error("QA Agent failed:",s),this.createOutput("partial",{passed:n.testResults?.passed??!1,issues:[{severity:"minor",description:"LLM analysis failed, relying on test results.",recommendation:"Check logs."}],verificationSteps:["Manual Review"],codeQualityScore:50},.5,e)}}parseResponse(n){try{let e=n.match(/\{[\s\S]*\}/),t=e?e[0]:n;return JSON.parse(t)}catch{throw new Error("Failed to parse QA JSON response")}}};var Nn=S(require("child_process")),Bn=S(require("util")),Ti=Bn.promisify(Nn.exec),Lt=class extends E{constructor(){super({name:"WebSearch",timeout:45e3})}async execute(n){let e=Date.now(),t=n.query,s;try{switch(this.determineStrategy(n)){case"cheat.sh":s=await this.searchCheatSh(t);break;case"npm":s=await this.searchNpm(t);break;case"pip":s=await this.searchPip(t);break;case"wikipedia":s=await this.searchWikipedia(t);break;default:s=await this.searchGeneral(t);break}return this.createOutput("success",s,.85,e,{reasoning:`Executed web search via ${s.source} using command: ${s.commandUsed}`})}catch(r){return this.createOutput("failed",{source:"error",content:`Failed to perform web search: ${r.message}. 
Tip: Ensure you have internet access and standard tools (curl, npm) installed.`,commandUsed:"unknown"},0,e)}}async execCommand(n){return Ti(n,{maxBuffer:5*1024*1024,timeout:3e4})}determineStrategy(n){let e=n.query.toLowerCase(),t=e.replace(/search|web|for|find|look|up|check/g,"").trim();if(e.includes("npm")||n.type==="package"&&!e.includes("pip"))return"npm";if(e.includes("pip")||n.type==="package"&&e.includes("python"))return"pip";let s=["how to","code","example","syntax","hook","api","function","method","class","react","vue","angular","node","python","java","javascript","typescript","cpp","c++","go","rust","ruby","php","sql","shell","bash","linux"];return e.startsWith("what is")||e.startsWith("who")||e.startsWith("define")||e.includes("history of")||e.includes("meaning of")?"wikipedia":s.some(r=>e.includes(r))||n.type==="code"?"cheat.sh":"curl"}async searchWikipedia(n){let e=n.replace(/what is|who is|define|history of|meaning of/g,"").trim(),t=`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(e)}&format=json`;try{let{stdout:s}=await this.execCommand(`curl -sL "${t}"`),r=JSON.parse(s);if(!r.query?.search?.length)throw new Error("No Wikipedia results found");let o=r.query.search[0].pageid,a=`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${o}&format=json`,{stdout:c}=await this.execCommand(`curl -sL "${a}"`),p=JSON.parse(c).query?.pages?.[o];if(!p)throw new Error("Failed to fetch page content");return{source:"wikipedia",content:`Title: ${p.title}

${p.extract}`,url:`https://en.wikipedia.org/?curid=${o}`,commandUsed:`curl "${t}"`}}catch(s){return{source:"wikipedia (search)",content:`Search failed to get full article. ${s.message}`,commandUsed:"curl wikipedia"}}}async searchCheatSh(n){let e=["python","javascript","typescript","java","cpp","c","go","rust","ruby","php","bash","shell","sql","html","css","lua","scala","swift","kotlin","react","node","angular","vue","flutter","django","flask","spring"],t=n.toLowerCase().replace(/[^\w\s]/g,"").split(/\s+/),s=t.find(l=>e.includes(l)),r=["how","to","in","get","code","for","example","show","me","search","web","find","make","create","usage","using","with"],o=t.filter(l=>l!==s&&!r.includes(l)).join("+");s||(s="");let a=s?o?`${s}/${o}`:s:o;if(!a)return this.searchGeneral(n);let c=`curl -sL "https://cheat.sh/${a}?T"`;try{let{stdout:l}=await this.execCommand(c);if(!l||l.includes("Unknown topic")||l.includes("Unknown cheat sheet")||l.includes("404 NOT FOUND")||l.includes("Internal Server Error")||l.length<50){if(s&&o){let p=`curl -sL "https://cheat.sh/${s}?T"`,{stdout:u}=await this.execCommand(p);if(u&&!u.includes("Internal Server Error")&&!u.includes("Unknown topic"))return{source:"cheat.sh",content:`Specific topic '${o}' not found. Here is the general cheat sheet for ${s}:

${u.slice(0,3e3)}`,url:`https://cheat.sh/${s}`,commandUsed:p}}return this.searchGeneral(n)}return{source:"cheat.sh",content:l.slice(0,3e3),url:`https://cheat.sh/${a}`,commandUsed:c}}catch{throw new Error("Cheat.sh lookup failed")}}async searchNpm(n){let t=n.replace(/npm|install|package|info|search|about/g,"").trim().split(" ")[0];if(!t)throw new Error("No package name found");let s=`npm view ${t} name description keywords repository.url homepage --json`;try{let{stdout:r}=await this.execCommand(s),i=JSON.parse(r);return{source:"npm",content:`Package: ${i.name}
Description: ${i.description}
Keywords: ${i.keywords?.join(", ")}
Repo: ${i.repository?.url}
Homepage: ${i.homepage}`,url:`https://www.npmjs.com/package/${t}`,commandUsed:s}}catch{let i=`npm search ${t} --json --limit 3`,{stdout:o}=await this.execCommand(i);return{source:"npm search",content:`Search Results:
${o}`,commandUsed:i}}}async searchPip(n){let s=`curl -sL "https://pypi.org/pypi/${n.replace(/pip|install|python|package|info|search/g,"").trim().split(" ")[0]}/json"`;try{let{stdout:r}=await this.execCommand(s),o=JSON.parse(r).info;return{source:"pypi",content:`Package: ${o.name}
Summary: ${o.summary}
Home: ${o.home_page}
Author: ${o.author}`,url:o.package_url,commandUsed:s}}catch{throw new Error("PyPI lookup failed")}}async searchGeneral(n){if(/^https?:\/\//.test(n))try{let e=`curl -sL -A "Mozilla/5.0" "${n}" | head -n 500`,{stdout:t}=await this.execCommand(e);return{source:"curl",content:t.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,3e3)||"No text content found",url:n,commandUsed:e}}catch(e){return{source:"curl",content:`Failed to fetch URL: ${e.message}`,commandUsed:`curl ${n}`}}try{let{stdout:e}=await this.execCommand("which ddgr");if(e){let t=`ddgr --json --num 3 "${n}"`,{stdout:s}=await this.execCommand(t);return{source:"ddgr",content:s,commandUsed:t}}}catch{}try{let e=n.replace(/\s+/g,"+"),t=`curl -sL "https://cheat.sh/~${e}?T"`,{stdout:s}=await this.execCommand(t);if(s&&!s.includes("Unknown topic")&&!s.includes("Internal Server Error")&&s.length>50)return{source:"cheat.sh (search)",content:s.slice(0,3e3),url:`https://cheat.sh/~${e}`,commandUsed:t}}catch{}try{let e=await this.searchWikipedia(n);if(!e.content.includes("Search failed")&&!e.content.includes("No Wikipedia results"))return e}catch{}if(/^[a-z0-9-]+$/.test(n.trim())&&n.trim().length<30)try{let e=await this.searchNpm(n);if(e.source==="npm")return e}catch{}return{source:"system",content:`No terminal-based search tool found (ddgr) and cheat.sh search failed.

Suggested actions:
1. Install 'ddgr' (DuckDuckGo CLI) for full web search capabilities.
2. Use specific keywords like 'npm <pkg>' or 'python <topic>'.

Command to open browser:
open "https://www.google.com/search?q=${encodeURIComponent(n)}"`,commandUsed:"check_capabilities"}}};var et=class{constructor(){this.agents=new Map;this.intentAnalyzer=new he,this.fileFinder=new Ne,this.contextPlanner=new _t,this.contextAnalyzer=new Je,this.contextSearch=new le,this.filePartSearcher=new Be,this.processPlanner=new It,this.codePlanner=new Mt,this.taskPlanner=new Ce,this.versionController=new Se,this.commandGenerator=new Rt,this.codeGenerator=new Pe,this.codeModifier=new Ee,this.executor=new Ae,this.docWriter=new Ue,this.todoManager=new Ot,this.architect=new _e,this.qualityAssurance=new Ie,this.webSearch=new Lt,this.agents.set("IntentAnalyzer",this.intentAnalyzer),this.agents.set("FileSearch",this.fileFinder),this.agents.set("ContextPlanner",this.contextPlanner),this.agents.set("ContextAnalyzer",this.contextAnalyzer),this.agents.set("ContextSearch",this.contextSearch),this.agents.set("FilePartSearcher",this.filePartSearcher),this.agents.set("WebSearch",this.webSearch),this.agents.set("ProcessPlanner",this.processPlanner),this.agents.set("CodePlanner",this.codePlanner),this.agents.set("TaskPlanner",this.taskPlanner),this.agents.set("VersionController",this.versionController),this.agents.set("CommandGenerator",this.commandGenerator),this.agents.set("CodeGenerator",this.codeGenerator),this.agents.set("CodeModifier",this.codeModifier),this.agents.set("Executor",this.executor),this.agents.set("DocWriter",this.docWriter),this.agents.set("TodoManager",this.todoManager),this.agents.set("Architect",this.architect),this.agents.set("QualityAssurance",this.qualityAssurance),this.agents.set("ContentRetriever",{name:"ContentRetriever"})}async execute(n,e,t,s,r){let i={query:e,activeFilePath:t,selectionText:s,decision:n,results:new Map,checkpoints:[],startTime:Date.now(),currentPlan:void 0},o=n.pipeline.length,a=0,l=[...this.groupSteps(n.pipeline)];for(;l.length>0;){let h=l.shift();if(h.forEach(g=>this.updatePlanStatus(i,g.agent,"in_progress")),this.emitStatus(r,{phase:this.getPhaseForAgent(h[0].agent),currentAgent:h.map(g=>g.agent).join(", "),progress:Math.round(a/o*100),message:h.length>1?`Running parallel agents: ${h.map(g=>g.agent).join(", ")}`:`Running ${h[0].agent}...`,isComplete:!1,hasError:!1,plan:i.currentPlan,activeTaskId:this.getActiveTaskId(i,h[0].agent)}),h.length===1?await this.executeStep(h[0],i):await Promise.all(h.map(g=>this.executeStep(g,i))),h.some(g=>g.agent==="QualityAssurance")){let g=i.results.get("QualityAssurance");if(g&&g.status==="success"&&g.payload&&!g.payload.passed){let y=i.retryCount||0;if(y<3){i.retryCount=y+1;let v=(g.payload.issues||[]).map(C=>C.description).join("; ");this.emitStatus(r,{phase:"Quality Assurance",currentAgent:"QualityAssurance",progress:Math.round(a/o*100),message:`QA Failed. Planning recovery (Attempt ${y+1}/3)... Issues: ${v}`,isComplete:!1,hasError:!1,plan:i.currentPlan,activeTaskId:this.getActiveTaskId(i,"QualityAssurance")});let w={query:`Fix these QA issues in the code: ${v}. Original Request: ${i.query}`,projectType:"recovery",fileStructure:[],interfaces:[],activeFilePath:i.activeFilePath},k=await this.taskPlanner.execute(w);if(k.status==="success"&&k.payload.taskGraph.length>0){let C=k.payload.taskGraph,P=[],T=900+y*10;P.push({step:T++,agent:"CodeGenerator",parallel:!1,args:{taskPlan:k.payload,codePlan:i.results.get("CodePlanner")?.payload||{fileStructure:[],interfaces:[]},context:{knowledge:[{summary:`QA Issues to Fix: ${v}`,relevance:1}]}}}),P.push({step:T++,agent:"Executor",parallel:!1,args:{runTests:!0}}),P.push({step:T++,agent:"QualityAssurance",parallel:!1,args:{originalRequirements:i.query}}),l.unshift(...P.map(b=>[b])),this.emitStatus(r,{phase:"Planning",currentAgent:"TaskPlanner",progress:Math.round(a/o*100),message:`Generated ${C.length} recovery tasks`,isComplete:!1,hasError:!1})}else{let C={step:900+y*3,agent:"CodeGenerator",parallel:!1,args:{taskPlan:{taskGraph:[{id:`fix-retry-${y}`,description:`Fix QA issues: ${v}`,dependencies:[],status:"pending",filePath:i.activeFilePath,persona:"QAEngineer"}],executionOrder:[]},codePlan:i.results.get("CodePlanner")?.payload||{fileStructure:[],interfaces:[]},context:{knowledge:[{summary:`Fix QA Issues: ${v}`,relevance:1}]}}},P={step:900+y*3+1,agent:"Executor",parallel:!1,args:{runTests:!0}},T={step:900+y*3+2,agent:"QualityAssurance",parallel:!1,args:{originalRequirements:i.query}};l.unshift([C],[P],[T])}}else this.emitStatus(r,{phase:"Quality Assurance",currentAgent:"QualityAssurance",progress:Math.round(a/o*100),message:"QA Failed. Max retries reached. Stopping.",isComplete:!1,hasError:!0})}}let m=h.map(g=>i.results.get(g.agent)),f=h.find(g=>i.results.get(g.agent)?.status==="failed");if(f){let g=i.results.get(f.agent);if(this.updatePlanStatus(i,f.agent,"failed"),this.emitStatus(r,{phase:"Error",currentAgent:f.agent,progress:Math.round(a/o*100),message:`Pipeline error: ${g?.error?.message||"Unknown error"}. Attempting recovery...`,isComplete:!1,hasError:!0,plan:i.currentPlan,activeTaskId:this.getActiveTaskId(i,f.agent)}),i.currentPlan){let y=this.getTaskIndexForAgent(f.agent);if(y>=0){let v={id:`recovery-${Date.now()}`,description:`Fix issues from ${f.agent} failure: ${g?.error?.message}`,dependencies:[i.currentPlan[y].id],status:"pending",type:"code",assignedAgent:"CodeGenerator",reasoning:"Self-correction triggered by pipeline failure",successCriteria:["Error is resolved","Pipeline execution continues"]};i.currentPlan.splice(y+1,0,v);let w={step:999,agent:"CodeGenerator",parallel:!1,args:{taskPlan:{taskGraph:[v],executionOrder:[v.id],validationCommands:[],criticalPath:[]},context:{knowledge:[{summary:`Previous Error: ${g?.error?.message}`,relevance:1}]}}},k={step:1e3,agent:"Executor",parallel:!1,args:{runTests:!0}};l.unshift([w],[k]),this.emitStatus(r,{phase:"Planning",currentAgent:"TaskPlanner",progress:Math.round(a/o*100),message:"Added recovery task to plan and injected steps",isComplete:!1,hasError:!1,plan:i.currentPlan});continue}}this.emitStatus(r,{phase:"Error",currentAgent:f.agent,progress:Math.round(a/o*100),message:`Pipeline stopped: ${g?.error?.message||"Unknown error"}`,isComplete:!1,hasError:!0});break}if(h.forEach(g=>this.updatePlanStatus(i,g.agent,"completed")),i.results.has("TaskPlanner")){let g=i.results.get("TaskPlanner")?.payload;g&&g.taskGraph&&(i.currentPlan=g.taskGraph,this.retroactivePlanUpdate(i),this.emitStatus(r,{phase:"Planning",currentAgent:"TaskPlanner",progress:Math.round((a+1)/o*100),message:"Implementation plan generated",isComplete:!1,hasError:!1,plan:i.currentPlan}))}a+=h.length}let p="";if(i.results.has("ContextAnalyzer")){let h=i.results.get("ContextAnalyzer")?.payload;p=h?h.summary:await this.buildContext(i)}else p=await this.buildContext(i);let u=this.buildDebugSummary(i);return this.emitStatus(r,{phase:"Complete",currentAgent:"",progress:100,message:"Pipeline execution complete",isComplete:!0,hasError:!1,plan:i.currentPlan}),{context:p,results:i.results,debugSummary:u}}async search(n,e,t){let s=h=>{t?.(h.phase,h.message)},r=Date.now();this.emitStatus(s,{phase:"Planning",currentAgent:"ContextPlanner",progress:10,message:"Thought: Analyzing query to determine context strategy...",isComplete:!1,hasError:!1});let i=this.contextPlanner.analyze(n,e);this.emitStatus(s,{phase:"Discovery",currentAgent:"FileSearch",progress:30,message:`Thought: Strategy determined. Searching for files (Scope: ${i.scope})...`,isComplete:!1,hasError:!1});let o={originalQuery:n,confidence:1,keywords:i.searchTerms,queryType:Ai(i.scope),codeTerms:[],filePatterns:i.filePatterns,complexity:"simple",mentionedFiles:[],symbols:i.symbolSearch},c=(await this.fileFinder.find(o,e)||[]).filter(h=>i.filePatterns.length===0?!0:i.filePatterns.some(m=>h.uri.fsPath.endsWith(m.replace("*",""))));if(c.length===0)return"No relevant files found. Please try clarifying your request.";this.emitStatus(s,{phase:"Analysis",currentAgent:"ContextAnalyzer",progress:60,message:`Thought: Analyzing ${c.length} files for relevance...`,isComplete:!1,hasError:!1});let p=(await Promise.all(c.map(async h=>{try{let m=await K.workspace.openTextDocument(h.uri);return{uri:h.uri,relativePath:h.relativePath,content:m.getText(),languageId:m.languageId}}catch{return null}}))).filter(h=>h!==null),u=this.contextAnalyzer.analyze(p,i.searchTerms,i.symbolSearch,2e4);return this.emitStatus(s,{phase:"Complete",currentAgent:"",progress:100,message:"Context ready",isComplete:!0,hasError:!1}),u.summary}groupSteps(n){let e=[],t=[];for(let s of n)s.parallel&&t.length>0&&t[0].parallel?s.dependency!==void 0&&this.isDependencyInGroup(s.dependency,t)?(e.push(t),t=[s]):t.push(s):(t.length>0&&e.push(t),t=[s]);return t.length>0&&e.push(t),e}isDependencyInGroup(n,e){return e.some(t=>t.step===n)}async executeStep(n,e){let t=this.agents.get(n.agent);if(!t){e.results.set(n.agent,{agent:n.agent,status:"partial",confidence:0,executionTimeMs:0,payload:null,reasoning:`Agent ${n.agent} not yet implemented`});return}let s=0,r=n.agent==="Executor"||n.agent==="CodeModifier"?0:2;for(;s<=r;)try{let i=Date.now(),o;switch(n.agent){case"ContextPlanner":o=this.contextPlanner.analyze(e.query,e.activeFilePath);break;case"WebSearch":let a=await this.webSearch.execute({query:n.args?.query||e.query});if(o=a.status==="success"?a.payload:null,a.status==="failed")throw new Error(a.error?.message||"Web search failed");break;case"ContextAnalyzer":{if(n.args?.contextType==="web_search_results"){let X=e.results.get("WebSearch")?.payload;X&&X.content?o={summary:`### \u{1F310} Web Search Results
**Source:** ${X.source}
**Command:** \`${X.commandUsed}\`

${X.content}`,chunks:[],totalFiles:0,totalChunks:1,tokensEstimate:Math.ceil(X.content.length/4)}:o={summary:"No web search results available or content is empty.",chunks:[],totalFiles:0,totalChunks:0,tokensEstimate:0};break}let A=e.results.get("FileSearch")?.payload||[];if(A.length===0){o={summary:"No files to analyze",chunks:[]};break}let j=(await Promise.all(A.map(async X=>{try{let gs=await K.workspace.openTextDocument(X.uri);return{uri:X.uri,content:gs.getText()}}catch{return null}}))).filter(X=>X!==null),ge=e.results.get("ContextPlanner")?.payload,ms=e.results.get("IntentAnalyzer")?.payload,Yn=ge?.searchTerms||ms?.keywords||[],Qn=ge?.symbolSearch||ms?.symbols||[];o=this.contextAnalyzer.analyze(j,Yn,Qn,2e4);break}case"ContextSearch":let c=await this.contextSearch.execute({query:e.query,lookForPreviousFixes:n.args?.lookForPreviousFixes});o=c.status==="success"?c.payload:null;break;case"FilePartSearcher":let l=e.results.get("FileSearch")?.payload||[],p=e.activeFilePath;if(p){let A=await this.filePartSearcher.execute({filePath:p,searchFor:{text:e.query}});o=A.status==="success"?A.payload:null}else if(l.length>0){let A=l.slice(0,5);o=(await Promise.all(A.map(j=>this.filePartSearcher.execute({filePath:j.uri.fsPath,searchFor:{text:e.query}})))).flatMap(j=>j.status==="success"&&j.payload?j.payload:[])}else o=[];break;case"IntentAnalyzer":o=this.intentAnalyzer.analyze(e.query);break;case"FileSearch":let u=e.results.get("IntentAnalyzer")?.payload||this.intentAnalyzer.analyze(e.query);o=await this.fileFinder.find(u,e.activeFilePath);break;case"ProcessPlanner":let h=e.results.get("ContextSearch")?.payload,m=await this.processPlanner.execute({query:e.query,projectType:n.args?.projectType,contextKnowledge:h?.memories?.filter(A=>A.type==="knowledge")||[]});o=m.status==="success"?m.payload:null;break;case"CodePlanner":let f=e.results.get("ProcessPlanner")?.payload,y=(e.results.get("FileSearch")?.payload||[]).map(A=>A.relativePath),v=e.results.get("ContextAnalyzer")?.payload,w=e.results.get("ContextSearch")?.payload,k=e.results.get("Architect")?.payload,C=await this.codePlanner.execute({query:e.query,projectType:f?.projectType||n.args?.projectType||"web",existingFiles:y,contextAnalysis:v,contextKnowledge:w?.memories?.filter(A=>A.type==="knowledge")||[],techStack:f?.techStack,architecture:k});o=C.status==="success"?C.payload:null;break;case"TaskPlanner":let P=e.results.get("CodePlanner")?.payload,T=await this.taskPlanner.execute({query:e.query,projectType:n.args?.projectType||"web",fileStructure:P?.fileStructure||[],interfaces:P?.interfaces||[],apiEndpoints:P?.apiEndpoints,activeFilePath:e.activeFilePath});o=T.status==="success"?T.payload:null;break;case"VersionController":let b=await this.versionController.execute({action:n.args?.action||"create_checkpoint",description:"Pipeline execution checkpoint"});o=b.status==="success"?b.payload:null;break;case"CommandGenerator":let M=e.results.get("TaskPlanner")?.payload,W=e.results.get("CodeGenerator")?.payload,de=n.args?.context||e.query;W?.generatedFiles?.length&&(de+=`
[System Notification] The following files were just created/modified: ${W.generatedFiles.join(", ")}. Ensure commands target them correctly.`);let as=await this.commandGenerator.execute({taskPlan:M,generateStructure:n.args?.generateStructure,workspaceRoot:K.workspace.workspaceFolders?.[0]?.uri.fsPath,context:de});o=as.status==="success"?as.payload:null;break;case"CodeGenerator":let Un=e.results.get("TaskPlanner")?.payload,Wn=e.results.get("CodePlanner")?.payload,Gn=e.results.get("ContextSearch")?.payload,cs=e.results.get("WebSearch"),qn=e.results.get("FileSearch")?.payload,ls=await this.codeGenerator.execute({taskPlan:Un,codePlan:Wn,activeFilePath:e.activeFilePath,context:{knowledge:Gn?.memories?.filter(A=>A.type==="knowledge")||[],webSearch:cs?{payload:cs.payload}:void 0,files:qn}});o=ls.status==="success"?ls.payload:null;break;case"CodeModifier":let Hn=e.results.get("CodeGenerator")?.payload?.modifications||[],ds=await this.codeModifier.execute({modifications:Hn,createCheckpoint:!1,ignoreSyntaxErrors:!0});o=ds.status==="success"?ds.payload:null;break;case"Executor":if(e.currentPlan&&e.currentPlan.length>0&&(e.decision.complexity==="complex"||e.decision.complexity==="medium")){await this.executeDynamicLoop(e);let A=e.results.get("Executor")?.payload;A?o=A:o={success:!0,message:"Dynamic execution completed"}}else{let A=[];if(n.args?.commands)A=n.args.commands;else{let j=e.results.get("CommandGenerator")?.payload,ge=e.results.get("CodeGenerator")?.payload;A=[...j?.commands||[],...ge?.commands||[]]}let L=await this.executor.execute({commands:A,cwd:K.workspace.workspaceFolders?.[0].uri.fsPath,runTests:n.args?.runTests});o=L.status==="success"?L.payload:null}break;case"Architect":let ps=await this.architect.execute({query:e.query,projectType:n.args?.projectType,existingFiles:e.results.get("FileSearch")?.payload?.map(A=>A.relativePath)||[]});o=ps.status==="success"?ps.payload:null;break;case"QualityAssurance":let Vn=e.results.get("TaskPlanner")?.payload?.tasks?.map(A=>A.file)||[],nt=e.results.get("Executor")?.payload,us=await this.qualityAssurance.execute({originalRequirements:n.args?.originalRequirements||e.query,implementedFiles:Vn,testResults:nt?{passed:nt.success,output:nt.output||nt.stdout||""}:void 0});o=us.status==="success"?us.payload:null;break;case"DocWriter":let hs=await this.docWriter.execute({context:Object.fromEntries(e.results)});o=hs.status==="success"?hs.payload:null;break;case"ContentRetriever":let rt="";if(e.activeFilePath){let A=K.workspace.workspaceFolders?.[0]?.uri;if(A)try{let L=K.Uri.joinPath(A,e.activeFilePath),j=await K.workspace.openTextDocument(L);rt=`File: ${e.activeFilePath} (FULL CONTENT)
\`\`\`${j.languageId}
${j.getText()}
\`\`\``}catch{}}if(!rt){let A=e.results.get("IntentAnalyzer")?.payload||this.intentAnalyzer.analyze(e.query),L=await this.fileFinder.find(A,e.activeFilePath);if(L&&L.length>0){let j=L[0],ge=await K.workspace.openTextDocument(j.uri);rt=`File: ${j.relativePath} (FULL CONTENT)
\`\`\`${ge.languageId}
${ge.getText()}
\`\`\``}}o=rt||"Could not retrieve full content. Please specify a valid file.";break;default:if(t&&typeof t.execute=="function"){let A=n.args||{query:e.query},L=await t.execute(A);if(L&&L.status==="failed"&&L.error)throw new Error(L.error.message);o=L.status==="success"?L.payload:null}else o=null;break}e.results.set(n.agent,{agent:n.agent,status:"success",confidence:.9,executionTimeMs:Date.now()-i,payload:o});return}catch(i){s++,s>r?e.results.set(n.agent,{agent:n.agent,status:"failed",confidence:0,executionTimeMs:0,payload:null,error:{type:i.name,message:i.message}}):await new Promise(o=>setTimeout(o,1e3*Math.pow(2,s-1)))}}async executeDynamicLoop(n){let e,t,s=0,r=20;for(;s<r;){let i={currentPlan:n.currentPlan,lastTaskResult:t?{taskId:t,success:e?.success??!1,result:e,error:e?.stderr}:void 0},o=await this.todoManager.execute(i);if(n.currentPlan=o.payload.updatedPlan,o.payload.action==="completed"||o.payload.action==="stop")break;let a=o.payload.nextTaskId;if(!a)break;let c=n.currentPlan.find(y=>y.id===a);if(!c)break;t=a,c.status="in_progress";let l={taskGraph:[c],executionOrder:[c.id],validationCommands:[],criticalPath:[]},p=n.results.get("CodePlanner")?.payload,u=n.results.get("ContextSearch")?.payload,h=n.results.get("WebSearch"),m=await this.codeGenerator.execute({taskPlan:l,codePlan:p||{projectType:"script",existingFiles:[],techStack:[]},context:{knowledge:u?.memories?.filter(y=>y.type==="knowledge")||[],webSearch:h}}),f=await this.commandGenerator.execute({taskPlan:l}),g=[...m.payload.commands||[],...f.payload.commands||[]];m.payload.modifications&&m.payload.modifications.length>0&&await this.codeModifier.execute({modifications:m.payload.modifications,createCheckpoint:!1}),g.length>0?e=(await this.executor.execute({commands:g,cwd:K.workspace.workspaceFolders?.[0]?.uri.fsPath,expectSuccess:!1})).payload:e={success:!0,stdout:"No specific commands generated for this task.",stderr:"",command:"noop",exitCode:0},s++}}async buildContext(n){let e="";if(n.results.has("ContentRetriever")){let t=n.results.get("ContentRetriever")?.payload;e+=`
### \u{1F4D6} Full Content
${t}
`}if(n.results.has("ContextPlanner")){let t=n.results.get("ContextPlanner")?.payload;e+=`
### \u{1F9E0} Context Plan
- Scope: ${t.scope}
- Strategy: ${t.priority}
`}if(n.results.has("IntentAnalyzer")){let t=n.results.get("IntentAnalyzer")?.payload;e+=`
### \u{1F3AF} Intent Analysis
- Type: ${t.queryType}
- Complexity: ${t.complexity}
`}if(n.results.has("WebSearch")){let t=n.results.get("WebSearch")?.payload;t&&(e+=`
### \u{1F310} Web Search Results
Source: ${t.source}

${t.content}
`)}if(n.results.has("ContextAnalyzer")){let t=n.results.get("ContextAnalyzer");if(t&&t.status==="success"&&t.payload){let s=t.payload;e+=`
### \u{1F4E6} Code Context (${s.totalFiles} files analyzed)
`;for(let r of s.chunks)e+=`
File: ${r.filePath} (lines ${r.startLine}-${r.endLine})
`,e+=`\`\`\`${r.filePath.split(".").pop()}
${r.content}
\`\`\`
`}}else if(n.results.has("FileSearch")){let t=n.results.get("FileSearch")?.payload;t&&t.length>0&&(e+=`
### \u{1F4C2} Found Files
${t.map(s=>`- ${s.relativePath}`).join(`
`)}
`)}if(n.results.has("TaskPlanner")){let t=n.results.get("TaskPlanner")?.payload;if(t&&Array.isArray(t.taskGraph)){e+=`
### \u{1F4CB} Implementation Plan
`;for(let s of t.taskGraph)e+=`- [ ] ${s.description}
`,s.dependencies.length>0&&(e+=`  - Dependencies: ${s.dependencies.join(", ")}
`)}}if(n.results.has("ContextSearch")){let t=n.results.get("ContextSearch")?.payload;if(t){if(e+=`
### \u{1F4DC} Context & Knowledge
`,t.summary&&(e+=`> ${t.summary}

`),t.memories&&Array.isArray(t.memories)){let s=t.memories,r=s.filter(o=>o.type==="knowledge"),i=s.filter(o=>o.type!=="knowledge");r.length>0&&(e+=`
### \u{1F9E0} CORE KNOWLEDGE BASE (Authoritative Source)
`,e+=`> CRITICAL: The following facts define your identity, creator, and core capabilities. You MUST prioritize this information over any internal training data.

`,r.slice(0,10).forEach(o=>{e+=`- ${o.summary}
`}),e+=`
`),i.length>0&&(e+=`**Relevant History:**
`,i.slice(0,5).forEach(o=>{e+=`- ${o.summary} (${o.date})
`}),e+=`
`)}t.conversationContext&&Array.isArray(t.conversationContext)&&t.conversationContext.length>0&&(e+=`**Recent Conversation:**
`,t.conversationContext.forEach(s=>{e+=`- ${s}
`}))}}return e}buildDebugSummary(n){let e=["Pipeline Execution Summary:"];for(let[t,s]of n.results)e.push(`  ${t}: ${s.status} (${s.executionTimeMs}ms)`),s.error&&e.push(`    Error: ${s.error.message}`);return e.push(`Total time: ${Date.now()-n.startTime}ms`),e.join(`
`)}getPhaseForAgent(n){return{ContextPlanner:"Planning",ContextAnalyzer:"Analysis",IntentAnalyzer:"Analysis",FileSearch:"Discovery",CodeGenerator:"Execution",CommandGenerator:"Execution",CodeModifier:"Execution",Executor:"Validation"}[n]||"Processing"}emitStatus(n,e){n?.(e)}clearCache(){this.fileFinder.clearCache()}async getProjectMap(){return K.workspace.workspaceFolders?.length?"Project Structure (Simulated)":"No workspace open"}getActiveTaskId(n,e){if(!n.currentPlan)return;let t=this.getTaskIndexForAgent(e);if(t>=0&&t<n.currentPlan.length)return n.currentPlan[t].id}updatePlanStatus(n,e,t){if(!n.currentPlan)return;let s=this.getTaskIndexForAgent(e);s>=0&&s<n.currentPlan.length&&(n.currentPlan[s].status=t)}retroactivePlanUpdate(n){n.currentPlan&&((n.results.has("ContextAnalyzer")||n.results.has("IntentAnalyzer"))&&this.updatePlanStatus(n,"ContextAnalyzer","completed"),this.updatePlanStatus(n,"TaskPlanner","completed"))}getTaskIndexForAgent(n){let e=n.toLowerCase();return["context","intent","filesearch","vision"].some(t=>e.includes(t))?0:["planner"].some(t=>e.includes(t))?1:["modify","generate","command"].some(t=>e.includes(t))?2:["executor","test","validate"].some(t=>e.includes(t))?3:-1}};function Ai(d){switch(d){case"workspace":return"general";case"folder":return"general";case"file":return"explain";case"minimal":return"general";default:return"general"}}var ee=S(require("vscode")),te=S(require("fs")),z=S(require("path"));var tt=class{constructor(n){this.context=n;this.currentAgentMode="build";this.currentContext={message:""};this.managerAgent=new me,this.executorAgent=new Ae,this.versionController=new Se(n),this.codeModifier=new Ee,this.codeGenerator=new Pe,this.taskPlanner=new Ce,this.contextSearch=new le(n),this.architect=new _e,this.qualityAssurance=new Ie,this.docWriter=new Ue,this.personaManager=new U,this.workspaceRoot=ee.workspace.workspaceFolders?.[0]?.uri.fsPath||""}async executeRequest(n,e){try{console.log("[AgentOrchestrator] Phase 0: Manager Analysis...");let t=await this.detectProjectType(),s={query:n,activeFilePath:e,projectType:t},r=await this.managerAgent.execute(s);r.status==="failed"&&console.warn("[AgentOrchestrator] Manager analysis failed, proceeding with default flow.");let i=r.payload;console.log(`[AgentOrchestrator] Manager Decision: ${i.intent} (${i.complexity})`),console.log("[AgentOrchestrator] Phase 1: Planning...");let o=await this.getFileStructure(),a;if(i.complexity==="complex"||i.intent==="Design"||i.intent==="Build"){console.log("[AgentOrchestrator] Phase 1.1: Architectural Design...");let m=await this.architect.execute({query:n,projectType:t,existingFiles:o});m.status==="success"&&m.payload&&(a=m.payload,console.log(`[AgentOrchestrator] Architecture designed: ${a.architecture}`))}else console.log("[AgentOrchestrator] Skipping Architecture phase for simple/direct task.");console.log("[AgentOrchestrator] Phase 1.2: Task Planning...");let c=await this.taskPlanner.execute({query:n,projectType:t,fileStructure:o,activeFilePath:e,interfaces:[],design:a});if(c.status!=="success"||!c.payload||c.payload.taskGraph.length===0)return`Failed to generate a valid plan. Error: ${c.error?.message||"Unknown planning error"}`;let l=c.payload.taskGraph,u=c.payload.executionOrder.map(m=>l.find(f=>f.id===m)).filter(m=>!!m),h=new Set(u.map(m=>m.id));return l.forEach(m=>{h.has(m.id)||u.push(m)}),console.log(`[AgentOrchestrator] Generated ${u.length} tasks.`),N.log("[AgentOrchestrator] Phase 2: Execution & Verification..."),await this.executeTaskGraph(u,n),"Request completed successfully."}catch(t){return console.error("[AgentOrchestrator] Execution failed:",t),`Execution failed: ${t instanceof Error?t.message:String(t)}`}}async executeTaskGraph(n,e){let t=new Set,s=new Map(n.map(i=>[i.id,i])),r=[...n];for(;r.length>0;){let i=r.filter(l=>l.dependencies.every(u=>t.has(u)));if(i.length===0){let l=r.map(p=>p.id).join(", ");throw new Error(`Deadlock detected or invalid dependencies. Pending tasks: ${l}`)}console.log(`[AgentOrchestrator] Executing batch of ${i.length} parallel tasks...`);let o=i.map(async l=>{console.log(`[AgentOrchestrator] Starting Task: ${l.description} (${l.assignedAgent})`);try{return await this.executeSingleTask(l,e),{taskId:l.id,success:!0}}catch(p){console.warn(`[AgentOrchestrator] Task failed: ${l.description}. Attempting recovery...`);try{if(await this.attemptRecovery(l,p,e))return{taskId:l.id,success:!0}}catch(u){console.error(`[AgentOrchestrator] Recovery failed for task ${l.id}:`,u)}return{taskId:l.id,success:!1,error:p}}}),a=await Promise.all(o),c=a.filter(l=>!l.success);if(c.length>0){let l=c.map(p=>p.error).join("; ");throw new Error(`Batch execution failed. Errors: ${l}`)}a.forEach(l=>t.add(l.taskId)),r=r.filter(l=>!t.has(l.id))}}async executeSingleTask(n,e){let t=n.assignedAgent||"Executor";if(t==="CodeGenerator"){let s={taskGraph:[n],executionOrder:[n.id],validationCommands:[],criticalPath:[]};await this.codeGenerator.execute({taskPlan:s,codePlan:{fileStructure:[],interfaces:[],dependencies:[],devDependencies:[],configFiles:[],folderPurposes:[]},context:{knowledge:[{summary:e,relevance:1}]}})}else if(t==="Executor"){let s=n.command||(n.type==="command"?n.description:null);if(s)await this.executorAgent.execute({command:s,cwd:this.workspaceRoot});else if(n.validationCommand)await this.executorAgent.execute({command:n.validationCommand,cwd:this.workspaceRoot});else throw new Error(`Task ${n.id} (Executor) has no command or validationCommand to run.`)}else if(t==="CodeModifier"){console.log(`[AgentOrchestrator] Redirecting CodeModifier task '${n.description}' to CodeGenerator for LLM-based implementation.`);let s={taskGraph:[n],executionOrder:[n.id],validationCommands:[],criticalPath:[]};await this.codeGenerator.execute({taskPlan:s,codePlan:{fileStructure:[],interfaces:[],dependencies:[],devDependencies:[],configFiles:[],folderPurposes:[]},context:{knowledge:[{summary:e,relevance:1}]}})}else if(t==="QualityAssurance"){console.log(`[AgentOrchestrator] Running Quality Assurance for task: ${n.id}`);let s={originalRequirements:e,implementedFiles:n.filePath?[n.filePath]:[]},r=await this.qualityAssurance.execute(s);if(r.status==="failed"||r.payload&&!r.payload.passed){let i=r.payload?.issues?.map(o=>`${o.severity}: ${o.description}`).join("; ")||"No specific issues reported";throw new Error(`QA Validation Failed: ${i}`)}}else if(t==="DocWriter"){console.log(`[AgentOrchestrator] Running DocWriter for task: ${n.id}`);let s={type:n.description.toLowerCase().includes("readme")?"readme":"inline_comments",content:e,filePath:n.filePath},r=await this.docWriter.execute(s);if(r.status==="success"&&r.payload.documentation){let i=n.filePath?z.resolve(this.workspaceRoot,n.filePath):null;if(i){if(["readme","changelog","api_reference","decision_record"].includes(s.type))try{te.writeFileSync(i,r.payload.documentation,"utf8"),console.log(`[AgentOrchestrator] Wrote documentation to ${i}`)}catch(o){throw new Error(`Failed to write documentation to ${i}: ${o.message}`)}else if(r.payload.insertLocation&&te.existsSync(i))try{let a=te.readFileSync(i,"utf8").split(`
`),c=r.payload.insertLocation.line-1;c>=0&&c<=a.length&&(a.splice(c,0,r.payload.documentation),te.writeFileSync(i,a.join(`
`),"utf8"),console.log(`[AgentOrchestrator] Inserted documentation into ${i} at line ${c+1}`))}catch(o){console.warn(`[AgentOrchestrator] Failed to insert inline docs: ${o.message}`)}}}}else{console.warn(`[AgentOrchestrator] Unknown agent: ${t}. Attempting execution via Executor as fallback.`);let s=n.command||(n.type==="command"?n.description:null);if(s)await this.executorAgent.execute({command:s,cwd:this.workspaceRoot});else throw new Error(`Task ${n.id} assigned to unknown agent '${t}' and has no executable command.`)}if(n.validationCommand){console.log(`[AgentOrchestrator] Verifying task with: ${n.validationCommand}`);let s=await this.executorAgent.execute({command:n.validationCommand,cwd:this.workspaceRoot});if(s.status==="failed"||s.payload&&s.payload.exitCode!==0)throw new Error(`Validation failed for task ${n.id}: ${s.payload?.stderr||"Unknown error"}`)}}async attemptRecovery(n,e,t){console.log(`[AgentOrchestrator] Analyzing failure for task: ${n.id}`);let s="";if(n.filePath){let o=z.resolve(this.workspaceRoot,n.filePath);if(te.existsSync(o))try{let a=te.readFileSync(o,"utf8"),c=a.length>2e3?a.substring(0,2e3)+"... (truncated)":a;s=`
Current content of ${n.filePath}:
\`\`\`
${c}
\`\`\`
`}catch(a){console.warn(`[AgentOrchestrator] Failed to read file for recovery context: ${a}`)}}let r=`Task '${n.description}' failed with error: ${e.message}.
Context: ${t}
${s}
Analyze the error and generate a recovery plan.`;console.log(`[AgentOrchestrator] Generating recovery plan for: ${n.id}`);let i=await this.taskPlanner.execute({query:r,projectType:"recovery",fileStructure:[],activeFilePath:n.filePath,interfaces:[]});if(i.status==="success"&&i.payload&&i.payload.taskGraph.length>0)try{return await this.executeTaskGraph(i.payload.taskGraph,t),!0}catch(o){return console.error("Recovery failed:",o),!1}return!1}setAgentMode(n){this.currentAgentMode=n}async clearAllData(){this.currentContext={message:""},await this.versionController.execute({action:"delete_session_checkpoints",sessionId:"current"})}setContextFromMessage(n,e){this.currentContext={message:n,filePath:e}}detectPersona(n,e){return this.personaManager.detectPersona(n,e)}parseAIResponse(n,e){let t=[],s=/<byte_action\s+([^>]+)>([\s\S]*?)<\/byte_action>/g,r;for(;(r=s.exec(n))!==null;){let[i,o,a]=r,c=h=>{let m=new RegExp(`${h}=["']([^"']+)["']`),f=o.match(m);return f?f[1]:null},l=c("type"),p=c("path"),u=c("command");if(l){let h=a?a.trim():"";h.startsWith("<![CDATA[")&&h.endsWith("]]>")&&(h=h.substring(9,h.length-3)),t.push({type:l,path:p||void 0,command:u||void 0,content:h,description:`${l} ${p||u||""}`})}}return t}async executeInstructions(n,e){if(this.currentAgentMode==="plan")return{success:!1,actions:[],summary:"Agent is in Plan Mode (Read-Only). Switch to Build Mode to execute actions."};let s=(await this.versionController.execute({action:"create_checkpoint",files:n.map(o=>o.path).filter(o=>!!o),description:"Before Agent Execution"})).payload?.checkpoint?.checkpointId,r=[],i=0;for(let o of n){e(`Executing: ${o.description}`);try{let a="",c=!1;switch(o.type){case"create_file":case"modify_file":if(o.path&&o.content){let p=ee.Uri.file(z.isAbsolute(o.path)?o.path:z.join(this.workspaceRoot,o.path));await ee.workspace.fs.createDirectory(ee.Uri.parse(z.dirname(p.fsPath))),await ee.workspace.fs.writeFile(p,Buffer.from(o.content)),a=`Successfully wrote to ${o.path}`,c=!0}else a="Missing path or content";break;case"create_folder":case"create_directory":if(o.path){let p=ee.Uri.file(z.isAbsolute(o.path)?o.path:z.join(this.workspaceRoot,o.path));await ee.workspace.fs.createDirectory(p),a=`Created directory ${o.path}`,c=!0}break;case"delete_file":if(o.path){let p=ee.Uri.file(z.isAbsolute(o.path)?o.path:z.join(this.workspaceRoot,o.path));await ee.workspace.fs.delete(p),a=`Deleted ${o.path}`,c=!0}break;case"run_command":let l=o.command||o.content;if(l){let p=await this.executorAgent.execute({command:l,cwd:this.workspaceRoot});p.status==="success"?(a=`Command output: ${p.payload?.stdout?.slice(0,100)}...`,c=!0):a=`Command failed: ${p.payload?.stderr}`}break;case"partial_edit":if(o.path&&o.content){let p=/<search>\s*([\s\S]*?)\s*<\/search>/.exec(o.content),u=/<replace>\s*([\s\S]*?)\s*<\/replace>/.exec(o.content);if(p){let h=p[1],m=u?u[1]:"",f={filePath:z.isAbsolute(o.path)?o.path:z.join(this.workspaceRoot,o.path),searchBlock:h,replaceBlock:m,action:"replace",startLine:-1,endLine:-1};console.log(`[AgentOrchestrator] Applying partial edit to ${o.path}`);let g=await this.codeModifier.execute({modifications:[f],dryRun:!1,createCheckpoint:!1});g.status==="success"&&g.payload?.results[0]?.success?(a=`Successfully edited ${o.path}`,c=!0):a=`Edit failed: ${g.payload?.results[0]?.error||g.error?.message||"Unknown error"}`}else a="Missing <search> block in partial_edit content. Format: <search>...</search><replace>...</replace>"}else a="Missing path or content for partial_edit";break}r.push({...o,result:a,success:c}),c&&i++}catch(a){console.error(`Action failed: ${o.type}`,a),r.push({...o,result:`Error: ${a.message}`,success:!1})}}return{success:i===n.length,actions:r,summary:`Executed ${i}/${n.length} actions.`,checkpointId:s}}async getFileStructure(){if(!this.workspaceRoot)return[];try{return await te.promises.readdir(this.workspaceRoot)}catch{return[]}}async detectProjectType(){let n=await this.getFileStructure();return n.includes("package.json")?"node":n.includes("requirements.txt")||n.includes("pyproject.toml")?"python":n.includes("Cargo.toml")?"rust":n.includes("go.mod")?"go":"generic"}getLastReferencedFile(){return this.currentContext.filePath||null}};var zn=S(require("vscode"));var jn=S(require("vscode"));var $t=class d{constructor(n){this.context=n;this.extractionPatterns=[{regex:/(?:my name is|i'm called|call me|i am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,type:"user_info",keyExtractor:()=>"user_name",valueExtractor:n=>n[1].trim(),confidence:.95},{regex:/(?:my (?:nick)?name is|they call me)\s+["']?(\w+)["']?/gi,type:"user_info",keyExtractor:()=>"user_nickname",valueExtractor:n=>n[1].trim(),confidence:.9},{regex:/(?:i prefer|i like using|my favorite (?:language|framework|tool) is)\s+(\w+(?:\s+\w+)?)/gi,type:"preference",keyExtractor:()=>"preferred_tool",valueExtractor:n=>n[1].trim(),confidence:.85},{regex:/(?:always use|prefer to use|usually use)\s+(\w+)\s+(?:for|when)/gi,type:"preference",keyExtractor:()=>"tool_preference",valueExtractor:n=>n[1].trim(),confidence:.8},{regex:/(?:working on|building|developing)\s+(?:a |an |the )?(\w+(?:\s+\w+){0,3})\s+(?:project|app|application|website|system)/gi,type:"project_info",keyExtractor:()=>"current_project",valueExtractor:n=>n[1].trim(),confidence:.85},{regex:/(?:the project is called|project name is)\s+["']?([^"'\n]+)["']?/gi,type:"project_info",keyExtractor:()=>"project_name",valueExtractor:n=>n[1].trim(),confidence:.9},{regex:/(?:use|using)\s+(typescript|javascript|python|java|go|rust|php|ruby)\s+(?:for this|in this|here)/gi,type:"preference",keyExtractor:()=>"coding_language",valueExtractor:n=>n[1].trim(),confidence:.9},{regex:/(?:my email is|email me at|contact me at)\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi,type:"user_info",keyExtractor:()=>"user_email",valueExtractor:n=>n[1].trim(),confidence:.95},{regex:/(?:my|the) (?:girlfriend|boyfriend|partner|spouse|wife|husband|friend)(?:'s)? (?:name is|is called|is named)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,type:"user_info",keyExtractor:()=>"relationship_name",valueExtractor:n=>n[1].trim(),confidence:.9},{regex:/(?:girlfriend|boyfriend|partner|spouse|wife|husband|friend) is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,type:"user_info",keyExtractor:()=>"relationship_name",valueExtractor:n=>n[1].trim(),confidence:.85},{regex:/(?:the) (?:api key|token|password|secret|endpoint|url) (?:is|for) (.+)/gi,type:"fact",keyExtractor:n=>"defined_fact",valueExtractor:n=>n[1].trim(),confidence:.9}]}static{this.STORAGE_KEY="byteAI.longTermMemory"}static{this.MAX_MEMORIES=200}static{this.SESSION_STORAGE_KEY="byteAI_sessions"}async extractAndStore(n,e){let t=[];for(let s of this.extractionPatterns){let r=n.matchAll(s.regex);for(let i of r){let o=s.keyExtractor(i),a=s.valueExtractor(i);if(a&&a.length>1){let c={id:`${o}_${Date.now()}`,type:s.type,key:o,value:a,source:e,timestamp:Date.now(),confidence:s.confidence};t.push(c),await this.storeMemory(c)}}}return t}async storeMemory(n){let e=this.getMemories(),t=e.findIndex(s=>s.key===n.key&&s.value===n.value);if(t!==-1)e[t].timestamp=Date.now(),e[t].confidence=Math.max(e[t].confidence,n.confidence);else if(["user_name","user_email"].includes(n.key)){let r=e.findIndex(i=>i.key===n.key);r!==-1?e[r]=n:e.push(n)}else e.push(n);e.length>d.MAX_MEMORIES&&(e.sort((s,r)=>{let i=s.confidence+(s.lastAccessed||s.timestamp)/Date.now();return r.confidence+(r.lastAccessed||r.timestamp)/Date.now()-i}),e.length=d.MAX_MEMORIES),await this.context.globalState.update(d.STORAGE_KEY,e)}getMemories(){return this.context.globalState.get(d.STORAGE_KEY,[])}searchMemories(n){let e=this.getMemories(),t=this.extractTerms(n),s=n.toLowerCase(),r=[{regex:/what(?:'s| is) my name/i,keys:["user_name","user_nickname"]},{regex:/who am i/i,keys:["user_name","user_nickname","company"]},{regex:/what (?:do i|language|tool)/i,keys:["preferred_tool","coding_language","tool_preference"]},{regex:/what(?:'s| is) (?:my |the )?project/i,keys:["project_name","current_project"]},{regex:/(?:my |what(?:'s| is) my )?email/i,keys:["user_email"]},{regex:/where do i work|my company/i,keys:["company"]},{regex:/(?:girlfriend|boyfriend|partner|friend) name/i,keys:["relationship_name"]}],i=[];for(let l of r)if(l.regex.test(n)){i=l.keys;break}let a=e.map(l=>{let p=0;i.includes(l.key)&&(p+=100);let u=`${l.key} ${l.value} ${l.type}`.toLowerCase(),h=0;for(let f of t)u.includes(f)&&(p+=15,h++);h>=t.length&&t.length>0&&(p+=30);let m=(Date.now()-l.timestamp)/(1e3*60*60*24);return p+=Math.max(0,5-m*.1),p+=l.confidence*10,{memory:l,score:p}}).filter(l=>l.score>20).sort((l,p)=>p.score-l.score).slice(0,10).map(l=>l.memory);for(let l of a)l.lastAccessed=Date.now();let c=this.buildContextString(a,n);return{entries:a,contextString:c,query:n}}async searchAllSessions(n){let e=this.context.globalState.get(d.SESSION_STORAGE_KEY,[]),t=this.extractTerms(n),s=[],r=n.toLowerCase();for(let a of e)if(a.history)for(let c of a.history){if(c.role==="assistant"&&c.text.length<50)continue;let l=c.text?.toLowerCase()||"",p=0,u=0;for(let h of t)l.includes(h)&&(p+=10,u++);u>0&&(p+=Math.pow(u,2)*5),t.length>1&&l.includes(r)&&(p+=100),p>15&&s.push({content:c.text?.slice(0,400)+(c.text.length>400?"...":"")||"",score:p,sessionTitle:a.title||"Untitled"})}let i=[],o=new Set;s.sort((a,c)=>c.score-a.score);for(let a of s){let c=a.content.slice(0,50);if(o.has(c)||(o.add(c),i.push(a)),i.length>=5)break}return i.map(a=>`[From "${a.sessionTitle}"]: ${a.content}`)}async getRelevantContext(n){let e="",t=this.searchMemories(n);t.entries.length>0&&(e+=t.contextString+`
`);let s=await this.searchAllSessions(n);return s.length>0&&(e+=`
--- RELEVANT PAST CONVERSATIONS ---
${s.join(`

`)}
--- END ---
`),e}buildContextString(n,e){if(n.length===0)return"";let t=[`
--- REMEMBERED INFORMATION ---`];for(let s of n){let r=this.getTypeLabel(s.type);t.push(`\u2022 ${r}: ${s.key.replace(/_/g," ")} = "${s.value}"`)}return t.push(`--- END REMEMBERED INFO ---
`),t.join(`
`)}getTypeLabel(n){return{user_info:"\u{1F464} User",preference:"\u2699\uFE0F Preference",project_info:"\u{1F4C1} Project",fact:"\u{1F4DD} Fact",code_pattern:"\u{1F4BB} Pattern"}[n]||n}extractTerms(n){let e=new Set(["the","a","an","is","are","was","were","be","been","have","has","do","does","did","will","would","could","should","what","how","why","when","where","which","who","this","that","it","its","to","of","in","for","on","with","at","by","from","my"]);return n.toLowerCase().replace(/[^\w\s]/g," ").split(/\s+/).filter(t=>t.length>2&&!e.has(t))}async clearMemories(){await this.context.globalState.update(d.STORAGE_KEY,[])}getStats(){let n=this.getMemories(),e={};for(let t of n)e[t.type]=(e[t.type]||0)+1;return{total:n.length,byType:e}}};var st=class{constructor(n,e){this._extensionUri=n;this._context=e;this._currentAgentMode="build";this._history=[];this._client=new O,this._contextManager=new kt,this._searchAgent=new At,this._agentOrchestrator=new tt(e),this._managerAgent=new me,this._pipelineEngine=new et,this._longTermMemory=new $t(e),this._currentSessionId=Date.now().toString(),this._history=[]}static{this.viewType="byteAI.chatView"}resolveWebviewView(n,e,t){this._view=n,n.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri],retainContextWhenHidden:!0},n.webview.html=this._getHtmlForWebview(n.webview),this.handleGetSettings(),n.onDidChangeVisibility(()=>{n.visible&&this.handleGetSettings()}),x.workspace.onDidChangeConfiguration(s=>{s.affectsConfiguration("byteAI")&&this.handleGetSettings()}),n.webview.onDidReceiveMessage(async s=>{await this.handleMessage(s)}),this.restoreLastSession()}async ensureOllamaRunning(){if(!await this._client.isOllamaInstalled())return await x.window.showErrorMessage("Ollama is not installed. Please download and install it to use local models.","Download Ollama")==="Download Ollama"&&x.env.openExternal(x.Uri.parse("https://ollama.com/download")),!1;let e=await this._client.checkLocalConnection();if(e)return!0;x.window.showInformationMessage("ByteAI: Starting local Ollama server...");let t=x.window.terminals.find(s=>s.name==="ByteAI Ollama");t||(t=x.window.createTerminal("ByteAI Ollama")),t.show(!0),t.sendText("ollama serve");for(let s=0;s<10;s++)if(await new Promise(r=>setTimeout(r,1e3)),e=await this._client.checkLocalConnection(),e)return x.window.showInformationMessage("ByteAI: Ollama started successfully!"),!0;return!1}async handleMessage(n){switch(n.type){case"setAgentMode":this._currentAgentMode=n.mode,this._agentOrchestrator.setAgentMode(n.mode),x.window.showInformationMessage(`Switched to ${n.mode==="plan"?"Plan (Read-Only)":"Build (Full Access)"} Agent.`);break;case"sendMessage":await this.handleUserMessage(n.value,n.files,n.commands);break;case"getLocalModels":let e=await this._client.listLocalModels();this._view?.webview.postMessage({type:"localModels",models:e});break;case"deleteLocalModel":if(await this._client.deleteLocalModel(n.name)){x.window.showInformationMessage(`Model ${n.name} deleted successfully.`);let g=await this._client.listLocalModels();this._view?.webview.postMessage({type:"localModels",models:g})}else x.window.showErrorMessage(`Failed to delete model ${n.name}.`);break;case"setModel":n.model==="local"&&(n.modelName&&this._client.setLocalModelName(n.modelName),await this.ensureOllamaRunning()||await x.window.showErrorMessage('Ollama could not be started automatically. Please install it or run "ollama serve" manually.',"Install Ollama")==="Install Ollama"&&x.env.openExternal(x.Uri.parse("https://ollama.com/download"))),this._client.setModel(n.model),x.window.showInformationMessage(`Switched to ${n.model==="local"?n.modelName?`Local (${n.modelName})`:"Local (Ollama)":"Byte API"} model.`);break;case"downloadModel":if(!await this.ensureOllamaRunning()){await x.window.showErrorMessage('Ollama could not be started automatically. Please install it or run "ollama serve" manually.',"Install Ollama")==="Install Ollama"&&x.env.openExternal(x.Uri.parse("https://ollama.com/download"));return}if(n.modelName){let g=x.window.createTerminal("ByteAI Model Download");g.show(),g.sendText(`ollama pull ${n.modelName}`),this._client.setLocalModelName(n.modelName)}else await this.downloadLocalModel();break;case"newChat":this.clearChat();break;case"clearData":this._client.disconnect(),this._contextManager.clear(),await this._agentOrchestrator.clearAllData(),await this.clearChat(),x.window.showInformationMessage("All session data, context, and temporary states have been cleared.");break;case"getSessions":await this.getSessions();break;case"loadSession":await this.loadSession(n.id);break;case"deleteSession":await this.deleteSession(n.id);break;case"renameSession":await this.renameSession(n.id,n.title);break;case"clearAllSessions":await this.clearAllSessions();break;case"copyCode":x.env.clipboard.writeText(n.value);break;case"insertCode":let r=x.window.activeTextEditor;r?(r.edit(g=>{r.selection.isEmpty?g.insert(r.selection.active,n.value):g.replace(r.selection,n.value)}),x.window.showInformationMessage("Code inserted successfully!")):x.window.showWarningMessage("No active editor to insert code into.");break;case"openFile":let i=n.value;if(i)try{let g;if(i.startsWith("/")||/^[a-zA-Z]:\\/.test(i))g=x.Uri.file(i);else{let v=await x.workspace.findFiles("**/"+i,"**/node_modules/**",1);if(v.length>0)g=v[0];else{let w=x.workspace.workspaceFolders?x.workspace.workspaceFolders[0].uri:x.Uri.file("/");g=x.Uri.joinPath(w,i)}}try{if((await x.workspace.fs.stat(g)).type===x.FileType.Directory)await x.commands.executeCommand("revealInExplorer",g);else{let w=await x.workspace.openTextDocument(g);await x.window.showTextDocument(w)}}catch{let w=await x.workspace.openTextDocument(g);await x.window.showTextDocument(w)}}catch{x.window.showErrorMessage(`Could not open file: ${i}`)}break;case"getFiles":let o=n.query?n.query.toLowerCase():"",a=await x.workspace.findFiles("**/*","{**/node_modules/**,**/.git/**,**/out/**,**/dist/**,**/.bytecoder/**,**/.bytecoder}",1e3),c=new Set;a.filter(g=>!g.fsPath.includes(".bytecoder")).forEach(g=>{let v=x.workspace.asRelativePath(g).split("/");for(let w=0;w<v.length-1;w++){let k=v.slice(0,w+1).join("/");c.add(k)}});let p=a.map(g=>{let y=x.workspace.asRelativePath(g),v=y.split("/").pop()||"",w=y.toLowerCase(),k=v.toLowerCase(),C=0;if(!o)C=1;else if(k===o)C=100;else if(w===o)C=90;else if(k.startsWith(o))C=80;else if(w.includes(o))C=50;else{let P=0,T=0,b=0;for(;P<o.length&&T<w.length;)w[T]===o[P]&&(b++,P++),T++;b===o.length&&(C=20)}return{file:g,path:y,score:C,isFolder:!1}}),u=Array.from(c).map(g=>{let y=g.toLowerCase(),w=(g.split("/").pop()||"").toLowerCase(),k=0;if(!o)k=1;else if(w===o)k=95;else if(y===o)k=90;else if(w.startsWith(o))k=75;else if(y.includes(o))k=45;else{let P=0,T=0,b=0;for(;P<o.length&&T<y.length;)y[T]===o[P]&&(b++,P++),T++;b===o.length&&(k=15)}let C=x.workspace.workspaceFolders?x.workspace.workspaceFolders[0].uri:x.Uri.file("/");return{file:x.Uri.joinPath(C,g),path:g,score:k,isFolder:!0}}),m=[...p,...u].filter(g=>g.score>0).filter(g=>!g.path.includes(".bytecoder")&&!g.path.includes(".git")&&!g.path.includes("node_modules")).sort((g,y)=>g.score!==y.score?y.score-g.score:g.path.length!==y.path.length?g.path.length-y.path.length:g.path.localeCompare(y.path)).slice(0,50).map(g=>({path:g.path,fullPath:g.file.fsPath,isFolder:g.isFolder}));[{path:"problems",fullPath:"Current Problems & Errors",isFolder:!1},{path:"clipboard",fullPath:"Clipboard Content",isFolder:!1}].forEach(g=>{(g.path.includes(o)||g.path===o)&&m.unshift(g)}),this._view?.webview.postMessage({type:"fileList",files:m});break;case"stopGeneration":this._client.disconnect();break;case"exportChat":await this.exportChatAsMarkdown();break;case"regenerate":await this.handleRegenerate(n.index);break;case"editMessage":await this.handleEditMessage(n.index);break;case"executeCommand":await this.runCommand(n.command);break;case"error":x.window.showErrorMessage("Webview Error: "+n.value);break;case"getSettings":await this.handleGetSettings();break;case"saveSettings":await this.handleSaveSettings(n.value);break}}async clearChat(){this._client.resetSession(),this._currentSessionId=Date.now().toString(),this._history=[],this._view?.webview.postMessage({type:"loadSession",history:this._history})}async downloadLocalModel(){let n=["llama3","mistral","codellama","phi3","deepseek-coder"],e=await x.window.showQuickPick(n,{placeHolder:"Select a model to download (requires Ollama installed)"});if(e){let t=x.window.createTerminal("ByteAI Model Download");t.show(),t.sendText(`ollama pull ${e}`),this._client.setLocalModelName(e)}}async runCommand(n){this._view||await x.commands.executeCommand("byteAI.chatView.focus");let e=x.window.activeTextEditor,t="";if(e){let i=e.selection;i.isEmpty||(t=e.document.getText(i))}let s={explain:`Act as a Senior Software Architect. Deeply analyze the following code. Explain its logical flow, architectural pattern, potential side effects, and any performance bottlenecks. Use clear headings and bullet points.

Code:
\`\`\`
`+t+"\n```",fix:`Act as an Expert Debugger. Analyze the following code for bugs, race conditions, memory leaks, and logical errors. Fix the issues and explain the root cause of each bug. Provide the corrected code block.

Code:
\`\`\`
`+t+"\n```",refactor:`Act as a Clean Code Expert. Refactor the following code to strictly follow SOLID principles, DRY, and modern best practices (ES6+ for JS/TS). Improve readability, maintainability, and efficiency. Explain the key improvements made.

Code:
\`\`\`
`+t+"\n```",test:`Generate comprehensive unit tests for the following code. Cover happy paths, edge cases, and potential failure modes. Use modern testing frameworks (e.g., Jest/Vitest for JS, Pytest for Python). Mock external dependencies where appropriate.

Code:
\`\`\`
`+t+"\n```",doc:`Generate professional, industry-standard documentation (e.g., JSDoc/TSDoc/Docstring) for the following code. Include parameter descriptions, return values, exceptions, and usage examples.

Code:
\`\`\`
`+t+"\n```",optimize:`Act as a Performance Engineer. Analyze this code for performance issues including time complexity, memory usage, unnecessary computations, and caching opportunities. Provide an optimized version with benchmarking suggestions.

Code:
\`\`\`
`+t+"\n```",security:`Act as a Security Expert. Perform a thorough security audit on this code. Check for: XSS, SQL injection, CSRF, authentication flaws, data exposure, insecure dependencies, and other OWASP Top 10 vulnerabilities. Provide fixes for each issue found.

Code:
\`\`\`
`+t+"\n```",review:`Act as a Senior Code Reviewer. Provide a comprehensive code review covering: code quality, best practices, potential bugs, edge cases, error handling, naming conventions, and architecture concerns. Rate the code quality 1-10 and provide actionable feedback.

Code:
\`\`\`
`+t+"\n```",convert:`Convert this code to a different programming language while maintaining the same logic and structure. Ask me which language to convert to if not specified.

Code:
\`\`\`
`+t+"\n```"},r=t?s[n]:`/${n}`;r&&this._view?.webview.postMessage({type:"setAndSendMessage",value:r})}async quickAsk(n){this._view||await x.commands.executeCommand("byteAI.chatView.focus");let e=x.window.activeTextEditor,t="";if(e){let s=e.selection;s.isEmpty||(t=e.document.getText(s))}if(t){let s=`${n}

Code:
\`\`\`
${t}
\`\`\``;this._view?.webview.postMessage({type:"setAndSendMessage",value:s})}else this._view?.webview.postMessage({type:"setAndSendMessage",value:n})}async handleRegenerate(n){if(this._history.length===0)return;let e="",t=[],s=[];if(n!==void 0){if(n<0||n>=this._history.length)return;if(this._history[n].role==="assistant")if(n>0&&this._history[n-1].role==="user"){let i=this._history[n-1];e=i.text,t=i.files||[],s=i.commands||[],this._history=this._history.slice(0,n-1)}else return}else{this._history[this._history.length-1].role==="assistant"&&this._history.pop();let i=this._history[this._history.length-1];i&&i.role==="user"&&(e=i.text,t=i.files||[],s=i.commands||[],this._history.pop())}e&&(this._view?.webview.postMessage({type:"loadSession",history:this._history}),await this.handleUserMessage(e,t,s,!0))}async handleEditMessage(n){if(this._history.length===0||n<0||n>=this._history.length)return;let e=this._history[n];e.role==="user"&&(this._history=this._history.slice(0,n),this._view?.webview.postMessage({type:"loadSession",history:this._history}),this._view?.webview.postMessage({type:"setAndSendMessage",value:e.text,justSet:!0,files:e.files,commands:e.commands}))}async handleUserMessage(n,e=[],t=[],s=!1){if(this._view)try{this._view?.webview.postMessage({type:"agentStatusReset"}),this._view?.webview.postMessage({type:"agentStatus",phase:"Analyzing",message:"Analyzing your request and recent context"}),this._history.push({role:"user",text:n,files:e,commands:t}),await this.saveCurrentSession(),s&&(this._view.webview.postMessage({type:"addMessage",role:"user",value:n,files:e,commands:t}),this._view.webview.postMessage({type:"setGenerating"}));let r=n;if(t&&t.length>0&&(r=`[User Commands: ${t.map(v=>"/"+v).join(" ")}]
`+r),e&&e.length>0){let v=`

--- ATTACHED FILES ---
`;for(let w of e)if(!w.isFolder)try{let k;if(w.fullPath)k=x.Uri.file(w.fullPath);else if(w.path){let W=x.workspace.workspaceFolders?x.workspace.workspaceFolders[0].uri:x.Uri.file("/");k=x.Uri.joinPath(W,w.path)}else continue;let C=await x.workspace.fs.readFile(k),P=new TextDecoder().decode(C),T=x.workspace.asRelativePath(k),b=T.split(".").pop()||"text",M=this._contextManager.addFileWithQuery(T,P,b,n);v+=`File: ${T}
\`\`\`${b}
${M.content}
\`\`\`

`}catch(k){console.error("Error reading attached file:",w,k)}r+=v}let i=this._contextManager.getConversationSummary();i&&(r=i+`

`+r),this._view?.webview.postMessage({type:"agentStatus",phase:"Memory",message:"Searching long-term memory..."});let o=await this._longTermMemory.getRelevantContext(n);o&&(r=o+r),await this._longTermMemory.extractAndStore(n,this._currentSessionId),this._view?.webview.postMessage({type:"agentStatus",phase:"Thinking",message:"Manager Agent analyzing request..."});let a=x.window.activeTextEditor,c=a?x.workspace.asRelativePath(a.document.uri):void 0,l=a&&!a.selection.isEmpty?a.document.getText(a.selection):void 0;this._agentOrchestrator.setContextFromMessage(n,c);let p=await this._managerAgent.execute({query:n,activeFilePath:c,hasSelection:!!l,selectionText:l}),u=this._agentOrchestrator.detectPersona(n,p.payload.intent);this._view?.webview.postMessage({type:"agentStatus",phase:"Thinking",message:`Manager Agent identified intent: ${p.payload.intent} (Persona: ${u})`});let h="",m=null;if(p.payload.confidence>.6){this._view?.webview.postMessage({type:"agentStatus",phase:"Planning",message:`Intent: ${p.payload.intent} (${(p.payload.confidence*100).toFixed(0)}%) - Executing Pipeline`});let v=await this._pipelineEngine.execute(p.payload,n,c,l,w=>{this._view?.webview.postMessage({type:"agentStatus",phase:w.phase,message:w.message}),w.plan&&this._view?.webview.postMessage({type:"planUpdate",plan:w.plan,activeTaskId:w.activeTaskId})});h=v.context,m=v.results,r=h+`

`+r}else{this._view?.webview.postMessage({type:"agentStatus",phase:"Searching",message:"Low confidence in detailed plan - falling back to broad search"});let v=await this._searchAgent.search(n,c);v&&(r=v+`

`+r);let w=await this._searchAgent.getProjectMap();r+=`

`+w}this._contextManager.addConversationTurn("user",n),this._view?.webview.postMessage({type:"agentStatus",phase:"Answering",message:"Generating answer with gathered context"});let f="";if(await this._client.streamResponse(r,v=>{f+=v,this._view?.webview.postMessage({type:"addResponse",value:f,isStream:!0})},v=>{throw this._view?.webview.postMessage({type:"error",value:v.message}),v}),!f)throw new Error("Received empty response from AI");this._history.push({role:"assistant",text:f}),this._contextManager.addConversationTurn("assistant",f),await this.saveCurrentSession(),N.log("[ByteCoder] Parsing AI response for actions...");let g=this._agentOrchestrator.parseAIResponse(f,u);N.log("[ByteCoder] Found instructions:",g.length);let y=g.length>0;if(this._view.webview.postMessage({type:"addResponse",value:f,isStream:y}),y){N.log("[ByteCoder] Instructions details:",JSON.stringify(g,null,2)),this._view?.webview.postMessage({type:"agentStatus",phase:"Executing",message:`Found ${g.length} action(s) to execute`});let v=x.workspace.getConfiguration("byteAI").get("autoExecute",!0),w=["git add","git commit","git status","git init","git log","git diff","ls","dir","cat","grep","pwd","echo","touch","mkdir","rmdir","npm test","npm run build","npm run test","npm start","node -v","npm -v","npm install","yarn install","pnpm install","pip install","node ","python ","python3 ","pip ","yarn ","pnpm "],k=g.length<=50&&g.every(C=>C.type==="create_file"||C.type==="create_folder"||C.type==="create_directory"||C.type==="modify_file"||C.type==="delete_file"||C.type==="partial_edit"||C.type==="run_command"&&w.some(P=>C.command?.startsWith(P)));if(v&&k){N.log("[ByteCoder] Auto-executing safe actions...");let C=await this._agentOrchestrator.executeInstructions(g,b=>{this._view?.webview.postMessage({type:"agentStatus",phase:"Executing",message:b})}),P=`

---
**\u{1F916} Actions Executed**
${C.actions.map(b=>b.result).join(`
`)}`,T=f+P;this._history[this._history.length-1].text=T,this._view?.webview.postMessage({type:"addResponse",value:T,isStream:!1}),await this.saveCurrentSession(),x.window.showInformationMessage(`\u2705 Created ${C.actions.filter(b=>b.success).length} file(s)`)}else this._view?.webview.postMessage({type:"addResponse",value:f,isStream:!1}),await this.promptForExecution(g,f)}else N.log("[ByteCoder] No executable actions found in response"),this._view?.webview.postMessage({type:"addResponse",value:f,isStream:!1});this._view?.webview.postMessage({type:"agentStatusDone"})}catch(r){console.error("Chat Error:",r),this._view?.webview.postMessage({type:"error",value:r.message||"Unknown error"}),this._view?.webview.postMessage({type:"agentStatusDone"})}}async handleNewChat(){this.clearChat()}async saveCurrentSession(){if(this._history.length===0)return;let n=this._context.globalState.get("byteAI_sessions")||[],e=n.findIndex(r=>r.id===this._currentSessionId),t=this._history.find(r=>r.role==="user")?.text;if(!t)return;let s={id:this._currentSessionId,title:t.slice(0,50),timestamp:Date.now(),history:this._history};for(e!==-1?n[e]=s:n.unshift(s);n.length>20;)n.pop();await this._context.globalState.update("byteAI_sessions",n)}async getSessions(){let e=(this._context.globalState.get("byteAI_sessions")||[]).filter(t=>t.history&&t.history.length>0&&t.title&&t.title!=="New Session");this._view?.webview.postMessage({type:"sessionList",sessions:e.map(t=>({id:t.id,title:t.title,timestamp:t.timestamp})),currentSessionId:this._currentSessionId})}async loadSession(n){let t=(this._context.globalState.get("byteAI_sessions")||[]).find(s=>s.id===n);t&&(this._currentSessionId=t.id,this._history=t.history||[],this._view?.webview.postMessage({type:"loadSession",history:this._history}),await this.handleGetSettings())}async deleteSession(n){let e=this._context.globalState.get("byteAI_sessions")||[];e=e.filter(t=>t.id!==n),await this._context.globalState.update("byteAI_sessions",e),await this.getSessions(),n===this._currentSessionId&&this.handleNewChat()}async renameSession(n,e){let t=await x.window.showInputBox({prompt:"Rename Session",value:e,placeHolder:"Enter new session name"});if(t&&t!==e){let s=this._context.globalState.get("byteAI_sessions")||[],r=s.findIndex(i=>i.id===n);r!==-1&&(s[r].title=t,await this._context.globalState.update("byteAI_sessions",s),await this.getSessions())}}async clearAllSessions(){await this._context.globalState.update("byteAI_sessions",[]),this.handleNewChat()}async restoreLastSession(){let e=(this._context.globalState.get("byteAI_sessions")||[]).find(t=>t.history&&t.history.length>0&&t.title&&t.title!=="New Session");e&&(this._currentSessionId=e.id,this._history=e.history||[],this._view?.webview.postMessage({type:"loadSession",history:this._history}))}async exportChatAsMarkdown(){if(this._history.length===0){x.window.showWarningMessage("No messages to export.");return}let n=`# Byte AI Chat Export

`;n+=`**Date:** ${new Date().toLocaleString()}

`,n+=`---

`;for(let t of this._history)t.role==="user"?n+=`## \u{1F464} User

${t.text}

`:n+=`## \u{1F916} Byte AI

${t.text}

`,n+=`---

`;let e=await x.window.showSaveDialog({defaultUri:x.Uri.file(`byte-ai-chat-${Date.now()}.md`),filters:{Markdown:["md"],"All Files":["*"]}});e&&(await x.workspace.fs.writeFile(e,Buffer.from(n,"utf8")),x.window.showInformationMessage(`Chat exported to ${e.fsPath}`))}_getHtmlForWebview(n){let e={user:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',bot:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>',send:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',history:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',copy:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',check:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',zap:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',stop:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>',download:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',thumbsUp:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>',thumbsDown:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',close:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'};return ot.getHtml(n,this._extensionUri,e)}async handleGetSettings(){let n=x.workspace.getConfiguration("byteAI"),e={customInstructions:n.get("customInstructions"),autoContext:n.get("autoContext"),useLocalModel:n.get("useLocalModel",!1),localModelName:n.get("localModelName","llama3")};this._view?.webview.postMessage({type:"updateSettings",value:e})}async handleSaveSettings(n){try{let e=x.workspace.getConfiguration("byteAI");await e.update("customInstructions",n.customInstructions,x.ConfigurationTarget.Global),await e.update("autoContext",n.autoContext,x.ConfigurationTarget.Global),n.useLocalModel!==void 0&&await e.update("useLocalModel",n.useLocalModel,x.ConfigurationTarget.Global),n.localModelName&&await e.update("localModelName",n.localModelName,x.ConfigurationTarget.Global),await this.handleGetSettings(),x.window.showInformationMessage("Byte AI Settings saved successfully")}catch(e){console.error("Error saving settings:",e),x.window.showErrorMessage(`Failed to save settings: ${e.message||e}`)}}async promptForExecution(n,e){let t=n.map(r=>r.type==="create_file"?`\u{1F4DD} Create: ${r.path}`:r.type==="create_folder"?`\u{1F4C1} Create dir: ${r.path}`:r.type==="run_command"?`\u{1F527} Run: ${r.command}`:`${r.type}: ${r.path||r.command}`).join(`
`);if(N.log("[ByteCoder] Prompting for execution:",t),await x.window.showInformationMessage(`Byte Coder wants to execute ${n.length} action(s):
${t.substring(0,200)}`,"Execute All","Cancel")==="Execute All"){N.log("[ByteCoder] User approved execution");let r=await this._agentOrchestrator.executeInstructions(n,a=>{this._view?.webview.postMessage({type:"agentStatus",phase:"Executing",message:a})}),i=`

---
**\u{1F916} Agentic Execution Complete**
${r.summary}
${r.actions.map(a=>a.result).join(`
`)}`,o=e+i;this._history[this._history.length-1].text=o,this._view?.webview.postMessage({type:"addResponse",value:o,isStream:!1}),await this.saveCurrentSession(),r.checkpointId?x.window.showInformationMessage(`\u2705 Done! Checkpoint: ${r.checkpointId}`):x.window.showInformationMessage(`\u2705 Executed ${r.actions.filter(a=>a.success).length}/${r.actions.length} actions`)}else N.log("[ByteCoder] User cancelled execution")}};function _i(d){N.initialize("Byte Coder AI"),N.info("Byte AI Coding Assistant is now active!");let n=new st(d.extensionUri,d);d.subscriptions.push(D.window.registerWebviewViewProvider(st.viewType,n)),D.commands.executeCommand("byteAI.chatView.focus"),d.subscriptions.push(D.commands.registerCommand("byteAI.clearChat",()=>{n.clearChat()})),d.subscriptions.push(D.commands.registerCommand("byteAI.explainCode",()=>{n.runCommand("explain")})),d.subscriptions.push(D.commands.registerCommand("byteAI.fixCode",()=>{n.runCommand("fix")})),d.subscriptions.push(D.commands.registerCommand("byteAI.refactorCode",()=>{n.runCommand("refactor")})),d.subscriptions.push(D.commands.registerCommand("byteAI.generateTest",()=>{n.runCommand("test")})),d.subscriptions.push(D.commands.registerCommand("byteAI.generateDocs",()=>{n.runCommand("doc")})),d.subscriptions.push(D.commands.registerCommand("byteAI.quickAsk",async()=>{let e=D.window.activeTextEditor;if(!e||e.selection.isEmpty){D.window.showWarningMessage("Please select some code first.");return}let t=await D.window.showInputBox({prompt:"What would you like to know about this code?",placeHolder:"e.g., How does this function work?"});t&&n.quickAsk(t)})),d.subscriptions.push(D.commands.registerCommand("byteAI.optimizeCode",()=>{n.runCommand("optimize")})),d.subscriptions.push(D.commands.registerCommand("byteAI.securityCheck",()=>{n.runCommand("security")})),d.subscriptions.push(D.commands.registerCommand("byteAI.reviewCode",()=>{n.runCommand("review")}))}function Ii(){}0&&(module.exports={activate,deactivate});
