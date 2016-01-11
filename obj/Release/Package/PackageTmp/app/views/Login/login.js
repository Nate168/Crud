(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('LoginCtrl',['$scope', '$location', '$stateParams', '$http', 'answer', 'toastr', 
    function ($scope, $location, $stateParams, $http, answer, toastr) {


        ///Angular Data-table
        $scope.selected = [];
        $scope.array = [];
        $scope.showHints = true;

        //Making the call to get the data;
        $scope.showModal = false;
        $scope.busy = false;
        //Get data
        var main = 'Login';
        var mainEdit = 'Login/';
        var mainUpdate = 'Login/';
        var mainDelete = 'Login/'




        //GET
        answer.get(main)
          .then(function (response) {
              $scope.results = response.data;

              //END
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
              console.log(response.data);
              toastr.error(' Something Went Wrong, Check Console');
          });

      
        


        //Edit

        var edit = [];


        var id = $stateParams.LoginId;
        if (id === undefined) {


        } else {
                
            answer.Edit(mainEdit, id).then(function (response) {
                     
                $scope.edit = response.data;
                   
               
                toastr.success('Edit');

            },
             function error(response) {
                 console.log(response.data);
                 toastr.error(' Something Went Wrong','Check Console');
             });

            // Call to get roles. PS. CALL NEEDS TO BE ADD TO IT OWN FILES
        } $http.get('http://dev-aimasterservice.applicantinsight.net/AIMasterRest.svc/login/' + id + '/role')
            .then(function(response){
                var selected = response.data;
                       
                var keys = Object.keys(selected);
                for (var i = 0; i < keys.length; i++) {
                    var selection = selected[keys[i]];
                      
                    $scope.roles = selection;
                }

            });

        $scope.add = function (create) {

            $scope.create.LoginId = 'e4c9f14f-f27a-4609-95d5-1660e9f427e4';
            $scope.isBusy = true;
            console.log(create);

            answer.Add(main, create)
                .then(function (response) {
                    $location.path('login');
                    toastr.success('Login, Added');
                },
                 function error(response) {
                     console.log(response.data);
                     toastr.error(' Something Went Wrong', 'Check Console');
                 });
               
        }
          
        

              //Update
              $scope.updateResult = function (result) {

                  answer.Update(mainUpdate, id, result).then(function (response) {

                      $location.path('login')
                      toastr.success('Updated');
                  },

                  function error(response) {
                      console.log(response.data);
                      toastr.error(' Something Went Updating');

                  });

              }


              // Delete
              $scope.delete = function (result) {
                  $location.path('login');
                  if (confirm("Are you sure to delete? ") == true) {

                      $scope.isBusy = true;
                      var id = result.LogingId
                      answer.Remove(Main, id)
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

              //Cancel Button
              $scope.cancel = function () {
                  toastr.error('Cancel');

                  $location.path('login')
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
