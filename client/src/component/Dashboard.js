import React, { useEffect, useState } from "react";

import "./newStyle2.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let name = localStorage.getItem("name");
  let name2 = localStorage.getItem("name2");

  let email = localStorage.getItem("email");
  let email2 = localStorage.getItem("email2");

  function logout() {
    if (window.confirm("Would you like to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("name2");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("email2");
      localStorage.removeItem("companyname");
      localStorage.removeItem("registrationdate");
      localStorage.removeItem("countryoforigin");

      window.location = "/login";
    }
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          MyProfile!
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
                Scouter profile
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
              src="/videos/space2.mp4"
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
                Welcome {name}
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
              </div>

              {/* <h3>
                  Technology name:{" "}
                  <i style={{ color: "magenta" }}>
                    {localStorage.getItem("technologyname")}
                  </i>
                </h3> */}
            </section>
          </div>
        </>
      ) : (
        (window.location = "/login")
      )}
    </>
  );
}
