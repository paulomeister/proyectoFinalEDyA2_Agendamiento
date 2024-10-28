import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { auth } from "../../firebaseConfig";
import BarraBusqueda from "./BarraBusqueda";
import ProveedorList from "./ProveedorList";
import { useState } from "react";

const DashboardComponent = () => {
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => state.auth);

  // Obtiene el token para enviarlo en las petición
  // const getToken = async () => {
  //   const currentUser = auth.currentUser;
  //   if (currentUser) {
  //     const idToken = await currentUser.getIdToken(true);
  //     return idToken;
  //   }
  // };

  // const axiosToVerifyToken = async () => {
  //   try {
  //     const idToken = await getToken();
  //     console.log(idToken);
  //     if (!idToken) {
  //       console.error("No se pudo obtener el token de ID");
  //       return;
  //     }

  //     const response = await axios.get("http://localhost:4000/ruta-protegida", {
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     });

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error al verificar el token:", error);
  //   }
  // };

  return (
    <div>
      <div className="text-center pt-10 pb-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡El mejor lugar para asesorarte!</h1>
        <p className="text-lg text-gray-600">Busca lo que necesites y consulta con nuestros proveedores</p>
      </div>
      <BarraBusqueda search={search} setSearch={setSearch} />
      <ProveedorList search={search} />

    </div>
  );
};

export default DashboardComponent;
