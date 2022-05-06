const express = require("express");
const cors = require("cors");
// const constructorMethod = require('./routeConstructor');
const configRoutes = require("./routes");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  console.log(
    "request",
    req.body,
    "Req URL",
    req.url,
    "Auth Status :",
    req?.session?.user ? "User is authenticated" : "User is not authenticated"
  );
  req.url = req.url.trim();
  next();
});

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: false,
  })
);
// constructorMethod(app);
configRoutes(app);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
