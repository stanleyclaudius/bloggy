const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const sendMail = require('./../utils/sendMail');
const { generateActivationToken, generateAccessToken, generateRefreshToken } = require('./../utils/generateToken');
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
        if (checkEmail(findAccount.account)) {
          return res.status(400).json({msg: 'Email has been used before.'});
        } else if (checkPhone(findAccount.account)) {
          return res.status(400).json({msg: 'Phone number has been used before.'});
        }
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
  },
  activate: async(req, res) => {
    try {
      const {activation_token} = req.body;

      if (!activation_token)
        return res.status(400).json({msg: 'Please provide the activation token to activate your account.'});

      const decoded = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
      if (!decoded)
        return res.status(403).json({msg: 'Invalid activation token.'});

      const user = await User.findOne({account: decoded.account});
      if (user)
        return res.status(400).json({msg: 'Account already exist.'});

      const newUser = new User(decoded);
      await newUser.save();

      res.status(200).json({msg: 'Your account has been activated successfully.'});
    } catch (err) {
      return res.status(500).json({msg: 'Invalid activation token.'});
    }
  },
  login: async(req, res) => {
    try {
      const {account, password} = req.body;

      if (!account || !password)
        return res.status(400).json({msg: 'Please fill up every field.'});

      const user = await User.findOne({account});
      if (!user)
        return res.status(403).json({msg: 'Invalid authentication.'});

      loginUser(user, password, res);
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  logout: async(req, res) => {
    try {
      res.clearCookie('bloggy_rfToken', {
        path: '/api/v1/auth/refresh_token'
      });

      res.status(200).json({msg: 'Logout successfully.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  refreshToken: async(req, res) => {
    try {
      const rfToken = req.cookies.bloggy_rfToken;
      if (!rfToken)
        return res.status(403).json({msg: 'Invalid authentication.'});

      const decoded = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET);
      if (!decoded.id)
        return res.status(403).json({msg: 'Invalid authentication.'});
      
      const user = await User.findOne({_id: decoded.id});
      if (!user)
        return res.status(404).json({msg: 'User not found.'});

      const accessToken = generateAccessToken({id: user._id});
      res.status(200).json({
        user: {
          ...user._doc,
          password: ''
        },
        accessToken
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

const loginUser = async(user, password, res) => {
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch)
    return res.status(403).json({msg: 'Invalid authentication.'});

  const accessToken = generateAccessToken({id: user._id});
  const refreshToken = generateRefreshToken({id: user._id});

  res.cookie('bloggy_rfToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    user: {
      ...user._doc,
      password: ''
    },
    accessToken,
    msg: `Authenticated as ${user.name}`
  });
}

module.exports = authCtrl;