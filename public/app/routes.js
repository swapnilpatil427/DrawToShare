"use strict";
(function () {
    angular.module('drawtoshareapp', ['ngRoute', 'rzModule', 'ngDialog']);
    angular.module('drawtoshareapp')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/views/index.html',
                controller: 'defaultController'
            }).when('/d/:roomid', {
                templateUrl: 'app/views/draw.html',
                controller: 'drawController'
            }).otherwise({
                redirectTo: '/'
            });
        }]);
})();
