const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
app.get("/set-cookie", (req, res) => {
  res.cookie("name", "zhangsan", { maxAge: 60 * 1000 });
  res.cookie("theme","blue");
  res.send("home");
});
app.get("/remove-cookie", (req, res) => {
  res.clearCookie("name");
  res.send('deleted success')
});
app.get("/get-cookie", (req, res) => {
    console.log(req.cookies);
    res.send(`welcome to here ${req.cookies.name}`)
  });
app.listen(3000, () => {
  console.log("server started");
});
