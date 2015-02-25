'use strict';

/**
 * @ngdoc function
 * @name hyenaGuestbooksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hyenaGuestbooksApp
 */
angular.module('hyenaGuestbooksApp')
  .controller('MainCtrl', function ($scope, $rootScope, $stateParams, GuestbookService, FirebaseGroupService) {
    //Get the selected group from the route parameters and set it in the scope
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Check and see if the group exists in the Firebase, if not, add it.
    if(angular.isDefined(groupId) && groupId !== "")
      FirebaseGroupService.existsOrAdd(groupId);

  	//Get Assets
    if(groupId !== "")
      $scope.guestbooks = GuestbookService.groupGuestbooks(groupId, 10).$asArray();
  });
