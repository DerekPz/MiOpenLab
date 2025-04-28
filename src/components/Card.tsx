import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue === '1') {
        navigate("/login");
      } else if (inputValue === '2') {
        navigate("/register");
      } else {
        alert("Please enter 1 to Login or 2 to Register");
        setInputValue(""); // Limpia el input si escribió mal
      }
    }
  };

  return (
    <div className="terminal p-5 rounded-lg font-mono min-w-[480px]">
      <div className="terminal-header bg-zinc-700 text-white p-2 rounded-t-lg flex items-center">
        <span className="text-red-500 text-5xl leading-[0px] align-middle -mt-2">•</span>
        <span className="text-yellow-500 text-5xl leading-[0px] align-middle -mt-2 ml-1">•</span>
        <span className="text-green-500 text-5xl leading-[0px] align-middle -mt-2 ml-1">•</span>
        <span className="ml-4 align-baseline">authentication --- bash - zsh</span>
      </div>
      
      <div className="pl-4 pt-2 bg-gray-900 max-h-[500px] overflow-auto" id="output">
        <p className="text-gray-500">You need to authenticate to continue!</p>
        <p className="text-sky-300">Enter 1 to login</p>
        <p className="text-sky-300">Enter 2 to register</p>
      </div>
      
      <div className="input flex pl-4 bg-gray-900 pb-4 rounded-b-lg items-center" id="terminal-input-container">
        <span className="text-green-500">➝</span>
        <span className="text-sky-300 ml-2">~</span>
        <span className="ml-2 text-md text-gray-500" id="placeholder" />
        
        <input
          className="bg-transparent border-none outline-none ring-0 focus:ring-0 text-amber-400 w-full"
          id="terminal-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Card;
