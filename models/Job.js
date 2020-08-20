const mongoose = require("mongoose");
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require("./connection-string"));
}

const newSchema = new Schema({
  userId: { type: String },
  title: { type: String },
  company: { type: String },
  applied: { type: Boolean },
  appDate: { type: Date },
  contactFirst: { type: String },
  contactLast: { type: String },
  contactEmail: { type: String },
  contactNickName: { type: String },
  lastContacted: { type: String },
  postLink: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

newSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

newSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("Job", newSchema);
