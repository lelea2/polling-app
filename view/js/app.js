var app = angular.module('myApp', ['ngAnimate', 'ngMaterial', 'ngRoute', 'ngMessages']);

app.factory('socket', function() {
  var socket = io.connect('http://localhost:3000');
  return socket;
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
      .when('/', function() {
        templateUrl: 'components/home.html'
      })
      .when('/create', function() {
        templateUrl: 'components/create.html'
      })
      .when('/view', function() {
        templateUrl: 'components/view.html'
      });

  // use the HTML5 History API to remove hash
  $locationProvider.html5Mode(true);

});

app.controller('appController', function($scope, $http, socket) {

  $scope.pollData = [];

  getPollData();

  function getPollData() {
    $http.get('./polls').success(function(response) {
      $scope.pollData = response.data;
    });
  }
});
