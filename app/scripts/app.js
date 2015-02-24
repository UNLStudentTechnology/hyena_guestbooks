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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hyenaAngular',
    'angularMoment'
    ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:groupId', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:groupId/guestbook/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .when('/:groupId/guestbook/:guestbookId/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/:groupId/guestbook/:guestbookId', {
        templateUrl: 'views/guestbook.html',
        controller: 'GuestbookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
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
  .constant('FBURL', 'https://hyena-guestbooks.firebaseio.com/')
  .constant('APIKEY', 'NDI3MDdjMjc2MjM4OTJhNWIwOWJjMzA1')
  .constant('APIPATH', 'http://st-studio.unl.edu/hyena_platform/public/api/1.0/')
  .constant('PLATFORM_ROOT', 'http://st-studio.unl.edu/hyena_platform/public/')
  .constant('AUTH_SCOPE', 'groups');