import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail, loginWithGoogle } from "../../store/auth/authActions";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailLogin = (data) => {
    const { email, password } = data;
    dispatch(loginWithEmail(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Iniciar Sesión</h1>

        {loading && <p className="text-blue-500 mb-4">Cargando...</p>}
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <form onSubmit={handleSubmit(handleEmailLogin)}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "El email es obligatorio" })}
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

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Iniciar Sesión con Email
            </button>
          </div>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors mt-4"
        >
          Iniciar Sesión con Google
        </button>

        <div className="flex flex-col gap-4 text-center mt-4">
          <p>
            ¿No tienes una cuenta aún?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
