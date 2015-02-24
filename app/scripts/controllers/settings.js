'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, $routeParams, GuestbookService) {
  	//Get and set the current group ID
  	var groupId = $routeParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get guestbook id
  	var guestbookId = $scope.guestbookId = $routeParams.guestbookId;

  	//Get guestbook
  	var guestbook = GuestbookService.get(guestbookId).$asObject();
  	guestbook.$bindTo($scope, 'guestbook');
  });