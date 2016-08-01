var BaseController = require("./baseController"),
    fs = require("fs");
//model = new (require("../models/ContentModel")),

module.exports = BaseController.extend ({
    on : function(io, socket) {
        socket.on('draw:progress', function (data) {
            io.sockets.in(data.room.trim()).emit('draw:progress', data.uid, data.path);
        });

        // EVENT: User stops drawing something
        // Having room as a parameter is not good for secure rooms
        socket.on('draw:end', function (data) {
            io.sockets.in(data.room.trim()).emit('draw:end', data.uid, data.path);
        });

        socket.on( 'drawCircle', function( data, session ) {
            socket.broadcast.emit( 'drawCircle', data );
        });
    }
});
