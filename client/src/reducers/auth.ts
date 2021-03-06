import { AuthActions, IUser, ActionTypes } from "../actions";
export interface AuthState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case ActionTypes.loginUser:
    case ActionTypes.persistUser:
    case ActionTypes.registerUser:
      return {
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case ActionTypes.logoutUser:
      return {
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
