import React from 'react';
import './styles.css';


function Comment({ content }) {
  return (
    <div className="comment">
      <div className="comment-content">{content}</div>
    </div>
  );
}

export default Comment;
