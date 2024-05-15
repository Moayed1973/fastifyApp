import WebSocket from "ws";

type Room = {
  name: string;
  clients: Set<WebSocket>;
};

const rooms: Room[] = [];

export const joinRoom = (ws: WebSocket, roomName: string) => {
  const room = rooms.find((room) => room.name === roomName);
  if (room) {
    room.clients.add(ws);
  }
  const newRoom: Room = {
    name: roomName,
    clients: new Set([ws]),
  };
  rooms.push(newRoom);
};

export const connectedClients = (roomName: string) => {
  const room = rooms.find((room) => room.name === roomName);
  return room ? Array.from(room.clients) : [];
};
