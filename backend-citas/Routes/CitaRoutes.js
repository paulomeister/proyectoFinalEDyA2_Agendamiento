const express = require("express")
const router = express.Router()
const {

    crearCita,
    actualizarStatusCita,
    actualizarMensajeNota,
    obtenerCitasUsuario,
    obtenerCitasProveedor,
    buscarCitaPorId

} = require("../Controller/CitaController")


router.post('/crearCita', crearCita)
router.get('/obtenerCitaPorId/:_id', buscarCitaPorId);
router.put('/modificarMensaje', actualizarMensajeNota)
router.put('/actualizarStatus', actualizarStatusCita)
router.get('/citasAgendadas/:usuarioId', obtenerCitasUsuario)
router.get('/citasAtender/:proveedorId', obtenerCitasProveedor)


module.exports = router