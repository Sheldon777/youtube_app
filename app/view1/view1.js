'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope,$http,$sce,youtubeService) {

	$scope.showVideo = function(id){
		$scope.videoId = "http://www.youtube.com/v/" + id + "?autoplay=1";
	}

	$scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

	$scope.searchVideo = function(pageToken){
		if (!pageToken) pageToken = "";
		youtubeService.findVideos($scope.searchText,pageToken,function(response){
			console.log(response)
			$scope.nextPageToken = response.nextPageToken;
			$scope.prevPageToken = response.prevPageToken;
			$scope.items = response.items;
			$scope.$digest();
		})
	}

	$scope.changePage = function(action){
		var pageToken = action == "up" ? $scope.prevPageToken : $scope.nextPageToken;
		$scope.searchVideo(pageToken)
	}


});