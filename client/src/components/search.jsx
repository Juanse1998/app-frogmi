import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [magType, setMagType] = useState('');

  const handleMagTypeChange = (event) => {
    setMagType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ magType: magType }); // Pasar ambos términos de búsqueda al callback
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={magType}
        onChange={handleMagTypeChange}
        placeholder="Tipo de magnitud"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
