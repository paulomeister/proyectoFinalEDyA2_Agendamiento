import Horario from './Horario'

function ListarCitas({disponibilidad}) {

    return(
        
        <>
        {disponibilidad.map((item, idx) => {

            return(<div key={idx} className='w-fit h-fit mt-4 p-4 rounded-lg bg-slate-200'><Horario franja={item}/></div>)
        
        })}
        </>

    )


}

export default ListarCitas