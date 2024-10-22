const express = require("express");
const { dbConnection } = require('./Database/config');
const cors = require("cors");


require("dotenv").config()

const app = express();

dbConnection();

app.use(cors());

app.use(express.json())

app.use(express.static("public"))

app.use('/api/proveedores', require("./Routes/ProveedorRoutes"))



app.get('/', (req, res) => {

    res.json({

        ok: true

    })

})

app.listen(process.env.PORT, () => {

    console.log("Servidor corriendo el puerto", process.env.PORT);
    
})



  