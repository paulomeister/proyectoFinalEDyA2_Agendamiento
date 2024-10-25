const express = require("express")
const Cita = require("../Model/Cita")
const Usuario = require("../Model/Usuario")



const crearCita = async (req, res = express.response) => {

    try {

        const {usuarioId, proveedorId} = req.body

        const elUsuario = await Usuario.findOne({ _id: usuarioId })
        const elProveedor = await Usuario.findOne({ _id: proveedorId })

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

module.exports = {

                    crearCita

                 }