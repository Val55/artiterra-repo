
import React from 'react';
import CodeIcon from './icons/CodeIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm p-4 border-b border-gray-700 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CodeIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl font-bold text-white">AI Web Page Builder</h1>
        </div>
        <div className="text-sm text-gray-400">Powered by Gemini</div>
      </div>
    </header>
  );
};

export default Header;
