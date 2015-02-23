'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
