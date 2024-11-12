import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux";
import Agenda from "../../components/Agenda";

function MisCitas() {

  const { user } = useSelector((state) => state.auth)
  const [mostrarAtender, setMostrarAtender] = useState(true)

  const atenderRef = useRef()
  const tomarRef = useRef()

  useEffect(() => {

    if(mostrarAtender) {

      atenderRef.current.className = "p-2 rounded-lg bg-slate-500 shadow-xl active:bg-zinc-500 text-slate-200"
      tomarRef.current.className = "p-2 rounded-lg bg-slate-300 active:bg-zinc-500"

    }
    else {

      atenderRef.current.className = "p-2 rounded-lg bg-slate-300 active:bg-zinc-500" 
      tomarRef.current.className = "p-2 rounded-lg bg-slate-500 shadow-xl active:bg-zinc-500 text-slate-200"

    }

  }, [mostrarAtender])

  return(

    <>
      <div className="flex gap-x-4">

      <button ref={atenderRef} onClick={() => setMostrarAtender(true)}>Atender</button>
      <button ref={tomarRef} onClick={() => setMostrarAtender(false)}>Tomar</button>

      </div>
      
      {mostrarAtender ? <Agenda tipo="citasAtender" uid={user.uid} /> : <Agenda tipo="citasAgendadas" uid={user.uid} />}
      
    </>

  )

}

export default MisCitas