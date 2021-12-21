module.exports.SocketServer = (socket) => {
  socket.on('joinRoom', id => {
    socket.join(id);
    console.log('join');
  });

  socket.on('outRoom', id => {
    socket.leave(id);
    console.log('leave');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  })
}