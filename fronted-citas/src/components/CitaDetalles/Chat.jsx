import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../../firebaseConfig'; 
import { useSelector } from 'react-redux';  

const Chat = ({ citaId, isDisabled }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const { user } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (!citaId) return;

    const mensajesRef = ref(db, `chats/${citaId}`);
    onValue(mensajesRef, (snapshot) => {
      const data = snapshot.val();
      const mensajesArray = data ? Object.values(data) : [];
      setMensajes(mensajesArray);
    });
  }, [citaId]);

  
  const enviarMensaje = async () => {
    if (mensaje.trim() === '') return;

    
    if (!user || !user.uid || !user.displayName) {
      console.error("Error: Datos del usuario no disponibles o incompletos.");
      return;
    }

    //Crea la coleccion chats
    const mensajesRef = ref(db, `chats/${citaId}`);
    const nuevoMensajeRef = push(mensajesRef);

    // Enviar el mensaje a Firebase
    await set(nuevoMensajeRef, {
      texto: mensaje,
      userId: user.uid,
      nombre: user.displayName, 
      timestamp: Date.now(),
    });

    
    setMensaje('');
  };

  return (
    <div className="bg-white w-full p-2">
      <h2 className="text-3xl font-semibold text-gray-800">Chat</h2>
      <div className="h-64 overflow-y-auto border-b mb-3">
        {mensajes.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.userId === user.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-2 rounded-lg max-w-xs ${msg.userId === user.uid ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <p className="text-sm font-bold text-gray-700">{msg.nombre || 'Usuario'}</p>
              <p className="text-sm text-gray-700">{msg.texto}</p>
            </div>
          </div>
        ))}
      </div>
      <input
        className="w-full p-2 border rounded"
        placeholder="Escribe tu mensaje..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        disabled={isDisabled}
      ></input>
      <div className="mt-3 text-right">
        <button
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          disabled={isDisabled}
          onClick={enviarMensaje}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
