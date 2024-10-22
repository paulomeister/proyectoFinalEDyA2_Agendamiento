const express = require("express");
const Proveedor = require("../Model/Proveedor");

const crearProveedor = async (req, res = express.response) => {

    try {

        const proveedor = new Proveedor(req.body);
        await proveedor.save()
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

        const proveedor = await Proveedor.findOne(filtroBusqueda);

        if (!proveedor) {
            return res.status(404).json({
                ok: false,
                message: "No se encontró el proveedor"
            });
        }

        const disponibilidadFiltrada = {};

        const disponibilidadEntradas = [...proveedor.availability.entries()];

        disponibilidadEntradas.forEach(([fecha, franjas]) => {

            if (franjas.length > 0) {
                
                const franjasDisponibles = franjas.filter(slot => !slot.isBooked);

                if (franjasDisponibles.length > 0) {

                    disponibilidadFiltrada[fecha] = franjasDisponibles;
                
                }
            }

        });

        res.json(

            {

                availability: disponibilidadFiltrada
            
            });

    } 
    catch(error) {

        console.error(error);
        res.status(500).json({

            ok: false,
            message: "Internal server error: no se pudo recuperar la disponibilidad del proveedor"
        
        });
    
    }

};

const actualizarProveedor = async (req, res = express.response) => {

    const { username, email, _id } = req.query; 
    const camposxActualizar = req.body; 

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

        const proveedorActualizado = await Proveedor.findOneAndUpdate(filtroBusqueda, camposxActualizar, { new: true, runValidators: true });

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


module.exports = {crearProveedor, disponibilidadProveedor, actualizarProveedor}