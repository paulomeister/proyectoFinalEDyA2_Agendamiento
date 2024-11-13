const express = require("express")
const Cita = require("../Model/Cita")
const Usuario = require("../Model/Usuario")
const createMeetingLink = require("../GoogleMeet/config")


const crearCita = async (req, res = express.response) => {

    try {

        const {usuarioId, proveedorId} = req.body

        const elUsuario = await Usuario.findOne({ uid: usuarioId })
        const elProveedor = await Usuario.findOne({ uid: proveedorId })

        if((!elUsuario || elUsuario.length === 0) &&
           (!elProveedor || elProveedor.length === 0)) {

            return res.status(404).json({

                ok: false,
                msg: "Ni el usuario ni el proveedor enviados se encontraron en la base de datos"

            })

        }

        if(!elUsuario || elUsuario.length === 0) {

            return res.status(404).json({

                ok: false,
                msg: "El usuario enviado no se encontró en la base de datos"

            })

        }

        if(!elProveedor || elProveedor.length === 0) {

            return res.status(404).json({

                ok: false,
                msg: "El proveedor enviado no se encontró en la base de datos"

            })

        }

        if(usuarioId === proveedorId) {

            return res.status(400).json({

                ok: false,
                msg: "El proveedor no puede agendar sus propias citas"

            })

        }

        const cita = new Cita(req.body)
        await cita.save()

        // SE GENERA LA REUNIÓN CUANDO SE ENVÍA LA PETICIÓN DE RESERVAR
        const linkReunion = await createMeetingLink() // Función [1]

        const updatedCita = await Cita.findByIdAndUpdate( // Función [2]. Este método se puede usar para actualizar la cita luego cuando el proveedor genere el link
            
            cita._id, // se pasará el _id de la cita sobre la cual se quiere añadir el link
            { $set: { linkReunion: linkReunion } },  
            { new: true } 
        
        )

        // NO SE ALCANZA A ACTUALIZAR SI EL CLIENTE OPRIME EL BOTÓN SOLO UNA VEZ (REDIRECCIONA A LA AUTENTICACIÓN)
        // SIN EMBARGO CREA LA CITA SIN EL LINK
        // CREAR FUNCIONALIDAD PARA QUE EL LINK LO GENERE EL PROVEEDOR CON UN BOTÓN "Generar Link" y que se guarde en la base de datos actualizando la cita por su _id

        // La nueva función debe llamar a las dos funciones [1] y [2] para actualizar la cita y que esta se pueda acceder desde el front con un botón para el link de la cita  

        res.status(201).json({

            ok: true,
            msg: "La cita fue creada con éxito",
            updatedCita // DEVOLVER cita como antes

        })

    }
    catch(error) {

        console.log(error)
        res.status(500).json({

            ok: false,
            msg: "Internal Error"

        })

    }


}

const buscarCitaPorId = async (req, res = express.response) => {
    const { _id } = req.params;
    try {
        const cita = await Cita.findById(_id);

        if (!cita) {
            return res.status(404).json({
                ok: false,
                msg: 'Cita no encontrada'
            });
        }

        res.json({
            ok: true,
            cita
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al buscar la cita'
        });
    }
};

const actualizarStatusCita = async (req, res = express.response) => {

    const { citaId, status } = req.body

    if(!["agendada", "cancelada", "completada"].includes(status)) {

        return res.status(400).json({
        
            ok: false,
            msg: "El estado proporcionado no es válido"
        
        })
    
    }

    try {
    
        const cita = await Cita.findByIdAndUpdate(
         
            citaId,
            { status },
            { new: true }
        
        )

        if(!cita) {
            
            return res.status(404).json({
            
                ok: false,
                msg: "No se encontró la cita con el ID proporcionado"
            
            })
        
        }

        res.json({
        
            ok: true,
            msg: "Estado de la cita actualizado con éxito",
            cita
        
        })
    } 
    catch(error) {

        console.error(error)
        
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el estado de la cita"
        
        })
    
    }

}

const actualizarMensajeNota = async (req, res = express.response) => {
    
    const { citaId, mensaje } = req.body

    try {
    
        const cita = await Cita.findByIdAndUpdate(
    
            citaId,
            { $set: { "notas.mensaje": mensaje } },
            { new: true } 
    
        )

        if(!cita) {
            
            return res.status(404).json({
                ok: false,
                msg: "No se encontró la cita con el ID proporcionado"
            })
        
        }

        res.json({
        
            ok: true,
            msg: "Mensaje de la nota actualizado con éxito",
            cita
        
        });
    }
    catch(error) {

        console.error(error)
        
        res.status(500).json({
        
            ok: false,
            msg: "Error al actualizar el mensaje de la nota"
        
        })
    
    }

}

const obtenerCitasUsuario = async (req, res = express.response) => {

    const { usuarioId } = req.params

    try {

        const citas = await Cita.find({ usuarioId })
        .populate({ 

            path: 'proveedorId', 
            model: 'Usuario', 
            select: 'uid nombre', 
            match: { uid: { $exists: true } }, 
            localField: 'proveedorId',
            foreignField: 'uid'
        
        })

        if (citas.length === 0) {

            return res.status(404).json({
            
                ok: false,
                msg: "No se encontraron citas para el usuario"
            
            })
        
        }

        res.status(200).json({
          
            ok: true,
            citas
        
        })

    } 
    catch(error) {
        
        console.error(error)
        
        res.status(500).json({
        
            ok: false,
            msg: "Error al obtener citas del usuario"
        
        })
    
    }

}

const obtenerCitasProveedor = async (req, res = express.response) => {

    const { proveedorId } = req.params;

    try {

        const citas = await Cita.find({ proveedorId })
        .populate({ 
        
            path: 'usuarioId', 
            model: 'Usuario', 
            select: 'uid nombre', 
            match: { uid: { $exists: true } },  
            localField: 'usuarioId',
            foreignField: 'uid'
        
        })        

        if (citas.length === 0) {

            return res.status(404).json({
            
                ok: false,
                msg: "No se encontraron citas para el proveedor"
            
            })
        
        }

        res.status(200).json({
          
            ok: true,
            citas
        
        })

    } 
    catch(error) {
        
        console.error(error)
        
        res.status(500).json({
        
            ok: false,
            msg: "Error al obtener citas del proveedor"
        
        })
    
    }

}


module.exports = {

                    crearCita,
                    actualizarStatusCita,
                    actualizarMensajeNota,
                    obtenerCitasUsuario,
                    obtenerCitasProveedor,
                    buscarCitaPorId

                 }