import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, updateProfile } from "firebase/auth";
import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from "./authSlice";
import axios from 'axios';
import { persistor } from "../store";

// Registro de usuario con correo y contraseña
export const registerWithEmail = (data) => async (dispatch) => {

  const {email, password, username, name, photo, esProveedor, servicios} = data;

  dispatch(loginRequest());
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const userData = {
      uid: user.uid,
      email: email,
      nombre: name,
      username: username,
      fotoPerfil: photo,  
      password: password,
      esProveedor: esProveedor,
      servicios: servicios
    };

    await axios.post("http://127.0.0.1:4000/api/usuarios/crearUsuario", userData, {
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
      email: email,
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
    persistor.purge();
  } catch (error) {
    console.log(error.message);
  }
};

// Comprueba si el usuario está autenticado
export const checkAuthStatus = auth.onAuthStateChanged((user) => {
  if (user) {
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    dispatch(loginSuccess(serializableUser));
  } else {
    dispatch(loginFailure("Credenciales no válidas o expiradas"));
  }
});

