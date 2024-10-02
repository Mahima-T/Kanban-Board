import React from 'react';
import './Card.css'; 
import dot from './icons_FEtask/To-do.svg'; 
import anotherIcon from './icons_FEtask/SVG - Urgent Priority grey.svg'; 
import ProfileIcon from './icons_FEtask/profile.svg'; 

const Card = ({ ticket }) => {
  const { id, title, tag } = ticket; 

  return (
    <div className="card">
      <div className="profile-container">
        <img src={ProfileIcon} alt="Profile" className="profile-image" /> 
      </div>
      <h3 className="ticket-id">ID: {id}</h3>
      <p className="ticket-title">{title}</p>
      <div className="tag-container">
        <div className="icon-box">
          <img src={anotherIcon} alt="Another Icon" className="another-icon" />
        </div>
        <div className="tag-box">
          <img src={dot} alt="Dot" className="dot-icon" />
          <span className="tag">{tag}</span> 
        </div>
      </div>
    </div>
  );
};

export default Card;
