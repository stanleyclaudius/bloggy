const User = require('./../models/User');
const bcrypt = require('bcrypt');

const userCtrl = {
  getUserProfile: async(req, res) => {
    try {
      const {id} = req.params;

      const user = await User.findOne({_id: id}).select('-password');
      if (!user)
        return res.status(404).json({msg: 'User not found.'});

      res.status(200).json({user});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  updateProfile: async(req, res) => {
    try {
      const {id} = req.params;
      const {name} = req.body;

      if (!name)
        return res.status(400).json({msg: 'Name field can\'t be empty.'});

      if (req.body.password) {
        if (req.user.type !== 'register') {
          return res.status(403).json({msg: `${req.user.type} login can't update their password.`});
        }
        const newPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = newPassword;
      }

      const newUser = await User.findOneAndUpdate({_id: id}, req.body, {new: true});

      res.status(200).json({
        msg: 'Profile updated.',
        user: newUser
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = userCtrl;