import { useState, useRef, useEffect } from 'react';
import { 
  Sun, Moon, HelpCircle, Bot, RotateCcw, Send, 
  Loader, Link, ExternalLink, Home, LinkIcon
} from 'lucide-react';
import '../index.css'

const DraftChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentResources, setCurrentResources] = useState([]);
  const [showSources, setShowSources] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessageId = messageIdCounter;
      setMessageIdCounter(prev => prev + 1);

      setMessages(prev => [...prev, { 
        role: 'user', 
        content: input.trim(),
        id: userMessageId
      }]);
      setLoading(true);
      setInput('');
      setShowSources(false);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}legal/draft/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_prompt: input.trim()
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        const assistantMessageId = messageIdCounter + 1;
        setMessageIdCounter(prev => prev + 1);

        const resources = [{
          title: 'Generated Document',
          link: data.doc_link || '#'
        }];

        const formattedResponse = {
          role: 'assistant',
          content: {
            text: data.draft_response,
            resources: resources
          },
          id: assistantMessageId
        };
        
        setMessages(prev => [...prev, formattedResponse]);
        setCurrentResources(resources);
      } catch (error) {
        console.error('Error:', error);
        const errorMessageId = messageIdCounter + 1;
        setMessageIdCounter(prev => prev + 1);
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: {
            text: `Error: ${error.message}. Please try again.`,
            resources: []
          },
          id: errorMessageId
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSources = () => {
    setShowSources(!showSources);
  };

  const isEmpty = messages.length === 0 && !loading;

  const renderAssistantContent = (content) => {
    if (!content?.text) return null;

    const processedText = content.text.replace(/\\n/g, '\n');
    const lines = processedText.split('\n');

    return (
      <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {lines.map((line, index) => {
            if (!line.trim()) {
              return <div key={index} className="h-4" />;
            }

            const isTitle = line.toUpperCase() === line && line.length > 10;
            const isMainSection = /^\d+\.(?!\d)/.test(line.trim());
            const isSubSection = /^\d+\.\d+/.test(line.trim());
            const isParagraph = !isTitle && !isMainSection && !isSubSection;

            let className = '';
            if (isTitle) {
              className = 'text-2xl font-bold my-6';
            } else if (isMainSection) {
              className = 'text-xl font-bold mt-6 mb-3';
            } else if (isSubSection) {
              className = 'text-lg font-semibold mt-4 mb-2';
            } else if (isParagraph) {
              className = 'text-base leading-relaxed mt-2';
            }

            return (
              <div key={index} className={className}>
                <p>{line.trim()}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSourceButton = (resources) => {
    if (!resources || resources.length === 0) return null;

    return (
      <button 
        onClick={() => {
          setCurrentResources(resources);
          setShowSources(true);
        }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors ${
          isDarkMode 
            ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-300' 
            : 'border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <LinkIcon size={14} />
        View Document
      </button>
    );
  };

  const renderMessage = (message) => (
    <div key={message.id}>
      <div className="max-w-2xl mx-auto p-4">
        {message.role === 'assistant' ? (
          <div className="flex gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
              isDarkMode ? 'bg-[#3FA2F6]' : 'bg-[#BFECFF]'
            }`}>
              <Bot size={16} />
              <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"/>
            </div>
            <div className="flex-1">
              <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {renderAssistantContent(message.content)}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button 
                  className={`p-1.5 rounded hover:bg-opacity-80 ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <RotateCcw size={16} />
                </button>
                {renderSourceButton(message.content.resources)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <div className="max-w-[85%]">
              <div className="bg-[#3FA2F6] text-white p-5 rounded-2xl">
                {message.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
      <div className="flex-1 flex flex-col relative">
        <nav
          className={`border-b p-2 flex items-center justify-between sticky top-0 z-20 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
          style={{ backgroundColor: isDarkMode ? "#212121" : "#ffffff" }}
        >
          <div className="flex items-center">
            <a
              href="/"
              className={`p-2 rounded-md ${
                isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              <Home size={20} />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}>
              <HelpCircle size={20} />
            </button>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="h-full flex flex-col justify-center items-center p-4">
              <h1 className={`text-4xl font-bold text-center mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Document Analysis Assistant
              </h1>
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your documents..."
                    className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || loading}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className={`flex-1 transition-all duration-300 ${showSources ? 'mr-80' : ''}`}>
                <div className="pb-32">
                  {messages.map(renderMessage)}
                  {loading && (
                    <div className="max-w-2xl mx-auto p-4 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                          <Bot size={16} />
                          <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"/>
                      </div>
                      <div className={`flex items-center ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}>
                        <Loader className="animate-spin" size={16} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className={`fixed bottom-0  left-32 ${
                  showSources ? 'right-80' : 'right-0'
                } left-0 p-4 border-t ${
                  isDarkMode ? 'border-transparent bg-[#212121]' : 'border-transparent bg-white'
                }`}>
                  <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your documents..."
                        className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <button 
                        type="submit"
                        disabled={!input.trim() || loading}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
                          isDarkMode
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Send size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              
              {showSources && (
                <div 
                  className={`w-80 border-l fixed right-0 top-0 bottom-0 z-40 overflow-y-auto transition-transform duration-300 ${
                    isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Link size={20} />
                        Document Link
                      </h2>
                      <button 
                        onClick={toggleSources}
                        className={`p-2 rounded-full hover:bg-opacity-80 ${
                          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {currentResources.map((resource, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border transition-colors ${
                            isDarkMode 
                              ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800' 
                              : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <h3 className="font-medium mb-2 line-clamp-2">
                            {resource.title}
                          </h3>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm font-medium ${
                              isDarkMode 
                                ? 'text-blue-400 hover:text-blue-300' 
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            <ExternalLink size={14} />
                            Open Document
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftChat;