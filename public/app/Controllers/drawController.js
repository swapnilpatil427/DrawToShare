/*
 * Created by Swapnil Mohan Patil.
 * DrawController contains all the functionality related to drawing board.
 */
"use strict";
(function () {
    angular.module('drawtoshareapp').controller('drawController', function ($scope, drawService,dataFactory, configFactory, socket, ngDialog) {
        // This tools are referenced in tools Directive.
        $scope.tools = ['pencil','eraser'];
        $scope.size = 15;

        // Slider min and max
        $scope.sliderOptions = {
            floor: 0,
            ceil: 30
        }

        // Maintains the current selection on drawing board.
        $scope.activeProp = {};
        $scope.activeProp.pencilstrokeWidth = 2;
        $scope.activeProp.eraserstrokeWidth = 2;
        $scope.activeProp.selectedTool = 'pencil';
        $scope.activeProp.color = '#000000';

        // Invite People click event.
        $scope.openInvitePopUp = function () {
            ngDialog.open({
                template: 'app/views/PopUps/invitePopUp.html',
                controller : 'invitePopupController',
                className: 'ngdialog-theme-default'
            });

            return false;
        }

        // Clear Canvas click event.
        $scope.clearCanvas = function () {
            // Remove all but the active layer
            drawService.clearCanvas();
        };

        // Listens to draw progres socket event.
        socket.on('draw:progress', function(sessionId, data) {
            if (sessionId !== configFactory.sessionID() && data) {
                drawService.progress_external_path(data, sessionId);
            }
        });

        // Listens to draw end progress event.
        socket.on('draw:end', function(sessionId, data) {
            if (sessionId !== configFactory.sessionID() && data) {
                drawService.end_external_path(data, sessionId);
            }
        });

        // First time welcome popup
        if(dataFactory.get("username") === undefined) {
            ngDialog.open({
                template: 'app/views/PopUps/welcomePopup.html',
                controller: 'welcomePopupController',
                className: 'ngdialog-theme-default',
                showClose: false,
                closeByEscape: false,
                closeByDocument: false
            });
        }

    });
})();

