import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ModalDisponibilidad = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, reset } = useForm();
    const [franjas, setFranjas] = useState([]);

    const agregarFranja = () => {
        setFranjas([...franjas, { startTime: '', endTime: '' }]);
    };

    const eliminarFranja = (index) => {
        const nuevasFranjas = [...franjas];
        nuevasFranjas.splice(index, 1);
        setFranjas(nuevasFranjas);
    };

    const handleFranjaChange = (index, campo, valor) => {
        const nuevasFranjas = [...franjas];
        nuevasFranjas[index][campo] = valor;
        setFranjas(nuevasFranjas);
    };

    const onSubmitDisponibilidad = (data) => {
        const disponibilidadData = {
            fecha: data.fecha,
            franjas
        };
        onSubmit(disponibilidadData);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-lg font-bold mb-4">Configurar Disponibilidad</h3>
                <form onSubmit={handleSubmit(onSubmitDisponibilidad)}>
                    <div className="mb-4">
                        <label className="block font-medium">Fecha</label>
                        <input
                            {...register('fecha')}
                            type="date"
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Franjas Horarias</label>
                        {franjas.map((franja, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="time"
                                    value={franja.startTime}
                                    onChange={(e) => handleFranjaChange(index, 'startTime', e.target.value)}
                                    className="w-1/2 border border-gray-300 p-2 rounded"
                                />
                                <input
                                    type="time"
                                    value={franja.endTime}
                                    onChange={(e) => handleFranjaChange(index, 'endTime', e.target.value)}
                                    className="w-1/2 border border-gray-300 p-2 rounded"
                                />
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => eliminarFranja(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                            onClick={agregarFranja}
                        >
                            Agregar Franja Horaria
                        </button>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalDisponibilidad;
