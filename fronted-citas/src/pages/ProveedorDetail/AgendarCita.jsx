import MyDropdown from "../../components/MyDropdown.jsx"
import ListarCitas from "../../components/ListarCitas.jsx"
import ModalConfirmacion from "../../components/ModalConfirmacion.jsx"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { asignarFecha, ocultarModal } from '../../store/slices/reservacionSlice'
import { useDispatch } from "react-redux"



function AgendarCita() {
  
  const { uid } = useParams()
  const dispatch = useDispatch()
  
  const [disponibilidad, setDisponibilidad] = useState([]) 
  const [disponibilidadDiaria, setDisponibilidadDiaria] = useState([]) 
  const [isDisponible, setIsDisponible] = useState(null) 

  const [mes, setMes] = useState("Mes")
  const [dia, setDia] = useState("Día")
  const [year, setYear] = useState("Año")

  const mesesNumeros = {
    
    "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
    "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
    "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
  
  }

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const years = ["2024", "2025", "2026"]
  const [dias, setDias] = useState([])

  useEffect(() => {

    dispatch(ocultarModal())

  }, [])

  useEffect(() => {

    const diasPorMes = {
  
      "Enero": 31, "Febrero": 28, "Marzo": 31, "Abril": 30,
      "Mayo": 31, "Junio": 30, "Julio": 31, "Agosto": 31,
      "Septiembre": 30, "Octubre": 31, "Noviembre": 30, "Diciembre": 31,
  
    }

    const diasEnMes = diasPorMes[mes] || 31;
    setDias(Array.from({ length: diasEnMes }, (_, i) => (i + 1).toString()));
  
  }, [mes])

  useEffect(() => {

    const recuperarDisponibilidad = async () => {

      try {

        const response = await axios.get(`https://backendcitasedyaii-production.up.railway.app/api/usuarios/disponiblidadProveedor?uid=${uid}`) 
        
        if(!response.data) {

          throw Error(`No se encontró la disponibilidad del proveedor con id ${uid}`);

        }

      setDisponibilidad(response.data);
      
      } 
      catch(error) {
        
        console.error('Error al cargar la disponibilidad del proveedor:', error);
      
      }

    }
    recuperarDisponibilidad()

  }, [uid])

  useEffect(() => {

    if (year !== "Año" && mes !== "Mes" && dia !== "Día") {
  
      const fechaFormato = `${year}-${mesesNumeros[mes]}-${dia.padStart(2, '0')}`
      dispatch(asignarFecha(fechaFormato))
      
      const disponibilidadDia = disponibilidad.availability[fechaFormato]
      setDisponibilidadDiaria(disponibilidadDia)

      setIsDisponible(disponibilidadDia ? true : false)
    
    }
  
  }, [year, mes, dia, disponibilidad])

  
  return (
    <>
      <div>
        
        <h2 className="text-xl font-medium text-black mb-2">Selecciona la fecha para reservar</h2>
        
        <div>
        
          <MyDropdown id="dropdown-mes" buttonId="button-mes" valor={mes} setValor={setMes} opciones={meses} />
          <MyDropdown id="dropdown-dia" buttonId="button-dia" valor={dia} setValor={setDia} opciones={dias} />
          <MyDropdown id="dropdown-year" buttonId="button-year" valor={year} setValor={setYear} opciones={years} />
          
        </div>

          {isDisponible ? <p className="text-lg font-bold mt-2">Franjas:</p> : <p className="text-lg text-red-600 font-bold mt-4">El usuario no tiene disponibilidad en esa fecha</p>} 
          {isDisponible && <ListarCitas disponibilidad={disponibilidadDiaria} />}
      
      </div>

      <ModalConfirmacion />

    </>
  );
}

export default AgendarCita;
