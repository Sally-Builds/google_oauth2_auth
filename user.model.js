const {model, Schema} = require('mongoose')


const userSchema = new Schema({
    googleID: String,
    name: String,
    email: String,
    first_name: String,
    last_name: String,
})

module.exports = model('User', userSchema)