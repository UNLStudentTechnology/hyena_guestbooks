'use strict';

/**
 * @ngdoc overview
 * @name hyenaGuestbooksApp
 * @description
 * # hyenaGuestbooksApp
 *
 * Main module of the application.
 */
angular
  .module('hyenaGuestbooksApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'hyenaAngular',
    'angularMoment',
    'ngCsv'
    ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      //Layouts
      .state('unl-layout', {
        templateUrl: 'views/layouts/unl-layout.html',
        data: {
          requireAuth: true
        }
      })
      .state('unl-layout-kiosk', {
        templateUrl: 'views/layouts/unl-layout-kiosk.html'
      })
      //Views
      .state('unl-layout.guestbooks', {
        url: '/:groupId',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('unl-layout.guestbook_new', {
        url: '/:groupId/guestbook/new',
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .state('unl-layout.guestbook_settings', {
        url: '/:groupId/guestbook/:guestbookId/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .state('unl-layout.guestbook_view', {
        url: '/:groupId/guestbook/:guestbookId',
        templateUrl: 'views/guestbook.html',
        controller: 'GuestbookCtrl'
      })
      .state('unl-layout-kiosk.guestbook_kiosk', {
        url: '/:groupId/guestbook/:guestbookId/kiosk',
        templateUrl: 'views/guestbook_kiosk.html',
        controller: 'KioskCtrl',
        data: {
          requireAuth: false
        }
      });
      //Default Route
      $urlRouterProvider.otherwise("/");
      //End Default Route
      
      //Remove # from URLs
      $locationProvider.html5Mode(true);
  })
  .config(function ($httpProvider) {
    //$httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .constant('FBURL', 'https://hive-guestbooks.firebaseio.com/')
  .constant('APIKEY', 'NDI3MDdjMjc2MjM4OTJhNWIwOWJjMzA1')
  .constant('APIPATH', 'http://st-studio.unl.edu/hyena_platform/public/api/1.0/')
  .constant('PLATFORM_ROOT', 'http://st-studio.unl.edu/hyena_platform/public/')
  .constant('AUTH_SCOPE', 'groups');