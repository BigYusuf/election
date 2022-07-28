
const express = require('express');
const { isAdmin, isAuth} = require('../middleware/Auth')
const { addNewUser, getUser, getAllUsers, deleteUser, updateUser, updateAdminUser, loginUser, seedUserData } = require('../controllers/userController');

const userRouter = express.Router();

//add many user data from json 
userRouter.get('/seed', seedUserData);

// user login
userRouter.post('/login', loginUser);

// register new user
userRouter.post('/register', addNewUser);

//get single user
userRouter.get('/:id', isAuth, isAdmin, getUser);

// update user
userRouter.put('/profile', isAuth, isAdmin, updateUser);

//get all users
userRouter.get('/', isAuth, isAdmin, getAllUsers);

// delete user
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);

// update user
userRouter.put('/:id', isAuth, isAdmin, updateAdminUser);

module.exports = userRouter;