var express = require("express");
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
router.get("/reg", async function (req, res, next) {
  try {
    res.render("auth/reg");
  } catch (err) {
    res.render("error");
  }
});
router.post("/reg", async function (req, res, next) {
  try {
    await UserModel.create({ ...req.body, password: md5(req.body.password) });
    res.render("success", { msg: "registerred success", url: "/login" });
  } catch (err) {
    res.status(500).render("error");
  }
});

router.get("/login", async function (req, res, next) {
  try {
    res.render("auth/login");
  } catch (err) {
    res.render("error");
  }
});
router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    console.log(req.session);
    await UserModel.findOne({ username: username, password: md5(password) });
    req.session.username = username;
    req.session.id = req.sessionID;
    res.render("success", { msg: "Login success", url: "/login" });
  } catch (err) {
    res.status(500).render("error");
  }
});

router.post("/logout", async function (req, res, next) {
  try {
    req.session.destroy(() => {
      res.render("success", { msg: "logout success", url: "/login" });
    });
  } catch (err) {
    res.status(500).render("error");
  }
});
module.exports = router;
