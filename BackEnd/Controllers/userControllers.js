const UserSchema = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const signup = async (req, res) => {
  const { name ,email, password} = req.body;
  const url = req.protocol + "://" + req.get("host");
  const img = url + "/upload/" + req.file.filename;

  console.log(req.body);
  if (!name || !email || !password) {
     return res.status(400).send("Fill all Fields");
  }


  let User = await UserSchema.findOne({ email: email });



  if (User) return res.status(400).json({message : "User Already Exist"});

  User = new UserSchema(req.body);
  const Token = await User.generateJWT();
  User.photo = img;
  User.password = await bcrypt.hash(password, 10);
  try {
   await User.save();
  return res.status(201).send({
    message: "User Registration Successfull",
    Token: Token,
    User: _.pick(User, ["name", "email"]),
  });
  } catch (err) {
  return res.status(400).send(err.message);
 }
  
};

const signin = async (req, res) => {
  const AuthUser = await UserSchema.findOne({ email: req.body.email });
  if (!AuthUser) return res.status(400).send("User Not Exist");

  const PassComp = await bcrypt.compare(req.body.password, AuthUser.password);
  if (!PassComp) return res.status(400).send("Email OR Password Wrong..");
  const Token = await AuthUser.generateJWT();
  try {
    res.status(200).send({
    message: "Login Successfull",
    Token: Token,
    User: _.pick(AuthUser, ["_id", "name", "email", "role"]),
  });
  } catch (err) {
    return res.status(400).send("Invalid information")
  }
  
};

module.exports = { signin, signup };