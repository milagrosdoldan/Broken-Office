const User = require("../models/User")
const user = {};


user.register = (req, res) => {
    const { email, lastname, name, companyRole, password, tel, isAdmin } = req.body;
    
};

user.me = (req, res) => {
    
};

user.login = (req, res) => {
    
};



module.exports = user;