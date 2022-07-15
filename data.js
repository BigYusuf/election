
const bcrypt =require('bcryptjs'); 

const data = {
  users: [
    {
      name: 'Jon doe',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: true,
      profession:'',
      image: './image/pic-4.png',
      ReviewUs: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      RateUs: 3
    },
    {
      name: 'Yusuf Lateef',
      email: 'Yusuf@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false,
      image: './image/pic-3.png',
      profession:'Doctor',
      ReviewUs:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      RateUs: 2
    },
    {
      name: 'Emmanuel Lateef',
      email: 'Emmanuel@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false,
      image: './image/pic-2.png',
      profession:'Doctor',
      ReviewUs:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      RateUs: 4
    },
    {
      name: 'Boss Man',
      email: 'Boss@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false,
      image: './image/pic-1.png',
      profession:'Farmer',
      ReviewUs:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      RateUs: 4.5
    },
  ],
 
};

module.exports = data;