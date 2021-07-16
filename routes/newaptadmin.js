const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bdbskjdjkbfksfuadufguGFUFJAJsdfsdfdfsgh";

let Aptadmin = require("../models/newaptadmin.model");

//get the admins
router.get("/", async (req, res) => {
  try {
    const aptadmins = await Aptadmin.find();
    res.json(aptadmins);
  } catch (err) {
    res.json({ message: err });
  }
});

//register the admins

router.post("/add", async (req, res) => {
  const newAptadmin = new Aptadmin({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    companyname: req.body.companyname,
    registrationdate: req.body.registrationdate,
    countryoforigin: req.body.countryoforigin,
    technologyname: req.body.technologyname,
    type: "admin",
  });

  if (req.body.password.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  try {
    const savedAptadmin = await newAptadmin.save();
    res.json(savedAptadmin);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
  }
});

//login the admins
router.post("/login", async (req, res) => {
  // const { username, password } = req.body

  const { email, password } = req.body;
  const admin = await Aptadmin.findOne({ email }).lean();

  if (!admin) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }
  try {
    if (await bcrypt.compare(password, admin.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
        },
        JWT_SECRET
      );

      return res.json({
        status: "ok",
        data: token,
        role: admin.type,
        name: admin.name,
        email: admin.email,
        companyname: admin.companyname,
        registrationdate: admin.registrationdate,
        countryoforigin: admin.countryoforigin,
        technologyname: admin.technologyname,
      });
    } else {
      res.json({ status: "error", error: "Invalid password" });
    }
  } catch (error) {
    res.json({ status: "error", error: "Invalid email/password" });
  }
});

module.exports = router;
