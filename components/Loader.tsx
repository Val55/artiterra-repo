
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 border-4 border-t-indigo-400 border-gray-600 rounded-full animate-spin"></div>
        <p className="text-gray-300 font-medium">AI is thinking...</p>
        <p className="text-gray-400 text-sm max-w-sm">Generating code based on your prompt. This might take a moment.</p>
    </div>
  );
};

export default Loader;
