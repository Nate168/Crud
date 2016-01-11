(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('RoleCtrl',['$scope', '$location', '$stateParams', '$http', 'answer', 'toastr', 
          function ($scope, $location, $stateParams, $http, answer, toastr) {
    

          ///Angular Data-table
          $scope.selected = [];
          $scope.array = [];

          //Data for the table
          $scope.query = {
              order: 'name',
              limit: 5,
              page: 1
          };
       

          //Making the call to get the data;
          $scope.showModal = false;
          $scope.busy = false;
          //Get data
          var main = 'role';
          var mainEdit = 'role/';
          var mainUpdate = 'role/';
          var mainDelete = 'role/'
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

                $scope.onorderchange = function (results) {
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
                  toastr.error(' Something Went wrong', 'Check Console');
              });

                //End




              //This code needs to change and needs improvement. 

              //Create
          $scope.add = function (create) {

              $scope.create.CreatedBy = 'e4c9f14f-f27a-4609-95d5-1660e9f427e4';
              $scope.create.RoleId = '627eef53-39c7-400d-bc86-8fcde1b9aedf';
              $scope.isBusy = true;
              $scope.projectForm.$setPristine()

              answer.Add(main, create)
                  .then(function (response) {
                      $location.path('role')
                     
                      toastr.success('Role, Added');
                  })
                  .then(function () {

                      $scope.isBusy = false;
                  });
          }


              

              //// End

       //edit Needs to be move to a switch statement. 
             
                var id = $stateParams.Id;
                if (id === undefined) {
             
                } else {
                    answer.Edit(mainEdit,id).then(function (response) {
                        $scope.edit = response.data;
                    
                        toastr.success('Edit');

                    },
                      function error(response) {
                          console.warn(response.data);
                          toastr.error(' Something Went wrong ', 'Check Console');
                      });

                }
                console.log(id);
              // Call to get permission. PS. CALL NEEDS TO BE ADD TO IT OWN FILES
              $http.get('http://dev-aimasterservice.applicantinsight.net/AIMasterRest.svc/role/' + id + '/permission')
             
                .then(function (response) {
                    $scope.permission = response.data;


                });


              //Update
                $scope.updateResult = function (result) {

                  
                    console.log(id);
                    answer.Update(mainUpdate,id, result).then(function (response) {
                        $location.path('role')
                        toastr.success('Updated');

                    },
                    function error(response) {
                        console.warn(response.data);
                        toastr.error(' Something Went wrong with the server', 'Check Console');
                    });

                }
              //End

             

                //end
                //To Delete
                $scope.delete = function (result) {
                    $location.path('role');
                    if (confirm("Are you sure to delete? ") == true) {

                        $scope.isBusy = true;
                        var id = result.RoleId;
                        answer.Remove(mainDelete,id)
                          .then(function (response) {
                              toastr.warning('Delete');
                              $scope.refresh();
                            

                          })
                          .then(function () {
                              $scope.isBusy = false;
                          });
                    }
                    
                }
                //END


                //Cancel Button
                $scope.cancel = function () {
                    toastr.error(' Cancel  ');
                    $location.path('role')
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
