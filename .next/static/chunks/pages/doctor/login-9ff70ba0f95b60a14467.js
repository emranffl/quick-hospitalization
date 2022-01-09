(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[933],{8794:function(e,t,r){"use strict";r.r(t);var n=r(5861),s=r(7757),o=r.n(s),a=r(9008),c=r(1664),i=r(4598),l=r(9755),d=r.n(l),u=r(2428),m=r(7294),x=r(1163),p=r(5893);t.default=function(){var e=(0,m.useContext)(u.D).setDoctorContext;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.default,{children:(0,p.jsx)("title",{children:"Doctor Login | Quick Hospitalization"})}),(0,p.jsxs)("main",{className:"card m-auto shadow-lg",style:{maxWidth:"330px"},children:[(0,p.jsx)("i",{className:"bi bi-person mx-auto mt-5 mb-2 h3 text-success"}),(0,p.jsx)("h6",{className:"mx-auto",children:"Login"}),(0,p.jsx)("div",{className:"card-body",children:(0,p.jsxs)("form",{className:"d-flex flex-column",onSubmit:function(e){e.preventDefault(),e.stopPropagation()},children:[(0,p.jsxs)("div",{className:"form-group",children:[(0,p.jsx)("label",{className:"text-secondary",htmlFor:"mobile",children:"Email *"}),(0,p.jsx)("input",{type:"email",className:"form-control",placeholder:"E.g.: doctor@example.com",onInput:function(e){return e.target.value=e.target.value.slice(0,50)},required:!0,id:"email"}),(0,p.jsx)("small",{id:"emailErr",className:"form-text text-danger"})]}),(0,p.jsxs)("div",{className:"form-group mt-1",children:[(0,p.jsx)("label",{className:"text-secondary",htmlFor:"password",children:"Password *"}),(0,p.jsx)("input",{type:"password",className:"form-control",placeholder:"4 - 25 characters",onInput:function(e){return e.target.value=e.target.value.slice(0,25)},id:"password",required:!0}),(0,p.jsx)("small",{id:"passwordErr",className:"form-text text-danger ps-1"})]}),(0,p.jsx)("button",{type:"submit",className:"btn btn-sm btn-success mx-auto",onClick:function(){var t=(0,n.Z)(o().mark((function t(r){var n;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={email:d()("#email").val(),password:d()("#password").val()},t.next=3,fetch("/api/doctorlogin",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({data:n}),redirect:"follow"}).then((function(e){return e.json()})).then((function(t){console.log(t);var r={email:!1,password:!1};void 0!=t.doctor?(d()("#emailErr").text(t.doctor),r.email=!0):void 0!=t.pass?(d()("#passwordErr").text(t.pass),r.password=!0):(e(t),x.default.replace(i.Links.Doctor.dashboard+"?doctor=".concat(t.email),i.Links.Doctor.dashboard)),Object.keys(r).map((function(e){0==r[e]&&d()("#"+e+"Err").text("")}))})).catch((function(e){console.error(e)}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),children:"Login"}),(0,p.jsx)("small",{className:"text-secondary mt-2",children:"* - required"}),(0,p.jsx)("div",{className:"text-secondary mt-2 text-center",children:(0,p.jsxs)("small",{children:["Need an account?",(0,p.jsx)(c.default,{href:i.Links.Doctor.signup,children:(0,p.jsx)("a",{className:"text-decoration-none fw-bold",children:"\xa0Sign Up\xa0"})}),(0,p.jsx)("strong",{children:"|"}),(0,p.jsx)(c.default,{href:i.Links.App.recover+"?account=doctor",children:(0,p.jsx)("a",{className:"text-decoration-none fw-bold",children:"\xa0Forgot Password?"})})]})})]})})]})]})}},6887:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/doctor/login",function(){return r(8794)}])},5861:function(e,t,r){"use strict";function n(e,t,r,n,s,o,a){try{var c=e[o](a),i=c.value}catch(l){return void r(l)}c.done?t(i):Promise.resolve(i).then(n,s)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(s,o){var a=e.apply(t,r);function c(e){n(a,s,o,c,i,"next",e)}function i(e){n(a,s,o,c,i,"throw",e)}c(void 0)}))}}r.d(t,{Z:function(){return s}})}},function(e){e.O(0,[774,888,179],(function(){return t=6887,e(e.s=t);var t}));var t=e.O();_N_E=t}]);