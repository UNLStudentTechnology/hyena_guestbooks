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
    $scope.kioskMode = false;
    $scope.moment = moment;
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
        $scope.signinForm.$setUntouched();
        Notification.show('You have been clocked in successfully!', 'success');
      }, function(error) {
        console.error(error);
        Notification.show(error.data, 'error');
      });
    };
  });
