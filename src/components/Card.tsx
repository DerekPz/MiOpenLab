import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue === "1") {
        navigate("/login");
      } else if (inputValue === "2") {
        navigate("/register");
      } else if (inputValue === "3") {
        navigate("/explore"); // Redirige a explorar proyectos
      } else {
        setErrorMessage("❌ Invalid option. Please try again.");
        setInputValue(""); // Limpia el input si escribió mal
      }
    }
  };

  return (
    <div className="terminal p-5 rounded-lg font-mono min-w-[480px] ">
      <div className="terminal-header bg-zinc-700 text-white p-2 rounded-t-lg flex items-center ">
        <span className="text-red-500 text-5xl leading-[0px] align-middle -mt-2">
          •
        </span>
        <span className="text-yellow-500 text-5xl leading-[0px] align-middle -mt-2 ml-1">
          •
        </span>
        <span className="text-green-500 text-5xl leading-[0px] align-middle -mt-2 ml-1">
          •
        </span>
        <span className="ml-4 align-baseline">
          authentication --- bash - zsh
        </span>
      </div>

      <div
        className="pl-4 pt-2 max-h-[500px] overflow-auto bg-gray-200 dark:bg-gray-800"
        id="output"
      >
        <p className="text-gray-500">You need to authenticate to continue!</p>
        <p className="text-blue-500">Enter 1 to login</p>
        <p className="text-blue-500">Enter 2 to register</p>
        <p className="text-blue-500">Enter 3 to explore projects</p>{" "}
        {/* Agregamos la opción 3 */}
      </div>

      <div
        className="input flex pl-4 pb-4 rounded-b-lg items-start gap-2 bg-gray-200 dark:bg-gray-800"
        id="terminal-input-container"
      >
        <span className="text-green-700 mt-1 dark:bg-gray-800 ">➝</span>
        <span className="text-green-700 mt-1 dark:bg-gray-800">~</span>
    
        <div className="flex flex-col grow dark:bg-gray-800">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-amber-400 w-full"
          />
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
