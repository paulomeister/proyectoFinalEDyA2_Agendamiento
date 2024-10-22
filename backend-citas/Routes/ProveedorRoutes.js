const express = require("express");
const router = express.Router();
const { crearProveedor, disponibilidadProveedor, actualizarProveedor } = require("../Controller/ProveedorController")

router.post('/crearProveedor', crearProveedor)
router.get('/disponiblidadProveedor', disponibilidadProveedor)
router.put('/actualizarProveedor', actualizarProveedor)

module.exports = router;