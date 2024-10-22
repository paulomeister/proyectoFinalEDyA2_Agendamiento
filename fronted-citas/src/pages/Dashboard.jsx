// DashboardComponent.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const DashboardComponent = () => {

  const { user } = useSelector((state) => state.auth);

  

  return (
    <div>
      <h1>Bienvenido al Dashboard {user?.email}</h1>
    </div>
  );
};

export default DashboardComponent;
