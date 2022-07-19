
const express = require('express');
const { isAdmin, isAuth} = require('../utils/utils')
const { addNewUser, getUser, getAllUsers, deleteUser, updateUser, updateAdminUser, loginUser } = require('../controllers/userController');

const userRouter = express.Router();
userRouter.get('/seed',expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
   // await User.remove({});

    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers});
})
);

userRouter.post('/login', loginUser);

  
userRouter.post('/register', addNewUser);

userRouter.get('/:id', isAuth, isAdmin, getUser);
// update user
userRouter.put('/profile', isAuth, isAdmin, updateUser);

userRouter.get('/', isAuth, isAdmin, getAllUsers);

// delete user
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);

// update user
userRouter.put('/:id', isAuth, isAdmin, updateAdminUser);

module.exports = userRouter;