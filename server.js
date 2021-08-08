const express = require("express");
const dotenv = require("dotenv");
const connectDatabse = require("./helper/db.helper");
const errorHandling = require("./middleware/error.middleware");
const router = require("./router/index.router");

const app = express();

dotenv.config({
  path: "./.env",
});
app.use(express.json());
app.use("/api", router);

app.use(errorHandling);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log("Application: Started  PORT: " + PORT + " MODE: " + MODE);
});

connectDatabse();
