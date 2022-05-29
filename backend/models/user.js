const mongoose = require("mongoose");
const UsersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    avatar: { type: String },
    dateCreated:{type:Date}
  
});
const User = mongoose.model("User", UsersSchema);
module.exports = User;