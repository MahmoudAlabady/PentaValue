const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const summeryRoute = require('./routes/routes'); // Import routes
require('./scheduledNotifications');
app.use(bodyParser.json());
const http = require('http');
const socketIo = require('socket.io');
const controller = require('./controllers/controller');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on("send-note", async (data) => {
    
        try {
          let result = await controller.createNote(data);
          
    
          if(result){
          io.emit("notify-users", result);
        }
          
        } catch (error) {
          console.log(error);
        }
       
    
      });

    // Handle incoming messages from clients
    socket.on('message', (data) => {
        console.log('Received message:', data);
        // Broadcast the message to all clients
        io.emit('notification', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

app.use('/api', summeryRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
