import { registerUser, getAllUsers, getUserById, updateUserById, deleteUserById } from '../models/user.js';
import bcrypt from 'bcrypt';


const login = async (req,res)=>{
 
}
const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registerUsers = async (req, res) => {
    const { firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(userPass, 10);

        await registerUser(firstName, lastName, Age, Gender, Role, emailAdd, hashedPassword, userProfile);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, Age, Gender, Role, emailAdd, userPass, userProfile } = req.body;

    bcrypt.hash(userPass, 10, async (err, hash) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            await updateUserById(id, firstName, lastName, Age, Gender, Role, emailAdd, hash, userProfile);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    });
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteUserById(id);
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const get = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const logout =('/logout', (req, res) => {
    try {
        users.logout(req, res);
    } catch (e) {
        res.status(200).json({
            status: 200,
            msg: 'You have successfully logged out'
        });
    }
})
export default { getAll, registerUsers, updateUser, deleteUser, get,login ,logout};
