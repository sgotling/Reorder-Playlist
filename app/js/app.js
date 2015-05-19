
var newProjectApp = angular.module('newProject', ['ngRoute','ngResource']);


newProjectApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/view1', {
        templateUrl: 'partials/view1.html',
        controller: 'view1Ctrl'
      })
      .when('/view2', {
        templateUrl: 'partials/view2.html'
      })
      .otherwise({
        redirectTo: '/view1'
      });
  }]);