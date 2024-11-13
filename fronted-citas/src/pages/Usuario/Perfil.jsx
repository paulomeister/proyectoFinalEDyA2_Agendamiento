import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ModalDisponibilidad from './ModalDisponibilidad';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess } from '../../store/auth/authSlice';

const UserProfile = () => {
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [isDisponibilidadOpen, setDisponibilidadOpen] = useState(false); // Estado para el modal
    const { uid } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const fetchUsuario = async () => {
        try {
            const response = await axios.get(`https://backendcitasedyaii-production.up.railway.app/api/usuarios/usuario/${uid}`);
            const userData = response.data.usuario;

            setUsuario(userData);

            reset({
                username: userData.username,
                esProveedor: userData.esProveedor,
                fotoPerfil: userData.fotoPerfil,
                servicios: userData.servicios ? userData.servicios.join(', ') : '',
                biografia: userData.biografia,
            });
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
        }
    };

    useEffect(() => {
        fetchUsuario();
    }, [uid, reset]);

    const onSubmit = (data) => {
        if (data.servicios) {
            data.servicios = data.servicios.split(',').map((servicio) => servicio.trim());
        } else {
            delete data.servicios;
        }

        actualizarUsuario(data);
    };

    const actualizarUsuario = async (data) => {
        try {
            const response = await axios.patch(`https://backendcitasedyaii-production.up.railway.app/api/usuarios/actualizarUsuario?uid=${uid}`, data);
            const updateUserData = response.data.proveedor;
            setUsuario(updateUserData);

            const serializableUser = {
                uid: uid,
                email: updateUserData.email,
                displayName: updateUserData.nombre,
                username: updateUserData.username,
                photoURL: updateUserData.fotoPerfil,
            };
            dispatch(updateUserSuccess(serializableUser));

            setMensaje('Usuario actualizado con éxito');
            fetchUsuario();

            setTimeout(() => {
                setMensaje('');
            }, 2000);

        } catch (error) {
            console.error("Error actualizando usuario:", error);
            setMensaje('Hubo un problema al actualizar el usuario');

            setTimeout(() => {
                setMensaje('');
            }, 2000);
        }
    };

    const handleDisponibilidadSubmit = async (disponibilidadData) => {
        try {
            const response = await axios.patch(`https://backendcitasedyaii-production.up.railway.app/api/usuarios/agregarDisponibilidad`, {
                uid: usuario.uid,
                ...disponibilidadData
            });
            setMensaje('Disponibilidad agregada con éxito');
            setDisponibilidadOpen(false);

            setTimeout(() => {
                setMensaje('');
            }, 3000);
        } catch (error) {
            console.error("Error al agregar disponibilidad:", error);
            setMensaje('Error al agregar disponibilidad');

            setTimeout(() => {
                setMensaje('');
            }, 3000);
        }
    };

    if (!usuario) {
        return <p className="text-center text-white">Cargando datos del usuario...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg grid grid-cols-1 md:grid-cols-[1.3fr_2fr] gap-8">
            {/* Columna Izquierda: Información del Usuario */}
            <div className="border-r-2 border-gray-100 px-3">
                <div className="flex items-center mb-6">
                    <img
                        src={usuario.fotoPerfil || 'https://via.placeholder.com/150'}
                        alt={`${usuario.nombre}'s profile`}
                        className="w-32 h-32 rounded-full border-4 border-blue-500 mr-4"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{usuario.nombre}</h1>
                        <h2 className="text-xl font-semibold text-blue-500">@{usuario.username}</h2>
                        <p className="text-gray-600">{usuario.email}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Biografía</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {usuario.biografia || 'Aún no tienes una biografía, ¡Qué esperas?!'}
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Calificación Promedio:</h3>
                    <p className="text-3xl text-yellow-500">{usuario.calificacionPromedio} ★</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Servicios Ofrecidos</h3>
                    <div className="flex flex-wrap gap-2">
                        {usuario.servicios.map((servicio, index) => (
                            <button
                                key={index}
                                className="px-2 py-1 bg-blue-500 text-sm text-white rounded-full shadow hover:bg-blue-600 transition"
                            >
                                {servicio}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Botón para abrir el modal */}
                <button
                    className="w-full bg-green-500 text-white font-semibold rounded py-2 hover:bg-green-600 transition"
                    onClick={() => setDisponibilidadOpen(true)}
                >
                    Configurar Disponibilidad
                </button>
            </div>

            {/* Columna Derecha: Formulario de Actualización */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Actualizar Información</h3>
                {mensaje && (
                    <div className={`text-center p-4 mb-4 rounded ${mensaje.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {mensaje}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-sky-100 p-6 rounded-lg shadow">
                    <div>
                        <label className="block font-medium text-gray-800">Username</label>
                        <input
                            {...register('username')}
                            type="text"
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="Nuevo username"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-800">Foto de Perfil</label>
                        <input
                            {...register('fotoPerfil')}
                            type="text"
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="URL de la foto de perfil"
                        />
                    </div>

                    <div className='flex content-center space-x-2'>
                        <label className="block font-medium text-gray-800">Es Proveedor</label>
                        <input
                            {...register('esProveedor')}
                            type="checkbox"
                            className="mr-2 self-center"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-800">Servicios</label>
                        <input
                            {...register('servicios')}
                            type="text"
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="Servicios separados por comas"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-800">Biografía</label>
                        <textarea
                            {...register('biografia')}
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="Biografía del usuario"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold rounded py-2 hover:bg-blue-600 transition"
                    >
                        Actualizar
                    </button>
                </form>
            </div>

            {/* Modal para la disponibilidad */}
            {isDisponibilidadOpen && (
                <ModalDisponibilidad
                    isOpen={isDisponibilidadOpen}
                    onClose={() => setDisponibilidadOpen(false)}
                    onSubmit={handleDisponibilidadSubmit}
                />
            )}
        </div>
    );
};

export default UserProfile;
