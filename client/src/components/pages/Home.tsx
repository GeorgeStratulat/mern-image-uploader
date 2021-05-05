import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex"></div>

              <div className="card-body">
                <h5 className="card-title text-center">Home</h5>
                <p className="centered-p">
                  Don't have an account? <Link to={"/register"}>Sign up</Link>
                </p>
                <p className="centered-p">
                  Already have an account? <Link to={"/login"}>Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
