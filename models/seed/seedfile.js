var mongoose = require("mongoose");
const User = require("../User");

require("../all-models").toContext(global);

User.create([
  {
    email: "test@test.com",
    username: "kevin",
    password: "Zuma0320!",
  },
]).then(() => {
  console.log("Seed Complete!");
  mongoose.connection.close();
});
