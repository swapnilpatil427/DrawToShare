"use strict";
(function () {
    angular.module('drawtoshareapp').controller('welcomePopupController', function ($scope, dataFactory, ngDialog, messages) {
        $scope.username = "";
        $scope.message = "";
        $scope.startClick = function () {
            if($scope.username === "") {
                $scope.message = messages.incompletename;
                return false;
            } else {
                $scope.message = "";
                dataFactory.store('username', $scope.username);
                ngDialog.close();
            }
        }
    }).controller('invitePopupController', function ($scope, $location, ngDialog, messages) {
        $scope.url = $location.absUrl();
        $scope.success = false;
        $scope.closeClicked = function () {
            ngDialog.close();
        }
    });
})()