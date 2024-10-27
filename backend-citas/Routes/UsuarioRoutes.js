const express = require("express")
const router = express.Router()
const { 
    
    crearUsuario, 
    disponibilidadProveedor, 
    actualizarUsuario, 
    actualizarIsBooked,
    agregarDisponibilidad,
    agregarFranjaHoraria,
    eliminarFranjaHoraria,
    buscarProveedores

    } = require("../Controller/UsuarioController")

router.post('/crearUsuario', crearUsuario)
router.get('/disponiblidadProveedor', disponibilidadProveedor)
router.put('/actualizarUsuario', actualizarUsuario)
router.put('/actualizarDisponibilidad', actualizarIsBooked)
router.put('/agregarDisponibilidad', agregarDisponibilidad)
router.put('/fecha/agregarFranja', agregarFranjaHoraria)
router.put('/eliminarFranja', eliminarFranjaHoraria)
router.post('/buscarConFiltros', buscarProveedores)

module.exports = router