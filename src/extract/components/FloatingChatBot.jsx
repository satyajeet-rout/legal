import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const FloatingChatBot = ({ documentName, onClose, isOpen }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Function to remove file extension
  const cleanFileName = (fileName) => {
    return fileName ? fileName.replace(/\.[^/.]+$/, '') : '';
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { 
          type: 'bot', 
          content: `Hello! I'm here to help you with questions about ${cleanFileName(documentName)}. What would you like to know?` 
        }
      ]);
      setInputMessage('');
      setIsLoading(false);
    }
  }, [isOpen, documentName]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://legal-ai-backend-draft-drh9bmergvh7a4a9.southeastasia-01.azurewebsites.net/legal/query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: documentName,
          user_prompt: inputMessage
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: formatBotResponse(data.response, data.citations) }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBotResponse = (response, citations) => {
    // Function to replace **text** with <strong>text</strong>
    const boldText = (text) => {
      const regex = /\*\*(.*?)\*\*/g;
      return text.replace(regex, '<strong>$1</strong>');
    };

    // Format the bot response and citations for better readability
    const formattedResponse = response.split('\n').map((line, index) => (
      <span key={index} dangerouslySetInnerHTML={{ __html: boldText(line) }} />
    ));

    return (
      <div>
        <div>{formattedResponse.map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>)}</div>
        {citations && citations.length > 0 && (
          <div className="mt-4">
            <strong>Citations:</strong>
            <div className="space-y-2">
              {citations.map((citation, index) => (
                <div key={index} className="border rounded-sm">
                  <button 
                    className="w-full flex justify-between text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>Citation {index + 1} (Page {citation.page_number})</span>
                    <span id={`toggle-icon-${index}`}>+</span>
                  </button>
                  <div className="accordion-content hidden px-4 py-2 bg-lime-200">
                    <pre className="whitespace-pre-wrap">{boldText(citation.content)}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const toggleAccordion = (index) => {
    const content = document.querySelectorAll('.accordion-content')[index];
    const isOpen = content.classList.contains('hidden');
    content.classList.toggle('hidden', !isOpen);

    const toggleIcon = document.getElementById(`toggle-icon-${index}`);
    toggleIcon.textContent = isOpen ? '-' : '+';
  };

  if (!isOpen) return null;

  const chatWindow = (
    <div className="fixed top-0 right-0 w-96 bg-white shadow-xl flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b bg-green-600 text-white">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat with {cleanFileName(documentName)}
        </h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              ref={message.type === 'user' ? inputRef : null}
            >
              {message.type === 'bot' ? <div>{message.content}</div> : (
                <div>{message.content.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>{line}<br /></React.Fragment>
                ))}</div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center space-x-2">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center space-x-2">
              <span>Getting Data</span>
              <span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(chatWindow, document.body);
};

export default FloatingChatBot;