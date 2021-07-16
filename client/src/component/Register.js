import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
// import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
// import Sitefooter from "../Footers/Sitefooter";
import "./newStyle2.css";
// import "../bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap/dist/css/bootstrap/min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function Register() {
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
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    let form_data = {
      name: name,
      email: email,
      password: password,
      companyname: companyname,
      registrationdate: registrationdate,
      countryoforigin: countryoforigin,
    };

    console.log(form_data);
    authAxios.post("/newaptusers/add", form_data).then((res) => {
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

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            {/* <h5>First Name</h5> */}
            <h3 class="section-header">Scouter Signup</h3>
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
                    <div>
                      <p style={{ color: "grey", lineHeight: 0.6 }}>
                        Registration date
                      </p>
                    </div>
                    <div>
                      <DatePicker
                        className="registerdatepicker"
                        // class="form-control"
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
            </Row>

            {/* <h5>Confirm Password</h5> */}

            <br></br>
            {/* <div class="col-12">
              <div class="custom-control custom-control-alternative custom-checkbox">
                <input
                  class="custom-control-input"
                  id="customCheckRegister"
                  type="checkbox"
                  required
                ></input>
                <label class="custom-control-label" for="customCheckRegister">
                  <span>
                    I agree with the <a href="#pablo">Privacy Policy</a>
                  </span>
                </label>
              </div>
            </div> */}

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
              Have a Scouter account? <Link to="/login">Sign In</Link>
            </span>
            <br />
            <span>
              Go to <Link to="/adminregister">Displayer Sign Up</Link>
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
