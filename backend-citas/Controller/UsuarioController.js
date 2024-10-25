const express = require("express");
const Usuario = require("../Model/Usuario");
const bcrypt = require('bcryptjs')

const crearUsuario = async (req, res = express.response) => {

    try {
        
        const { email, password } = req.body 

        let usuario = await Usuario.findOne({ email })

        if(usuario) {

            return res.status(400).json({

                ok: false,
                msg: "Ya existe un usuario con ese correo"

            })

        }

        usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()

        res.json(
            
            {
                ok: true,
                msg: "Guardado con éxito"

            }

        )


    }
    catch(error) {

        console.log(error);
        res.status(500).json(

            {
                ok: false,
                msg: 'Internal Error'

            }            

        )

    }

}

const disponibilidadProveedor = async (req, res = express.response) => {
    
    const { username, email, _id } = req.query; 
 
    try {
        
        let filtroBusqueda = null;

        if(username && username.length > 0) {
            
            filtroBusqueda = { username }
        
        } 
        else if(email && email.length > 0) {

            filtroBusqueda = { email };
        
        } 
        else if(_id && _id.length > 0) {
            
            filtroBusqueda = { _id };

        } 
        else {
            
            return res.status(400).json({
                ok: false,
                msg: "Debe proporcionar un username, email o _id válido para buscar"
            })

        }

        const proveedor = await Usuario.findOne(filtroBusqueda);

        if (!proveedor) {

            return res.status(404).json({

                ok: false,
                msg: "No se encontró el proveedor"

            });

        }

        if(!proveedor.esProveedor) {

            return res.status(400).json({

                ok: false,
                msg: "El usuario no está registrado como proveedor"

            })

        }

        const disponibilidadFiltrada = {};

        const disponibilidadEntradas = [...proveedor.availability.entries()]

        disponibilidadEntradas.forEach(([fecha, franjas]) => {

            if (franjas.length > 0) {
                
                const franjasDisponibles = franjas.filter(franja => !franja.isBooked);

                if (franjasDisponibles.length > 0) {

                    disponibilidadFiltrada[fecha] = franjasDisponibles;
                
                }
            }

        });

        res.json(

            {

                availability: disponibilidadFiltrada
            
            })

    } 
    catch(error) {

        console.error(error);
        res.status(500).json({

            ok: false,
            message: "Internal server error: no se pudo recuperar la disponibilidad del proveedor"
        
        })
    
    }

};

const actualizarUsuario = async (req, res = express.response) => {

    const { username, email, _id } = req.query; 
    const camposxActualizar = req.body; 

    try {
        
        let filtroBusqueda = null;

        if(username && username.length > 0) {
            
            filtroBusqueda = { username }
        
        } 
        else if(email && email.length > 0) {

            filtroBusqueda = { email }
        
        } 
        else if(_id && _id.length > 0) {
            
            filtroBusqueda = { _id }

        } 
        else {
            
            return res.status(400).json({
                ok: false,
                msg: "Debe proporcionar un username, email o _id válido para buscar"
            });

        }

        const proveedorActualizado = await Usuario.findOneAndUpdate(filtroBusqueda, camposxActualizar, { new: true, runValidators: true });

        if (!proveedorActualizado) {
            return res.status(404).json({
                
                ok: false,
                msg: "No se encontró el proveedor con la información proporcionada"

            });
        }

        res.json({
            ok: true,
            proveedor: proveedorActualizado
        });

    } 
    catch (error) {

        console.error(error);
        res.status(500).json({
    
            ok: false,
            msg: "Error interno del servidor"
    
        });
    
    }
};

