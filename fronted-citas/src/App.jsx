import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginComponent from "./pages/auth/Login";
import RegisterComponent from "./pages/auth/Registro";
import DashboardComponent from "./pages/Home/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import ProveedorDetail from "./pages/ProveedorDetail/ProveedorDetail";
import AgendarCita from "/src/pages/ProveedorDetail/AgendarCita.jsx"
import PerfilUsuario from "/src/pages/Usuario/Perfil.jsx"
import MisCitas from "./pages/Usuario/MisCitas";


const App = () => {
  const { user } = useSelector((state) => state.auth);


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
            path="/perfil/:uid"
            element={
              <PrivateRoute>
                <PerfilUsuario/>
              </PrivateRoute>
            }
          />
          <Route
            path="/proveedor/:uid"
            element={
              <ProveedorDetail />
            }
          />
          <Route
            path="/proveedor/:uid/agendarCita"
            element={
              <PrivateRoute>
                <AgendarCita />
              </PrivateRoute>

            }
         />
          <Route
            path="/misCitas"
            element={
              <PrivateRoute>
                <MisCitas />
              </PrivateRoute>

            }
         />

        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
