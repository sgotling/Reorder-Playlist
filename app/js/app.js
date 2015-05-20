
var reorderPlaylistApp = angular.module('reorderPlaylist', ['ngRoute','ngResource', 'firebase', 'ui.sortable']);


reorderPlaylistApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/setList', {
        templateUrl: 'partials/setList.html',
        controller: 'setListCtrl'
      })
      .when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'testCtrl'
      })
      .otherwise({
        redirectTo: '/setList'
      });
  }]);