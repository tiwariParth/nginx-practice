const express = require("express");
const path = require("path");

const app = express();

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log("Request served");
});

app.listen(3000, () => {
  console.log("Server started");
});
