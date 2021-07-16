import React, { useEffect, useState } from "react";
// import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
// import Sitefooter from "../Footers/Sitefooter";
import "./newStyle2.css";
import { Row, Col } from "react-bootstrap";
// import "../bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap/dist/css/bootstrap/min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AdminRegister() {
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "admin"
    ) {
      history.push("/admindashboard");
    }

    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "user"
    ) {
      history.push("/dashboard");
    }
  });

  const authAxios = axios.create({
    baseURL: "https://souvik-newauthapp-2021.herokuapp.com",
  });

  let form_data = {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [registrationdate, setRegistrationdate] = useState(new Date());
  const [countryoforigin, setCountryoforigin] = useState("");
  const [technologyname, setTechnologyname] = useState("");

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    let form_data = {
      name: name,
      email: email,
      password: password,
      companyname: companyname,
      registrationdate: registrationdate,
      countryoforigin: countryoforigin,
      technologyname: technologyname,
    };

    console.log(form_data);
    authAxios.post("/newaptadmins/add", form_data).then((res) => {
      if (res.data) {
        if (password.length < 6) {
          alert("Password should be atleast 6 characters long");
        } else {
          alert("Registered successfully");
          window.location.reload();
        }
        //   window.location = "/Signin";
      } else {
        alert("Not able to register");
      }
    });
  };

  return (
    <div>
      <video
        src="/videos/eduvid2.mp4"
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "auto" }}
      />
      <div className="register " class="registerback">
        <div
          className="register_container shadow"
          class="colorbox"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} class=" newrow">
            <h3 class="section-header">Displayer Signup</h3>
            <br />
            <Row>
              <Col md={6}>
                <div class=" indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>

                    <input
                      placeholder="Enter Name"
                      name="firstname"
                      class="form-control"
                      value={name}
                      type="text"
                      required
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div class=" indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>

                    <input
                      placeholder="Enter Email"
                      name="firstname"
                      class="form-control"
                      value={email}
                      type="email"
                      required
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div class="indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-lock fa" aria-hidden="true"></i>
                    </span>
                    <input
                      placeholder="Password"
                      name="password"
                      class="form-control"
                      defaultValue={password}
                      required
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      type="password"
                    ></input>
                    {errors.password && errors.password.message}
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div class=" indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>

                    <input
                      placeholder="Enter Company Name"
                      name="companyname"
                      class="form-control"
                      value={companyname}
                      type="text"
                      required
                      onChange={(event) => {
                        setCompanyname(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div class=" indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>

                    <input
                      placeholder="Enter Technology name"
                      name="technologyname"
                      class="form-control"
                      value={technologyname}
                      type="text"
                      required
                      onChange={(event) => {
                        setTechnologyname(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div class=" indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>

                    <input
                      placeholder="Enter Country of Origin"
                      name="countryoforigin"
                      class="form-control"
                      value={countryoforigin}
                      type="text"
                      required
                      onChange={(event) => {
                        setCountryoforigin(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div class=" indv">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-user fa" aria-hidden="true"></i>
                    </span>

                    <div>
                      <p style={{ color: "grey", lineHeight: 0.6 }}>
                        Registration date
                      </p>
                    </div>
                    <div>
                      <DatePicker
                        // class="form-control"
                        className="registerdatepicker"
                        selected={registrationdate}
                        onChange={(date) => {
                          setRegistrationdate(date);
                          console.log(date);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <br></br>

            <div class="coolone">
              <button
                class="col-md-10 indv"
                style={{ backgroundColor: "#3f51b5", color: "white" }}
                className="shadow btn my-2 mx-5"
                type="submit"
              >
                Submit
              </button>
            </div>

            <span>
              Have a Displayer account? <Link to="/AdminLogin">Sign In</Link>
            </span>
            <br />
            <span>
              Go to <Link to="/">Scouter Sign Up</Link>
            </span>
            <br />

            <p style={{ color: "lightgray" }}>Made by Souvik Das in 2021</p>
          </form>
        </div>
      </div>
      {/* <Sitefooter /> */}
    </div>
  );
}
