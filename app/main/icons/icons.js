'use strict';

angular.module('myApp.icons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/icons', {
    templateUrl: 'main/icons/icons.html',
    controller: 'iconsCtrl'
  });
}])

.controller('iconsCtrl', [function() {

}]);
