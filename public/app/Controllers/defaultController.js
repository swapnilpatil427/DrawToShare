/*
 * Created by Swapnil Mohan Patil.
 * Default controller generates the random room and redirect user to that room.
 */
"use strict";
(function () {
    angular.module('drawtoshareapp').controller('defaultController', function ($location, dataFactory) {

    function go2Random() {
            $location.path("/d/" + randomPadName());
    }

    function randomPadName() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var string_length = 10;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    go2Random();
});
})()