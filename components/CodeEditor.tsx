
import React from 'react';
import { CodeTab } from '../types';

interface CodeEditorProps {
  language: CodeTab;
  code: string;
  onCodeChange: (language: CodeTab, value: string) => void;
  isActive: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, code, onCodeChange, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="h-full w-full bg-gray-900 rounded-b-lg">
      <textarea
        value={code}
        onChange={(e) => onCodeChange(language, e.target.value)}
        className="w-full h-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none"
        placeholder={`// ${language} code will appear here...`}
      />
    </div>
  );
};

export default CodeEditor;
