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
      try {
        if(!req.file)
            throw "Invalid file path, try again";
        if(!req.session.user)
            throw "user session expired, login again & try"
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file); //Here you get file.

        const path = await users.uploadPic(req.session.user, xss(req.file.filename));
        if (!path) throw "Error in uploading profile pic";
        console.log({ profilePic: path });
        res.json({ profilePic: path });
      } catch (e) {
        console.log("err>>>>>>>>>>>>>>>>>>>>>>", e);
        return res.json({ error: e });
      }
    });
  } catch (e) {
    console.log("err>>>>>>>>>>>>>>>>>>>>>>", e);
    return res.json({ error: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    let { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
      throw "Missing required fields";
    }
    if(typeof email != 'string' || typeof firstName != 'string' || typeof lastName != 'string') {
      throw "type error: input should of string type";
    } 
    isValidEmail(email);
      let user = {
        email: xss(email),
        firstName: xss(firstName),
        lastName: xss(lastName),
      };
      console.log("here");
      // return res.sendStatus(200).json({ data: 1 });
      const data = await users.createUser(user);
      console.log("here after", data);
      return res.status(200).json({ data: data });
      // console.log("here after again");
    
  } catch (err) {
    console.log("err>>>>>>>>>>>>>>>>>>>>>>", err);
    return res.json({ error: err });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email } = req.body;
    isValidEmail(email);
    const { authenticated, user } = await users.authenticateUser(xss(email));
    if (authenticated) {
      req.session.user = user.email;
      const userInfo = handleUserInfo(user);
      console.log(req.session);
      res.json({ user: userInfo, token: req.session.user });
    }
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});

router.post("/signinwithgoogle", async (req, res) => {
  try {
    const { email, displayname } = req.body;
    if (!displayname) {
      firstName = email;
      lastName = "";
    } else {
      let firstName = displayname.split(" ")[0]
        ? displayname.split(" ")[0]
        : email;
      let lastName = displayname.split(" ")[1] ? displayname.split(" ")[1] : "";
      if (!email) throw "please login with a valid emailid...";
    }
    isValidEmail(email);
    const userExists = await users.userExists(xss(email));
    console.log(userExists);
    if (userExists) {
      const { authenticated, user } = await users.authenticateUser(xss(email));
      if (authenticated) {
        req.session.user = user.email;
        const userInfo = handleUserInfo(user);
        console.log(req.session);
        console.log("here after signinwithgoogle");
        res.json({ user: userInfo, token: req.session.user });
      }
    } else {
      let user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      const data = await users.createUser(xss(user));
      console.log("here after signupwithgoogle", data);
      return res.status(200).json({ data: data });
    }
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});

router.put("/profile", decodeIDToken, async (req, res) => {
  try {
    const email = req.session.user;
    const { firstName, lastName, bio } = req.body;
    if (!email) throw "please login first to update your profile...";
    const user = await users.getUserByEmail(email);
    if (!firstName && !bio && !lastName) res.json(user);
    else {
      if (!user) throw "Invalid login, try again";
      const updatedUser = await users.updateUser(
        firstName,
        lastName,
        bio,
        email
      );
      if (!updatedUser) throw "Could not update the user";
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});
router.get("/profile", decodeIDToken, async (req, res) => {
  try {
    const email = req.session.user;
    if (!email) throw "please login first to view your profile...";
    const user = await users.getUserByEmail(email);
    if (!user) throw "Invalid login, try again";
    res.json(user);
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});
router.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("AuthCookie");
    res.status(200).send("You have logged out");
  } catch (error) {
    res.status(400).send(error?.message ?? error); //need to render
  }
});
module.exports = router;
