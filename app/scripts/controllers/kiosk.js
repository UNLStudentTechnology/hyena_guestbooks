/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:KioskCtrl
 * @description
 * # KioskCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('KioskCtrl', function ($scope, $rootScope, $stateParams, GuestbookService, Notification) {
    $scope.kioskMode = false;
    $scope.moment = moment;
    $scope.topicId = "";
    //Get and set the current group ID
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;
    //Get guestbook id
    var guestbookId = $scope.guestbookId = $stateParams.guestbookId;

    //Get guestbook
    var guestbook = GuestbookService.get(guestbookId).$asObject();
    guestbook.$bindTo($scope, 'guestbook');

    guestbook.$loaded().then(function (response) {
      $rootScope.appLoaded = true;
    });

    $scope.signInUser = function() {
      console.log($scope.topicId);
      GuestbookService.signIn(guestbookId, $scope.signinNcard, $scope.topicId).then(function(response) {
        $scope.signinNcard = $scope.topicId = "";
        $scope.signinUserForm.$setUntouched();
        $scope.signinUserForm.$setPristine();
        Notification.show('You have been signed in successfully!', 'success');
      }, function(error) {
        console.error(error);
        Notification.show(error.data.message, 'error');
      });
    };

    $scope.change = function () {
      console.log($scope.topicId);
    };
  });
