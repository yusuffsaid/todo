const mongoose = require("mongoose");

const connectDatabase = () => {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Your db connection is success");
  });
};

module.exports = connectDatabase;
