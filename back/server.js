const app = require("./app");
const mongoose = require("mongoose");

const password = process.env.DATABASE_PASSWORD;
const db = process.env.DATABASE.replace("<password>", password);
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect with charsoogh database");
  })
  .catch((err) => {
    console.log("error connect with charsoogh database", err);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if (err) console.log("server error", err);
  console.log("server running on port" + PORT);
});

module.exports = mongoose;
