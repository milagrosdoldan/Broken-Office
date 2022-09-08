const User = require("../models/User");

const admin = {};

admin.promote = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { isAdmin: true }
    );
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

admin.demote = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { isAdmin: false }
    );
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = admin;
