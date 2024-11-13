const { Schema, model } = require("mongoose");

const CitaSchema = new Schema({

  usuarioId: { type: String, ref: 'Usuario', required: true },
  proveedorId: { type: String, ref: 'Usuario', required: true },
  fecha: { type: String, required: true },
  comienzaEn: { type: String, required: true },
  terminaEn: { type: String, required: true },
  linkReunion: {type: String},
  status: { 

    type: String, 
    enum: ["agendada", "cancelada", "completada"], 
    default: "agendada",
    required: true 
  
},
  notas: {

    mensaje: { type: String, default: "" }

  }

});

module.exports = model('Cita', CitaSchema, 'Cita');
