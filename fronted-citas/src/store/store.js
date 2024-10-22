import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage"; // Usará localStorage por defecto
import { combineReducers } from "redux";
// Trabajando con datos no serializables con redux persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


// Configuración para persistir el estado en localStorage
const persistConfig = {
  key: "root",
  storage,
};

// Combina los reducers (por si tienes más de uno)
const rootReducer = combineReducers({
  auth: authReducer, // Añade aquí más reducers si es necesario
});

// Aplica persistencia al reducer combinado
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura el store con el reducer persistente
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Crea el persistor para manejar la persistencia
export const persistor = persistStore(store);
