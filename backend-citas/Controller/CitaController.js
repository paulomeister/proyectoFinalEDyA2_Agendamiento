const express = require("express")
const Cita = require("../Model/Cita")
const Usuario = require("../Model/Usuario")



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

        res.status(201).json({

            ok: true,
            msg: "La cita fue creada con éxito",
            cita

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

    const { usuarioId } = req.params;

    try {

        const citas = await Cita.find({ usuarioId })

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
                    obtenerCitasProveedor

                 }