const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

// Replace this with the backpack api server URL
const targetUrl = "https://api.backpack.exchange";
const wsTargetUrl = "wss://ws.backpack.exchange"; // WebSocket URL

// Handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers", "Content-Length, Content-Range");
  next();
});


const httpProxy = createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  ws: true, 
  onProxyReq: (proxyReq, req, res) => {},
  onProxyRes: (proxyRes, req, res) => {},
});

app.use("/", httpProxy);


const wsProxy = createProxyMiddleware({
  target: wsTargetUrl,
  changeOrigin: true,
  ws: true,
  onProxyReqWs: (proxyReq, req, socket, options, head) => {
    // You can modify WebSocket handshake here if needed
  },
});

server.on("upgrade", wsProxy.upgrade);

const port =9000;
server.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
  console.log(`WebSocket proxy available at ws://localhost:${port}`);
});
