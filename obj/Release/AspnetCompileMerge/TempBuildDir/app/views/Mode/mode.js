(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('ModeCtrl', function ($scope, $location, $stateParams, $http, answer, toastr) {


          ///Angular Data-table
          $scope.selected = [];
          $scope.array = [];


          //Making the call to get the data;
          $scope.showModal = false;
          $scope.busy = false;
          //Get data
          var main = 'mode';
         var mainEdit = 'mode/';
          var mainUpdate = 'mode/';
          var mainDelete = 'mode/';
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

                //Error
            }, function error(response) {
                console.warn(response.data);
                toastr.error(' Something Went Wrong With The Server','Check Console');
            });





          //Edit

          var id = $stateParams.Id;
          if (id === undefined) {

          } else {
              answer.Edit(mainEdit, id).then(function (response) {
                  $scope.edit = response.data;
                  console.log(response.data);

                  //console.log($scope.edit);

                  toastr.success('Edit');

              },
                function error(response) {
                    console.warn(response.data + 'Check Edit in Mode Controller');
                    toastr.error(' Something Went Wrog');
                });
          }



              $scope.add = function (create) {
                  console.log(create)
                  $scope.create.CreatedBy = '8341407b-7a7c-4c91-b493-3902f8728641';
                  $scope.isBusy = true;
                  console.log(create);

                  answer.Add(main, create)
                      .then(function (response) {
                          $location.path('mode');
                          toastr.success('mode, Added');
                      },
                       function error(response) {
                           console.log(response.data);
                           toastr.error(' Something Went Wrong', 'Check Console');
                       });
              }


                  //Update

                  $scope.updateResult = function (result) {

                      answer.Update(mainUpdate, id, result).then(function (response) {
                          $location.path('mode')
                          toastr.success('Updated');
                      },
                       function error(response) {
                           console.warn(response.data + 'Check updateResult in Mode Controller');
                           toastr.error(' Something Went Updating', 'Check Console');
                       });
                  }
                  //End


                  //end






                  $scope.delete = function (result) {
                      if (confirm("Are you sure to delete? ") == true) {
                          console.log("Result = ", result);
                          var id = result.ModeId;
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
                      $location.path('mode')
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

          });
}());
