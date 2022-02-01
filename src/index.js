const express = require("express");
const cors = require("cors");
const path = require ('path');
const { dbConnection } = require("./database/config");
require("dotenv").config();

const port = process.env.PORT;

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Server ON, port:", port);
});
