const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {

try {

    mongoose.connect(
        process.env.DB_CONNECTION,
        {autoIndex: true}

    )

    console.log("Database up and running");

}
catch(error) {

console.log(error)
throw new Error("Error al conectar con la base de datos");

}


}


module.exports = { dbConnection };