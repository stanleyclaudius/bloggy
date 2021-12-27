const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetch = require('cross-fetch');
const User = require('./../models/User');
const sendMail = require('./../utils/sendMail');
const { generateActivationToken, generateAccessToken, generateRefreshToken } = require('./../utils/generateToken');
const { checkEmail, checkPhone } = require('./../utils/validator');
const { sendSms, sendOTP, verifyOTP } = require('./../utils/sendSms');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        sendMail(account, url, 'Account Activation');
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

      await User.findOneAndUpdate({_id: req.user._id}, {
        rf_token: ''
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
      
      const user = await User.findOne({_id: decoded.id}).select('-password +rf_token');
      if (!user)
        return res.status(404).json({msg: 'User not found.'});

      if (rfToken !== user.rf_token)
        return res.status(403).json({msg: 'Invalid authentication.'});

      const accessToken = generateAccessToken({id: user._id});
      const refreshToken = generateRefreshToken({id: user._id}, res);

      await User.findOneAndUpdate({_id: user._id}, {
        rf_token: refreshToken
      });

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
  },
  googleLogin: async(req, res) => {
    try {
      const {id_token} = req.body;
      const verify = await client.verifyIdToken({idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID});

      const {email, email_verified, name, picture} = verify.getPayload();

      if (!email_verified)
        return res.status(502).json({msg: 'Email verification failed'});

      const password = email + '_YoUuR-EmaiL_pa5sw0rD+W11T-GoEes_T_H3re.';
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.findOne({account: email});
      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          account: email,
          name,
          avatar: picture,
          password: passwordHash,
          type: 'google'
        }
        registerUser(user, res);
      }
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  facebookLogin: async(req, res) => {
    try {
      const {accessToken, userID} = req.body;
      const url = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(url)
        .then(res => res.json())
        .then(res => {return res});

      const {email, name, picture} = data;

      const password = email + '_YoUuR-EmaiL_pa5sw0rD+W11T-GoEes_T_H3re.';
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.findOne({account: email});

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          account: email,
          name,
          avatar: picture.data.url,
          password: passwordHash,
          type: 'facebook'
        }
        registerUser(user, res);
      }
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  smsLogin: async(req, res) => {
    try {
      const {phone} = req.body;
      await sendOTP(phone, 'sms');
      res.status(200).json({msg: 'An OTP has been sent to your phone number via SMS'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  verifyOTP: async(req, res) => {
    try {
      const {phone, code} = req.body;
      const data = await verifyOTP(phone, code);

      if (!data?.valid)
        return res.status(403).json({msg: 'Invalid authentication.'});

      const password = phone + '_YoUuR-EmaiL_pa5sw0rD+W11T-GoEes_T_H3re.';
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.findOne({account: phone});
      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          account: phone,
          name: phone,
          password: passwordHash,
          type: 'sms'
        }
        registerUser(user, res);
      }
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  forgetPassword: async(req, res) => {
    try {
      const {account} = req.body;
      if (!account)
        return res.status(400).json({msg: 'Please provide your email or phone number that used to register.'});

      const user = await User.findOne({account});
      if (!user)
        return res.status(404).json({msg: 'Account not found.'});

      if (user.type !== 'register')
        return res.status(400).json({msg: `Account that login using ${user.type} can't used this feature.`});

      const accessToken = generateAccessToken({id: user._id});
      const url = `${process.env.CLIENT_URL}/reset/${accessToken}`;

      if (checkEmail(user.account)) {
        sendMail(user.account, url, 'Reset Password');
        return res.status(200).json({msg: 'Reset password link has been sent to your email. Kindly check your spam folder if not in inbox'});
      } else if (checkPhone(account)) {
        sendSms(user.account, url);
        return res.status(200).json({msg: 'Reset password link has been sent to your phone number.'});
      }
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  resetPassword: async(req, res) => {
    try {
      const {password, token} = req.body;

      if (!password)
        return res.status(400).json({msg: 'Please provide new password.'});

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded)
        return res.status(403).json({msg: 'Can\'t recognized reset password link.'});

      if (!decoded.id)
        return res.status(403).json({msg: 'Can\'t recognized reset password link.'});

      const user = await User.findOne({_id: decoded.id});
      if (!user)
        return res.status(404).json({msg: 'User not found.'});
      
      const newPassword = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate({_id: decoded.id}, {password: newPassword});

      res.status(200).json({msg: 'Password has been changed.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

const loginUser = async(user, password, res) => {
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  let msg = '';
  if (user.type === 'register') {
    msg = `Invalid authentication`;
  } else {
    msg = `This account login using ${user.type}`;
  }

  if (!isPasswordMatch)
    return res.status(403).json({msg});

  const accessToken = generateAccessToken({id: user._id});
  const refreshToken = generateRefreshToken({id: user._id}, res);

  await User.findOneAndUpdate({_id: user._id}, {
    rf_token: refreshToken
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

const registerUser = async(user, res) => {
  try {
    const newUser = new User(user);

    const accessToken = generateAccessToken({id: newUser._id});
    const refreshToken = generateRefreshToken({id: newUser._id}, res);

    newUser.rf_token = refreshToken;
    await newUser.save();
    
    res.status(200).json({
      user: {
        ...newUser._doc,
        password: ''
      },
      accessToken,
      msg: `Authenticated as ${newUser.name}`
    });
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
}

module.exports = authCtrl;