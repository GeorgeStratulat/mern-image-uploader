(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{18:function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e.alert="ALERT",e.resetAlert="RESET_ALERT",e.registerUser="REGISTER_USER",e.loginUser="LOGIN_USER",e.persistUser="PERSIST_USER",e.logoutUser="LOGOUT_USER",e.changePassword="CHANGE_PASSWORD"}(n||(n={}))},23:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return o}));var n,r=a(18);!function(e){e.success="success",e.error="error",e.info="info",e.warning="warning"}(n||(n={}));var s=function(e,t){return function(a){a({type:r.a.alert,payload:{msg:e,alertType:t}})}},o=function(){return function(e){e({type:r.a.resetAlert})}}},3:function(e,t,a){"use strict";var n=a(18);a.d(t,"ActionTypes",(function(){return n.a}));var r=a(42);a.o(r,"AlertType")&&a.d(t,"AlertType",(function(){return r.AlertType})),a.o(r,"getLogout")&&a.d(t,"getLogout",(function(){return r.getLogout})),a.o(r,"postLogin")&&a.d(t,"postLogin",(function(){return r.postLogin})),a.o(r,"registerUser")&&a.d(t,"registerUser",(function(){return r.registerUser})),a.o(r,"resetAlert")&&a.d(t,"resetAlert",(function(){return r.resetAlert})),a.o(r,"setAlert")&&a.d(t,"setAlert",(function(){return r.setAlert}));var s=a(54);a.d(t,"getLogout",(function(){return s.a})),a.d(t,"postLogin",(function(){return s.b})),a.d(t,"registerUser",(function(){return s.c}));var o=a(23);a.d(t,"AlertType",(function(){return o.a})),a.d(t,"resetAlert",(function(){return o.b})),a.d(t,"setAlert",(function(){return o.c}))},34:function(e,t,a){e.exports={spinner:"Spinner_spinner__1ZL2o",cube1:"Spinner_cube1__3ZzBy",cube2:"Spinner_cube2__1rzYR","sk-cubemove":"Spinner_sk-cubemove__2tIgK"}},42:function(e,t){},54:function(e,t,a){"use strict";var n=a(20),r=a.n(n),s=a(27),o=a(16),c=a.n(o),i=a(18),l=a(3),u=function(e){return function(){var t=Object(s.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(a).catch((function(e){if(console.error(e),e.response){if(401!==e.response.status&&403!==e.response.status||a({type:i.a.logoutUser}),500===e.response.status)return a(Object(l.setAlert)("Unfortunately there's a problem in our end...",l.AlertType.error));var t=e.response.data;a(Object(l.setAlert)(t.message,l.AlertType.error))}}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},p=a(23);a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return f}));var m=function(e,t){return u(function(){var a=Object(s.a)(r.a.mark((function a(n){var s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("logging in with ",e),a.next=3,c.a.post("/api/auth/login",{email:e,password:t});case 3:s=a.sent,console.log("login response",s),n({type:i.a.loginUser,payload:s.data}),n(Object(p.c)("".concat(s.data.email," successfully logged in"),p.a.success));case 7:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())},d=function(){return u(function(){var e=Object(s.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("/api/auth/logout");case 2:t({type:i.a.logoutUser});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},f=function(e){return u(function(){var t=Object(s.a)(r.a.mark((function t(a){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.post("/api/users/register",e);case 2:n=t.sent,a({type:i.a.registerUser,payload:n.data}),a(Object(p.c)("Welcome! You have been successfully registered!",p.a.success));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},60:function(e,t,a){e.exports=a(95)},95:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(25),o=a.n(s),c=a(10),i=a(11),l=(a(69),a(96),a(5)),u=a(6),p=a(8),m=a(7),d=a(9),f=a(3),h=a(19),g=a(16),b=a.n(g),v=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.isAuthenticated&&b.a.get("/api/auth/isloggedin").then((function(t){t.data||e.props.sessionExpired()})).catch((function(t){console.error(t),e.props.sessionExpired()}))}},{key:"componentDidUpdate",value:function(){var e=this;this.props.isAuthenticated&&b.a.get("/api/auth/isloggedin").then((function(t){!1===t.data&&e.props.sessionExpired()})).catch((function(t){console.error(t),e.props.sessionExpired()}))}},{key:"render",value:function(){return this.props.isAuthenticated?r.a.createElement(h.b,this.props):r.a.createElement(h.a,{to:"/login"})}}]),t}(h.b),y=Object(c.b)(null,(function(e){return{sessionExpired:function(){return e({type:f.ActionTypes.logoutUser})}}}))(v),O=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-10 col-xl-9 mx-auto"},r.a.createElement("div",{className:"card card-signin flex-row my-5"},r.a.createElement("div",{className:"card-img-left d-none d-md-flex"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title text-center"},"Home"),r.a.createElement("p",{className:"centered-p"},"Don't have an account? ",r.a.createElement(i.b,{to:"/register"},"Sign up")),r.a.createElement("p",{className:"centered-p"},"Already have an account? ",r.a.createElement(i.b,{to:"/login"},"Sign in")))))))}}]),t}(n.Component),E=a(26),j=a(34),w=a.n(j),A=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:w.a.spinner},r.a.createElement("div",{className:w.a.cube1}),r.a.createElement("div",{className:w.a.cube2}))}}]),t}(n.Component);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var S=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",loading:!1,pathname:a.props.history.location.pathname},a.handleChange=function(e){a.setState(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(a,!0).forEach((function(t){Object(E.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a.state,Object(E.a)({},e.target.name,e.target.value)))},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.email,r=t.password;a.setState({loading:!0}),a.props.postLogin(n,r).then((function(e){a.props.history.location.pathname===a.state.pathname&&a.setState({email:"",password:"",loading:!1})}))},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-10 col-xl-9 mx-auto"},r.a.createElement("div",{className:"card card-signin flex-row my-5"},r.a.createElement("div",{className:"card-img-left d-none d-md-flex"}),this.state.loading?r.a.createElement(A,null):r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title text-center"},"Login"),r.a.createElement("form",{className:"form-signin",onSubmit:this.handleSubmit},r.a.createElement("input",{type:"email",className:"form-control",name:"email",value:t,onChange:this.handleChange,placeholder:"Email",required:!0}),r.a.createElement("input",{type:"password",pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",title:"Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters",className:"form-control",name:"password",value:a,onChange:this.handleChange,placeholder:"Password",required:!0}),r.a.createElement("input",{type:"submit",className:"btn btn-primary full-width",value:"Login"})),r.a.createElement("p",{className:"centered-p"},"Don't have an account? ",r.a.createElement(i.b,{to:"/register"},"Sign up")))))))}}]),t}(n.Component),U=Object(c.b)((function(e){return{auth:e.auth}}),{postLogin:f.postLogin})(S),x=a(99),k=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={selectedImage:null,visible:!1,modalImage:"",loading:!1},a.openModal=function(e){a.setState({modalImage:e,visible:!0})},a.hideModal=function(){a.setState({visible:!1})},a.imageSelectHandler=function(e){a.imageUploadHandler(e.target.files[0],e.target.files[0].name)},a.imageUploadHandler=function(e,t){var n=new FormData;n.append("image",e,t),b.a.post("/images/add",n,{onUploadProgress:function(){a.setState({loading:!0})}}).then((function(e){a.props.persistUser(e.data),a.setState({loading:!1})}))},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.auth.currentUser,a=this.state,n=a.visible,s=a.modalImage,o=a.loading;return r.a.createElement("div",{className:"container"},r.a.createElement("h4",{className:"form-label"},"Default file input example"),r.a.createElement("input",{type:"file",className:"form-control",id:"customFile",onChange:this.imageSelectHandler}),o&&r.a.createElement(A,null),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},t&&t.images&&t.images.length>0&&t.images.map((function(t,a){return r.a.createElement("img",{className:"img-thumbnail",src:t,key:a,alt:"icon",onClick:function(){e.openModal(t)}})})))),r.a.createElement(x.a,{size:"xl",show:n,onHide:this.hideModal},r.a.createElement(x.a.Body,null,r.a.createElement("img",{alt:"alt",className:"modal-image",src:s}))))}}]),t}(n.Component),C=Object(c.b)((function(e){return{auth:e.auth,users:e.users,alerts:e.alerts}}),(function(e){return{persistUser:function(t){return e({type:f.ActionTypes.persistUser,payload:t})}}}))(k);function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var T=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",confirmPassword:"",pathname:a.props.history.location.pathname},a.handleChange=function(e){a.setState(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(a,!0).forEach((function(t){Object(E.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a.state,Object(E.a)({},e.target.name,e.target.value)))},a.handleSubmit=function(e){e.preventDefault();var t=document.querySelector("input[name=confirmPassword]");a.state.password!==a.state.confirmPassword&&t?t.setCustomValidity("Passwords don't match"):a.props.registerUser(a.state).then((function(){}))},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.confirmPassword;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-10 col-xl-9 mx-auto"},r.a.createElement("div",{className:"card card-signin flex-row my-5"},r.a.createElement("div",{className:"card-img-left d-none d-md-flex"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title text-center"},"Register"),r.a.createElement("form",{className:"form-signin",onSubmit:this.handleSubmit},r.a.createElement("input",{className:"form-control",name:"email",value:t,onChange:this.handleChange,placeholder:"Email",required:!0}),r.a.createElement("input",{type:"password",className:"form-control",name:"password",value:a,onChange:this.handleChange,pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",title:"Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters",placeholder:"Password",required:!0}),r.a.createElement("input",{type:"password",className:"form-control",name:"confirmPassword",value:n,onChange:this.handleChange,pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",title:"Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters",placeholder:"Confirm password",required:!0}),r.a.createElement("input",{type:"submit",className:"btn btn-primary full-width",value:"Register"})),r.a.createElement("p",{className:"centered-p"},"Already have an account? ",r.a.createElement(i.b,{to:"/login"},"Sign in")))))))}}]),t}(n.Component),D=Object(c.b)((function(e){return{auth:e.auth}}),{registerUser:f.registerUser})(T),L=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(){var e=this;this.props.isAuthenticated&&b.a.get("/api/auth/isloggedin").then((function(t){!1===t.data&&e.props.sessionExpired()}))}},{key:"render",value:function(){return this.props.isAuthenticated?r.a.createElement(h.a,{to:"/dashboard"}):r.a.createElement(h.b,this.props)}}]),t}(n.Component),_=Object(c.b)(null,(function(e){return{sessionExpired:function(){return e({type:f.ActionTypes.logoutUser})}}}))(L),R=[{name:"Home",path:"/",component:O,nav:!0},{name:"Login",path:"/login",component:U,nav:!0},{name:"Register",path:"/register",component:D,nav:!0}],I=[{name:"Dashboard",path:"/dashboard",component:C,nav:!0}],M=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.a.get("/api/auth/isloggedin").then((function(t){t.data?t.data&&e.props.persistUser(t.data):e.props.sessionExpired()})).catch((function(t){console.error(t),e.props.sessionExpired()}))}},{key:"render",value:function(){var e=this;return r.a.createElement(h.d,null,R.map((function(t){return r.a.createElement(_,{key:t.name,isAuthenticated:e.props.auth.isAuthenticated,exact:!0,path:t.path,component:t.component})})),I.map((function(t){return r.a.createElement(y,{key:t.name,isAuthenticated:e.props.auth.isAuthenticated,exact:!0,path:t.path,component:t.component})})))}}]),t}(n.Component),H=Object(c.b)((function(e){return{auth:e.auth,users:e.users,alerts:e.alerts}}),(function(e){return{sessionExpired:function(){return e({type:f.ActionTypes.logoutUser})},persistUser:function(t){return e({type:f.ActionTypes.persistUser,payload:t})}}}))(M),q=function(e){function t(){return Object(l.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=R.filter((function(e){return!1!==e.nav})),t=I.filter((function(e){return!1!==e.nav})),a=this.props.auth.isAuthenticated;return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNavDropdown"},r.a.createElement("ul",{className:"navbar-nav"},a?t.map((function(e){return r.a.createElement("li",{key:e.name},r.a.createElement(i.b,{className:"nav-link",to:e.path},e.name))})):e.map((function(e){return r.a.createElement("li",{className:"nav-item",key:e.name},r.a.createElement(i.b,{className:"nav-link",to:e.path},e.name))})),a&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(i.b,{className:"nav-link",to:"/login",onClick:this.props.getLogout},"Logout")))))}}]),t}(n.Component),z=Object(c.b)((function(e){return{auth:e.auth,users:e.users,alerts:e.alerts}}),{getLogout:f.getLogout})(q),Z=a(31),G=a(35),B=a.n(G),W=(a(94),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={alertIds:[],location:a.props.location},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this;if(this.props.location!==e.location){var a=!0,n=!1,r=void 0;try{for(var s,o=this.state.alertIds[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var c=s.value;G.StatusAlertService.removeAlert(c)}}catch(l){n=!0,r=l}finally{try{a||null==o.return||o.return()}finally{if(n)throw r}}}if(this.props.alerts!==e.alerts){var i=this.state.alertIds;this.props.alerts.forEach((function(e){var a,n=e.msg,r=e.alertType;a=G.StatusAlertService.showAlert(n,r),t.setState({alertIds:[].concat(Object(Z.a)(i),[a])})}))}}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(B.a,null))}}]),t}(n.Component)),F=Object(c.b)((function(e){return{auth:e.auth,users:e.users,alerts:e.alerts}}),{setAlert:f.setAlert,resetAlert:f.resetAlert})(Object(h.g)(W)),J=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(z,null),r.a.createElement(F,null),r.a.createElement(H,null))}}]),t}(n.Component),Y=a(24),K=a(58),V=a(59),Q={currentUser:null,isAuthenticated:!1},X=[],$=[],ee=Object(Y.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f.ActionTypes.loginUser:case f.ActionTypes.persistUser:case f.ActionTypes.registerUser:return{currentUser:t.payload,isAuthenticated:!0};case f.ActionTypes.logoutUser:return{currentUser:null,isAuthenticated:!1};default:return e}},users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;return t.type,e},alerts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f.ActionTypes.alert:return[].concat(Object(Z.a)(e),[t.payload]);case f.ActionTypes.resetAlert:return X;default:return e}}}),te=[V.a],ae=Object(K.composeWithDevTools)({trace:!0}),ne=Object(Y.createStore)(ee,ae(Y.applyMiddleware.apply(void 0,te)));o.a.render(r.a.createElement(c.a,{store:ne},r.a.createElement(i.a,null,r.a.createElement(J,null))),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.f0b7f61e.chunk.js.map