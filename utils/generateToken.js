const jwt = require('jsonwebtoken');

module.exports.generateActivationToken = payload => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '30m'});
}

module.exports.generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
}

module.exports.generateRefreshToken = (payload, res) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

  res.cookie('bloggy_rfToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  
  return refreshToken;
}