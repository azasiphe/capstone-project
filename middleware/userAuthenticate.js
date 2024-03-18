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
      return res.status(400).json({ error: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(userPass, hashedPassword);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ emailAdd }, process.env.SECRET_KEY, { expiresIn: '2h' });
    
    console.log('Token:', token); 

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
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
