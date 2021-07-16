const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bdbskjdjkbfksfuadufguGFUFJAJFjabjfFfq";

let Aptuser = require("../models/newaptuser.model");

//get the users
router.get("/", async (req, res) => {
  try {
    const aptusers = await Aptuser.find();
    res.json(aptusers);
  } catch (err) {
    res.json({ message: err });
  }
});

//register users

router.post("/add", async (req, res) => {
  const newAptuser = new Aptuser({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    companyname: req.body.companyname,
    registrationdate: req.body.registrationdate,
    countryoforigin: req.body.countryoforigin,
    type: "user",
  });

  if (req.body.password.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  try {
    const savedAptuser = await newAptuser.save();
    res.json(savedAptuser);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
  }
});

//users login
router.post("/login", async (req, res) => {
  // const { username, password } = req.body

  const { email, password } = req.body;
  const user = await Aptuser.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET
      );

      return res.json({
        status: "ok",
        data: token,
        name: user.name,
        role: user.type,
        email: user.email,
        companyname: user.companyname,
        registrationdate: user.registrationdate,
        countryoforigin: user.countryoforigin,
      });
    } else {
      res.json({ status: "error", error: "Invalid password" });
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid email/password" });
  }
});

module.exports = router;
