import React, { Component } from "react";
import { connect } from "react-redux";
import { postLogin } from "../../actions";
import { StoreState } from "../../reducers";
import Spinner from "../utils/Spinner/Spinner";
import { Link } from "react-router-dom";
import { RouterProps } from "react-router";

interface Props extends StoreState, RouterProps {
  postLogin: (email: string, password: string) => Promise<void>;
}
interface State {
  email: string;
  password: string;
  loading: boolean;
  pathname: string;
}

class Login extends Component<Props, State> {
  state = {
    email: "",
    password: "",
    loading: false,
    pathname: this.props.history.location.pathname,
  };

  handleChange = (e: { target: HTMLInputElement }) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    // Set loading to true which adds spinner
    this.setState({ loading: true });

    // Login user
    this.props.postLogin(email, password).then((res) => {
      // Refresh form if authentication fails
      // isAuthenticated is only updated after updating the store's state
      // This callback is called straight after the action which is before the latter
      if (this.props.history.location.pathname === this.state.pathname) {
        this.setState({ email: "", password: "", loading: false });
      }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex"></div>
              {this.state.loading ? (
                <Spinner />
              ) : (
                <div className="card-body">
                  <h5 className="card-title text-center">Login</h5>

                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      placeholder="Email"
                      required
                    />
                    <input
                      type="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      placeholder="Password"
                      required
                    />
                    <input
                      type="submit"
                      className="btn btn-primary full-width"
                      value="Login"
                    />
                  </form>
                  <p className="centered-p">
                    Don't have an account? <Link to={"/register"}>Sign up</Link>
                  </p>
                </div>
              )}
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

export default connect(mapStateToProps, { postLogin })(Login);
