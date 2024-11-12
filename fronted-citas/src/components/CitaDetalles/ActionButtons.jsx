import React from 'react';

const ActionButtons = ({ user, cita, confirmAction, isDisabled }) => {
  if (isDisabled) {
    return null;
  }

  return (
    <div className="flex space-x-3 mt-4">
      {user.uid === cita.proveedorId && (
        <button onClick={() => confirmAction('finalizar')} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
          Finalizar Cita
        </button>
      )}
      <button onClick={() => confirmAction('cancelar')} className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
        Cancelar Cita
      </button>
    </div>
  );
  
};

export default ActionButtons;