const actualizarIsBooked = async (req, res = express.response) => {

    /*
    Este método es para cambiar el estado de una cita (isBooked:Boolean) dado un proveedor, una fecha
        y algo que distinga a la franja que se desea cambiar. 

    Tres formas de buscar el proveedor para ambos modos: username, email, ObjectId

    OR: || (solo uno de los campos se necesita)
    AND: && (todos los campos se necesitan)
    
    Término:
        - franjaId es el ObjectId que MongoDB le asigna al objeto que contiene la disponibilidad horaria 
            de una fecha determinada, es decir, el cual está dentro del array de franjas horarias dispo-
            nibles de un proveedor para determinada fecha.

            Ejemplo: para la fecha "2024-10-20", se tiene dos franjas de disponibilidad. Cada una tiene
                su _id (ObjectId)

            . (otras llave-valor del documento Usuario)
            .
            .
            "availability": {
            "2024-10-20": [
                {
                    "startTime": "13:15",
                    "endTime": "14:15",
                    "isBooked": false,
                    "_id": {
                        "$oid": "671654c983de4e2df5a0f052"
                    }
                },
                {
                    "startTime": "16:30",
                    "endTime": "17:30",
                    "isBooked": false,
                    "_id": {
                        "$oid": "671654c983de4e2df5a0f053"
                    }
                }
            ]

            * Para evitar confusiones, solo mande en el JSON los pares que sí va a utilizar.
    Modo 0: (se necesitan los campos)

         (username || email || _id) para el proveedor.
         (fecha && startTime && endTime && isBooked) para la franja horaria

         franjaId DEBE ser NULL para que funcione el Modo 0.

    Modo 1: (se necesitan los campos)

        (username || email || _id) para el proveedor.
        (fecha && franjaId && isBooked) para la franja horaria

        Para que funcione el modo 1, basta con que se mande en el body un atributo llamado "franjaId" con su valor.

    */

    const { username, email, _id, fecha, startTime, endTime, isBooked, franjaId } = req.body;

    let modo = 0

    if(franjaId && franjaId.length > 0) {

        modo = 1

    }

    try {
        
        let filtroBusqueda = null;

        if(username && username.length > 0) {
            
            filtroBusqueda = { username };

        } 
        else if(email && email.length > 0) {
            
            filtroBusqueda = { email };

        } 
        else if(_id && _id.length > 0) {
            
            filtroBusqueda = { _id };
        
        } 
        else {
            return res.status(400).json({
                
                ok: false,
                msg: "Debe proporcionar un username, email o _id válido para buscar"

            });
        }

        const proveedor = await Usuario.findOne(filtroBusqueda);
        
        if (!proveedor) {
        
            return res.status(404).json({
           
                ok: false,
                msg: "No se encontró el proveedor"
           
            });
        }

        let espacioActualizado = false 

        if(modo === 1) {

            const disponibilidadEntradas = [...proveedor.availability.entries()]

            
            for(const [laFecha, franjas] of disponibilidadEntradas) {

                if(laFecha === fecha) {

                    if (franjas.length > 0) {
                    
                        let franja = franjas.find(franja => franja._id.toString() === franjaId);
        
                        if (franja) {
        
                            franja.isBooked = isBooked
                            espacioActualizado = true;
                        
                        }
    
                    }

                    break

                }

            }
            
        }
        else {

            const espacios = proveedor.availability.get(fecha);

            if (!espacios) {
                
                return res.status(404).json({
                    
                    ok: false,
                    msg: `No se encontró disponibilidad para la fecha: ${fecha}`
                
                })

            }

            for (let espacio of espacios) {

                if (espacio.startTime === startTime && espacio.endTime === endTime) {
                
                    espacio.isBooked = isBooked
                    espacioActualizado = true;
                    break
                
                }
            
            }
        }
        
        if (!espacioActualizado) {

            return res.status(404).json({
            
                ok: false,
                msg: "No se encontró el espacio de tiempo especificado"
            
            })
        
        }

        await proveedor.save();

        res.json({

            ok: true,
            msg: "Disponibilidad actualizada exitosamente",
            availability: proveedor.availability
        
        })

    } 
    catch(error) {

        console.error(error);
        res.status(500).json({
        
            ok: false,
            msg: "Error interno del servidor al actualizar la disponibilidad"
        
        })

    }

}

