const User = require('./../models/User');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = async(req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return res.status(403).json({msg: 'Invalid authentication.'});
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded.id)
      return res.status(403).json({msg: 'Invalid authentication'});
  
    const user = await User.findOne({_id: decoded.id});
    if (!user)
      return res.status(404).json({msg: 'User not found.'});
  
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
}

module.exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({msg: `Role ${req.user.role} was not supposed to access this resource.`});
    }
    next();
  }
}