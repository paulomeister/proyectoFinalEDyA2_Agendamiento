const express = require("express")
const router = express.Router()
const {

    crearCita,
    actualizarStatusCita,
    actualizarMensajeNota,
    obtenerCitasUsuario,
    obtenerCitasProveedor

} = require("../Controller/CitaController")


router.post('/crearCita', crearCita)
router.put('/modificarMensaje', actualizarMensajeNota)
router.put('/actualizarStatus', actualizarStatusCita)
router.get('/citasAgendadas/:usuarioId', obtenerCitasUsuario)
router.get('/citasAtender/:proveedorId', obtenerCitasProveedor)


module.exports = router