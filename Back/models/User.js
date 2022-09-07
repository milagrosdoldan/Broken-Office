const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  tel: {
    type: Number,
  },
  companyRole: {
    type: String,
  },
  salt: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Schema Hook => has de la password y creacion del salt del usuario
UserSchema.pre("save", async function () {
  if (this.password) {
    this.salt = bcrypt.genSaltSync();
    return (this.password = await bcrypt.hash(this.password, this.salt));
  }
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt
    .hash(password, this.salt)
    .then((newHash) => newHash === this.password);
};

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", UserSchema);
