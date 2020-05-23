import socketio from "socket.io-client";

const socket = socketio("http://192.168.0.101:3333", {
  autoConnect: false,
});

export function subscribeToNewDevs(subscribeFunc) {
  socket.on("new-dev", subscribeFunc);
}

export function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

export function disconnect() {
  if (socket.disconnected) {
    socket.disconnect();
  }
}
