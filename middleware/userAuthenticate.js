import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUser } from '../models/user.js';
const authenticateUser = async (req, res, next) => {
  try {
    const { emailAdd, userPass } = req.body;

    const hashedPassword = await checkUser(emailAdd);

    if (!hashedPassword) {
      throw new Error('User not found');
    }

    bcrypt.compare(userPass, hashedPassword, (err, result) => {
      if (result === true) {
        const token = jwt.sign({ emailAdd: emailAdd }, process.env.SECRET_KEY, { expiresIn: '2h' });
        res.cookie('token', token, { httpOnly: true }); 
        res.send({ msg: 'You have logged in successfully' });
        console.log(token);
      } else {
        throw new Error('Invalid email or password');
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send(error.message);
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
