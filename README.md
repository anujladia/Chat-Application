# Chat Application

This is a chat room application that lets users chat over a secure network. It keeps the user updated that which other user is typing the message.   

This application will let developers understand about networking and communication over the internet.   
Here we won't cover the basics of node or how to initialize node or express or npm. All these are covered in earlier projects. Refer Weather Web App to know about such things.   
This is a Hands-on project of developing the chat application from the scratch.  

### Topics we cover
- Web Sockets 
- Third Party Library, *Socket.io*
- Nodemon Library

## Hands on into the code

### Web Sockets   
- Web sockets are basically a way to communicate between a client (browser) and a web server.    
- This communication is bi directional, that means the data can flow in both the directions  
- Since these web sockets are always open that thus allows for a real time data flow in our application.  

- Different uses of web sockets are  
  * Chat rooms  
  * Multi player browser games  
  * Collaborative code editing  
  * Live text for sports/news websites  
  * Online drawing canvas  
  * Real time to-do apps with multiple users.  
  
- When we first request the chat application in the browser then the get the chat application back from the server. But also, what we are doing is that we are opening the web socket between the server and the client.  
So now we have all the different clients around the world which have their own web socket connection to the server. Thus, now the data can flow between them in real time as they are always open.   
So now when a client sends a message, what we are doing is sending that message down this web socket to the server. The server receives the message and says this is a chat message and what to do with that, it is going to send it down all these open web sockets so that they can see the message in real time.  


### Start Coding  

- Now we are going to create an express app on Node to use web sockets.  
- So first we create a npm folder and in that through cmd we run the   
  `npm init`  
  
  Through this we have initialized this project and it has created a package.json file for the project which is going to list information about our project and also list out dependencies when we install them
  
- First dependency we are going to install is express  
  `npm install –save express `  
  
- Another dependency that we are going to install is *nodemon*  
This is just for the sake of convenience. It prevents us from running the executing the node index.js again and again. It will automatically execute this command whenever we make changes on the server-side code.
  `npm install nodemon –save-dev`  
  \-dev because it is not a necessity but just for convenience.  
  So with this whenever we would want to start the server we just need to call the nodemon index only once.

- Now we start creating the application with the index.js file  
We first require the express dependency  
Then we setup the application with the help of this express.  
Then we create a server and listen to port 3000  

  ```
  var express = require('express'); 

  //App setup
  var app = express();
  var server = app.listen(3000, function() {
    console.log("Listening to request at port 3000");
  });

  //Static files
  app.use(express.static('public'));

  ```
  Then we create a new folder public I which we create a static html file index.html and use it when the server is hit.  

- Now we create a socket between the client and the server. So for this we install the socket.io on both the server side and the client side.  
  We install the socket.io to the backend with the help of cmd 
  `npm install –save socket.io`
  
- Now we setup the socket

  ```
  var socket = require('socket.io');
  var io = socket(server);

  ```
  use the socket function and pass in the server on which we want to server the socket to.
  
- Now socket.io will wait on the server side and wait for a client to make a connection. Thus, we make a event for when the connection is made from the browser.  
  
  ```
  io.on('connection', function(socket){
	  console.log("Made a socket connection");
  })
  ```
  Thus this socket value will be different for all the different clients.
  
- Now we load in the socket.io for the frontend and here we refer the cdn 

  ```
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
  ```
  
- Now we create a reference to a script file in which we are going to handle our custom chat socket.io code.

  ```
  <script type="text/javascript" src="/chat.js"></script>
  ```
  
- In chat.js we will write code to establish the connection between the server and the client 
  ```
  var socket = io.connect('http://localhost:3000');
  ```  
  We write here where we want to make the connection to  
  Now we have created the web socket and we can pass the data between the server and the client.  
  
- We make an event listener that listens to when the client clicks on the send message button. Thus here we emit a socket chat that carries the value from the client to the server.  
  ```
  btn.addEventListener('click', function() {
    //console.log("Is it wokring");
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
  });

  ```
  
- Now in the index.js, we will handle this chat event and send it back to all the open web sockets amd pass on the data value. 
  ```
  io.on('connection', function(socket){
    console.log("Made a socket connection", socket.id);

    //listen to the chat message
    socket.on('chat', function(data) {
      io.sockets.emit('chat', data);
    });
  });
  ```
  
-	Then in the client side we listen to the chat event that is sent by the server to all the clients and here we publish all the data to the chat screens of all the open clients  

  ```
  socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
  });
  ```

- Now we will broadcast the web message, i.e. it will send the text message to every open client except itself. While in emit, it used to send it to all the clients including itself.

  ```
  //listen to the typing event
  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });
  ```
  This is how we broadcast the message through the socket. 
  
  
  
This is it.   
You have come all the way.  
Congratulation you have finally finished developing the chat application.   

Hope so you enjoyed building this application from the scratch.  
Thank you!  





  



  

