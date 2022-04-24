import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';

const SECRET_KEY = '98vYAEltj6/aHyRaNKOaNvGpMmfCTRyHOVoTDEQ1T1OWeUqVs5xOkmq4h0huqZ5whGUA++DK8zqSEQis+1Rw/TCf+giTdqQUgqhAZR4TXPW7Ayh2l8vtrNi38RK4Air+YY8w8+v9QmdPyzSgfQeTPi0XoYEZpqjCEEfes9Y7z31lK9/IQd+BFARS/b+4l4AU4sJg0dxfT8/3I0LINDRtdcnm6VdDblLb0KzGfbEeMFOOzSXPrY0CbWBnEiceSIG56v1LDYWCzKTJxNulkteoqdJvRJ9i3Aa4g7PTAQjFv4pm5wO9/9FHazD7gNqmvzn7c7ZLYT1GI2RpACbC3DPyLQ==';

export const encode = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.getUserById(userId);
    const payload = {
      userId: user._id,
      userType: user.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log('Auth', authToken);
    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
}

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.userType = decoded.type;
    return next();
  } catch (error) {

    return res.status(401).json({ success: false, message: error.message });
  }
}