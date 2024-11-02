import { setFranjaElegida, mostrarModal } from '../store/slices/reservacionSlice'
import { useDispatch } from 'react-redux'

function Horario({franja}) {

    const dispatch = useDispatch()

    return(
    <>
    
        <h3 className="font-light text-black"><span className="font-medium">Comienza</span>: {franja.startTime}</h3>
        <h3 className="font-light text-black"><span className="font-medium">Termina</span>: {franja.endTime}</h3>
        <button onClick={() => {

            dispatch(setFranjaElegida(franja))
            dispatch(mostrarModal())
            
            }} className="mt-1 w-fit h-fit p-2 rounded-lg bg-sky-700">Reservar</button>
    </>)

}

export default Horario