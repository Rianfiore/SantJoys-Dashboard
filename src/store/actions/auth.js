import setAuthorizationToken from "../../utils/setAuthorizationToken";
import firebaseApp from "../../firebase/Api";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  SET_CURRENT_USER,
  SET_INVALID_CREDENTIALS,
  SET_INTERNAL_SERVER_ERROR,
  SET_CONNECTION_REFUSED_ERROR,
} from "./types/types";

const URL = "http://localhost:8080";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function setInvalidCredentials(errorStatus) {
  return {
    type: SET_INVALID_CREDENTIALS,
    error: {
      status: errorStatus,
      message:
        "There was an error with your username or password combination. Please try again.",
    },
  };
}

export function setInternalServerError(errorStatus) {
  return {
    type: SET_INTERNAL_SERVER_ERROR,
    error: {
      status: errorStatus,
      message: "An unexpected error occurred. Please try again later.",
    },
  };
}

export function setConnectionRefusedError() {
  return {
    type: SET_CONNECTION_REFUSED_ERROR,
    error: {
      status: 502,
      message:
        "Email ou senha incorretos. Por favor, digite os dados corretamente.",
    },
  };
}

export function userSignInRequest(userData) {
  const auth = getAuth(),
    { username, password } = userData;

  return async (dispatch) => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        const token = auth.currentUser.accessToken;
        localStorage.setItem("token", token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser({ ...userData }));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            dispatch(setInvalidCredentials(error.response.status));
          } else {
            dispatch(setInternalServerError(error.response.status));
          }
        } else {
          dispatch(setConnectionRefusedError());
        }
      });
  };
}

export function userSignOutRequest() {
  return (dispatch) => {
    localStorage.removeItem("token");
    // Remove authorization header from future requests.
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
