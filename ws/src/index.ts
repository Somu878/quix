import { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const PORT = process.env.PORT || "8080";
const wss = new WebSocketServer({ port: Number(PORT) });

wss.on("connection", (ws) => {
  UserManager.getInstance().addUser(ws);
});
