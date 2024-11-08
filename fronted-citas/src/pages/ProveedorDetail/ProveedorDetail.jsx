import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProveedorDetail = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState(null);

  const handleAgendarCita = () => {
    // Redirigir a la ruta para agendar una cita
    navigate(`/proveedor/${uid}/agendarCita`); 
  };

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/usuarios/usuario/${uid}`);
        setProveedor(response.data.usuario);
      } catch (error) {
        console.error('Error al cargar el proveedor:', error);
      }
    };
    fetchProveedor();
  }, [uid]);

  if (!proveedor) return <p>Cargando...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg  grid grid-cols-1 md:grid-cols-[1.3fr_2fr] gap-8">
      {/* columna izquierda */}
      <div className='border-r-2 border-gray-100'>
        {/* encabezado del perfil */}
        <div className="flex items-center mb-6 ">
          <img
            src={proveedor.fotoPerfil}
            alt={`${proveedor.nombre}'s profile`}
            className="w-32 h-32 rounded-full border-4 border-blue-500 mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{proveedor.nombre}</h1>
            <h2 className="text-xl font-semibold text-blue-500">@{proveedor.username}</h2>
            <p className="text-gray-600">{proveedor.email}</p>
          </div>
        </div>
  
        {/* biografia */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Biografía</h3>
          <p className="text-gray-700 leading-relaxed">{proveedor.biografia}</p>
        </div>
  
        {/* calificación promedio */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Calificación Promedio:</h3>
          <p className="text-3xl text-yellow-500">{proveedor.calificacionPromedio} ★</p>
        </div>
      </div>
  
      {/* columna derecha*/}
      <div>
        {/* servicios ofrecidos */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Servicios Ofrecidos</h3>
          <div className="flex flex-wrap gap-2">
            {proveedor.servicios.map((servicio, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
              >
                {servicio}
              </button>
            ))}
          </div>
        </div>
  
        {/* seccion de calificaciones con dropdown */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Calificaciones:</h3>
          {proveedor.calificaciones.length > 0 ? (
            <details className="bg-sky-100 p-4 rounded shadow">
              <summary className="cursor-pointer text-gray-800 font-semibold">
                Ver Calificaciones ({proveedor.calificaciones.length})
              </summary>
              <div className="mt-4 h-72 overflow-y-auto space-y-4">
                {proveedor.calificaciones.map((calificacion, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow-sm mr-2">
                    <p className="font-semibold text-gray-800">
                      {calificacion.username}: {calificacion.comentario}
                    </p>
                    <p className="text-gray-600">
                      Calificación: <span className="text-yellow-500">{calificacion.calificacion} ★</span>
                    </p>
                  </div>
                ))}
              </div>
            </details>
          ) : (
            <p className="text-gray-600">No hay calificaciones disponibles.</p>
          )}
        </div>
  
        {/* boton para Agendar Cita */}
        <div className="flex justify-end">
          <button
            onClick={handleAgendarCita}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Agendar Cita
          </button>
        </div>
      </div>
    </div>
  );
  

};


export default ProveedorDetail;
