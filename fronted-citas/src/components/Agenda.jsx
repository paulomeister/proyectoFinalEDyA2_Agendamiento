import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import MyDropdown from "./MyDropdown"
import agendada from '../assets/agendada.png'
import completada from '../assets/completada.png'
import cancelada from '../assets/cancelada.png'

function Agenda({tipo, uid}) {

    const navigate = useNavigate()

    const [citasUsuario, setCitasUsuario] = useState(null) 
    
    const [cargando, setCargando] = useState(null)

    const [titulo, setTitulo] = useState(null)
    const [descripcion, setDescripcion] = useState(null)

    const [estado, setEstado] = useState("Todas")
    const estadosPosibles = ["Todas", "Agendada", "Cancelada", "Completada"]

    useEffect(() => {

        setTitulo((tipo === "citasAgendadas" ? "Citas que he agendado" : "Citas por atender"))
        
        setDescripcion((tipo === "citasAgendadas" ? "En este apartado encontrarás las citas que has agendado con los proveedores de tu preferencia."
            : "Aquí podrás visualizar las citas que atenderás como un proveedor, en caso de que te hayas registrado como uno, y tengas citas activas."))

    }, [tipo])

    useEffect(() => {

        const recuperarCitas = async () => {

            try {
                
                setCargando(true)
                const citas = await axios.get(`https://backendcitasedyaii-production.up.railway.app/api/citas/${tipo}/${uid}`)
        
                setCitasUsuario(citas.data.citas)
                setCargando(false)

            }
            catch(error) {

                setCitasUsuario(null)
                setCargando(null)

            }
               
        }

        recuperarCitas()

      }, [tipo, uid])
    
      const citasEleccion = (estado !== "Todas" ? (citasUsuario?.filter((cita) => cita.status === estado.toLowerCase())
        .sort((a, b) => {

            if (estado === "Agendada") {
            
                return new Date(a.fecha) - new Date(b.fecha)
            
            } 
            else {
            
                return new Date(b.fecha) - new Date(a.fecha)
           
            }
        
        })) : (citasUsuario?.sort((a, b) => {

            return new Date(b.fecha) - new Date(a.fecha)

        })))
        
        return (

            <>

                <div className="bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{ titulo }</h2>
                            <p className="mt-2 text-lg/8 text-gray-600">{ descripcion }</p>
                        </div>
                        <div className="my-4">
                    {citasUsuario && 
                    
                    <>
                    
                    <label className="text-gray-700 font-medium">
                    
                        Filtrar por estado:
                    
                    </label>
                    
                    <div className="mt-2">

                    <MyDropdown id="dropdown-estados" buttonId="button-estados" valor={estado} setValor={setEstado} opciones={estadosPosibles} />
                    
                    </div>
                    
                    </>
                    
                    }

                </div>

                        {citasUsuario ? (
                        
                                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                    
                                    {citasEleccion.length > 0 ? (

                                        citasEleccion.map((cita) => (

                                            <article key={cita._id} className="flex max-w-xl flex-col items-start justify-between">
                                                <div className="flex items-center gap-x-4 text-xs">
                                                    <time dateTime={cita.datetime} className="text-gray-500">
                                                        {new Date(cita.fecha).toLocaleDateString()}
                                                    </time>
                                                    <label
                                                        className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                                    >
                                                        {cita.comienzaEn} - {cita.terminaEn}
                                                    </label>
                                                </div>
                                                <div className="group relative">
                                                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                                        <label>
                                                                {tipo === "citasAgendadas" ? cita.proveedorId?.nombre : cita.usuarioId?.nombre} <small>{tipo === "citasAgendadas" ? "(Proveedor)" : "(Usuario)"}</small>
                                                        </label>
                                                    </h3>
                                                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600"><strong>Notas: </strong>{cita.notas?.mensaje || "Aún no se ha escrito nada!"}</p>
                                                </div>
                                                <div className="relative mt-8 flex items-center gap-x-4">
                                                    <img alt="" src={cita.status === "agendada" ? agendada : (cita.status === "completada" ? completada : cancelada)} className="h-10 w-10 rounded-full bg-gray-50" />
                                                    <div className="text-sm/6">
                                                        <p className="font-semibold text-gray-900">
                                                            <label>
                                                                {estadosPosibles.find((item) => item.toLowerCase() === cita.status)}
                                                            </label>
                                                        </p>
                                                        <p className="text-gray-600">Estado</p>
                                                    </div>
                                                        <button className="bg-zinc-300 p-2 rounded-full hover:bg-zinc-400 cursor-pointer" onClick={() => navigate(`/cita-detalle/${cita._id}`)}>Detalles</button>
                                                </div>
                                            </article>
                                        )))

                                        :

                                        (<p className="text-gray-600">No hay citas para el estado seleccionado.</p>)

                                    }
                                </div>
                        )
                                    
                        : 
                        
                        
                        (cargando ? <h1 className="font-medium mt-2 text-lg text-purple-700">Cargando...</h1> : <h1 className="font-medium mt-2 text-lg text-rose-600">No hay citas por mostrar</h1>)}
            
                    </div>
                </div> 
        
            </>
        )

}

export default Agenda