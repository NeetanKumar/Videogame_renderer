import React, { useState, useEffect } from 'react';
import './Loader.css';

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-body">
      {loading ? (
        <div className="loading-spinner">
          <p>Please wait, loading for 2 seconds...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default LoadingComponent;
