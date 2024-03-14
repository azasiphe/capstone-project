import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUser } from '../models/user.js';


const authenticateUser = async (req, res, next) => {
  try {
    const { emailAdd, userPass } = req.body;

    if (!emailAdd || !userPass) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = await checkUser(emailAdd);

    if (!hashedPassword) {
      throw new Error('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(userPass, hashedPassword);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ emailAdd }, process.env.SECRET_KEY, { expiresIn: '2h' });

    res.cookie('token', token, { httpOnly: true });
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export {authenticateUser,logout} 
