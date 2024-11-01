import Horario from './Horario'

function ListarCitas({disponibilidad, modal, inicio, fin}) {

    return(
        
        <>
        {disponibilidad.map((item, idx) => {

            return(<div key={idx} className='w-fit h-fit mt-4 p-4 rounded-lg bg-slate-200'><Horario modal={modal} franja={item} inicio={inicio} fin={fin}/></div>)
        
        })}
        </>

    )


}

export default ListarCitas