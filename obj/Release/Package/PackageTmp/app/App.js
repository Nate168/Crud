(function () {
    'use strict';
    var IntranetApp = angular.module('IntranetApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'md.data.table', 'toastr', 'ngMessages'])


    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('light-blue')
          .accentPalette('blue')
        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('yellow')
          .dark();

    })

    IntranetApp.config(function ($stateProvider, $urlRouterProvider) {
 


        //To Redirect
        $urlRouterProvider.otherwise("/");


        //Router View.
        $stateProvider
         .state('/', {
             url: "/",
             templateUrl:"app/views/Main/main.html",
             controller: "mainCtrl"
         })

        //Nav Bar.
        $stateProvider
         .state('nav', {
             url: "/nav",
             templateUrl: "app/views/Menu/nav.html",
             controller: "navCtrl"
         })


        //Router View.
        $stateProvider
          .state('role', {
              url: "/role",
              templateUrl: "app/views/Role/Roles.html",
              controller: "RoleCtrl"
          });
        $stateProvider
             .state('edit', {
                 url: "/edit:Id",
                 templateUrl: "app/views/Role/RoleEdit.html",
                 controller: "RoleCtrl"
             });

        $stateProvider
          .state('roleCreate', {
              url: "/roleCreate",
              templateUrl: "app/partial/roleAdd.html",
              controller: "RoleCtrl"
          })

        //Login
        $stateProvider
         .state('login', {
             url: "/login",
             templateUrl: "app/views/Login/login.html",
             controller: "LoginCtrl"
         })

        $stateProvider
          .state('loginE', {
              url: "/loginE:LoginId",
              templateUrl: "app/views/Login/loginEdit.html",
              controller: "LoginCtrl"
          })


        $stateProvider
        .state('loginCreate', {
            url: "loginCreate",
            templateUrl: "app/partial/LoginAdd.html",
            controller: "LoginCtrl"
        })




        $stateProvider
          .state('create', {
              url: "/create",
              templateUrl: "app/partial/Add.html",
              controller: "PermissionCtrl"
          })
///End



        //Config
        $stateProvider
        .state('config', {
            url: "/config",
            templateUrl: "app/views/Config/config.html",
            controller: "ConfigCtrl"
        })

        $stateProvider
          .state('editconfig', {
              url: "/editconfig:Id",
              templateUrl: "app/views/Config/editConfig.html",
              controller: "ConfigCtrl"
          });


        $stateProvider
        .state('configCreate', {
            url: "configCreate",
            templateUrl: "app/partial/Configuration.html",
            controller: "ConfigCtrl"
        })




        //modeConfig
        $stateProvider
         .state('modeConfig', {
             url: "/modeConfig ",
             templateUrl: "app/views/modeConfig/modeConfig.html",
             controller: "modeConfigCtrl"
         })

        $stateProvider
          .state('modeConfigedit', {
              url: "/modeConfigedit:Id",
              templateUrl: "app/views/modeConfig/modeConfig-edit.html"
           
          });
    
        $stateProvider
         .state('modeConfigcreate', {
             url: "/modeConfigcreate",
             templateUrl: "app/partial/modeConfig-create.html"
           
         })
        //ENd
     


        //Mode
        //$stateProvider
        // .state('mode', {
        //     url: "/mode",
        //     templateUrl: "app/views/Mode/mode.html",
        //     controller: "ModeCtrl"
        // })

        //$stateProvider
        //  .state('editMode', {
        //      url: "/editMode:Id",
        //      templateUrl: "app/views/Mode/modeEdit.html",
        //      controller: "ModeCtrl"
        //  })

        //$stateProvider
        // .state('ModeCreate', {
        //     url: "/ModeCreate",
        //     templateUrl: "app/partial/modeAdd.html",
        //     controller: "ModeCtrl"
        // })


        //Permission
        $stateProvider
         .state('permission', {
             url: "/permission",
             templateUrl: "app/views/Permission/permission.html",
             controller: "PermissionCtrl"
         })

        $stateProvider
          .state('editPermission', {
              url: "/editPermission:Pid",
              templateUrl: "app/views/Permission/permissionEdit.html",
              controller: "PermissionCtrl"
          })


        //Server
        $stateProvider
         .state('server', {
             url: "/server",
             templateUrl: "app/views/Server/server.html",
             controller: "ServerCtrl"
         })

        $stateProvider
          .state('editServer', {
              url: "/editServer:Id",
              templateUrl: "app/views/Server/serverEdit.html",
              controller: "ServerCtrl"
          })


        $stateProvider
        .state('serverCreate', {
            url: "ServerCreate",
            templateUrl: "app/partial/serverAdd.html",
            controller: "ServerCtrl"
        })







    })

    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.brandLabel = 'White Label';
        $rootScope.copyright = 'Copyright &\copy\; ' + new Date().getFullYear() + ' ' + $rootScope.brandLabel;
    }]);




}());

