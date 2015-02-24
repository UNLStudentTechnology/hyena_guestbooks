/* global moment */
'use strict';

/**
 * @ngdoc service
 * @name hyenaGuestbooksApp.Guestbook
 * @description
 * # Guestbook
 * Service in the hyenaGuestbooksApp.
 */
angular.module('hyenaGuestbooksApp')
  .service('GuestbookService', function ($firebase, $q, AppFirebase, UserService) {
    var guestbookRef = AppFirebase.getRef();
    
    var GuestbookService =  {
		/**
		* Gets a specific guestbook
		* @param  string guestbookId
		* @return promise
		*/
		get: function getGuestbook(guestbookId) {
			guestbookId = guestbookId.trim();
				return $firebase(guestbookRef.child('/guestbooks/'+guestbookId));
		},
		/**
		* Get all guestbooks associated with a group
		* @param  int groupId Group ID
		* @param  int limit   Number of items to return
		* @return promise
		*/
		groupGuestbooks: function getGroupGuestbooks(groupId, limit) {
			limit = limit || 20;
			groupId = parseInt(groupId);
			var guestbooks = guestbookRef.child('guestbooks').orderByChild("group_id").equalTo(groupId).limitToFirst(limit);
			return $firebase(guestbooks);
		},
		add: function addGuestbook(guestbook, groupId) {
    		return $firebase(guestbookRef.child('guestbooks')).$push(guestbook).then(function(response) {
	          //Add a reference to the group
	          $firebase(guestbookRef.child('/groups/'+groupId+'/guestbooks')).$set(response.key(), true);
	          return response;
	        });
    	},
		signins: function getSignins(guestbookId) {
			return $firebase(guestbookRef.child('/signins').orderByChild("guestbook_id").equalTo(guestbookId));
		},
    	signIn: function signIn(guestbookId, NUID) {
    		var deferred = $q.defer();
    		var userId = null;
        	var signin = null;

        	//Validate NUID and process signin
    		UserService.validate(NUID).then(function(user) {
	          	userId = user.data.users_validated[0]; //Convert NUID to BB
	    		//Create our signin object
	            signin = {
	              'start_at': moment().format(),
	              'guestbook_id': guestbookId,
	              'user': userId
	            };

	    		deferred.resolve($firebase(guestbookRef.child('/signins')).$push(signin));
	    	}, function(error) {
	    		deferred.reject(error);
	    	});

	    	return deferred.promise;
    	}
    };

    return GuestbookService;
  });
