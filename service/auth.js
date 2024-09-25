/* const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
} */

const jwt = require("jsonwebtoken");
const secrate = "RR"

function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,
  }, secrate);
}

function getUser(token) {
  if (!token) return null;
  // return jwt.verify(token, secrate);
  try {
    return jwt.verify(token, secrate);
  } catch (error) {
    return null;
  }
}
module.exports = {
  setUser,
  getUser,
};
