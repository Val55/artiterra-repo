
import React, { useState, useEffect, useCallback } from 'react';
import { GeneratedCode, CodeTab } from './types';
import { generateCode } from './services/geminiService';
import Header from './components/Header';
import SparklesIcon from './components/icons/SparklesIcon';
import Loader from './components/Loader';
import CodeEditor from './components/CodeEditor';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState<GeneratedCode>({ html: '', css: '', js: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState('');
  const [activeTab, setActiveTab] = useState<CodeTab>(CodeTab.HTML);

  const handleGenerateCode = async () => {
    if (!prompt) {
      setError('Please enter a description for the web page.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateCode(prompt);
      setCode(generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setCode({ html: '', css: '', js: '' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCodeChange = useCallback((language: CodeTab, value: string) => {
    setCode(prevCode => ({
      ...prevCode,
      [language.toLowerCase()]: value,
    }));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newPreviewContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-g">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${code.css}</style>
          </head>
          <body>
            ${code.html}
            <script>${code.js}</script>
          </body>
        </html>
      `;
      setPreviewContent(newPreviewContent);
    }, 500); // Debounce preview update

    return () => clearTimeout(timeoutId);
  }, [code.html, code.css, code.js]);

  const renderTab = (tabName: CodeTab) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        activeTab === tabName
          ? 'bg-gray-800 text-indigo-400'
          : 'text-gray-400 hover:bg-gray-800/50'
      } ${
        tabName === CodeTab.HTML ? 'rounded-tl-lg' : ''
      } ${
        tabName === CodeTab.JS ? 'rounded-tr-lg' : ''
      }`}
    >
      {tabName}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-20 flex flex-col lg:flex-row gap-4 p-4">
        {/* Left Panel: Prompt and Controls */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="bg-gray-800 rounded-lg p-4 flex-1 flex flex-col shadow-lg">
            <label htmlFor="prompt" className="text-lg font-semibold mb-2 text-gray-200">
              Describe your web page
            </label>
            <p className="text-sm text-gray-400 mb-4">
              Be descriptive! For example, "a dark-themed portfolio page with a project grid and a contact form".
            </p>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full flex-1 p-3 bg-gray-900 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="e.g., a simple calculator with a neon theme"
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            <button
              onClick={handleGenerateCode}
              disabled={isLoading}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  <span>Generate with AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: Code and Preview */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="flex-1 flex flex-col bg-gray-800 rounded-lg shadow-lg min-h-[300px]">
            <div className="flex-shrink-0 bg-gray-900/70 border-b border-gray-700">
              {renderTab(CodeTab.HTML)}
              {renderTab(CodeTab.CSS)}
              {renderTab(CodeTab.JS)}
            </div>
            <div className="flex-1 relative">
              {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader />
                  </div>
              ) : (
                <>
                  <CodeEditor language={CodeTab.HTML} code={code.html} onCodeChange={handleCodeChange} isActive={activeTab === CodeTab.HTML} />
                  <CodeEditor language={CodeTab.CSS} code={code.css} onCodeChange={handleCodeChange} isActive={activeTab === CodeTab.CSS} />
                  <CodeEditor language={CodeTab.JS} code={code.js} onCodeChange={handleCodeChange} isActive={activeTab === CodeTab.JS} />
                </>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-gray-800 rounded-lg shadow-lg">
            <div className="flex-shrink-0 p-3 bg-gray-900/70 border-b border-gray-700 rounded-t-lg">
              <h2 className="text-md font-semibold text-gray-200">Live Preview</h2>
            </div>
            <div className="flex-1 bg-white rounded-b-lg overflow-hidden">
              <iframe
                srcDoc={previewContent}
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
