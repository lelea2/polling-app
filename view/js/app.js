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
  $scope.formData = {}; //Model bind to form creation for new vote
  $scope.voteData = {}; //Model bind to vote data submission
  $scope.hiddenrows = [];

  getPollData();

  function getPollData() {
    $http.get('./polls').success(function(response) {
      $scope.pollData = response.data;
    });
  }

  //Handle create poll
  $scope.submitPoll = function(ev) {
    console.log('form polling');
    var data = {
      'question' : $scope.formData.pollQuestion,
      'polls' : [{
        'option' : $scope.formData.pollOption1, 'vote' : 0
      },{
        'option' : $scope.formData.pollOption2, 'vote' : 0
      },{
        'option' : $scope.formData.pollOption3, 'vote' : 0
      }]
    };
    var message = {'title' : '', 'message' : ''};
    $http.post('/polls', data).success(function(response) {
      if(response.responseCode === 0) {
        message.title = 'Success !';
        message.message = 'Poll is successfully created';
        data['id'] = response.data.generated_keys[0];
        $scope.pollData.push(data);
      } else {
        message.title = 'Error !';
        message.message = 'There is some error happened creating poll';
      }
      // $mdDialog.show(
      //   $mdDialog.alert()
      //     .parent(angular.element(document.querySelector('#popupContainer')))
      //     .clickOutsideToClose(true)
      //     .title(message.title)
      //     .textContent(message.message)
      //     .ok('Got it!')
      //     .targetEvent(ev)
      // );
    });
  }

  //Handle update vote
  $scope.updateVote = function(index) {
    var data = {
      'id' : $scope.pollData[index].id,
      'option' : $scope.pollData[index].selected
    };
    $http.put('/polls', data).success(function(response) {
      if(response.responseCode === 0) {
        $scope.hiddenrows.push(index);
      } else { //error
      }
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
