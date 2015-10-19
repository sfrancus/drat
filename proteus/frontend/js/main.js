angular
  .module('drat', [])
  .controller('switch', ['$scope', function($scope){
      $scope.goToTwo = function() {
        console.log("goes");
      }

  }])