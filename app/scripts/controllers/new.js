/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('NewCtrl', function ($scope, $rootScope, $routeParams, Notification, GuestbookService) {
  	$scope.kioskMode = false;
    //Get the selected group from the route parameters and set it in the scope
    var groupId = $routeParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Default guestbook settings
    $scope.guestbook = {
    	created_at: moment().format(),
        group_id: parseInt(groupId),
        track_sign_out: false,
        title: ''
    };

    /**
     * Creates a new guestbook on the Firebase
     */
    $scope.createGuestbook = function() {
    	GuestbookService.add($scope.guestbook, groupId).then(function(response) {
    		console.log(response);
    		var timeclockId = response.key();
    		//Redirect and notify
    		$scope.go('/'+groupId+'/guestbook/'+timeclockId);
    		Notification.show('Your guestbook has been created successfully!', 'success');
    	}, function(error) {
    		console.log('Create Guestbook Error', error);
    		Notification.show('There was an error creating your guestbook.', 'error');
    	});
    };
  });
