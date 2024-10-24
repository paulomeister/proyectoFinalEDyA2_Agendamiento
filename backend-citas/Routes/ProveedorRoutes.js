const express = require("express");
const router = express.Router();
const { crearProveedor, disponibilidadProveedor, actualizarProveedor, actualizarDisponibilidad } = require("../Controller/ProveedorController")

router.post('/crearProveedor', crearProveedor)
router.get('/disponiblidadProveedor', disponibilidadProveedor)
router.put('/actualizarProveedor', actualizarProveedor)
router.put('/proveedor/actualizarDisponibilidad', actualizarDisponibilidad)

module.exports = router;