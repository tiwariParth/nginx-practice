const express = require("express");
const path = require("path");

const app = express();

const replicaApp = process.env.APP_NAME;

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log(`Request received from ${replicaApp}`);
});
 
app.listen(3000, () => {
  console.log(`Server started on${replicaApp}`);
});
