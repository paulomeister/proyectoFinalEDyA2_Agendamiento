const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
    
  nombre: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fotoPerfil: { type: String }

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
    foreignField: 'usuarioId',
    justOne: false

})

module.exports = model('Usuario', UsuarioSchema, 'Usuario');