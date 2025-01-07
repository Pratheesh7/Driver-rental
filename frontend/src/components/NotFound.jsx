import React from 'react';

const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page Not Found</p>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    )
  }
  
  export default NotFound
8  