const jwt = require('jsonwebtoken');
const UserModel = require('../users/user.model');
const { Unauthorized } = require('./errors');

exports.authorize = async (req, res, next) => {
  try {
      const authHeader = req.get('Authorization') || '';
      const token = authHeader.replace("Bearer", "");
      console.log("token", token);
      let payload;
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Unauthorized('Not authorized');
      }
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Unauthorized('Not valid token');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
