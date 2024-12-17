const PreOnBoardingUser = require('../models/preOnboardingUsersModel');
const { Op } = require('sequelize');

    const getAll=async()=>{
        const allusers=await PreOnBoardingUser.findAll();
        return allusers;
    }

  const createUser=async(user) =>{
    user.CreatedDate=new Date();
    user.UpdatedDate=new Date();
    const existingUser = await PreOnBoardingUser.findOne({ where: { Email: user.Email } });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = await PreOnBoardingUser.create(user);
    return newUser;
  }


const createUsersFromExcel=async(users)=> {
    const emailList = users.map(user => user.Email);
    const existingUsers = await PreOnBoardingUser.findAll({
      where: {
        Email: {
          [Op.in]: emailList
        }
      }
    });
    const existingEmails = existingUsers.map(user => user.Email);
    const newUsers = users.filter(user => !existingEmails.includes(user.Email));
    await PreOnBoardingUser.bulkCreate(newUsers, { ignoreDuplicates: true });
  }

  const updateUser =async(id, updates)=> {
    updates.UpdatedDate=new Date();
    const user = await PreOnBoardingUser.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await user.update(updates);
    return updatedUser;
  }

module.exports = {
    getAll,
    createUser,
    createUsersFromExcel,
    updateUser
};
