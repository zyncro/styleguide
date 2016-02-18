'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'myApp.styleguide',
  'myApp.layout',
  'myApp.icons',
  'myApp.version',
  'myApp.directives',
  'ngAnimate',
  'hljs',
  'nsPopover'
]).
config(['$routeProvider','hljsServiceProvider','uiSelectConfig', function($routeProvider, hljsServiceProvider, uiSelectConfig) {


  uiSelectConfig.theme = 'bootstrap';

  $routeProvider.otherwise({redirectTo: '/styleguide'});
    hljsServiceProvider.setOptions({
        // replace tab with 2 spaces
        tabReplace: '  '
    });

}]).run(function($rootScope, $location, $anchorScroll, $routeParams) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});
