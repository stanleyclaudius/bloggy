module.exports.SocketServer = (socket) => {
  socket.on('joinRoom', id => {
    socket.join(id);
  });

  socket.on('outRoom', id => {
    socket.leave(id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  })
}