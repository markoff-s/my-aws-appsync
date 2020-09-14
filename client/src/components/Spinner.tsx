import React from 'react';
import StyledSpinner from '../styled-components/Spinner';

const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </StyledSpinner>
  );
};

export default Spinner;
