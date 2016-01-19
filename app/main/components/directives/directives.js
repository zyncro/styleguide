'use strict';

angular.module('myApp.directives', [])

.directive('breakpoint', function($window) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {

            element.on('mousedown', function(event) {
                resize(attrs.w);
            });

            function resize(w) {            
                var e = document.querySelector('.container-breakpoints');
                
                if (w) {
                    e.style.width = w;
                } else {
                    e.removeAttribute('style');
                }

            }
        }
    };
})

.directive('navbar', function($timeout, $location, $anchorScroll) {
    return {
        restrict: 'EA',
        templateUrl: 'main/components/directives/navbar.html',
        link: function(scope, element) {


            //NAVBBAR ACTIVE
            scope.isActive = function (viewLocation) { 
                return viewLocation === $location.path();
            };

            scope.status = {
                isopen: false
            };

            scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.status.isopen = !scope.status.isopen;
            };

            scope.items = [];
            angular.element(document).ready(function() {

                scope.scrollTo = function(id) {
                    event.stopPropagation();
                    var old = $location.hash();
                    $location.hash(id);
                    $anchorScroll();
                    //reset to old to keep any additional routing logic from kicking in
                    $location.hash(old);
                };

                var codeWrappers = document.querySelectorAll('section');
                for (var i = 0; i < codeWrappers.length; i++) {
                    scope.items.push(codeWrappers[i].id);
                }
                scope.$apply();

            });

        }
    };
})
.directive('snippetToggle', function($window) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs, navbarCtrl) {
            element.on('mousedown', function(event) {
                var e = document.querySelectorAll('.auto-gen-code-snippet');
                for (var i = 0; i < e.length; i++) {
                    e[i].style.display = e[i].style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    };
})

.directive('codeSample', function($compile) {
    return {
        restrict: 'EAC',
        link: function(scope, element, attrs) {
            var newDirective = angular.element('<div hljs hljs-language="html" class="auto-gen-code-snippet" style="display:none">' + element[0].innerHTML + '</div>');
            element.append(newDirective);
            $compile(newDirective)(scope);
        }
    };
})

.directive('includes', function($compile) {
    return {
        restrict: 'EAC',
        scope:{
            template: '='
        },
        replace: true,
        link: function(scope, element, attrs) {
            angular.element(element).ready(function() {
               var e = document.querySelectorAll(scope.template);
               element.append(e[0]);
            });
        }
    };
});