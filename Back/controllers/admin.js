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

admin.deactivate = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { active: false }
    );
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

admin.activate = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { active: true }
    );
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

admin.all = async (req, res) => {
  try {
    const userAll = await User.find({});
    res.status(200).json(userAll);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = admin;
