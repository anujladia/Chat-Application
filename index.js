var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(3000, function() {
	console.log("Listening to request at port 3000");
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);
io.on('connection', function(socket){
	console.log("Made a socket connection", socket.id);

	//listen to the chat message
	socket.on('chat', function(data) {
		io.sockets.emit('chat', data);
	});

	//listen to the typing event
	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);
	});
});



