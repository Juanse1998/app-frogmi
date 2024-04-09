import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';
import SearchBar from './search';
import logo from '../logo-frogmi.png';

function ListTask() {
  const [elementos, setElementos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]); 
  
  const fetchData = async (magType = '') => {
    try {
      const response = await axios.get('http://localhost:3000/api/features', {
        params: {
          mag_type: magType.magType,
          page: currentPage,
          per_page: 19
        }
      });
      setElementos(response.data);
      setTotalPages(response.data.total_pages);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (magType) => {
    setCurrentPage(1); // Reseteamos la página a la primera cuando se realiza una búsqueda nueva
    fetchData(magType);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="columns-container">
        <div className='search-bar'>
          <div style={{marginBottom: '40px'}}>
            <img src={logo} style={{width: '200px'}} alt="logo frogmi" />
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="column">
          {elementos.map((elemento, index) => (
            <Card 
              id={elemento.id}
              title={elemento.title}
              latitude={elemento.latitude}
              longitude={elemento.longitude}
              magType={elemento.mag_type}
              magnitude={elemento.magnitude}
              time={elemento.time}
              place={elemento.place}
              tsunami={elemento.tsunami}
              url={elemento.url}
              comments={elemento.comments}
            />
          ))}
        </div>
        <div className='buttons'>
          <div className='prevButton'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
          </div>
          <div className='nextButton'>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
        </div>
    </div>
  );
}
{/* */}
export default ListTask;
