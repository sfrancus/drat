angular
  .module('drat', ['ngAnimate', 'ui.bootstrap'])
  .controller('switch', ['$scope', function($scope){
      $scope.goToTwo = function() {
        console.log("goes");
      }
      $scope.max = 100;

      $scope.generateProgress = function() {
        var value = 80;

        $scope.dynamic = value;
      }
      $scope.generateProgress();

  }])
