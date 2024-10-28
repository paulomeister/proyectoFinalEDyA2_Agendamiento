import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProveedorList = ({ search }) => {
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await axios.get('/proveedores.json');
                setProveedores(response.data);
            } catch (error) {
                console.error('Error al cargar los proveedores:', error);
            }
        };
        fetchProveedores();
    }, []);

    // Memorizar la lista filtrada
    const filteredProveedores = useMemo(() => {
        return Array.isArray(proveedores) ? proveedores.filter((proveedor) => {
            const searchTerm = search.toLowerCase();
            const nombreMatch = proveedor.nombre.toLowerCase().includes(searchTerm);
            const serviciosMatch = proveedor.servicios.some(servicio =>
                servicio.toLowerCase().includes(searchTerm)
            );
            return nombreMatch || serviciosMatch;
        }) : [];
    }, [search, proveedores]);

    return (
        <div className="p-6 px-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProveedores.map((proveedor, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-lg text-center"
                    >
                        <img
                            src={proveedor.fotoPerfil}
                            alt={proveedor.nombre}
                            className="w-24 h-24 mx-auto rounded-full mb-4"
                        />
                        <h3 className="text-xl font-semibold">{proveedor.nombre}</h3>
                        <p className="text-gray-600">
                            {proveedor.servicios.join(' • ')}
                        </p>
                        <p className="mt-2 text-yellow-500 font-bold">
                            Calificación: {proveedor.calificacionPromedio} ⭐
                        </p>
                        <p className="text-sm text-gray-500">
                            {proveedor.personasAtendidas} personas atendidas
                        </p>
                        <button
                            type="button"
                            className="my-5 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            onClick={() => navigate(`/proveedor/${proveedor.uid}`)}
                        >
                            Más información
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProveedorList;
