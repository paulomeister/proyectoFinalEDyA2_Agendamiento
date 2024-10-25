const express = require("express")
const router = express.Router()
const {

    crearCita

} = require("../Controller/CitaController")


router.post('/crearCita', crearCita)


module.exports = router