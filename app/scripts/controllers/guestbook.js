/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:GuestbookCtrl
 * @description
 * # GuestbookCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('GuestbookCtrl', function ($scope, $rootScope, $stateParams, GuestbookService, Notification) {
    console.log($scope.currentUser);
    $scope.kioskMode = false;
    $scope.moment = moment;
    $scope.sortField = 'start_at';
    $scope.sortDirection = true;

    //Get and set the current group ID
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;
    //Get guestbook id
    var guestbookId = $scope.guestbookId = $stateParams.guestbookId;

    //Get guestbook
    var guestbook = GuestbookService.get(guestbookId).$asObject();
    guestbook.$bindTo($scope, 'guestbook');

    //Get signins
    $scope.signins = GuestbookService.signins(guestbookId).$asArray();
    //Set export headers
    $scope.exportHeaders = ['BB Username', 'First Namwe', 'Last Name', 'Date/Time Entered', 'Date/Time Left'];

    /**
     * Changes the sort direction for the checkin list
     */
    $scope.toggleSort = function() {
      $scope.sortDirection = !$scope.sortDirection;
    };

    /**
     * Toggles kiosk mode, an interface for direct customer use.
     */
    $scope.showKioskMode = function() {
      $scope.hideMainDrawer();
      $scope.kioskMode = true;
    };

    $scope.hideKioskMode = function() {
      $scope.showMainDrawer();
      $scope.kioskMode = false;
    };

    $scope.signInUser = function() {
      GuestbookService.signIn(guestbookId, $scope.signinNcard).then(function(response) {
        $scope.signinNcard = "";
        $scope.signinUserForm.$setUntouched();
        Notification.show('You have been signed in successfully!', 'success');
      }, function(error) {
        console.error(error);
        Notification.show(error.data.message, 'error');
      });
    };

    $scope.exportData = function() {
      return GuestbookService.exportData($scope.signins);
    };
  });
