import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CitaInfo from '../../components/CitaDetalles/CitaInfo';
import ActionButtons from '../../components/CitaDetalles/ActionButtons';
import ConfirmModal from '../../components/CitaDetalles/ConfirmModal';
import Chat from '../../components/CitaDetalles/Chat';
import useCita from '../../Hooks/useCita';
import useUserNames from '../../hooks/useUserNames';
import axios from 'axios';



const CitaDetalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nota, setNota] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const user = useSelector((state) => state.auth.user);

  const {cita, setCita} = useCita(id);
  
  const { nombreProveedor, nombreCliente } = useUserNames(cita);

  const confirmAction = (type) => {
    setActionType(type);
    setShowModal(true);
  };
  const handleConfirm = async () => {
    const status = actionType === 'finalizar' ? 'completada' : 'cancelada';

    try {
      if (actionType === 'finalizar') {
        await axios.put('https://backendcitasedyaii-production.up.railway.app/api/citas/modificarMensaje', {
          citaId: cita._id,
          mensaje: nota,
        });
      }
      else if (actionType === 'cancelar') {

        await axios.put('https://backendcitasedyaii-production.up.railway.app/api/usuarios/actualizarDisponibilidad', {

          uid: cita.proveedorId,
          fecha: cita.fecha,
          startTime: cita.comienzaEn,
          endTime: cita.terminaEn,
          isBooked: false

        })

      }

      await axios.put('https://backendcitasedyaii-production.up.railway.app/api/citas/actualizarStatus', {
        citaId: cita._id,
        status: status,
      });

      setCita((prevCita) => ({
        ...prevCita,
        notas: actionType === 'finalizar' ? { mensaje: nota } : prevCita.notas,
        status: status,
      }));

      setShowModal(false);
      navigate('/misCitas');
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  
  if (!cita || !nombreProveedor || !nombreCliente) return <p>Cargando detalles de la cita...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-6">
          <div className="border p-6 rounded-lg shadow-lg bg-white">
            <CitaInfo cita={cita} nombreProveedor={nombreProveedor} nombreCliente={nombreCliente} />
            <hr />
            <ActionButtons user={user} cita={cita} confirmAction={confirmAction} isDisabled={cita.status !== 'agendada'} />
          </div>
        </div>
        <div className="md:col-span-2 border p-6 rounded-lg shadow-lg bg-white">
          <Chat citaId={cita._id} isDisabled={cita.status !== 'agendada'} />
        </div>
      </div>
      {user.uid === cita.proveedorId && (
        <div className="mt-6 border p-6 rounded-lg shadow-lg bg-white">
          <label className="block text-lg font-medium text-gray-600">Nota:</label>
          <textarea
            value={nota}
            placeholder='Escriba las notas aquí'
            onChange={(e) => setNota(e.target.value)}
            disabled={cita.status !== 'agendada'}
            className="border w-full p-2 rounded mt-2" />
        </div>
      )}
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} actionType={actionType} handleConfirm={handleConfirm} />
    </div>
  );
};

export default CitaDetalles;
