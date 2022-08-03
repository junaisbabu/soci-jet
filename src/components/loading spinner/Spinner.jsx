import React from "react";

function Spinner() {
  return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem', color: 'var(--second-color)'}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
  );
}

export default Spinner;
