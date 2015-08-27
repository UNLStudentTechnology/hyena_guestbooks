'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, $stateParams, GuestbookService, Notification) {
  	//Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get guestbook id
  	var guestbookId = $scope.guestbookId = $stateParams.guestbookId;

  	//Get guestbook
  	var guestbook = GuestbookService.get(guestbookId).$asObject();
  	guestbook.$bindTo($scope, 'guestbook');

    $scope.addTopic = function () {
      GuestbookService.addTopic($scope.newTopicTitle, guestbookId).then(function(response) {
        Notification.show('Topic has been added successfully!', 'success');
      });
    };

    $scope.removeTopic = function(key) {
      delete $scope.guestbook.topics[key];
      Notification.show('Topic removed successfully!', 'success');
    };
  });