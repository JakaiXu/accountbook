var express = require("express");
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const {secret} =require('../../config/config')
router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    let token = jwt.sign(
      { username: username, _id: req.sessionID },
      secret,
      { expiresIn: 60 * 60 * 24 }
    );
    console.log(req.session);
    await UserModel.findOne({ username: username, password: md5(password) });

    res.json({
      code: "0000",
      msg: "login success",
      data: token,
    });
    if (!res) {
        return res.json({
        code: "2002",
        msg: "username and password incorrect",
        data: null,
      });
    }
    res.render("success", { msg: "Login success", url: "/login" });
  } catch (err) {
    res.json({
      code: "2001",
      msg: "data repository read failed",
      data: null,
    });
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
