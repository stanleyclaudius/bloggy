const jwt = require('jsonwebtoken');

module.exports.generateActivationToken = payload => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '30m'});
}

module.exports.generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
}

module.exports.generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}