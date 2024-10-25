const express = require("express")
const router = express.Router()
const { 
    
    crearUsuario, 
    disponibilidadProveedor, 
    actualizarUsuario, 
    actualizarIsBooked,
    agregarDisponibilidad,
    agregarFranjaHoraria

    } = require("../Controller/UsuarioController")

router.post('/crearUsuario', crearUsuario)
router.get('/disponiblidadProveedor', disponibilidadProveedor)
router.put('/actualizarUsuario', actualizarUsuario)
router.put('/proveedor/actualizarDisponibilidad', actualizarIsBooked)
router.put('/agregarDisponibilidad', agregarDisponibilidad)
router.put('/fecha/agregarFranja', agregarFranjaHoraria)

module.exports = router