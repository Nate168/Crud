(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('ConfigCtrl',['$scope', '$location', '$stateParams', '$http', 'answer', 'toastr', '$q',
          function ($scope, $location, $stateParams, $http, answer, toastr,$q) {

          ///Angular Data-table
          $scope.selected = [];
          $scope.array = [];

         //Making the call to get the data;
          $scope.showModal = false;
          $scope.busy = false;
          //Get data
          var main = 'config';
          var mainEdit = 'config/';
          var mainUpdate = 'config/';
          var mainDelete = 'config/';

          answer.get(main)
            .then(function (response) {
                $scope.results = response.data;
           
                //End
             
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
              console.info(response.data);
              toastr.error(' Something Went Wrong');
          });

          //Edit

          var id = $stateParams.Id;
          if (id === undefined) {
                   
          } else {
              answer.Edit(mainEdit, id).then(function (response) {
                  $scope.edit = response.data;
         
                  console.log($scope.edit);
                     
                  toastr.success('Edit');

              });
          }

          $scope.add = function (create) {

              $scope.create.CreatedBy = '8341407b-7a7c-4c91-b493-3902f8728641';
              $scope.isBusy = true;
              console.log(create);

              answer.Add(main, create)
                  .then(function (response) {
                      $location.path('config');
                      toastr.success('Config, Added');
                  },
                   function error(response) {
                       console.log(response.data);
                       toastr.error(' Something Went Wrong', 'Check Console');
                   });

          }


          //Update
          $scope.updateResult = function (result) {

              answer.Update(mainUpdate, id, result).then(function (response) {
                  $location.path('config')
                  toastr.success('Updated');
              },
                    function error(response) {
                        console.log(response.data);
                        toastr.error(' Something Went Updating', 'Check console object');
                    });
          }

          //end
          //To Delete
              //To Delete
          $scope.delete = function (result) {
              $location.path('config');
              if (confirm("Are you sure to delete? ") == true) {

                  var id = result.ConfigId;
                  answer.Remove(mainDelete, id)
                    .then(function (response) {
                        $scope.refresh();
                        toastr.warning('Delete');                        
                    },
                     function error(response) {
                         console.warn(response.data);
                         toastr.error(' Something Went wrong with the server', 'Check Console');
                     });                                          
              }
          }
              //END
         
              //Cancel Button
              $scope.cancel = function () {
                  toastr.error(' Cancel ');
                  $location.path('config')
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
