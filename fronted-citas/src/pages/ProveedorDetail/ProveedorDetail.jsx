import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProveedorDetail = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await axios.get(`/proveedores.json`);
        const proveedorEncontrado = response.data.find((p) => p.uid === id);
        setProveedor(proveedorEncontrado);
      } catch (error) {
        console.error('Error al cargar el proveedor:', error);
      }
    };
    fetchProveedor();
  }, [id]);

  if (!proveedor) return <p>Cargando...</p>;

  return (
    <div className="p-6 text-center">
      <img
        src={proveedor.fotoPerfil}
        alt={proveedor.nombre}
        className="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <h3 className="text-2xl font-semibold">{proveedor.nombre}</h3>
      <p className="text-gray-600">{proveedor.servicios.join(' • ')}</p>
      <p className="mt-2 text-yellow-500 font-bold">
        Calificación: {proveedor.calificacionPromedio} ⭐
      </p>
      <p className="text-sm text-gray-500">
        {proveedor.personasAtendidas} personas atendidas
      </p>
      <p className="text-gray-700 mt-4">{proveedor.biografia}</p>
    </div>
  );
};

export default ProveedorDetail;
