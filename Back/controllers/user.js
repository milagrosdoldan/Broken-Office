const User = require("../models/User");

const { generateToken } = require("../config/token");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const user = {};

user.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already exists");

    const newUser = new User({
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      tel: user.tel,
      companyRole: user.companyRole,
      isAdmin: user.isAdmin,
      picture: user.picture,
    });

    newUser.save().then((savedUser) => {
      res.status(201).send(savedUser);
    });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

user.me = (req, res) => {
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
            id: user._id,
            lastname: user.lastname,
            isAdmin: user.isAdmin,
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
          picture: user.picture,
        });
        res.cookie("token", token);

        res.send({
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        });
      } else {
        const user = await User.create(req.body);
        const token = generateToken({
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          isAdmin: user.isAdmin,
          picture: user.picture,
        });
        res.cookie("token", token);

        res.send({
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
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
    await User.findOneAndUpdate({ _id: req.params._id }, req.body);
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
