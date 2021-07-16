import React, { useEffect, useState } from "react";
// import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
// import Sitefooter from "../Footers/Sitefooter";
import "./newStyle2.css";
// import "../bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap/dist/css/bootstrap/min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let name = localStorage.getItem("name");

  function logout() {
    if (window.confirm("Would you like to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      localStorage.removeItem("name");
      localStorage.removeItem("name2");
      localStorage.removeItem("email");
      localStorage.removeItem("email2");
      localStorage.removeItem("companyname");
      localStorage.removeItem("registrationdate");
      localStorage.removeItem("countryoforigin");
      localStorage.removeItem("technologyname");
      window.location = "/AdminLogin";
    }
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          BookIt!
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Dashboard<span class="sr-only">(current)</span>{" "}
              </a>
            </li>
            <li class="nav-item ">
              <Link class="nav-link" style={{ pointerEvents: "none" }}>
                Displayer profile
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-danger navbar-btn ml-auto"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {token && role ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <video
              src="/videos/space.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "auto" }}
            />

            <section
              class="headsect"
              style={{
                marginTop: "10%",
                padding: "5px 15px",
                borderRadius: "30px",
              }}
            >
              <h1 style={{ color: "white", fontSize: "100px" }}>
                Welcome {name}!!
              </h1>
              <br />
              <div style={{ textAlign: "center", color: "white" }}>
                <h3>
                  Company Name:{" "}
                  <i style={{ color: "magenta" }}>
                    {localStorage.getItem("companyname")}
                  </i>
                </h3>
                <h3>
                  Date of registration:{" "}
                  <i style={{ color: "magenta" }}>
                    {localStorage.getItem("registrationdate").slice(0, -14)}
                  </i>
                </h3>
                <h3>
                  Country of origin:{" "}
                  <i style={{ color: "magenta" }}>
                    {localStorage.getItem("countryoforigin")}
                  </i>
                </h3>
                <h3>
                  Technology name:{" "}
                  <i style={{ color: "magenta" }}>
                    {localStorage.getItem("technologyname")}
                  </i>
                </h3>
              </div>
            </section>
          </div>
        </>
      ) : (
        (window.location = "/AdminLogin")
      )}
    </>
  );
}
