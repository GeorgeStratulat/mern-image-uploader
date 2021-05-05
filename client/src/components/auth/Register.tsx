import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser, IUser } from "../../actions";
import { StoreState } from "../../reducers";
import { RouterProps } from "react-router";
import { Link } from "react-router-dom";

interface Props extends StoreState, RouterProps {
  registerUser: (form: IRegisterState) => Promise<void>;
}

export interface IRegisterState extends IUser {
  pathname: string;
}

class Register extends Component<Props, IRegisterState> {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    pathname: this.props.history.location.pathname,
  };

  handleChange = (e: { target: HTMLInputElement }) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmPassword: HTMLInputElement | null = document.querySelector(
      "input[name=confirmPassword]"
    );
    // compare passwords
    if (this.state.password !== this.state.confirmPassword && confirmPassword) {
      confirmPassword.setCustomValidity("Passwords don't match");
    } else {
      this.props.registerUser(this.state).then(() => {});
    }
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <input
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                    placeholder="Password"
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                    placeholder="Confirm password"
                    required
                  />
                  <input
                    type="submit"
                    className="btn btn-primary full-width"
                    value="Register"
                  />
                </form>
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

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(Register);
