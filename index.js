const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 8888 });

const stock_request = { stocks: ["AAPL", "MSFT", "AMZN", "GOOG", "YHOO"] };
const stocks = { AAPL: 0, MSFT: 0, AMZN: 0, GOOG: 0, YHOO: 0 };

wss.on("connection", function(ws) {
  console.log("Connection established");
  ws.send(JSON.stringify(stock_request));
  ws.on("message", function(message) {
    console.log(message);
  });
});