const express = require("express");
const path = require("path");
const { ObjectID } = require("mongodb");
const router = express.Router();
const users = require("../data/users");
const session = require("express-session");
const xss = require("xss");
const multer = require("multer");
const {
  handleUserInfo,
  objectIdToString,
  isValidEmail,
} = require("../utils/utils");
const decodeIDToken = require("../middlewares/authMiddleware");

//Multer Functions required
const storage = multer.diskStorage({
  destination: ".././hashbing/src/public/uploads/",
  filename: async function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
}).single("myImage");

router.post("/upload", decodeIDToken, async (req, res) => {
  try {
    console.log("File is", req.file);
    upload(req, res, async function (err) {
      console.log(req.session.userid);
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file); //Here you get file.
      await users.uploadPic(req.session.userid, req.file);
      if (!err) {
        return res.sendStatus(200).send(err);
      }
    });
  } catch (e) {
    console.log("err>>>>>>>>>>>>>>>>>>>>>>", e);
    return res.json({ error: e });
  }
});

// router.get("/profilePic", async (req, res)=> {
//   console.log("File is", req.file);
//   upload(req, res, async function (err) {
//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file); //Here you get file.
//     /*Now do where ever you want to do*/

//     if (!err) {
//       return res.sendStatus(200).send(err);
//     }
//   });
// });

router.get("/test", async (req, res) => {
  return res.json({ test: "test" });
});

router.post("/signup", async (req, res) => {
  try {
    let { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
      return res.sendStatus(400).send("Missing required fields");
    } else {
      let user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      console.log("here");
      // return res.sendStatus(200).json({ data: 1 });
      const data = await users.createUser(user);
      console.log("here after", data);
      return res.status(200).json({ data: data });
      console.log("here after again");
    }
  } catch (err) {
    console.log("err>>>>>>>>>>>>>>>>>>>>>>", err);
    return res.json({ error: err });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email } = req.body;
    isValidEmail(email);
    const { authenticated, user } = await users.authenticateUser(email);
    if (authenticated) {
      req.session.userid = user.email;
      const userInfo = handleUserInfo(user);
      console.log(req.session);
      res.json(userInfo);
    }
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});

router.put("/profile", async (req, res) => {
  try {
    const email = req.session.userid;
    const { phoneNumber, bio } = req.body;
    if (!email) throw "please login first to update your profile...";
    const user = await users.getUserByEmail(email);
    if (!user) throw "Invalid login, try again";
    const updatedUser = await users.updateUser(phoneNumber, bio, email);
    if (!updatedUser) throw "Could not update the user";
    res.json(updatedUser);
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});

module.exports = router;
