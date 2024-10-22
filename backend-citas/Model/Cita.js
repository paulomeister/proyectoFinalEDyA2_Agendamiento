const { Schema, model } = require("mongoose");

const CitaSchema = new Schema({

  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  proveedorId: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  fecha: { type: String, required: true },
  comienzaEn: { type: String, required: true },
  terminaEn: { type: String, required: true },
  status: { 

    type: String, 
    enum: ["agendada", "cancelada", "completada"], 
    default: "agendada",
    required: true 
  
},
  notas: {

    mensaje: { type: String }

  }

});

module.exports = model('Cita', CitaSchema, 'Cita');
