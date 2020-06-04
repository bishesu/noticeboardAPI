const express = require("express");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/auth");

mongoose.connect("mongodb://localhost/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once("open", () => {
  console.log("database connected");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running at: " + PORT);
});

app.use("/user", AuthRoute);
