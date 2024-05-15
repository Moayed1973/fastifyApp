import WebSocket from "ws";

export const broadCastMessage = (
  ws: WebSocket,
  roomClients: WebSocket[],
  message: string
) => {
  for (let client of roomClients) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "message", text: message }));
    }
  }
};
