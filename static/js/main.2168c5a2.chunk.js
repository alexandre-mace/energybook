(this.webpackJsonpenergybook=this.webpackJsonpenergybook||[]).push([[0],{196:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),s=t(10),r=t.n(s),l=(t(95),t(51)),o=t.n(l),i=t(12),m=t(72),u=(t(97),t(73)),d=t(74),f=t.n(d),p=t(235),v=t(234),E=t(75),y=t.n(E),g=t(76),b=t.n(g),h=t(77),N=t.n(h),w=t(78),k=t.n(w);function j(e,a,t,n){return x.apply(this,arguments)}function x(){return(x=Object(m.a)(o.a.mark((function e(a,t,n,c){var s,r,l,i,m,u,d;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(a);case 2:return s=e.sent,r=s.body.getReader(),e.next=6,r.read();case 6:l=e.sent,i=new TextDecoder("utf-8"),m=i.decode(l.value),u=f.a.parse(m,{header:!0}),d=u.data,n(d.map((function(e){return e.zone}))),t({keys:Object.keys(d.filter((function(e){return e.zone===c}))[0]).filter((function(e){return"zone"!==e})),values:Object.values(d.filter((function(e){return e.zone===c}))[0]).filter((function(e){return"World"!==e})).map((function(e){return parseFloat(e)}))});case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=function(){var e=c.a.useState("World"),a=Object(i.a)(e,2),t=a[0],n=a[1],s=c.a.useState({keys:[],values:[]}),r=Object(i.a)(s,2),l=r[0],o=r[1],m=c.a.useState([]),d=Object(i.a)(m,2),f=d[0],E=d[1],g=c.a.useState("World"),h=Object(i.a)(g,2),w=h[0],x=h[1],O=c.a.useState({keys:[],values:[]}),S=Object(i.a)(O,2),W=S[0],B=S[1],H=c.a.useState([]),C=Object(i.a)(H,2),A=C[0],T=C[1],_=c.a.useState("World"),z=Object(i.a)(_,2),R=z[0],M=z[1],Z=c.a.useState({keys:[],values:[]}),D=Object(i.a)(Z,2),J=D[0],L=D[1],F=c.a.useState([]),I=Object(i.a)(F,2),V=I[0],$=I[1],q=c.a.useState("World"),G=Object(i.a)(q,2),K=G[0],P=G[1],Q=c.a.useState({keys:[],values:[]}),U=Object(i.a)(Q,2),X=U[0],Y=U[1],ee=c.a.useState([]),ae=Object(i.a)(ee,2),te=ae[0],ne=ae[1],ce=function(){j(y.a,B,T,w)},se=function(){j(b.a,o,E,t)},re=function(){j(N.a,L,$,R)},le=function(){j(k.a,Y,ne,K)};c.a.useEffect((function(){ce(),se(),re(),le()}),[]),c.a.useEffect((function(){ce()}),[w]),c.a.useEffect((function(){se()}),[t]),c.a.useEffect((function(){re()}),[R]),c.a.useEffect((function(){le()}),[K]);var oe=function(e,a,t){return c.a.createElement(p.a,{size:"small",options:e,getOptionLabel:function(e){return e},defaultValue:"World",fullWidth:!1,onChange:function(e,t){return a(t)},renderInput:function(a){return c.a.createElement(v.a,Object.assign({},a,{fullWidth:!1,className:"widthTranslate",style:{width:100+Math.pow(t.length,1.7)},label:e[t],placeholder:e[t]}))}})},ie=function(e,a,t){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"75,192,192";return c.a.createElement(u.Line,{options:n,data:{labels:a,datasets:[{label:e,lineTension:.1,displayColors:!1,backgroundColor:"rgba(".concat(s,",0.6)"),borderColor:"rgba(".concat(s,",1)"),borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(".concat(s,",1)"),pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(".concat(s,",1)"),pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:t}]}})};return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"container my-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("p",null,"Hello :), i will talk to you about ",c.a.createElement("strong",null,"Energy")),c.a.createElement("p",null,"We is consuming a lot of it, and it is growing fast..")))),c.a.createElement("div",{className:"container mt-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col d-flex justify-content-center"},c.a.createElement("span",{className:"mr-3"},"Let's take a look of how much ",c.a.createElement("strong",null,"energy")," the"),oe(A,x,w),c.a.createElement("span",{className:"mx-3"},"is consuming")))),c.a.createElement("div",{className:"container my-5 pb-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},ie("Total energy consumption",W.keys,W.values,{scales:{yAxes:[{ticks:{beginAtZero:!0,suggestedMax:2e3}}]},legend:{display:!1}})))),c.a.createElement("div",{className:"container my-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("p",null,"Thanks to energy we can produce the amazing thing that is ",c.a.createElement("strong",null,"electricity"),"."),c.a.createElement("p",null,"The power of the vast majority of tools used in our world.")))),c.a.createElement("div",{className:"container mt-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col d-flex justify-content-center"},c.a.createElement("span",{className:"mr-3"},"Here is the total electricity consumption of the"),oe(V,M,R)))),c.a.createElement("div",{className:"container my-5 pb-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},ie("Total electricity consumption",J.keys,J.values,{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},legend:{display:!1}},"255, 255, 3")))),c.a.createElement("div",{className:"container my-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("p",null,"So yes, ",c.a.createElement("strong",null,"energy")," is cool"),c.a.createElement("p",null,"But there is a big issue currently highly coupled with energy consumption, co2 emissions.")))),c.a.createElement("div",{className:"container mt-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col d-flex justify-content-center"},c.a.createElement("span",{className:"mr-3"},"Here is the co2 emissions of the"),oe(f,n,t)))),c.a.createElement("div",{className:"container my-5 pb-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},ie("Total co2 emissions",l.keys,l.values,{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},legend:{display:!1}},"255,0,0")))),c.a.createElement("div",{className:"container my-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("p",null,"How can we partly ",c.a.createElement("strong",null,"solve")," it ?"),c.a.createElement("p",null,"By using renewable energy.")))),c.a.createElement("div",{className:"container mt-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col d-flex justify-content-center"},c.a.createElement("span",{className:"mr-3"},"Here is the renewables share of the"),oe(te,P,K)))),c.a.createElement("div",{className:"container my-5 pb-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},ie("Renewables share",X.keys,X.values,{scales:{yAxes:[{ticks:{beginAtZero:!0,suggestedMax:100}}]},legend:{display:!1}},"0,255,0")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},75:function(e,a,t){e.exports=t.p+"static/media/total_energy_consumption.910e7983.csv"},76:function(e,a,t){e.exports=t.p+"static/media/total_co2_emissions.ae35b90c.csv"},77:function(e,a,t){e.exports=t.p+"static/media/total_electricity_consumption.c23a0dbf.csv"},78:function(e,a,t){e.exports=t.p+"static/media/renewables_share.9ef3a7c8.csv"},90:function(e,a,t){e.exports=t(196)},95:function(e,a,t){},97:function(e,a,t){}},[[90,1,2]]]);
//# sourceMappingURL=main.2168c5a2.chunk.js.map