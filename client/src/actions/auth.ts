import axios from "axios";
import { ActionTypes } from "./types";
import { IUser } from ".";
import catchAsync from "../utils/catchAsync";
import { setAlert, AlertType } from "./alerts";
import { IRegisterState } from "../components/auth/Register";

export interface LoginAction {
  type: ActionTypes.loginUser;
  payload: IUser;
}

export interface PersistUserAction {
  type: ActionTypes.persistUser;
  payload: IUser;
}

export interface LogoutAction {
  type: ActionTypes.logoutUser;
}

export interface RegUserAction {
  type: ActionTypes.registerUser;
  payload: IUser;
}

export const persistUser = (user: IUser) =>
  catchAsync(async (dispatch) => {
    console.log("persistUser from actions", user);
    dispatch<PersistUserAction>({
      type: ActionTypes.persistUser,
      payload: user,
    });
    dispatch(
      setAlert(`${user.email} successfully logged in`, AlertType.success)
    );
  });

export const postLogin = (email: string, password: string) =>
  catchAsync(async (dispatch) => {
    console.log("logging in with ", email);
    const res = await axios.post<IUser>("/api/auth/login", {
      email,
      password,
    });
    console.log("login response", res);
    dispatch<LoginAction>({
      type: ActionTypes.loginUser,
      payload: res.data,
    });

    dispatch(
      setAlert(`${res.data.email} successfully logged in`, AlertType.success)
    );
  });

export const getLogout = () =>
  catchAsync(async (dispatch) => {
    await axios.get("/api/auth/logout");
    dispatch<LogoutAction>({ type: ActionTypes.logoutUser });
  });

export const registerUser = (form: IRegisterState) =>
  catchAsync(async (dispatch) => {
    const res = await axios.post<IUser>("/api/users/register", form);
    dispatch<RegUserAction>({
      type: ActionTypes.registerUser,
      payload: res.data,
    });
    dispatch(
      setAlert(
        `Welcome! You have been successfully registered!`,
        AlertType.success
      )
    );
  });
