// authActions.js
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from "./authSlice";

// Registro de usuario con correo y contraseña
export const registerWithEmail = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    dispatch(loginSuccess(serializableUser));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Inicio de sesión con correo y contraseña
export const loginWithEmail = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    dispatch(loginSuccess(serializableUser));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Inicio de sesión con Google
export const loginWithGoogle = () => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    dispatch(loginSuccess(serializableUser));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Cerrar sesión
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logoutSuccess());
  } catch (error) {
    console.log(error.message);
  }
};

// Comprueba si el usuario está autenticado
export const checkAuthStatus = (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const serializableUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      dispatch(loginSuccess(serializableUser));
    }
  });
};

