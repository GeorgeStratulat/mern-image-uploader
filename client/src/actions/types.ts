import { SetAlertAction, ResetAlertAction } from "./alerts";
import {
  LoginAction,
  LogoutAction,
  PersistUserAction,
  RegUserAction,
} from "./auth";

export enum ActionTypes {
  alert = "ALERT",
  resetAlert = "RESET_ALERT",
  registerUser = "REGISTER_USER",
  loginUser = "LOGIN_USER",
  persistUser = "PERSIST_USER",
  logoutUser = "LOGOUT_USER",
  changePassword = "CHANGE_PASSWORD",
}

export type AuthActions =
  | LoginAction
  | PersistUserAction
  | LogoutAction
  | RegUserAction;
export type AlertActions = SetAlertAction | ResetAlertAction;
