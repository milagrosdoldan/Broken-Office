const User = require("../models/User");

const { generateToken } = require("../config/token");

const user = {};

user.register = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User({
      name: user.name,
      lastname: user.lastname,
      password : user.password,
      email: user.email,
      tel: user.tel,
      companyRole: user.companyRole,
      isAdmin: user.isAdmin,
    });

    newUser.save().then((savedUser) => {
      res.status(201).send(savedUser);
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

user.me = (req, res) => {
  res.send(req.user);
};

user.login = async (req, res) => {
  try {
     const { email, password } = req.body;

    User.findOne({ email }).then((user) => {
      if (!user) return res.sendStatus(401);

      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);

        const payload = user.save()
        const token = generateToken({email});
        res.cookie("token", token);
        res.status(201).json(payload); // envio informacion del usuario
      });
    }); 
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

user.all = async (req, res) => {
  try {
    const userAll = await User.find({});
    res.status(200).json(userAll);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = user;
