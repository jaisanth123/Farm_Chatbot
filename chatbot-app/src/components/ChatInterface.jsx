import React, { useState, useRef } from 'react';
import { FaLightbulb, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const ChatInterface = ({ 
  isOpen,
  setIsOpen,
  messages,
  loading,
  formLoading,
  input,
  setInput,
  showSuggestions,
  setShowSuggestions,
  handleSubmit,
  messageEndRef,
  getSuggestions
}) => {
  return (
    <>
      <div 
        className="fixed bottom-5 right-5 bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot size={28} className="text-white" />
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-5 bg-gray-800 w-96 h-[500px] rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-purple-700 p-4 text-center text-white font-bold text-lg">
            Mistral Chatbot
          </div>

          <div className="flex-1 p-1 overflow-y-auto space-y-2 scrollbar-hide chat-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-center ${message.sender === 'user' ? '' : 'flex-row-reverse'}`}>
                  <div className="mx-2">
                    {message.sender === 'user' ? (
                      <FaUser size={20} className="text-purple-600" />
                    ) : (
                      <FaRobot size={20} className="text-gray-300" />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    } animate-fade-in`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-end">
                <div className="flex items-center flex-row-reverse">
                  <div className="mx-2">
                    <FaRobot size={20} className="text-gray-300" />
                  </div>
                  <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg animate-pulse">
                    loading...
                  </div>
                </div>
              </div>
            )}

            {formLoading && (
              <div className="flex justify-end">
                <div className="flex items-center flex-row-reverse"></div>
              </div>
            )}
            
            <div ref={messageEndRef} />
          </div>

          <div className="relative">
            {showSuggestions && (
              <div className="absolute bottom-full left-0 w-full mb-2">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {getSuggestions().map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInput(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-3 bg-gray-700 flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 pr-10 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                    showSuggestions ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <FaLightbulb size={16} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!input.trim()}
                className={`ml-2 p-2 rounded-full transition-colors ${
                  input.trim()
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-600 cursor-not-allowed text-gray-400'
                }`}
              >
                <FaPaperPlane size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInterface;