(function () {
    'use strict';
    angular.module('IntranetApp')
      .controller('mainCtrl', ['$scope',
          function ($scope) {
              //$scope.comingSoon = 'More Coming Soon';
              $scope.comingSoon = 'Less Going Later';
          }]);
}());
