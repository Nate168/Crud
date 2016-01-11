(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('modeConfigCtrl', ['$scope', '$location', '$stateParams', '$http', 'answer', 'toastr', '$q', '$state', '$timeout', '$mdDialog',
          function ($scope, $location, $stateParams, $http, answer, toastr, $q, $state, $timeout, $mdDialog) {

              var vm = this;
          ///Angular Data-table
          $scope.selected = [];
         $scope.array = [];
     

          //Making the call to get the data;
          $scope.showModal = false;
          vm.busy = false;
          //Get data
          var main = 'ModeConfigView',
           mainCreate = 'ModeConfig',
           mainAll = 'ModeConfig/';
        
          var products = [];

              //Get
          answer.get(main)
            .then(function (response) {
               
                vm.results = response.data;
      
         
                     //Data for the table
                vm.query = {
                    order: 'name',
                    limit: 5,
                    page: 1
                };

                //To count the length for the table
                vm.count = vm.results.length;

                vm.onorderchange = function (order) {
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


          var edit = [];
              //Edit
          var id = $stateParams.Id;
          if (id === undefined) {
           
          } else {
            
              answer.Edit(mainAll, id).then(function (response) {
         
                  //First call to get edit
                  vm.editModeServe = response.data;
                  //End
                     var fId = vm.editModeServe.ConfigId,
                    sId = vm.editModeServe.ModeId;
                    //To get all the Edit
                  answer.EditAll(fId, sId)
                  .then(function (data) {
                      vm.editModeServe.config = vm.config = data[0].data;
                      vm.editModeServe.mode = vm.mode = data[1].data;
                      vm.Allconfig = data[2].data;
                      vm.Allmode = data[3].data;
                    
                    
                       });
          
              
                  
                  toastr.success('Edit');

              },
                 function error(response) {
                     console.log(response.data);
                     toastr.error(' Something Went Wrong');
                 });
          }



              //Update
          vm.updateResult = function (editModeServe) {
               editModeServe.ConfigId = editModeServe.config.ConfigId;
              editModeServe.ModeId = editModeServe.mode.ModeId;
                var result = editModeServe;
                answer.Update(mainAll, id, result).then(function (response) {
                    $state.go('modeConfig')
                  toastr.success('Updated');
              
              },
                 function error(response) {
                     console.log(response.data);
                     toastr.error(' Something Went Wrong');
                 });
          }
              //End



          vm.loadCreate = function () {
                return $timeout(function() {
                  answer.createAll()
                   .then(function (data) {

                  vm.allconfig = data[0].data;
                  vm.allmode = data[1].data;
                  vm.Config = vm.allconfig;
                 
              }, 650);

              });
          
                  }
           
             //To add
              vm.add = function (create) {
              create.ConfigId = create.Configuration.ConfigId;
              create.ModeId = create.ModeConfig.ModeId;
               
              create.CreatedBy = '8341407b-7a7c-4c91-b493-3902f8728641';
              console.log(create);
              vm.isBusy = true;
                  //Adding create and calling dataAcess
                  answer.Add(mainCreate, create)
                  .then(function (response) {
                      $state.go('modeConfig');
                      toastr.success('Mode, Added');
                  },
               function error(response) {
                   console.log(response.data);
                   toastr.error(' Something Went Wrong');
               })
                  .then(function () {

                      vm.isBusy = false;
                  });
          }


              //To Delete
              vm.delete = function (result,ev) {
                  var confim = $mdDialog.confirm({
                      title: 'Are you sure you want to delete this file? ',
                      ok: 'I would like to process',
                      targetEvent: ev,
                      cancel:'cancel'
                  });
                   $mdDialog.show(confim).then(function () {
                      var id = result.ModeConfigId;
                       answer.Remove(mainAll, id)
                        .then(function (response) {
                            toastr.warning('Delete');
                            vm.refresh();


                        })
                  });
              
            

          }
          //END

              //Cancel Button
          vm.cancel = function () {
              toastr.error(' Cancel');
              $state.go('modeConfig')
          }

            //This is to Refresh Data
          vm.refresh = function () {
              answer.get(main)
                    .then(function (response) {
                        vm.results = response.data;
                      
                    },

              function error(response) {
                  console.log(response.data);
                  toastr.error('Something Went wrong Refeshing the data');
              });
          }




      }]);
}());
