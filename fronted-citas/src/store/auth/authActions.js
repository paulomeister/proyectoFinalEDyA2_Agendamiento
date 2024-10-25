import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from "./authSlice";
import axios from 'axios';

// Registro de usuario con correo y contraseña
export const registerWithEmail = (email, password, name, username, photo) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    
    const userData = {
      uid: user.uid,
      email: user.email,
      name: name,
      username: username,
      photo: photo, 
    };

    console.log(userData);

    
    await axios.post('TU_URL', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    await updateProfile(user, {
      displayName: name,
      photoURL: photo, 
    });

    
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      username: username,
      photoURL: photo,  
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

