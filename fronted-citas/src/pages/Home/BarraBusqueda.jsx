import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({search, setSearch}) => {

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-center items-center p-2 pb-5">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 12.65z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
