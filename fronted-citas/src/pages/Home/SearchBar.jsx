import React from 'react';

const SearchBar = ({ search, setSearch, onClear }) => {

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-center items-center p-2 pb-5">
      <div className="flex relative w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {search && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
