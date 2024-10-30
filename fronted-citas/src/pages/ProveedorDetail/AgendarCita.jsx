import MyDropdown from "../../components/MyDropdown.jsx";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


function AgendarCita() {
  
  const { id } = useParams();
  const [disponibilidad, setDisponibilidad] = useState([]);

  const [isDisponible, setIsDisponible] = useState(null);

  const [mes, setMes] = useState("Mes");
  const [dia, setDia] = useState("Día");
  const [year, setYear] = useState("Año");

  
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const years = ["2024", "2025", "2026"];
  const [dias, setDias] = useState([]);

  useEffect(() => {

    const recuperarDisponibilidad = async () => {

      try {

        const response = await axios.get(`http://localhost:4000/api/usuarios/disponiblidadProveedor?_id=${id}`)
        
        if(!response.data) {

          throw Error(`No se encontró la disponibilidad del proveedor con id ${id}`);

        }

      setDisponibilidad(response.data);
      
      } 
      catch(error) {
        
        console.error('Error al cargar la disponibilidad del proveedor:', error);
      
      }

    }
    recuperarDisponibilidad()
  
    const diasPorMes = {
  
      "Enero": 31, "Febrero": 28, "Marzo": 31, "Abril": 30,
      "Mayo": 31, "Junio": 30, "Julio": 31, "Agosto": 31,
      "Septiembre": 30, "Octubre": 31, "Noviembre": 30, "Diciembre": 31,
  
    }

    const diasEnMes = diasPorMes[mes] || 31;
    setDias(Array.from({ length: diasEnMes }, (_, i) => (i + 1).toString()));
  
  }, [mes])


  // Para pruebas TODO: borrar luego
  useEffect(() => {

    console.log(disponibilidad);

  }, [disponibilidad])

  return (
    <>
      <div>
        
        <h2 className="text-xl font-medium text-black mb-2">Selecciona la fecha para reservar</h2>
        
        <div>
        
          <MyDropdown id="dropdown-mes" buttonId="button-mes" valor={mes} setValor={setMes} opciones={meses} />
          <MyDropdown id="dropdown-dia" buttonId="button-dia" valor={dia} setValor={setDia} opciones={dias} />
          <MyDropdown id="dropdown-year" buttonId="button-year" valor={year} setValor={setYear} opciones={years} />
          
        </div>

          <button className="mt-4 ml-2 bg-indigo-700 text-black font-medium py-2 px-2 rounded-lg">
            Validar
          </button>  
      
      </div>
    </>
  );
}

export default AgendarCita;
