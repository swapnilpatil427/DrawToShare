var BaseController = require("./baseController"),
    fs = require("fs");
//model = new (require("../models/ContentModel")),

module.exports = BaseController.extend ({
    on : function(io, socket) {
        socket.on('chat', function(msg,room){
            io.sockets.in(room.trim()).emit('chat', msg);
        });
    }
});
