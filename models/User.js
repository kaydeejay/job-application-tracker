const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require("./connection-string"), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
}

const newSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please enter a valid email address",
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: "Please enter your password",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

newSchema.pre("save", function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

newSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.methods.isCorrectPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      cb(err);
    } else {
      cb(err, same);
    }
  });
};

module.exports = mongoose.model("User", newSchema);
