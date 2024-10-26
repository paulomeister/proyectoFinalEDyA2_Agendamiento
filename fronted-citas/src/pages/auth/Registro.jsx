import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerWithEmail } from "../../store/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [isProveedor, setIsProveedor] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);


  const handleRegister = (data) => {
    // Transforma los servicios de texto a array
    data.servicios = data.servicios ? data.servicios.split(",").map(servicio => servicio.trim()) : [];
    dispatch(registerWithEmail(data));
  };

  // Habilita el campo Servicios
  const handleProveedorChange = (e) => {
    setIsProveedor(e.target.checked);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Registrarse</h1>

        {loading && <p className="text-blue-500 mb-4">Cargando...</p>}
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "El username es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "El email no es válido"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="URL de la Imagen"
              {...register("photo")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              {...register("esProveedor")}
              className="mr-2"
              onChange={handleProveedorChange}
            />
            <label className="text-gray-700">¿Es proveedor?</label>
          </div>

          {/* Campo de Servicios visible solo cuando esProveedor es true  */}
          {isProveedor && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Servicios (separados por comas)"
                {...register("servicios", {
                  required: "Los servicios son obligatorios"
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.servicios && <p className="text-red-500 text-sm">{errors.servicios.message}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Registrarse
          </button>

          <div className="flex flex-col gap-4 text-center mt-4">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
