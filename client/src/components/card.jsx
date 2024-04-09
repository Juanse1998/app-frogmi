import React, { useState } from 'react';
import axios from 'axios';
import Comment from './comment.jsx'
import './styles.css';

function Card({ id, title, latitude, longitude, magType, magnitude, place, time, tsunami, url, comments}) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [listComments, setComments] = useState(comments);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('es-ES', options); // Puedes cambiar 'es-ES' al código de idioma que desees
  }
  
  const formattedDate = formatDate(time);

  const handleShowCommentInput = () => {
    setShowCommentInput(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/features/${id}/comments`,
        {
          comment: {
            feature_id: id,
            body: comment
          }
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">Latitude: {latitude}</p>
        <p className="card-description">Longitude: {longitude}</p>
        <p className="card-description">Magnitude Type: {magType}</p>
        <p className="card-description">Magnitude: {magnitude}</p>
        <p className="card-description">Place: {place}</p>
        <p className="card-description">Time: {formattedDate}</p>
        <p className="card-description">Tsunami: {tsunami ? 'Si' : 'No'}</p>
        <p className="card-description" style={{fontSize: '11px'}}>URL: {url}</p>
        <div>
          <b>Comentarios:</b>
        {listComments.map((elemento, index) => (
            <Comment content={elemento.body} />
          ))}
        </div>
        <div>
          <button onClick={handleShowCommentInput}>Dejar un comentario</button>
        </div>
        {showCommentInput && (
          <div>
            <div>
              <textarea style={{ height: '120px', width: '250px' }} value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <div>
              <button onClick={handleSubmitComment}>Enviar comentario</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;

