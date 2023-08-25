const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
let checkTokenMiddleware = (req, res, next) => {
  let token = req.get("token");
  if (!token) {
    return res.json({
      code: "2003",
      msg: "no token",
      data: null,
    });
  }
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token verified failed",
        data: null,
      });
    }
    req.user = data;
    next();
  });
};
module.exports = checkTokenMiddleware;
