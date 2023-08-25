const express = require("express");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
app.use(
  session({
    name: "sid",
    secret: "jakai",
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/bilibili",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
    },
  })
);

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/login", (req, res) => {
  if (req.query.username === "admin" && req.query.password === "admin") {
    req.session.username = "admin";
    res.send("welcome home");
  } else {
    res.send("you don't have authority to login");
  }
});
app.get("/cart", (req, res) => {
  if (req.session.username) {
    res.send(`welcome ${req.session.username} home`);
  } else {
    res.send("you don't have authority to login");
  }
});
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.send('logout success')
    })
  
  });
app.listen(3000, () => {
  console.log("server started");
});
