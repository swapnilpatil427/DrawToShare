/* Drawing related functions */
"use strict";
(function () {
    angular.module('drawtoshareapp').service('drawService', function ($rootScope, socket, configFactory) {
        var path;
        var sessionID = configFactory.sessionID();
        var room = configFactory.roomID();
        var path_to_send = {};
        var external_paths = {};
        var timer_is_active = false;
        var send_paths_timer;
        var mouseTimer = 0;
        var mouseHeld;
        var paper_object_count = 1;
        return {
            progress_external_path: function (points, sessionId) {
                var path = external_paths[sessionId];
                if (!path) {
                    external_paths[sessionId] = new paper.Path();
                    path = external_paths[sessionId];
                    var start_point = new paper.Point(points.start.x, points.start.y);
                    path.add(start_point);
                    path.strokeColor = points.rgba;
                    if (points.tools.selectedTool == "pencil") {
                        path.strokeWidth = points.tools.pencilstrokeWidth;
                    } else if (points.tools.selectedTool == "eraser") {
                        path.strokeWidth = points.tools.eraserstrokeWidth;
                    }
                    path.name = points.name;
                    paper.view.draw();
                }

                var paths = points.path;
                var length = paths.length;
                for (var i = 0; i < length; i++) {
                    path.add(new paper.Point(paths[i].top.x, paths[i].top.y));
                    path.insert(0, new paper.Point(paths[i].bottom.x, paths[i].bottom.y));
                }

                path.smooth();
                paper.view.draw();
            },
            end_external_path: function (points, sessionId) {
                var mypath = external_paths[sessionId];
                if (mypath) {
                    mypath.add(new paper.Point(points.end.x, points.end.y));
                    mypath.closed = true;
                    mypath.smooth();
                    paper.view.draw();
                    external_paths[sessionId] = false;
                }
            },
            startPath: function (point, activeProp) {
                mouseTimer = 0;
                mouseHeld = setInterval(function () {
                    mouseTimer++;
                    if (mouseTimer > 3) {
                        mouseTimer = 0;
                        clearInterval(mouseHeld);
                    }
                }, 100);

                var point = point;
                path = new paper.Path();
                var active_color = "";
                if (activeProp.selectedTool === "pencil") {
                    path.strokeWidth = activeProp.pencilstrokeWidth;
                    path.strokeColor = activeProp.color;
                    active_color = activeProp.color;
                } else if (activeProp.selectedTool === "eraser") {
                    //console.log("vc" + document.getElementById("canvasContainer").style.backgroundColor);
                    path.strokeColor = "#fff";
                    path.strokeWidth = activeProp.eraserstrokeWidth;
                    active_color = "#fff";
                    //tools.strokeWidth = tools.strokeWidth;
                }
                path.add(point);
                path.name = sessionID + ":" + (++paper_object_count);
                paper.view.draw();
                path_to_send = {
                    name: path.name,
                    rgba: active_color,
                    start: point,
                    tools: activeProp,
                    path: []
                };
            },

            drawProgressPath: function (point) {
                mouseTimer = 0;
                clearInterval(mouseHeld);
                var top = point;
                var bottom = point;
                path.add(top);
                path.insert(0, bottom);
                path.smooth();
                paper.view.draw();
                path_to_send.path.push({
                    top: top,
                    bottom: bottom
                });
                if (!timer_is_active) {
                    send_paths_timer = setInterval(function () {
                        socket.emit('draw:progress', {
                            "room": room,
                            "uid": sessionID,
                            "path": path_to_send
                        });
                        path_to_send.path = new Array();
                    }, 100);
                }

                timer_is_active = true;
            },
            endPath: function (point) {
                clearInterval(mouseHeld);
                path.add(point);
                path.closed = true;
                path.smooth();
                paper.view.draw();
                path_to_send.end = point;
                socket.emit('draw:progress', {"room": room, "uid": sessionID, "path": path_to_send});
                socket.emit('draw:end', {"room": room, "uid": sessionID, "path": path_to_send});
                path_to_send.path = new Array();
                path = new paper.Path();
                clearInterval(send_paths_timer);
                timer_is_active = false;
            },
            clearCanvas: function () {
                // Remove all but the active layer
                paper.project.activeLayer.removeChildren();
                paper.view.draw();
            }
    }
        ;
    });
})();