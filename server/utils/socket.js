const socketio = require('socket.io');

function setupSocket(server) {
  const io = socketio(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    // Custom events for notifications
    socket.on('join', (userId) => {
      socket.join(userId);
    });
  });
  return io;
}

module.exports = { setupSocket };
