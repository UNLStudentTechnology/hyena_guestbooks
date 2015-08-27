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
    	signIn: function signIn(guestbookId, NUID, topicId) {
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
            'topic_id': topicId || null,
            'user': userId
          };

	    		deferred.resolve($firebase(guestbookRef.child('/signins')).$push(signin));
	    	}, function(error) {
	    		deferred.reject(error);
	    	});

	    	return deferred.promise;
    	},
      addTopic: function addTopic(name, guestbookId) {
        if(name === null)
          return false;

        var topic = {
          created_at: moment().format(),
          title: name
        };

        return $firebase(guestbookRef.child('/guestbooks/'+guestbookId+'/topics')).$push(topic);
      },
      exportData: function exportData(data, guestbook) {
        console.log(data);
        data = angular.copy(data);
        var exportArray = [];

        for (var i = 0; i < data.length; i++) {
            var currItem = data[i];
            exportArray.push({
              username: currItem.user.uni_auth,
              first_name: currItem.user.first_name,
              last_name: currItem.user.last_name,
              time_entered: moment(currItem.start_at).format('M/D/YYYY h:mm a'),
              time_left: (currItem.end_at ? moment(currItem.end_at).format('M/D/YYYY h:mm a') : 'N/A'),
              topic: (angular.isDefined(guestbook.topics[currItem.topic_id]) ? guestbook.topics[currItem.topic_id].title : 'N/A')
            });
        }

        return exportArray;
      }
    };

    return GuestbookService;
  });
