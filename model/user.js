const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportschemaMongoose = require("passport-local-mongoose")


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportschemaMongoose)

module.exports = mongoose.model('User', userSchema);