import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./pages/auth/Login";
import RegisterComponent from "./pages/auth/Registro";
import DashboardComponent from "./pages/Home/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { checkAuthStatus } from "./store/auth/authActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProveedorDetail from "./pages/ProveedorDetail/ProveedorDetail";



const App = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //Mantiene la sesion del usuario iniciada
  useEffect(() => {
    checkAuthStatus(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas SIN Layout (sin Navbar) */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />

        {/* Rutas con Layout (con Navbar) */}
        <Route element={<Layout />}>
          {/* Rutas protegidas dentro del Layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/proveedor/:id"
            element={
              <ProveedorDetail />
            }
          />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
