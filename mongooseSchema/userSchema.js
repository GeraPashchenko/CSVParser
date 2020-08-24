const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        UserName: {type: String, default: "UserName", required: true},
        FirstName: {type: String, default: "FirstName", required: true},
        LastName: {type: String, default: "LastName", required: true},
        Age: {type: Number, default: 0, required: true}
    }, {versionKey: false}
);

let UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel }



