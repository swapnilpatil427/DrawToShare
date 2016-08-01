"use strict";
(function () {
    angular.module('drawtoshareapp').directive('toolsDirective', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
               $(element).find("li > a").bind("click", function () {
                   var selected = $(this).attr('id');
                    if(scope.tools.indexOf(selected) != -1) {
                        $(element).find("li > a").removeClass("selected");
                        if(selected === "pencil") {
                            scope.activeProp.selectedTool = 'pencil';
                        } else if (selected === "eraser") {
                            scope.activeProp.selectedTool = 'eraser';
                        } else{

                        }
                        $(this).addClass('selected');
                    }
               });
            }
        };
    });
})();
