const express = require("express")
const router = express.Router()
const {

    crearCita,
    actualizarStatusCita,
    actualizarMensajeNota

} = require("../Controller/CitaController")


router.post('/crearCita', crearCita)
router.put('/modificarMensaje', actualizarMensajeNota)
router.put('/actualizarStatus', actualizarStatusCita)


module.exports = router