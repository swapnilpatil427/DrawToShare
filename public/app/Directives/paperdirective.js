"use strict";
(function () {
    angular.module('drawtoshareapp').directive('draw', function ($location ,drawService) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                paper.setup("canvas");

                var tool = new paper.Tool();
                tool.onMouseDown = function (event) {
                    drawService.startPath(event.point, scope.activeProp);
                };
                tool.onMouseDrag = function (event) {
                    drawService.drawProgressPath(event.middlePoint, scope.activeProp);
                };
                tool.onMouseUp = function (event) {
                    if (event.event.button == 1 || event.event.button == 2) {
                        return;
                    } else {
                        drawService.endPath(event.point);
                    }
                };
            }
        };
    });
})();
