import React from 'react';

const ConfirmModal = ({ showModal, setShowModal, actionType, handleConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Confirmar acción</h3>
        <p>¿Está seguro que desea {actionType === 'finalizar' ? 'finalizar' : 'cancelar'} esta cita?</p>
        <div className="mt-4 flex justify-end">
          <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancelar</button>
          <button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
