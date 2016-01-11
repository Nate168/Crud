(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('navCtrl', ['$scope', '$http', 'answer',
          function ($scope, $http, answer) {
              $scope.currentVersion = answer.currentVersion();

              $scope.currentMode = answer.currentMode();

              $scope.currentUser = answer.currentUser();
          }]);
}());
