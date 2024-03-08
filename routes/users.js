import express from 'express'

import usersController from '../controller/users.js'
import  bodyParser from 'body-parser'
const router = express.Router()


// User routes
router.get('/', usersController.getAll);
router.post('/', usersController.registerUsers);
router.put('/:id', usersController.updateUser);
router.get('/:id', usersController.get);
router.delete('/:id', usersController.deleteUser);

// Authentication routes
router.use(bodyParser.json());
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
export default router