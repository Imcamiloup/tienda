const { Users } = require("../db");

const getAllUsersControllers = async () => {
  try {
    const responseDB = await Users.findAll();

    return responseDB;
  } catch (error) {
    console.error("Database error");
  }
};
const createUsersControllers = async ({
  image,
  name,
  surname,
  email,
  phone,
}) => {
  try {
    const newUser = await Users.create({ image, name, surname, email, phone });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const changeEmailControllers = async (userId, newEmail) => {
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.email = newEmail;

    await user.save();
    //await user.update({email:newEmail})

    return "email actualizado correctamente" + user.email;
  } catch (error) {
    throw new Error("Error updating user email: " + error.message);
  }
};

const deleteUsersControllers = async (userId) => {
  try{
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    else{
    await user.destroy();
    return [user.name ,"User deleted"];
    }
  }
  catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

module.exports = {
  getAllUsersControllers,
  createUsersControllers,
  changeEmailControllers,
  deleteUsersControllers
};