const agregarDisponibilidad = async (req, res = express.response) => {
    
    const { username, email, _id, fecha, franjas } = req.body;

    try {
    
        let filtroBusqueda = null;

        if(username && username.length > 0) {
    
            filtroBusqueda = { username }
    
        } 
        else if(email && email.length > 0) {

            filtroBusqueda = { email }
        
        } 
        else if(_id && _id.length > 0) {

            filtroBusqueda = { _id }
        
        } 
        else {
        
            return res.status(400).json({
        
                ok: false,
                msg: "Debe proporcionar un username, email o _id válido para buscar"
        
            });
        
        }

        const proveedor = await Usuario.findOne(filtroBusqueda);

        if (!proveedor) {

            return res.status(404).json({

                ok: false,
                msg: "No se encontró el proveedor"

            });

        }

        if (proveedor.availability.has(fecha)) {

            return res.status(400).json({
                ok: false,
                msg: `La fecha ${fecha} ya existe en la disponibilidad del proveedor`

            });

        }

        if (!Array.isArray(franjas) || franjas.length === 0) {

            return res.status(400).json({

                ok: false,
                msg: "Debe proporcionar un array válido de franjas horarias"

            });
        }

        const nuevasFranjas = franjas.map(franja => ({
        
            startTime: franja.startTime,
            endTime: franja.endTime,
            isBooked: franja.isBooked || false  
        
        }));

        proveedor.availability.set(fecha, nuevasFranjas);

        await proveedor.save();

        res.json({

            ok: true,
            message: "Disponibilidad añadida exitosamente",
            availability: proveedor.availability

        });

    } 
    catch(error) {
        
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor al agregar disponibilidad"
        
        });
    
    }

}

const agregarFranjaHoraria = async (req, res = express.response) => {

    const { username, email, _id, fecha, nuevaFranja } = req.body;

    try {
    
        let filtroBusqueda = null;

        if(username && username.length > 0) {
    
            filtroBusqueda = { username };
    
        } 
        else if(email && email.length > 0) {
          
            filtroBusqueda = { email };
        
        } 
        else if (_id && _id.length > 0) {
        
            filtroBusqueda = { _id };
        
        } 
        else {
        
            return res.status(400).json({
        
                ok: false,
                msg: "Debe proporcionar un username, email o _id válido para buscar"
        
            });
        
        }

        const proveedor = await Usuario.findOne(filtroBusqueda);

        if (!proveedor) {
    
            return res.status(404).json({
    
                ok: false,
                message: "No se encontró el proveedor"
    
            });
    
        }

        if (!proveedor.availability.has(fecha)) {
    
            return res.status(404).json({
    
                ok: false,
                message: `La fecha ${fecha} no existe en la disponibilidad del proveedor`
    
            });
    
        }

        const { startTime, endTime, isBooked } = nuevaFranja

        const startTimeMin = franjaAMinutos(startTime)
        const endTimeMin = franjaAMinutos(endTime)

        if (!startTime || !endTime) {
    
            return res.status(400).json({
    
                ok: false,
                message: "Debe proporcionar startTime y endTime válidos para la nueva franja horaria"
    
            });
    
        }

        const franjasExistentes = proveedor.availability.get(fecha);

        for (let franja of franjasExistentes) {

            const franjaST = franjaAMinutos(franja.startTime)
            const franjaET = franjaAMinutos(franja.endTime)
    
            if ((startTimeMin >= franjaST && startTimeMin < franjaET) || 
                (endTimeMin > franjaST && endTimeMin <= franjaET) || 
                (startTimeMin <= franjaST && endTimeMin >= franjaET)) {
                
                    return res.status(400).json({

                    ok: false,
                    message: "El nuevo horario entra en conflicto con una franja horaria existente"
                
                });
            
            }
        
        }

        franjasExistentes.push({
            
            startTime,
            endTime,
            isBooked: isBooked || false
        
        })

        await proveedor.save();

        res.json({
        
            ok: true,
            message: "Nueva franja horaria añadida exitosamente",
            availability: proveedor.availability
        
        })

    } 
    catch(error) {
        
        console.error(error);
        
        res.status(500).json({
        
            ok: false,
            message: "Error interno del servidor al agregar la franja horaria"
        
        })
    
    }

    const franjaAMinutos = (strFranja) => {

        const [horas, minutos] = strFranja.split(':').map(Number)

        return horas * 60 + minutos

    }

}




module.exports = {

                    crearUsuario, 
                    disponibilidadProveedor, 
                    actualizarUsuario, 
                    actualizarIsBooked, 
                    agregarDisponibilidad,
                    agregarFranjaHoraria
                
                }