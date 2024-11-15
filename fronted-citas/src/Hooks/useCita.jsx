import { useState, useEffect } from 'react';
import axios from 'axios';

const useCita = (id) => {
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await axios.get(`https://backendcitasedyaii-production.up.railway.app/api/citas/obtenerCitaPorId/${id}`);
        if (response.data.ok) {
          setCita(response.data.cita);
        }
      } catch (error) {
        console.error('Error al obtener la cita:', error);
      }
    };
    fetchCita();
  }, [id]);

  return {cita, setCita};
};

export default useCita;
