import { Modal } from 'flowbite'
import { useRef, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ModalConfirmacion({myModal, setModal, inicio, fin, fecha}) {

    const navigate = useNavigate()

    const popUpRef = useRef(null);
    const [user, setUser] = useState(null)
    const [usuarioId, setUsuarioId] = useState(null)
    const [cargando, setCargando] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        
        const options = {

            placement: 'bottom-right',
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: true,
            
        }

        const instanceOptions = {
        
            id: 'popup-modal',
        override: true
        
        }

        const modal = new Modal(popUpRef.current, options, instanceOptions);
        setModal(modal)

        return () => {
        modal.destroy()
        }

    }, [])

    useEffect(() => {
       
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        
            setCargando(true)
            setUser(currentUser)
            setCargando(false)
        })

        return () => unsubscribe()
    
    }, [])

    const obtenerUsuario_id = async () => {

        const elUID = user.uid

        try {

        await axios.get(`http://localhost:4000/api/usuarios/usuario/${elUID}`).then(m => setUsuarioId(m.data.usuario.id))
        
        }
        catch(error) {

            console.error(error)

        }
    
    }

    useEffect(() => {
    
        if(cargando === false) {

            obtenerUsuario_id()
            
        }
    
    }, [user])


    const handleReserva = async () => {
    
        try {

            console.log(usuarioId);

            const cita = {

                usuarioId: usuarioId,
                proveedorId: id,
                fecha: fecha,
                comienzaEn: inicio,
                terminaEn: fin

            }
            const enviarCita = await axios.post('http://localhost:4000/api/citas/crearCita', cita)

            if(!enviarCita.data.ok) {

                throw new Error("No se pudo guardar la cita en la base de datos")

            }

            const nuevaDisponibilidad = {

                _id: id,
                fecha: fecha,
                startTime: inicio,
                endTime: fin,
                isBooked: true

            }
            const actualizarDisponibilidad = await axios.put('http://localhost:4000/api/usuarios/actualizarDisponibilidad', nuevaDisponibilidad)

            if(!actualizarDisponibilidad.data.ok) {

                throw new Error("No se pudo cambiar el atributo isBooked de la disponibilidad")

            }

            navigate('/dashboard')
            

        }
        catch(error) {

            console.error(error)

        }


    
    }

    return(
        <>
            
            <div ref={popUpRef} id="popup-modal" tabIndex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => {myModal.hide()}} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Cerrar</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Está seguro de reservar esta franja horaria?</h3>
                            <button onClick={handleReserva} data-modal-hide="popup-modal" type="button" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Sí, reservar
                            </button>
                            <button onClick={() => {myModal.hide()}} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, regresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default ModalConfirmacion