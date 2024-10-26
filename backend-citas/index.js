const express = require("express");
const { dbConnection } = require('./Database/config');
const cors = require("cors");
const verifyToken = require('./Middleware/authMiddleware');


require("dotenv").config()

const app = express();

dbConnection();

app.use(cors());

app.use(express.json())

app.use(express.static("public"))

app.use('/api/usuarios', require("./Routes/UsuarioRoutes"))
app.use('/api/citas', require("./Routes/CitaRoutes"))

//EJEMPLO DE RUTA PROTEGIDA CON MIDDLEWARE DE AUTENTICACIÓN
app.get('/ruta-protegida', verifyToken, (req, res) => {
    res.json({ message: 'Acceso autorizado', user: req.user });
});


app.get('/', (req, res) => {

    res.json({

        ok: true

    })

})

app.listen(process.env.PORT, () => {

    console.log("Servidor corriendo en el puerto", process.env.PORT);

})



