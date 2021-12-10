const bcrypt = require('bcrypt');
const User = require('./../models/User');
const sendMail = require('./../utils/sendMail');
const { generateActivationToken } = require('./../utils/generateToken');
const { checkEmail, checkPhone } = require('./../utils/validator');
const { sendSms } = require('./../utils/sendSms');

const authCtrl = {
  register: async(req, res) => {
    try {
      const {name, account, password} = req.body;
      if (!name || !account || !password)
        return res.status(400).json({msg: 'Please fill up every field.'});

      if (password.length < 8)
        return res.status(400).json({msg: 'Password should be at least 8 characters.'});

      const findAccount = await User.findOne({account});
      if (findAccount) {
        if (checkEmail(findAccount))
          return res.status(400).json({msg: 'Email has been used before.'});
        else if (checkPhone(findAccount))
          return res.status(400).json({msg: 'Phone number has been used before.'});
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash
      };
      const activationToken = generateActivationToken(newUser);
      const url = `${process.env.CLIENT_URL}/active/${activationToken}`;

      if (checkEmail(account)) {
        sendMail(account, url, 'test');
        return res.status(200).json({msg: 'Account activation link has been sent to your email. Kindly check your spam folder if not in inbox'});
      } else if (checkPhone(account)) {
        sendSms(account, url);
        return res.status(200).json({msg: 'Account activation link has been sent to your phone number.'});
      }
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = authCtrl;