const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { handleUserLoginView, handleUserSignupView } = require("../controllers/user");
const { restrectTo } = require("../middlewares/auth");

/*app.get('/', async (req, res) => {
    // res.render('home');
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls
    });
})*/

router.get('/admin/urls', restrectTo(["ADMIN"]), async (req, res) => {
    // res.render('home');
    if (!req.user) return res.redirect("/login");

    const allUrls = await URL.find({ createdBy: req.user._id });
    // const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls
    });
});
router.get('/', restrectTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // res.render('home');
    if (!req.user) return res.redirect("/login");

    const allUrls = await URL.find({ createdBy: req.user._id });
    // const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls
    });
});

router.get("/login", handleUserLoginView);
router.get("/signup", handleUserSignupView);

module.exports = router;