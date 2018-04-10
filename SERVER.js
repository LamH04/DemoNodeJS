var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);
var clients = [];

app.get("/", function(req, res){
    res.render("trangchu");
});
var arrUserName = [];
io.on("connection", function(socket){
    socket.on("client-send-name-register", function(data){
        if (arrUserName.indexOf(data) >= 0)
        {
            socket.emit("server-send-user-exist");
        } else {
            arrUserName.push(data);
            socket.UserName = data;
            socket.emit("server-send-register-success", data);
            io.sockets.emit("server-send-list-user-online", arrUserName);
        }        
    });
    socket.on("client-logout", function(){
        arrUserName.splice(arrUserName.indexOf(socket.UserName), 1);
        socket.broadcast.emit("server-send-list-user-online",arrUserName);

    });
    socket.on("client-send-message", function(data){
        io.sockets.emit("server-send-message", {us:socket.UserName, nd: data});

    });
    socket.on("disconnect", function(){
        clients.splice(clients.indexOf(socket), 1);
    });
});
