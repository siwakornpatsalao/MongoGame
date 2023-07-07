const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: String,
    gmail: String,
    password: String,
    name: String,
    city: String,
    surname: String,
    ageCal: Number,
    updated_at: { type: Date, default: Date.now }
})


UserSchema.methods.checkPassword = async function(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(this.password, salt);

    const isValid = await bcrypt.compare(password, hashPassword);
    return isValid;
}

module.exports = mongoose.model('User', UserSchema)
