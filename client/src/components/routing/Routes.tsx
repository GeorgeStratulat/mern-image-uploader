import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { RouteProps } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Axios from "axios";
import { ActionTypes, IUser } from "../../actions";
import { StoreState } from "../../reducers";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../auth/Register";
import PublicRoute from "./PublicRoute";
import { axiosURL } from "../../store";

export const pubRoutesArr = [
  { name: "Home", path: "/", component: Home, nav: true }, // had to add nav:true for typescript to recognise nav property
  { name: "Login", path: "/login", component: Login, nav: true },
  { name: "Register", path: "/register", component: Register, nav: true },
];

export const privRoutesArr = [
  { name: "Dashboard", path: "/dashboard", component: Dashboard, nav: true },
];

interface Props extends StoreState, RouteProps {
  sessionExpired: () => { type: ActionTypes };
  persistUser: (user: IUser) => { type: ActionTypes };
}

class Routes extends Component<Props> {
  componentDidMount() {
    Axios.get<boolean>(`${axiosURL}/api/auth/isloggedin`)
      .then((res) => {
        if (!res.data) {
          this.props.sessionExpired();
        } else if (res.data as IUser) {
          this.props.persistUser(res.data as IUser);
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.sessionExpired();
      });
  }

  render() {
    return (
      <Switch>
        {pubRoutesArr.map((route) => (
          <PublicRoute
            key={route.name}
            isAuthenticated={this.props.auth.isAuthenticated}
            exact
            path={route.path}
            component={route.component}
          />
        ))}

        {privRoutesArr.map((route) => (
          <PrivateRoute
            key={route.name}
            isAuthenticated={this.props.auth.isAuthenticated}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
  users: state.users,
  alerts: state.alerts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sessionExpired: () => dispatch({ type: ActionTypes.logoutUser }),
  persistUser: (user: IUser) => {
    return dispatch({ type: ActionTypes.persistUser, payload: user });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
