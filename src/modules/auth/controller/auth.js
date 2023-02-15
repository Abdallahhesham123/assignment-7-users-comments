import UserModel from "../../../../DB/model/User.model.js";
import bcrypt from "bcrypt";
export const getAuthModule = (req, res, next) => {
  return res.json({ message: "Auth module" });
};

export const register = async (req, res, next) => {
  try {
    // const { userName, password, email } = req.body;

    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const passwordHash = await bcrypt.hash(password, salt);

    // const user = await UserModel.create({
    //   userName,
    //   email,
    //   password: passwordHash,
    // });
    // return res
    //   .status(200)
    //   .json({ message: "Successfully Register Please Logged In ", user });


    const { users} = req.body;
    const userWithHashPassword= users.map(async(user)=>{

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(user.password, salt);

    user.password = passwordHash
    return user;
    })

const userWithHashPasswordPromise= await Promise.all(userWithHashPassword)

   const user = await UserModel.insertMany(userWithHashPasswordPromise);
    return res
      .status(200)
      .json({ message: "Successfully Register Please Logged In ", user });

  } catch (err) {
    if (err.code == 11000) {
      return res.json({ message: "Email Exist please choose another email" });
    }

    return res.json({ message: "Catch Error", err });
  }
};

export const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Invalid Email " });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(404).send({ message: "Invalid Email or password" });
    }
    return res.status(200).json({ message: "Successfully Logged In" });
  } catch (err) {
    return res.json({ message: "Catch Error", err });
  }
};
