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
    buscarProveedores,
    obtenerProveedores,
    obtenerProveedoresListado,
    obtenerUsuarioXuid

    } = require("../Controller/UsuarioController")

router.post('/crearUsuario', crearUsuario)
router.get('/disponiblidadProveedor', disponibilidadProveedor)
router.put('/actualizarUsuario', actualizarUsuario)
router.put('/actualizarDisponibilidad', actualizarIsBooked)
router.put('/agregarDisponibilidad', agregarDisponibilidad)
router.put('/fecha/agregarFranja', agregarFranjaHoraria)
router.put('/eliminarFranja', eliminarFranjaHoraria)
router.post('/buscarConFiltros', buscarProveedores)
router.get('/obtenerProveedores', obtenerProveedores)
router.get('/busquedaProveedores', obtenerProveedoresListado)
router.get('/usuario/:uid', obtenerUsuarioXuid)

module.exports = router 