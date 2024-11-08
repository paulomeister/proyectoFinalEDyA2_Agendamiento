import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProveedorList = ({ proveedores }) => {
    const navigate = useNavigate();

    return (
        <div className="p-6 px-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proveedores.map((proveedor, index) => (
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
                            className="my-5 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
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
