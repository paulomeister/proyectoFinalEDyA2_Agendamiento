import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserNames = (cita) => {
  const [nombreProveedor, setNombreProveedor] = useState(null);
  const [nombreCliente, setNombreCliente] = useState(null);

  useEffect(() => {
    const fetchNames = async () => {
      if (cita) {
        try {
          const proveedorResponse = await axios.get(`http://127.0.0.1:4000/api/usuarios/usuario/${cita.proveedorId}`);
          setNombreProveedor(proveedorResponse.data.usuario.nombre);

          const clienteResponse = await axios.get(`http://127.0.0.1:4000/api/usuarios/usuario/${cita.usuarioId}`);
          setNombreCliente(clienteResponse.data.usuario.nombre);
        } catch (error) {
          console.error('Error al obtener los nombres:', error);
        }
      }
    };
    fetchNames();
  }, [cita]);

  return { nombreProveedor, nombreCliente };
};

export default useUserNames;
