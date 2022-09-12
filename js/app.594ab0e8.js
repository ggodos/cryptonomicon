(function(){"use strict";var e={5340:function(e,t,r){var i=r(9242),s=r(3396),n=r(7139);const a={class:"container mx-auto flex flex-col items-center bg-gray-100 p-4"},o={key:0,class:"fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"},c=(0,s._)("svg",{class:"animate-spin -ml-1 mr-3 h-12 w-12 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewbox:"0 0 24 24"},[(0,s._)("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentcolor","stroke-width":"4"}),(0,s._)("path",{class:"opacity-75",fill:"currentcolor",d:"m4 12a8 8 0 018-8v0c5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 014 12h0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1),l=[c],d={class:"container"},h=(0,s._)("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1),u=(0,s.Uk)("Фильтр: "),p=(0,s._)("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1),g={class:"mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"},m=["onClick"],f={class:"text-sm font-medium text-gray-500 truncate"},k={class:"mt-1 text-3xl font-semibold text-gray-900"},w=(0,s._)("div",{class:"w-full border-t border-gray-200"},null,-1),y=["onClick"],v=(0,s._)("svg",{class:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"#718096","aria-hidden":"true"},[(0,s._)("path",{"fill-rule":"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z","clip-rule":"evenodd"})],-1),x=(0,s.Uk)("Удалить "),b=[v,x],T=(0,s._)("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1);function C(e,t,r,c,v,x){const C=(0,s.up)("add-ticker"),E=(0,s.up)("selected-ticker-graph");return(0,s.wg)(),(0,s.iD)("div",a,[v.coins.length?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",o,l)),(0,s._)("div",d,[(0,s.Wm)(C,{onAddTicker:x.add,coins:this.coins,tickersNames:this.tickers.map((e=>e.name))},null,8,["onAddTicker","coins","tickersNames"]),v.tickers.length?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[h,(0,s._)("div",null,[v.page>1?((0,s.wg)(),(0,s.iD)("button",{key:0,class:"my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",onClick:t[0]||(t[0]=e=>v.page=v.page-1)}," Назад ")):(0,s.kq)("",!0),x.hasNextPage?((0,s.wg)(),(0,s.iD)("button",{key:1,class:"my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled",onClick:t[1]||(t[1]=e=>v.page=v.page+1)}," Вперёд ")):(0,s.kq)("",!0),(0,s._)("div",null,[u,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>v.filter=e)},null,512),[[i.nr,v.filter]])])]),p,(0,s._)("dl",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(x.paginatedTickers,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e.name,onClick:t=>x.select(e),class:(0,n.C_)([{"border-4":v.selectedTicker===e},"bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"])},[(0,s._)("div",{class:(0,n.C_)([{"bg-red-100":!e.tickerValid},"bg-white px-4 py-5 sm:p-6 text-center"])},[(0,s._)("dt",f,(0,n.zw)(e.name)+" - USD ",1),(0,s._)("dd",k,(0,n.zw)(x.formatPrice(e.price)),1)],2),w,(0,s._)("button",{onClick:(0,i.iM)((t=>x.handleDelete(e)),["stop"]),class:"flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"},b,8,y)],10,m)))),128))]),T],64)):(0,s.kq)("",!0),(0,s.Wm)(E,{ref:"graph",graph:v.graph,"onUpdate:graph":t[3]||(t[3]=e=>v.graph=e),"onClose:graph":t[4]||(t[4]=e=>this.selectedTicker=null),selectedTicker:this.selectedTicker},null,8,["graph","selectedTicker"])])])}r(6699);var E=r(536);const _=new SharedWorker("/cryptonomicon/worker.js"),D=(0,E.Z)(),S="https://min-api.cryptocompare.com/data/all/coinlist?summary=true",z=new Map,M=new Map,U=new Map,O=new Map,A={USD:"BTC",BTC:"ETH"},G="5",I="500",j="INVALID_SUB",V="SUBSCRIPTION_UNRECOGNIZED";function $(e){const{TYPE:t,MESSAGE:r,FROMSYMBOL:i,TOSYMBOL:s,PRICE:n,PARAMETER:a}=e;if(t==I&&r==j)return void R(a);if(r==V)return void B(a);if(t!=G||void 0===n)return;if("USD"!=s)return void P(i,s,n);const o=z.get(i)??[];o.forEach((e=>e(n)));const c=U.get(i)??[];c.forEach(((e,t)=>{const r=z.get(t)??[];r.forEach((t=>t(1/e*n)))}))}function q(e){_.port.postMessage(e)}function N(e){return e.split("~")}function P(e,t,r){U.get(t)||U.set(t,new Map),O.set(e,t),U.get(t).set(e,1/r),L(t,"USD")}function B(e){const t=N(e)[2],r=O.get(t);if(!r)return;H(t,r),O.delete(t);const i=U.get(r);i&&(i.delete(t),0==i.size&&z.get(r)&&0==z.get(r).length&&H(r))}function R(e){const[t,r]=N(e).slice(2,4);if(O.get(t))return;const i=A[r];if(i)return void L(t,i);const s=M.get(t)??[];s.forEach((e=>e())),M.delete(t)}function L(e,t="USD"){q({data:{action:"SubAdd",subs:[`5~CCCAGG~${e}~${t}`]},command:"sub",fromCoin:e,toCoin:t,id:D})}function H(e,t="USD"){q({data:{action:"SubRemove",subs:[`5~CCCAGG~${e}~${t}`]},command:"unsub",fromCoin:e,toCoin:t,id:D})}_.port.start(),_.port.onmessage=e=>{$(e.data)};const W=(e,t,r)=>{const i=z.get(e)||[];if(z.set(e,[...i,t]),r){const t=M.get(e)||[];M.set(e,[...t,r])}L(e,"USD")},Y=e=>{z.delete(e),M.delete(e),H(e,"USD")},Z=()=>fetch(S).then((e=>e.json()));addEventListener("beforeunload",(()=>{_.port.postMessage({command:"closing",id:D})}));const K={class:"flex"},F={class:"max-w-xs"},J={for:"wallet",class:"block text-sm font-medium text-gray-700"},Q={class:"mt-1 relative rounded-md shadow-md"},X={key:0,class:"flex bg-white shadow-md p-1 rounded-md flex-wrap"},ee=["onClick"],te={key:1,class:"text-sm text-red-600"},re={key:2,class:"text-sm text-red-600"};function ie(e,t,r,a,o,c){const l=(0,s.up)("add-button");return(0,s.wg)(),(0,s.iD)("section",null,[(0,s._)("div",K,[(0,s._)("div",F,[(0,s._)("label",J,"Тикер "+(0,n.zw)(o.ticker),1),(0,s._)("div",Q,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>o.ticker=e),onKeydown:t[1]||(t[1]=(0,i.D2)(((...e)=>c.add&&c.add(...e)),["enter"])),onKeyup:t[2]||(t[2]=(...e)=>c.completesUpdate&&c.completesUpdate(...e)),type:"text",name:"wallet",id:"wallet",class:"block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md",placeholder:"Например DOGE"},null,544),[[i.nr,o.ticker]]),o.tickerCompletes.length?((0,s.wg)(),(0,s.iD)("div",X,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(o.tickerCompletes,((e,t)=>((0,s.wg)(),(0,s.iD)("span",{key:t,onClick:t=>c.completeAdd(e),class:"inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"},(0,n.zw)(e),9,ee)))),128))])):(0,s.kq)("",!0),o.tickerAlreadyExist?((0,s.wg)(),(0,s.iD)("div",te," Тикер уже добавлен ")):(0,s.kq)("",!0),o.tickerInvalid?((0,s.wg)(),(0,s.iD)("div",re," Тикер не корректен ")):(0,s.kq)("",!0)])])]),(0,s.Wm)(l,{onClick:c.add,type:"button",class:"my-4"},null,8,["onClick"])])}const se={type:"button",class:"my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"},ne=(0,s._)("svg",{class:"-ml-0.5 mr-2 h-6 w-6",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 24 24",fill:"#ffffff"},[(0,s._)("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})],-1),ae=(0,s.Uk)(" Добавить "),oe=[ne,ae];function ce(e,t){return(0,s.wg)(),(0,s.iD)("button",se,oe)}var le=r(89);const de={},he=(0,le.Z)(de,[["render",ce]]);var ue=he;const pe=4;var ge={components:{AddButton:ue},props:{coins:{type:Array,required:!0},tickersNames:{type:Array,required:!0}},emits:{"add-ticker":e=>"string"===typeof e&&e.length>0},data(){return{ticker:"",tickerCompletes:[],tickerInvalid:!1,tickerAlreadyExist:!1}},methods:{add(){this.tickerInvalid=!this.isTickerValid,this.tickerInvalid||(this.tickerAlreadyExist=this.isTickerRepeated,this.tickerAlreadyExist||(this.$emit("add-ticker",this.ticker),this.ticker=""))},completeAdd(e){this.ticker=e,this.add(),this.completesUpdate()},completesUpdate(){""!==this.normalizedTicker?this.tickerCompletes=this.coins.filter((e=>e.startsWith(this.normalizedTicker))).slice(0,pe):this.tickerCompletes=[]}},computed:{normalizedTicker(){return this.ticker.toUpperCase()},isTickerValid(){const e=this.normalizedTicker;return this.coins.some((t=>t==e))},isTickerRepeated(){return this.tickersNames.some((e=>e===this.normalizedTicker))}}};const me=(0,le.Z)(ge,[["render",ie]]);var fe=me;const ke={key:0,class:"relative"},we={class:"text-lg leading-6 font-medium text-gray-900 my-8"},ye={class:"flex items-end border-gray-600 border-b border-l h-64",ref:"graph"};function ve(e,t,r,i,a,o){const c=(0,s.up)("cross-button");return r.selectedTicker?((0,s.wg)(),(0,s.iD)("section",ke,[(0,s._)("h3",we,(0,n.zw)(r.selectedTicker.name),1),(0,s._)("div",ye,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(o.normalizedGraph,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{key:t,style:(0,n.j5)({height:`${e}%`}),class:"bg-purple-800 border w-10"},null,4)))),128))],512),(0,s.Wm)(c,{onClick:o.closeGraph},null,8,["onClick"])])):(0,s.kq)("",!0)}const xe={type:"button",class:"absolute top-0 right-0"},be={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:svgjs":"http://svgjs.com/svgjs",version:"1.1",width:"30",height:"30",x:"0",y:"0",viewBox:"0 0 511.76 511.76",style:{"enable-background":"new 0 0 512 512"},"xml:space":"preserve"},Te=(0,s._)("g",null,[(0,s._)("path",{d:"M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z",fill:"#718096","data-original":"#000000"})],-1),Ce=[Te];function Ee(e,t){return(0,s.wg)(),(0,s.iD)("button",xe,[((0,s.wg)(),(0,s.iD)("svg",be,Ce))])}const _e={},De=(0,le.Z)(_e,[["render",Ee]]);var Se=De;const ze=5;var Me={components:{CrossButton:Se},props:{selectedTicker:{required:!0},graph:{type:Array,required:!0}},emits:{"close:graph":null,"update:graph":null},data(){return{maxGraphElements:1}},methods:{closeGraph(){this.$emit("close:graph")},calculateMaxGraphElements(){this.$refs.graph&&(this.maxGraphElements=this.$refs.graph.offsetWidth/38,this.graph.length>this.maxGraphElements&&this.$emit("update:graph",this.graph.slice(0,this.maxGraphElements)))}},computed:{normalizedGraph(){const e=Math.max(...this.graph),t=Math.min(...this.graph);return e==t?this.graph.map((()=>50)):this.graph.map((r=>ze+(r-t)*(100-ze)/(e-t)))}},mounted(){window.addEventListener("resize",this.calculateMaxGraphElements)},beforeMount(){window.removeEventListener("resize",this.calculateMaxGraphElements)}};const Ue=(0,le.Z)(Me,[["render",ve]]);var Oe=Ue;const Ae=6,Ge=2,Ie=4;var je={name:"App",components:{AddTicker:fe,SelectedTickerGraph:Oe},data(){return{filter:"",page:1,graph:[],tickers:[],selectedTicker:null,coins:[]}},methods:{updateTicker(e,t){this.tickers.filter((t=>t.name===e)).forEach((e=>{e===this.selectedTicker&&(this.graph.push(t),this.graph.length>this.maxGraphElements&&(this.graph=this.graph.slice(this.graph.length-this.maxGraphElements))),e.price=t})),this.tickers=[...this.tickers]},changeTickerValidity(e,t=!0){this.tickers.filter((t=>t.name===e)).forEach((e=>{e.tickerValid=t}))},formatPrice(e){return"-"===e?e:e>1?e.toFixed(Ge):e.toPrecision(Ie)},add(e){const t={name:e.toUpperCase(),price:"-",tickerValid:!0};this.tickers=[...this.tickers,t],this.filter="",W(t.name,(e=>this.updateTicker(t.name,e)),(()=>this.changeTickerValidity(t.name,!1)))},handleDelete(e){this.tickers=this.tickers.filter((t=>t!=e)),this.selectedTicker===e&&(this.selectedTicker=null),e.tickerValid&&Y(e.name)},select(e){this.selectedTicker=e}},computed:{startIndex(){return(this.page-1)*Ae},endIndex(){return this.page*Ae},filteredTickers(){return this.tickers.filter((e=>e.name.includes(this.filter.toUpperCase())))},paginatedTickers(){return this.filteredTickers.slice(this.startIndex,this.endIndex)},hasNextPage(){return this.filteredTickers.length>this.endIndex},pageStateOptions(){return{filter:this.filter,page:this.page}}},watch:{tickers(){localStorage.setItem("cryptonomicon-list",JSON.stringify(this.tickers))},selectedTicker(){this.graph=[],this.$nextTick().then(this.calculateMaxGraphElements)},paginatedTickers(){0===this.paginatedTickers.length&&this.page>1&&(this.page-=1)},filter(){this.page=1},pageStateOptions(e){window.history.pushState(null,document.title,`${window.location.pathname}?filter=${e.filter}&page=${e.page}`)}},async created(){const e=Object.fromEntries(new URL(window.location).searchParams.entries()),t=["filter","page"];t.forEach((t=>{e[t]&&(this[t]=e[t])}));const r=localStorage.getItem("cryptonomicon-list");r&&(this.tickers=JSON.parse(r),this.tickers.forEach((e=>{W(e.name,(t=>this.updateTicker(e.name,t)),(()=>this.changeTickerValidity(e.name,!1)))})));const i=await Z();this.coins=Object.values(i.Data).map((e=>e.Symbol)).sort()}};const Ve=(0,le.Z)(je,[["render",C]]);var $e=Ve;(0,i.ri)($e).mount("#app")}},t={};function r(i){var s=t[i];if(void 0!==s)return s.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,r),n.exports}r.m=e,function(){var e=[];r.O=function(t,i,s,n){if(!i){var a=1/0;for(d=0;d<e.length;d++){i=e[d][0],s=e[d][1],n=e[d][2];for(var o=!0,c=0;c<i.length;c++)(!1&n||a>=n)&&Object.keys(r.O).every((function(e){return r.O[e](i[c])}))?i.splice(c--,1):(o=!1,n<a&&(a=n));if(o){e.splice(d--,1);var l=s();void 0!==l&&(t=l)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[i,s,n]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,n,a=i[0],o=i[1],c=i[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(s in o)r.o(o,s)&&(r.m[s]=o[s]);if(c)var d=c(r)}for(t&&t(i);l<a.length;l++)n=a[l],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(d)},i=self["webpackChunkcryptonomicon"]=self["webpackChunkcryptonomicon"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=r.O(void 0,[998],(function(){return r(5340)}));i=r.O(i)})();
//# sourceMappingURL=app.594ab0e8.js.map