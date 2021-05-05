import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { getLogout } from "../../actions";
import { privRoutesArr, pubRoutesArr } from "../routing/Routes";

interface Props extends StoreState {
  getLogout: () => Promise<void>;
}

class Navbar extends Component<Props> {
  render() {
    const publicRoute = pubRoutesArr.filter((route) => route.nav !== false);
    const privateRoute = privRoutesArr.filter((route) => route.nav !== false);

    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!isAuthenticated
              ? publicRoute.map((route) => (
                  <li className="nav-item" key={route.name}>
                    <Link className="nav-link" to={route.path}>
                      {route.name}
                    </Link>
                  </li>
                ))
              : privateRoute.map((route) => (
                  <li key={route.name}>
                    <Link className="nav-link" to={route.path}>
                      {route.name}
                    </Link>
                  </li>
                ))}
            {isAuthenticated && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/login"}
                  onClick={this.props.getLogout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
  users: state.users,
  alerts: state.alerts,
});

export default connect(mapStateToProps, { getLogout })(Navbar);
