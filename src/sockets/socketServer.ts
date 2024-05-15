import { WebSocketServer } from "ws";
import { joinRoom, connectedClients } from "./roomHandler";
import { broadCastMessage } from "./messageHandler";
import User from "../models/user";
import helperBot from "../utils/chatBot";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async function connection(ws) {
  let username: string | null = null;
  ws.send("Welcome, Type:{chatBot:help} for help");
  ws.on("message", async function incoming(message) {
    const data = JSON.parse(message.toString());
    if (data.chatBot === "help") {
      ws.send(helperBot);
    } else if (data.type === "auth") {
      const { username: authUsername, password } = data;
      const user = await User.findByCredentials(authUsername, password);

      if (user) {
        username = authUsername;

        joinRoom(ws, "fastifyApp");

        ws.send(JSON.stringify({ type: "auth_success" }));
      } else {
        ws.send(JSON.stringify({ type: "auth_failed" }));
      }
    } else if (data.type === "message" && username) {
      const roomName = "fastifyApp";
      const roomClients = connectedClients(roomName);
      if (roomClients.length > 0) {
        broadCastMessage(ws, roomClients, data.text);
      }
    }
  });
});

export default wss;
