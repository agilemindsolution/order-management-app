import React from 'react';

// export const Loader = () => {
//     return (
//       <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   };
  
const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
      </div>
      <p className="text-blue-600 text-sm font-semibold animate-pulse">Loading...</p>
    </div>
  );
};

const Spinner: React.FC = () => {
  return (
    <div className="animate-spin inline-block w-5 h-5 border-2 border-t-2 rounded-full"></div> 
  );
};

export {Loader, Spinner} ;