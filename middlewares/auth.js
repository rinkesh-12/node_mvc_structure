const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers['authorization'];
  // if (!authorizationHeaderValue || !authorizationHeaderValue.startWith('Bearer'))
  //   return next();
  // const token = authorizationHeaderValue.split("Bearer")[1];
  
  // set with cookie
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  return next();
}

// Admin, Normal
function restrectTo(roles = []) {
  return function (req, res, next) {
    console.log(req);
    if (!req.user) return res.redirect("/login");
    
    if (!roles.includes(req.user.role)) return res.end('Unauthorized');

    return next();
  }
}

/* async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;

//   if (!userUid) return res.redirect("/login");
//   const user = getUser(userUid);

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
}

async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
} */

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrectTo,
};
