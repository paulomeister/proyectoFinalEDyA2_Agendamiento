const express = require("express");

const PORT = 4000


const app = express();


app.get('/', (req, res) => {

    res.json({

        ok: true

    })

})


app.listen(PORT, () => {

    console.log("Servidor corriendo el puerto", PORT);
    
})



