const User = require("../models/User");

const { generateToken } = require("../config/token");

const user = {};

user.register = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User({
      name: user.name,
      lastname: user.lastname,
      password: user.password,
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
  console.log(req.user)
  res.send(req.user);
};

user.login = async (req, res) => {
  try {
    if (!req.body.loginWithGoogle) {
      const { email, password } = req.body;

      User.findOne({ email }).then((user) => {
        if (!user) return res.sendStatus(401);

        user.validatePassword(password).then((isValid) => {
          if (!isValid) return res.sendStatus(401);


          const token = generateToken({

            email: user.email,
            name: user.name,
            lastname: user.lastname,
            isAdmin: user.isAdmin,
            id: user.id
          });
          res.cookie("token", token);

          res.send({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
          });
        });
      });
    } else {
      const userArr = await User.find({ email: req.body.email });
      console.log("USER ARR", userArr);
      if (userArr.length) {
        let user = userArr[0];
        const token = generateToken({
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          isAdmin: user.isAdmin,
          id: user.id
        });

        res.cookie("token", token);

        res.send({
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        });
      } else {
        const user = await new User(req.body);
        user.save().then((savedUser) => {
          const token = generateToken({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            isAdmin: user.isAdmin,
            id: user.id
          });
          res.cookie("token", token);

          res.status(201).send({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
          });
        });
      }
    }
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

user.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    User.findByIdAndDelete({ id });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

user.updateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id : req.params._id }, req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

user.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};
module.exports = user;
