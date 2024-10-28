import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { auth } from "../firebaseConfig";

const DashboardComponent = () => {

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
      <h1>Bienvenido al Dashboard {user?.email}</h1>
    </div>
  );
};

export default DashboardComponent;
