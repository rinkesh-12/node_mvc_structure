const {v4: uuidv4} = require("uuid");
const User = require("../models/users");
const { setUser } = require("../service/auth");

async function handleUserLoginView(req, res) {
  return res.render("login");
}
async function handleUserSignupView(req, res) {
  return res.render("signup");
}

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  // return res.redirect("/");
  return res.redirect("/login");

}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);
  const token = setUser(user);
  // return res.json({token});
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserLoginView,
  handleUserSignupView,
  handleUserSignup,
  handleUserLogin,
};
