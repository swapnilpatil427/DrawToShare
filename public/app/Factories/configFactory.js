/*
 Data Storage factory
 */
"use strict";
(function () {
    angular.module('drawtoshareapp').factory('configFactory', function ($location) {
        var uid = function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        };

        var sessinID = uid();

        var roomID = $location.url().split("/")[2];
        return {
            sessionID: function () {
                return sessinID;
            },
            roomID : function () {
                return roomID;
            }
        };
    });
})();