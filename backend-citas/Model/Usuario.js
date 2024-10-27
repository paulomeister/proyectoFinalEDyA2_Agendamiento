const { Schema, model } = require("mongoose");


  const FranjasSchema = new Schema({
    
    startTime: { type: String, required: true },  
    endTime: { type: String, required: true },    
    isBooked: { type: Boolean, default: false }   

  });
  
  
  const UsuarioSchema = new Schema({
    
    uid: { type: String, required: true, unique: true },  
    nombre: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    fotoPerfil: { type: String },
    registradoEn: { type: Date, default: Date.now },
    esProveedor: {type: Boolean, required: true},
    servicios: { type: [String], required: true },
    biografia: { type: String },
    calificacionPromedio: { type: Number, default: 0, min: 0, max: 5 },
    calificaciones: [

      {
        username: String,
        comentario: String,
        calificacion: { type: Number, min: 0, max: 5 }
      }
    
    ],
    
    availability: {

      type: Map,
      of: [FranjasSchema],
      default: {} 
    
    }

    },
    {
    toJSON: {

      virtuals: true

    },
    toObject: {

      virtuals: true
      
    }
    }

  );

UsuarioSchema.virtual('citas', {

  ref: 'Cita',
  localField: '_id',
  foreignField: 'proveedorId',
  justOne: false

})

module.exports = model('Usuario', UsuarioSchema, 'Usuario');