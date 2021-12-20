module.exports.SocketServer = (socket) => {
  socket.on('joinRoom', id => {
    socket.join(id);
    console.log('join hi');
  });

  socket.on('outRoom', id => {
    socket.leave(id);
    console.log('leave hi');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  })
}