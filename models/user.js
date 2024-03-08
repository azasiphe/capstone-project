import { pool } from '../config/config.js';


const registerUser = async (firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile) => {
    await pool.query('INSERT INTO users (firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile]);
};

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

const updateUserById = async (id, firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile) => {
    await pool.query('UPDATE users SET firstName = ?, lastName = ?, Age = ?, Gender = ?, Role = ?, emailAdd = ?, userPass = ?, userProfile = ? WHERE userID = ?', [firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile, id]);
};

const deleteUserById = async (id) => {
    await pool.query('DELETE FROM users WHERE userID = ?', [id]);
};

const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE userID = ?', [id]);
    return rows[0];
};

const checkUser = async (emailAdd) => {
    const [[{userPass}]] = await pool.query(`SELECT userPass FROM users WHERE emailAdd = ?`, [emailAdd]);
    return userPass;
};


export { getUserById, registerUser, getAllUsers, updateUserById, deleteUserById, checkUser };

