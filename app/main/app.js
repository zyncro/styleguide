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
  'nsPopover',
  'xeditable',
  'ngMockE2E',
  'googlechart'
]).
config(['$routeProvider','hljsServiceProvider','uiSelectConfig', function($routeProvider, hljsServiceProvider, uiSelectConfig) {


  uiSelectConfig.theme = 'bootstrap';

  $routeProvider.otherwise({redirectTo: '/styleguide'});
    hljsServiceProvider.setOptions({
        // replace tab with 2 spaces
        tabReplace: '  '
    });

}]).run(function($rootScope, $location, $anchorScroll, $routeParams, $httpBackend, editableOptions) {




/**
 * xeditable
 */

    $httpBackend.whenGET(/^\/js\/spec\/mocks.*\//).passThrough();
    $httpBackend.whenGET(/^\/html\/mocks.*\//).passThrough();
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.when('GET', /\.html$/).passThrough();
    // Don't mock the html views
    $httpBackend.whenGET(/views\/\w+.*/).passThrough();
    $httpBackend.whenGET(/\.html$/).passThrough();
    // For everything else, don't mock
    $httpBackend.whenGET(/^\w+.*/).passThrough();

// ---------------- mock $http requests --------------------

  $httpBackend.whenGET('/groups').respond([{
    id: 1,
    text: 'user'
  }, {
    id: 2,
    text: 'customer'
  }, {
    id: 3,
    text: 'vip'
  }, {
    id: 4,
    text: 'admin'
  }]);



  $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if (data.name === 'error') {
      return [500, {
        field: 'name',
        msg: 'Server-side error for this username!'
      }];
    } else {
      return [200, {
        status: 'ok'
      }];
    }
  });
  editableOptions.theme = 'bs3';



  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});




