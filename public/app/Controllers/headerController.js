/*
 * Created by Swapnil Mohan Patil.
 * Header COntroller contains all the functionality related to header.
 */
"use strict";
(function () {
    angular.module('drawtoshareapp').controller('headerController', function ($scope, dataFactory, configFactory, ngDialog, socket) {
        $scope.username = "";

        // It watches the username change.
         var unbindWatcher = $scope.$watch(function () {
            return dataFactory.get('username');
        }, function (newValue) {
            $scope.username = newValue;
            if ($scope.username != undefined) {
                socket.emit('subscribe', {'roomID': configFactory.roomID(), 'username': $scope.username});
                unbindWatcher();
            }
        });
    });
})()