"use strict";angular.module("hyenaGuestbooksApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","hyenaAngular","angularMoment","ngCsv"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){a.state("unl-layout",{templateUrl:"views/layouts/unl-layout.html",data:{requireAuth:!0}}).state("unl-layout-kiosk",{templateUrl:"views/layouts/unl-layout-kiosk.html"}).state("unl-layout.guestbooks",{url:"/:groupId",templateUrl:"views/main.html",controller:"MainCtrl"}).state("unl-layout.guestbook_new",{url:"/:groupId/guestbook/new",templateUrl:"views/new.html",controller:"NewCtrl"}).state("unl-layout.guestbook_settings",{url:"/:groupId/guestbook/:guestbookId/settings",templateUrl:"views/settings.html",controller:"SettingsCtrl"}).state("unl-layout.guestbook_view",{url:"/:groupId/guestbook/:guestbookId",templateUrl:"views/guestbook.html",controller:"GuestbookCtrl"}).state("unl-layout-kiosk.guestbook_kiosk",{url:"/:groupId/guestbook/:guestbookId/kiosk",templateUrl:"views/guestbook_kiosk.html",controller:"KioskCtrl",data:{requireAuth:!1}}),b.otherwise("/"),c.html5Mode(!0)}]).config(["$httpProvider",function(a){a.interceptors.push(["$injector",function(a){return a.get("AuthInterceptor")}])}]).constant("FBURL","https://hive-guestbooks.firebaseio.com/").constant("APIKEY","NDI3MDdjMjc2MjM4OTJhNWIwOWJjMzA1").constant("APIPATH","http://st-studio.unl.edu/hyena_platform/public/api/1.0/").constant("PLATFORM_ROOT","http://st-studio.unl.edu/hyena_platform/public/").constant("AUTH_SCOPE","groups"),angular.module("hyenaGuestbooksApp").service("GuestbookService",["$firebase","$q","AppFirebase","UserService",function(a,b,c,d){var e=c.getRef(),f={get:function(b){return b=b.trim(),a(e.child("/guestbooks/"+b))},groupGuestbooks:function(b,c){c=c||20,b=parseInt(b);var d=e.child("guestbooks").orderByChild("group_id").equalTo(b).limitToFirst(c);return a(d)},add:function(b,c){return a(e.child("guestbooks")).$push(b).then(function(b){return a(e.child("/groups/"+c+"/guestbooks")).$set(b.key(),!0),b})},signins:function(b){return a(e.child("/signins").orderByChild("guestbook_id").equalTo(b))},signIn:function(c,f,g){var h=b.defer(),i=null,j=null;return d.validate(f).then(function(b){i=b.data.users_validated[0],j={start_at:moment().format(),guestbook_id:c,topic_id:g||null,user:i},h.resolve(a(e.child("/signins")).$push(j))},function(a){h.reject(a)}),h.promise},addTopic:function(b,c){if(null===b)return!1;var d={created_at:moment().format(),title:b};return a(e.child("/guestbooks/"+c+"/topics")).$push(d)},exportData:function(a){console.log(a),a=angular.copy(a);for(var b=[],c=0;c<a.length;c++){var d=a[c];b.push({username:d.user.uni_auth,first_name:d.user.first_name,last_name:d.user.last_name,time_entered:moment(d.start_at).format("M/D/YYYY h:mm a"),time_left:d.end_at?moment(d.end_at).format("M/D/YYYY h:mm a"):"N/A"})}return b}};return f}]),angular.module("hyenaGuestbooksApp").controller("MainCtrl",["$scope","$rootScope","$stateParams","GuestbookService","FirebaseGroupService",function(a,b,c,d,e){var f=c.groupId;a.groupId=b.currentGroupId=f,angular.isDefined(f)&&""!==f&&e.existsOrAdd(f),""!==f&&(a.guestbooks=d.groupGuestbooks(f,10).$asArray())}]),angular.module("hyenaGuestbooksApp").controller("NewCtrl",["$scope","$rootScope","$stateParams","Notification","GuestbookService",function(a,b,c,d,e){a.kioskMode=!1;var f=c.groupId;a.groupId=b.currentGroupId=f,a.guestbook={created_at:moment().format(),group_id:parseInt(f),track_sign_out:!1,title:""},a.createGuestbook=function(){e.add(a.guestbook,f).then(function(b){console.log(b);var c=b.key();a.go("/"+f+"/guestbook/"+c),d.show("Your guestbook has been created successfully!","success")},function(a){console.log("Create Guestbook Error",a),d.show("There was an error creating your guestbook.","error")})}}]),angular.module("hyenaGuestbooksApp").controller("GuestbookCtrl",["$scope","$rootScope","$stateParams","GuestbookService","Notification",function(a,b,c,d,e){console.log(a.currentUser),a.kioskMode=!1,a.moment=moment,a.sortField="start_at",a.sortDirection=!0;var f=c.groupId;a.groupId=b.currentGroupId=f;var g=a.guestbookId=c.guestbookId,h=d.get(g).$asObject();h.$bindTo(a,"guestbook"),a.signins=d.signins(g).$asArray(),a.exportHeaders=["BB Username","First Namwe","Last Name","Date/Time Entered","Date/Time Left"],a.toggleSort=function(){a.sortDirection=!a.sortDirection},a.showKioskMode=function(){a.hideMainDrawer(),a.kioskMode=!0},a.hideKioskMode=function(){a.showMainDrawer(),a.kioskMode=!1},a.signInUser=function(){d.signIn(g,a.signinNcard).then(function(){a.signinNcard="",a.signinUserForm.$setUntouched(),e.show("You have been signed in successfully!","success")},function(a){console.error(a),e.show(a.data.message,"error")})},a.exportData=function(){return d.exportData(a.signins)}}]),angular.module("hyenaGuestbooksApp").controller("KioskCtrl",["$scope","$rootScope","$stateParams","GuestbookService","Notification",function(a,b,c,d,e){a.kioskMode=!1,a.moment=moment;var f=c.groupId;a.groupId=b.currentGroupId=f;var g=a.guestbookId=c.guestbookId,h=d.get(g).$asObject();h.$bindTo(a,"guestbook"),h.$loaded().then(function(){b.appLoaded=!0}),a.signInUser=function(){d.signIn(g,a.signinNcard,a.serviceId).then(function(){a.signinNcard="",a.signinUserForm.$setUntouched(),a.signinUserForm.$setPristine(),e.show("You have been signed in successfully!","success")},function(a){console.error(a),e.show(a.data.message,"error")})}}]),angular.module("hyenaGuestbooksApp").controller("SettingsCtrl",["$scope","$rootScope","$stateParams","GuestbookService","Notification",function(a,b,c,d,e){var f=c.groupId;a.groupId=b.currentGroupId=f;var g=a.guestbookId=c.guestbookId,h=d.get(g).$asObject();h.$bindTo(a,"guestbook"),a.addTopic=function(){d.addTopic(a.newTopicTitle,g).then(function(){e.show("Topic has been added successfully!","success")})},a.removeTopic=function(b){delete a.guestbook.topics[b],e.show("Topic removed successfully!","success")}}]);