module.exports =  (app, server) => {
    const io = require('socket.io')(server);
    app.get('/onlineUsers', (req,res,next) => {res.send(people)});
    const people = {};
    io.on('connection', (socket) => {

        socket.on("join", function(name, avatar){

            if(!people[socket.id]){
                people[socket.id] = {name:name, avatar:avatar};
            }
            io.sockets.emit("online_people", people);
            io.sockets.emit("Joined", name, socket.id);
        });

        socket.on('chat.message', message => {
            io.emit('chat_message', message);
        });

        socket.on('user.typing', userId => {
            io.emit('Typing', userId);
        });

        socket.on('stop.typing', userId => {
            io.emit('StopTyping', userId);
        });

        socket.on('disconnect', () => {
            if(people[socket.id]) {
                const data = JSON.stringify({name:people[socket.id].name, socketId: socket.id});
                socket.broadcast.emit('Left', data);
                delete people[socket.id];
            }
        })//tell all that someone disconnected
    });
};