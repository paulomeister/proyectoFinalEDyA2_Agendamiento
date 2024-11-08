import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, updateProfile } from "firebase/auth";
import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from "./authSlice";
import axios from 'axios';

// Registro de usuario con correo y contraseña
export const registerWithEmail = (data) => async (dispatch) => {

  const { email, password, username, name, photo, esProveedor, servicios } = data;

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
      token: user.accessToken
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
      token: user.accessToken,
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

    let userData = await checkIfUserExists(user.uid);

    if (!userData) {
      userData = await registerNewUser(user);
    }

    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      token: user.accessToken,
    };

    dispatch(loginSuccess(serializableUser));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

const checkIfUserExists = async (uid) => {
  try {
    const response = await axios.get(`http://127.0.0.1:4000/api/usuarios/usuario/${uid}`);
    return response.data.usuario;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

const registerNewUser = async (user) => {
  const newUser = {
    uid: user.uid,
    email: user.email,
    nombre: user.displayName || "Random User",
    username: user.email.split('@')[0],
    fotoPerfil: user.photoURL || "https://www.gravatar.com/avatar/",
    esProveedor: false,
    servicios: []
  };

  await axios.post("http://127.0.0.1:4000/api/usuarios/crearUsuario", newUser, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return newUser;
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



