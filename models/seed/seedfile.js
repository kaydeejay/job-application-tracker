var mongoose = require("mongoose");
const User = require("../User");
const Job = require("../Job");

require("../all-models").toContext(global);

// User.create([
//   {
//     email: "test@test.com",
//     username: "kevin",
//     password: "Zuma0320!",
//   },
// ]).then(() => {
//   console.log("Seed Complete!");
//   mongoose.connection.close();
// });

Job.create([
  {
    userId: "12345",
    title: "Front-End Developer",
    company: "awesome company",
    applied: true,
    appDate: new Date("2020-08-19"),
    contactFirst: "Jane",
    contactLast: "Doe",
    contactEmail: "jdoe@awesomecompany.com",
    contactNickName: "Jimothy",
    lastContacted: new Date(Date.now()),
    postLink: "https://www.awesomecompany.com/jobs/",
    notes:
      "Jane is a secret agent for the CIA but she doesn't know that I know.",
  },
]).then(() => {
  console.log("Seed Complete!");
  mongoose.connection.close();
});
