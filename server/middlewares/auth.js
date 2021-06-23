const admin = require('../firebase');
const User = require('../models/user');

//verify token from firebase
exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ err: 'Invalid or expired token' });
  }
};

//check admin role
exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;

    const adminUser = await User.findOne({ email });
    if (adminUser.role !== 'admin') {
      res.status(403).json({ err: 'Admin resource. Access denied.' });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ err: 'Server error' });
  }
};
