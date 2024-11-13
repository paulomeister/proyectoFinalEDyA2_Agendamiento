import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProveedorList from './ProveedorList';
import SearchBar from './SearchBar';

const DashboardComponent = () => {
  const [search, setSearch] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [noResults, setNoResults] = useState(false); 
  const [isFirstLoad, setIsFirstLoad] = useState(true); 


  const fetchProveedores = useCallback(async (searchTerm = '') => {
    try {
      const response = searchTerm
        ? await axios.post('https://backendcitasedyaii-production.up.railway.app/api/usuarios/buscarConFiltros', { search: searchTerm })
        : await axios.get('https://backendcitasedyaii-production.up.railway.app/api/usuarios/busquedaProveedores');

      const data = response.data.proveedores;

      setProveedores(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error('Error al cargar los proveedores:', error);
      setNoResults(true);
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      fetchProveedores();
      setIsFirstLoad(false);
    } else {
      const timer = setTimeout(() => {
        fetchProveedores(search);
      }, 500);

      return () => clearTimeout(timer); 
    }
  }, [search, fetchProveedores, isFirstLoad]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProveedores(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, fetchProveedores]);

  const handleClearSearch = () => {
    setSearch('');
    fetchProveedores('');
  };

  return (
    <div>
      <div className="text-center pt-10 pb-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡El mejor lugar para asesorarte!</h1>
        <p className="text-lg text-gray-600">Busca lo que necesites y consulta con nuestros proveedores</p>
      </div>
      <SearchBar search={search} setSearch={setSearch} onClear={handleClearSearch} />

      {noResults ? (
        <p className="text-center text-red-500 mt-4">No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <ProveedorList proveedores={proveedores} />
      )}
    </div>
  );
};

export default DashboardComponent;
