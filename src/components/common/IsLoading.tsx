import React from 'react';
import './IsLoading.css';

const IsLoading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default IsLoading;
