(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('PermissionCtrl',['$scope', '$location', '$stateParams', '$http', 'answer', 'toastr', 
          function ($scope, $location, $stateParams, $http, answer, toastr) {


              ///Angular Data-table
              $scope.selected = [];
              $scope.array = [];
              $scope.showHints = true;
              $scope.isBusy = false;

              //Making the call to get the data;
              $scope.showModal = false;
              $scope.busy = false;
              //Get data
              var main = 'permission';
              var mainEdit = 'permission/';
              var mainUpdate = 'permission/';
              var mainDelete = 'Permission/'
      

              this.selectedDirection = 'up';
              //get
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
                  console.warn(response.data);
                  toastr.error(' Something Went with the server', 'Check Console');
              });

            
             //Create
    



              //EDIT
              var id = $stateParams.Pid;
              
               
              if (id === undefined) {

              } else {
                  answer.Edit(mainEdit, id).then(function (response) {

                      $scope.edit = response.data;
                      console.log($scope.edit);
                      toastr.success('Edit');

                  },
                  function error(response) {
                      console.warn(response.data);
                      toastr.error(' Something Went wrong ', 'Check Console');


                  });
              }

              $scope.add = function (create) {

                  $scope.create.permissionId = 'ff1e8094-2c9d-4ded-ac9c-2db55320d53e';
                  $scope.create.CreatedBy = 'e4c9f14f-f27a-4609-95d5-1660e9f427e4';
                  $scope.isBusy = true;
                  console.log(create);

                  answer.Add(main, create)
                      .then(function (response) {
                          $location.path('permission');
                     toastr.success('Permission, Added');
                      })
                      .then(function () {

                          $scope.isBusy = false;
                      });
              }

              //Cancel Button
              $scope.cancel = function () {
                  $location.path('permission')

              }
              //Update
              $scope.updateResult = function (result) {
                  var ID = result.PermissionId;
                     
                  answer.Update(mainUpdate,id, result).then(function (response) {
                      console.log(result);
                      $location.path('permission')
                      toastr.success('Updated');

                  },
                  function error(response) {
                      console.warn(response.data);
                      toastr.error(' Something Went wrong with the server', 'Check Console');
                  });

              }
              //end

              //To Delete
              $scope.delete = function (result) {
                  $location.path('permission');
                  if (confirm("Are you sure to delete? ") == true) {

                      var id = result.PermissionId
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