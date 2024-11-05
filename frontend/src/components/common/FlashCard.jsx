import React from 'react';
import './FlashCard.css';

const FlashCard = ({ title, value, children }) => {
    return (
        <div className="flash-card">
            <h3>{title}</h3>
            {value !== undefined && <p>{value}</p>}
            {children && <div className="flash-card-content">{children}</div>}
        </div>
    );
};

export default FlashCard;
