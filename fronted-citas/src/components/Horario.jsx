
function Horario({franja, modal, inicio, fin}) {

    return(
    <>
    
        <h3 className="font-light text-black"><span className="font-medium">Comienza</span>: {franja.startTime}</h3>
        <h3 className="font-light text-black"><span className="font-medium">Termina</span>: {franja.endTime}</h3>
        <button onClick={() => {
            modal.show()
            inicio(franja.startTime)
            fin(franja.endTime)
            }} className="mt-1 w-fit h-fit p-2 rounded-lg bg-sky-700">Reservar</button>
    </>)

}

export default Horario