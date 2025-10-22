const jwt = require("jsonwebtoken");

const getAccessToken = (id, email) => {
    return jwt.sign()
};

module.exports = {getAccessToken}