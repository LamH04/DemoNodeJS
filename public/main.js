
var  socket = io("https://lamhuynhonline.herokuapp.com");

socket.on("server-send-user-exist", function(){
    alert("User da ton tai");
});
socket.on("server-send-register-success", function(data){
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
    $("#userName").html(data);
});
socket.on("server-send-list-user-online", function(data){
    $("#listOnline").empty();
    data.forEach(element => {
        $("#listOnline").append("<div>" + element + "</div>");
    });
});
socket.on("server-send-message", function(data){
    console.log(data);
    $("#listContent").append("<div>" + data.us + ": " + data.nd + "</div>");
});
$(document).ready(function(){
    $("#btnRegister").click(function(){
        socket.emit("client-send-name-register", $("#txtNameRegister").val());
    });
    $("#btnLogout").click(function(){
        socket.emit("client-logout");
        $("#loginForm").show(1000);
        $("#chatForm").hide(2000);
    });
    $("#btnSend").click(function(){
        socket.emit("client-send-message", $("#txtMsg").val());
    });
});