import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerWithEmail } from "../../store/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = (data) => {
    const { email, password, username, name, photo } = data;
    dispatch(registerWithEmail(email, password, username, name, photo));
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

          <div className="mb-6">
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
              {...register("imageUrl", { required: "La URL de la imagen es obligatoria" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
