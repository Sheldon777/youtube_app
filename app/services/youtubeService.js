angular.module('myApp')
.service('youtubeService', function ($http) {
	var object = {};

	object.findVideos = function(videoName,pageToken,callback){
	var apiKey = 'AIzaSyA9v8p_1cnJ2iWm2xSEKdNm2wW0U-4X9eM';
	   		gapi.client.setApiKey(apiKey);
	        gapi.client.load('youtube', 'v3', function() {
	            gapi.client.youtube.search.list({
				   part: "snippet",
				   type:"video",
				   q: videoName,	
				   maxResults : 5,
				   pageToken : pageToken
				})
				.then(function(response){
					callback(response.result)
				})

	        })

	}

	return object
})