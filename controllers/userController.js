const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createResponse } = require('../models/responseHelper');


exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    console.log(user);
    //Điều này sẽ cho phép bạn xem dữ liệu nào được gửi trong yêu cầu đăng nhập.
    console.log("Login Request Body:", req.body);

    // res.status(201).send({ user, token });
    res.status(201).json(createResponse('success', { user, token }, 'User registered successfully'));
  } catch (error) {
    // res.status(400).send(error);
    res.status(400).json(createResponse('error', null, error.message));
    console.log(error);
  }
}


// exports.login = async(req, res)=>{
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username});
//     console.log("User Found:",user);
//     //Điều này sẽ hiển thị tên người dùng được sử dụng trong yêu cầu đăng nhập.
//     console.log("Username:", username);

//     if (!user) {
//       // Không tìm thấy người dùng trong cơ sở dữ liệu
//       throw new Error('Unable to login');
      
//     }
//     console.log(req.body);
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     console.log(typeof password, typeof user.password);
//     console.log("Password Match:", isPasswordMatch);

//     if (!isPasswordMatch) {
//       // Mật khẩu không khớp
//       throw new Error('Unable to login');
//     }

//     const token = jwt.sign({ _id: user._id }, 'thisismysecretkey');
//     console.log(typeof { _id: user._id }, typeof 'thisismysecretkey');

//     res.send({ user, token });
//   } catch (error) {
//     res.status(401).send({
//       error: 'Invalid username or password'
//     });
//     console.log(error);

//   }
exports.login = async (req, res) => {
  try {
    // 1. Lấy username và password từ request body
    const { username, password } = req.body;

    // 2. Tìm kiếm người dùng trong cơ sở dữ liệu bằng username
    const user = await User.findOne({ username });
    if (!user) {
      // return res.status(400).send({ error: 'Invalid login credentials' });
      return res.status(400).json(createResponse('error', null, 'Invalid login credentials'));
    }
    console.log("Username:", username);
    // 3. So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // return res.status(400).send({ error: 'Invalid login credentials' });
      return res.status(400).json(createResponse('error', null, 'Invalid login credentials'));
    }
    console.log(typeof password, typeof user.password);
    console.log("Password Match:", isMatch);
    // 4. Tạo JWT cho người dùng
    const token = jwt.sign({ _id: user._id.toString() }, '123', { expiresIn: '1h' });  // Thay 'YOUR_SECRET_KEY' bằng secret key
  
    // 5. Gửi thông tin người dùng và token trở lại
    // res.send({ user, token });
    res.json(createResponse('success', { user, token }, 'User logged in successfully'));
  } catch (error) {
    // res.status(500).send(error);
    res.status(500).json(createResponse('error', null, error.message));
  }
}
