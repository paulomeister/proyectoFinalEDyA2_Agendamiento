import React from 'react';

const CitaInfo = ({ cita, nombreProveedor, nombreCliente }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800">Detalles de la Cita</h2>
      <hr className="mb-6 mt-2" />
      <div className="mb-4"><span className="text-lg font-medium text-gray-600">Proveedor:</span><span className="text-lg text-gray-800 ml-2">{nombreProveedor}</span></div>
      <div className="mb-4"><span className="text-lg font-medium text-gray-600">Cliente:</span><span className="text-lg text-gray-800 ml-2">{nombreCliente}</span></div>
      <div className="mb-4"><span className="text-lg font-medium text-gray-600">Fecha:</span><span className="text-lg text-gray-800 ml-2">{cita.fecha}</span></div>
      <div className="mb-4"><span className="text-lg font-medium text-gray-600">Horario:</span><span className="text-lg text-gray-800 ml-2">{cita.comienzaEn} - {cita.terminaEn}</span></div>
      <div className="mb-4"><span className="text-lg font-medium text-gray-600">Nota:</span><span className="text-lg text-gray-800 ml-2">{cita.notas?.mensaje}</span></div>
      <div className="mb-4">
        <span className="text-lg font-medium text-gray-600">Estado:</span>
        <span className={`text-lg ml-2 ${cita.status === 'agendada' ? 'text-blue-500' : cita.status === 'cancelada' ? 'text-red-500' : 'text-green-500'}`}>
          <b>{cita.status}</b>
        </span>
      </div>

      {cita.status === 'agendada' && (
        <>
          <hr />
          <div className="flex items-center space-x-4 py-3">
            <img
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              src="https://1000marcas.net/wp-content/uploads/2022/01/Google-Meet-Logo.png"
              alt="Google Meet Logo"
            />
            <a
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 inline-block"
              href="https://meet.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unirse a la llamada
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default CitaInfo;
