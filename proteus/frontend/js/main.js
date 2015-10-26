angular
  .module('drat', ['ngAnimate', 'ui.bootstrap', 'nvd3'])
  .controller('switch', ['$scope', function($scope){
      $scope.goToTwo = function() {
        console.log("goes");
      }
      $scope.max = 100;

      $scope.generateProgress = function() {
        $scope.value = 60;

        $scope.dynamic = $scope.value;
      }
      $scope.generateProgress();



      $scope.options = {
          chart: {
              type: 'pieChart',
              height: 250,
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: true,
              transitionDuration: 500,
              labelThreshold: 0.05,
              legend: {
                  margin: {
                      top: 5,
                      right: 0,
                      bottom: 0,
                      left: 0
                  }
              }
          }
      };

      $scope.data = [
          {
              key: "csv",
              y: 72.5
          },
          {
              key: "json",
              y: 12
          },
          {
              key: "text",
              y: 17.5
          }
      ];


      $scope.chartOptions = {
            chart: {
                type: 'discreteBarChart',
                height: 250,
                margin : {
                    top: 5,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.chartData = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "GPL" ,
                        "value" : 72.5
                    } ,
                    {
                        "label" : "MIT" ,
                        "value" : 12
                    } ,
                    {
                        "label" : "Restricted" ,
                        "value" : 17.5
                    } ,
                    {
                        "label" : "Other" ,
                        "value" : 17.5
                    } ,
                ]
            }
        ]

        $scope.memorySize = 42641;
        $scope.numOfRatRunning = 45;
        $scope.numORatFinished = 24;
        $scope.numOfRatfailed = 21;

  }])
