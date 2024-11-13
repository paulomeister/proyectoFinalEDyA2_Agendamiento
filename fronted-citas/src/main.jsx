import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from "./store/store.js";
import { Provider } from "react-redux";
import { useEffect } from 'react';
import { auth } from './firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from './store/auth/authSlice.js';
import { useState } from 'react';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, accessToken } = user;

        try {
          const response = await axios.get(`https://backendcitasedyaii-production.up.railway.app/api/usuarios/usuario/${uid}`);
          const userData = response.data.usuario;

          const serializableUser = {
            uid: uid,
            email: userData.email,
            displayName: userData.nombre,
            username: userData.username,
            photoURL: userData.fotoPerfil,
            token: accessToken
          };

          dispatch(loginSuccess(serializableUser));
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      } else {
        dispatch(logoutSuccess());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Cargando...</p>
      </div>
    );
  }

  // Una vez cargado, renderiza los hijos
  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
)
