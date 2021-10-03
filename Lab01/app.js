const express = require("express");
const app = express();
const session = require("express-session");

const configRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "lab1_session",
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

session.Cookie();

app.use("/blog/signup", (req, res, next) => {
  if (req.session.user) {
    return res.send({ message: "User already logged in" });
  } else {
    next();
  }
});

app.use("/blog/login", (req, res, next) => {
  if (req.session.user) {
    return res.send({ message: "User already logged in" });
  } else {
    req.method = "POST";
    next();
  }
});

app.use("/blog/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.send({ message: "Please login first!" });
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
