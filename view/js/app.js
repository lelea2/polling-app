//Privde a default state for an app
var app = angular.module('myApp', ['ngRoute', 'ngMessages']);

app.factory('socket', function() {
  var socket = io.connect('http://localhost:3001'); //bind to port that the app is running on
  return socket;
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // console.log($routeProvider);
  $routeProvider
      .when('/', {
        templateUrl: 'components/home.html'
      })
      .when('/create', {
        templateUrl: 'components/create.html'
      })
      .when('/view', {
        templateUrl: 'components/view.html'
      })
      .otherwise({
        templateUrl: 'components/create.html'
      });

  // use the HTML5 History API to remove hash
  $locationProvider.html5Mode(true);
}]);

app.controller('appController', function($scope, $http, socket) {

  $scope.pollData = [];

  getPollData();

  function getPollData() {
    $http.get('./polls').success(function(response) {
      $scope.pollData = response.data;
    });
  }


  //Polling on websocket
  socket.on('changeFeed',function(data) {
    for(var pollCounter = 0 ;pollCounter < $scope.pollData.length; pollCounter++) {
      if($scope.pollData[pollCounter].id === data.id) {
        $scope.pollData[pollCounter].polls = data.polls;
        $scope.$apply();
      }
    }
  });
});
