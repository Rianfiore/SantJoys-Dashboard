const mongoose = require("mongoose");
const URI = "mongodb://localhost";

mongoose
  .connect(URI)
  .then(() => console.log("Database is up."))
  .catch((error) => console.log(error));
