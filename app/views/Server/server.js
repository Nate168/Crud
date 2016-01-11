(function () {
    'use strict';

    angular.module('IntranetApp')
      .controller('ServerCtrl',['$scope', '$location', '$stateParams', '$http', 'answer', 'toastr',
          function ($scope, $location, $stateParams, $http, answer, toastr) {


          ///Angular Data-table
          $scope.selected = [];
          $scope.array = [];


          //Making the call to get the data;
          $scope.showModal = false;
          $scope.busy = false;
          //Get data
          var main = 'Modeserver';
          var mainEdit = 'Modeserver/';
          var mainUpdate = 'Modeserver/';
          var mainDelete = 'Modeserver/'
          answer.get(main)
            .then(function (response) {
                $scope.results = response.data;

                


               
                //Data for the table
                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1
                };
                //To count the length for the table
                $scope.count = $scope.results.length;

                $scope.onorderchange = function (order) {
                    var deferred = $q.defer();

                    $timeout(function () {
                        deferred.resolve();
                    }, 2000);

                    return deferred.promise;
                };

                //End
            },
          function error(response) {
              console.log(response.data);
              toastr.error(' Something Went Wrong');
          });



          //Edit

          var id = $stateParams.Id;
          if (id === undefined) {
              console.log("id was undefined in server.js edit section");
          } else {
              console.log("id '" + id + "' in server.js edit section");
              answer.Edit(mainEdit, id).then(function (response) {
                  console.log("server.js edit response = ", response);
                  $scope.edit = response.data;
                  console.log("$scope.edit = ", $scope.edit);
         
                  toastr.success('Edit');

              },
                 function error(response) {
                     console.log(response.data);
                     toastr.error(' Something Went Wrong');
                 });
          }

          
        // Add
          $scope.add = function (create) {
          $scope.create.CreatedBy = 'e4c9f14f-f27a-4609-95d5-1660e9f427e4';
          $scope.isBusy = true;
          console.log(create);

          answer.Add(main, create)
              .then(function (response) {
                  $location.path('server');
                  toastr.success('server, Added');
              })
              .then(function () {

                  $scope.isBusy = false;
              });
          }


          //Update
          $scope.updateResult = function (result) {

              answer.Update(mainUpdate, id,result).then(function (response) {
                  $location.path('server')
                  toastr.success('Updated');
              },
              function error(response) {
                  console.log(response.data);
                  toastr.error(' Something Went Wrong');
              });

          }
          //End





          //end
          //To Delete
          $scope.delete = function (result) {
              $location.path('server');
              if (confirm("Are you sure to delete?") == true) {

                  $scope.isBusy = true;
                  var id = result.ModeServerId;
                  answer.Remove(mainDelete, id)
                    .then(function (response) {
                        toastr.warning('Delete');
                        $scope.refresh();


                    })
                    .then(function () {
                        $scope.isBusy = false;
                    },
                  function error(response) {
                      console.log(response.data);
                      toastr.error(' Something Went Wrong');
                  });

              }

          }
          //END

       

          //Cancel Button
          $scope.cancel = function () {
              toastr.error(' Cancel ');
              $location.path('server')
          }




              //This is to Refresh Data
          $scope.refresh = function () {
              answer.get(main)
                    .then(function (response) {
                        $scope.results = response.data;
                        $scope.$apply();
                    },


              function error(response) {
                  console.log(response.data);
                  toastr.error(' Something Went Refeshing the data');
              });







          }





      }]);
}());
