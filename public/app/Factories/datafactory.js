/*
    Data Storage factory
 */
"use strict";
(function () {
angular.module('drawtoshareapp').factory('dataFactory', function () {
    var mem = {};
    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        },
        remove: function(key) {
            delete mem[key];
        }
    };
});
})();