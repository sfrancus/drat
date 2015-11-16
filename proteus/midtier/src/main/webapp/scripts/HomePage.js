var file = null;
var stateOfTextArea = false;
  $("input[name='attachment[]']").change(function() {
      var fileName = $(this).val();
      $("#file-name").html("<strong>Path</strong>: " + fileName + "<a href='' class='x-link'><span class='glyphicon glyphicon-remove pull-right remove-icon'></span></a>");
       file = event.target.files[0]; 

      $("#remote_repository").prop('disabled', true);
      stateOfTextArea = $("#remote_repository").prop('disabled');
  });
  $(".x-link").click(function() {
      $("#file-name").html('');
      $("#remote_repository").removeAttr('disabled');
  });


  angular
      .module('drat', ['ui.bootstrap'])
      .controller('switch', ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log) {

//          $scope.max = 100;

          // this indicates which step the app is on
          $scope.value = 0;
          $scope.steps = ['Starting..'];
           //if after reduce, it goes back to 'Idle', that means it's finished
          $scope.showLogsBox = false; // shows logs
          $scope.animationsEnabled = true;
          $scope.scanStatus = "Scanned Files";


          // scanned list array
          $scope.arrayOfScannedFiles = [];
          // this will return true once the log is available
          $scope.readOrNot = true;

          var colorArray = ['#FFAD5C', '#4093E6', '#FF7373', '#58C658', '#33ADD6', '#B56C6C', '#B8B800'];
          $scope.colorFunction = function() {
              return function(d, i) {
                  return colorArray[i];
              };
          }


           var  idOfCommand ='go';

            $scope.setId = function(id) {
                idOfCommand = id;
            }

            $scope.getId = function() {
                return idOfCommand;
            }

            $scope.listOfAvailableCommands = [
                {
                    id: 'go',
                    name: 'Go'
                },
                {
                    id: 'index',
                    name: 'Index'
                },
                {
                     id: 'map',
                     name: 'Map'
                },
                {
                    id: 'reduce',
                    name: 'Reduce'
                },
                {
                    id: 'crawl',
                    name: 'Crawl'
                }
            ]


          $scope.options = {
              chart: {
                  type: 'pieChart',
                  height: 300,
                  x: function(d) {
                      return d.key;
                  },
                  y: function(d) {
                      return d.y;
                  },
                  showLabels: true,
                  transitionDuration: 500,
                  labelThreshold: 0.05,
                  donut: true,
                  donutRatio: 0.30,
                  showLabels: true,
                  color: $scope.colorFunction(),
                  labelType: "percent2digits",
                  donutLabelsOutside: true,
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

          $scope.data = [{
              key: "csv",
              y: 72.5
          }, {
              key: "json",
              y: 12
          }, {
              key: "text",
              y: 17.5
          }];

          $scope.xFunction = function() {
              return function(d) {
                  return d.key;
              };
          }
          $scope.yFunction = function() {
              return function(d) {
                  return d.y;
              };
          }

          $scope.chartOptions = {
              chart: {
                  type: 'discreteBarChart',
                  height: 250,
                  margin: {
                      top: 5,
                      right: 0,
                      bottom: 15,
                      left: 0
                  },
                  //xAxisTickFormat: $scope.yAxisFormatFunction(),
                  x: function(d) {
                      return d.label;
                  },
                  y: function(d) {
                      return d.value;
                  },
                  color: $scope.colorFunction(),
                  showValues: true,
                  valueFormat: function(d) {
                      return d3.format('.2f')(d) + '%';
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

          $scope.chartData = [{
              key: "Cumulative Return",
              values: [{
                  "label": "GPL",
                  "value": 72.5
              }, {
                  "label": "MIT",
                  "value": 12
              }, {
                  "label": "Restricted",
                  "value": 17.5
              }, {
                  "label": "Other",
                  "value": 17.5
              }, ]
          }]

          $scope.memorySize = 0;
          $scope.numberOfFiles = 0;
          $scope.numOfRatRunning = 0;
          $scope.numORatFinished = 0;
          $scope.numOfRatfailed = 0;


//        $scope.uploadFile = function(files) {
//            var fd = new FormData();
//            //Take the first selected file
//            fd.append("file", files[0]);
//
//            $http.post(uploadUrl, fd, {
//                withCredentials: true,
//                headers: {'Content-Type': undefined },
//                transformRequest: angular.identity
//            }).success( ...all right!... ).error( ..damn!... );
//
//        };




         $scope.runDrat = function(cmd, zipFile) {
            var run = null;
            var path = "";

            if(stateOfTextArea === true) {
                   zipFile = file;
                   console.log(cmd + " ---> command");
                   console.log(zipFile);

                             // console.log(fd);
                   $scope.goSecondPage = true;
                   var run = {
                              method: 'POST',
                              url: '/drat/' + cmd,
                              data: {
                                 zipFile: zipFile //dir path
                              }
                   }
            }
            else if(stateOfTextArea === false) {
                   path = $('input').val();
                   console.log(path);
                   console.log(cmd);

                   $scope.goSecondPage = true;
                   var run = {
                          method: 'POST',
                          url: '/drat/' + cmd,
                          data: {
                               dirPath: path //dir path
                          }
                   }

            }


              $http(run).then(function() {});

              setTimeout(function() {
                  getHealthMonitorService();
                  checkingDratStatus();
              }, 2000);


              // get the list of unapproved list
              getUnapprovedList();

              var checkingDrat;

              var sizePayload = $http({
                  method: "GET",
                  url: "/service/repo/size?dir=" + path
              }).success(function(response) {
                  $scope.memorySize = response.memorySize;
                  $scope.numberOfFiles = response.numberOfFiles;
              });

          };

         // sets the data in the Modal depending on the user's choice of the rat instance
         $scope.modalObject = null;
         var rightIndex = 0;
         $scope.openModal = function(id) {
            for(var i = 1; i <= $scope.ratInstances.length; i++) {
                if(id === i) {
                    rightIndex = i - 1;
                     $scope.modalObject = $scope.ratInstances[rightIndex];

                }
            }
         }

          $scope.ratInstances = null;

          // get the list of logs
          function getUnapprovedList () {
                var recent = $http({
                     method: "GET",
                     url: 'service/repo/licenses/unapproved'
                })
                .then(function(response) {
                    console.log(response.data);
                    $scope.ratInstances = response.data;
                });
          };



          function getHealthMonitorService() {
              var recent = $http({
                      method: "GET",
                      url: '/service/status/oodt/raw'
                  })
                  .then(function(response) {
                      var temp = response.data.report.jobHealth;
                      for (var i = 0; i < temp.length; i++) {
                          if (temp[i].state == "PGE EXEC") {
                              $scope.numOfRatRunning = temp[i].numJobs;
                          } else if (temp[i].state == "FINISHED") {
                              $scope.numORatFinished = temp[i].numJobs;
                              $scope.scanStatus = "Failed RAT Instances";
                          }
                      }
                  });

          };

          function checkingDratStatus() {
              checkingDrat = setInterval(function() {
                  getDratStatus();
                  getHealthMonitorService();
                  if ($scope.steps[0] == "Crawling") {
                      getRecentIngestedFiles();
                  }
              }, 2000);

          };

          function showLogsDiv () {
            $scope.showLogsBox = true;
          }




          function getDratStatus() {


              var recent = $http({
                      method: "GET",
                      url: '/service/status/drat'
                  })
                  .then(function(response) {
                      var res = response

                      if (response.data.currentState == "CRAWL") {
                          $scope.value = 0;
                          $scope.steps[0] = "Crawling";
                      } else if (response.data.currentState == "INDEX") {
                          $scope.value = 25;
                          $scope.steps[0] = "Indexing";
                      } else if (response.data.currentState == "MAP") {
                          $scope.value = 50;
                          $scope.steps[0] = "Mapping";
                      } else if (response.data.currentState == "REDUCE") {
                          $scope.value = 75;
                          $scope.steps[0] = "Reducing";
                          $scope.reduced = true;
                      } else if (response.data.currentState == "IDLE") {
                          if ($scope.reduced) {
                              $scope.value = 100;
                              $scope.steps[0] = "Completed";
                              setTimeout(showLogsDiv, 2000)
                          }

                      }
                      $scope.dynamic = $scope.value;

                      //if IDLE
                      //  clearInterval(checkingDrat);
                  });



          };

          function getRecentIngestedFiles() {
              var recent = $http({
                      method: "GET",
                      url: '/service/products'
                  })
                  .then(function(response) {
                      $scope.arrayOfScannedFiles = [];
                      for (var i = 0; i < response.data.length; i++) {
                          var payload = {
                              listId: i,
                              listName: response.data[i].title
                          };
                          $scope.arrayOfScannedFiles[i] = payload;
                      }
                  });
          };


//           // javascript for file chooser  
//            window.testsCount = 0; 
//            zip.useWebWorkers = false; 
//
//            var testZip = function (blob, callback) { 
//              console.log(blob); 
//              // the zip will be stored into a Blob object (zippedBlob) 
//               zipBlob("lorem.txt", blob, function (zippedBlob) { 
//
//                function zipBlob(filename, blob, callback) { 
//                // use a zip.BlobWriter object to write zipped data into a Blob object 
//                zip.createWriter(new zip.BlobWriter("application/zip"), function (zipWriter)
//                {                            // use a BlobReader object to read the data stored into blob variable   
//                     var sendZip = { 
//                             method: 'POST', 
//                             url: '/drat/go', 
//                             data: { 
//                               file: new zip.BlobReader(blob) 
//                             } 
//                      }  
//                      //send zip
//                     $http(sendZip).then(function() {
//                           console.log('uploaded'); 
//                          zipWriter.close(callback); 
//                      });    
//                   }, onerror); 
//              }  
//            };



      }])