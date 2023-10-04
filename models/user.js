const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Thêm các thông tin khác như email, tên, địa chỉ, ...
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });

  UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    return token;
  };

// const user = mongoose.model('user', UserSchema);
module.exports = mongoose.model('user', UserSchema);
