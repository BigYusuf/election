const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      profession: user.profession,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};


module.exports= { generateToken};