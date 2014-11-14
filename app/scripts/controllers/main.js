'use strict';

/**
 * @ngdoc function
 * @name coderetreatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coderetreatApp
 */
angular.module('coderetreatApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
