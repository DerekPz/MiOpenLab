import React, { useState } from "react";

import { auth } from "../../services/firebase"; // Asegúrate que la ruta es correcta
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Paso actual: 1 = Email, 2 = Password, 3 = Confirm Password, 4 = Success
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 1) {
      if (!isValidEmail(inputValue)) {
        setErrorMessage("❌ Please enter a valid email address");
        return; // No avanzamos si hay error
      }
        setEmail(inputValue);
        setInputValue("");
        setStep(2);
        setErrorMessage("");
      } else if (step === 2) {
        if (inputValue.length < 6) {
          setErrorMessage("❌ Password must be at least 6 characters");
          return; // No avanzamos si hay error
        }
        setPassword(inputValue);
        setInputValue("");
        setStep(3);
        setErrorMessage("");
      } else if (step === 3) {
        if (inputValue !== password) {
          setErrorMessage("❌ Passwords do not match");
          return; // No avanzamos si hay error
        }
        setInputValue("");
        setErrorMessage("");
        handleRegister(); // Finalizar registro real
      }
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User registered successfully");
      setStep(4);

      // Espera un segundo y luego navega
      setTimeout(() => {
        navigate("/profile"); // Ajusta la ruta donde quieres enviar al usuario
      }, 1500); // 1.5 segundos para que vea el mensaje de éxito
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 font-mono">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-full max-w-lg">
        <div className="bg-zinc-700 text-white p-2 flex items-center">
          <span className="text-red-500 text-5xl leading-[0px] -mt-2">•</span>
          <span className="text-yellow-500 text-5xl leading-[0px] ml-1 -mt-2">
            •
          </span>
          <span className="text-green-500 text-5xl leading-[0px] ml-1 -mt-2">
            •
          </span>
          <span className="ml-4">register --- bash - zsh</span>
        </div>

        <div className="p-6 text-sky-300 flex flex-col gap-4">
          {step === 1 && (
            <div>
              <p>➝ Enter your Email:</p>
              <input
                type="email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-sky-400 text-amber-400 w-full mt-2"
                autoFocus
              />
              {errorMessage && ( // 👈 AQUI
                <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
              <button
                onClick={() => navigate(-1)} // Esto regresa una página atrás
                className="mt-4 self-start text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                ← Go Back
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p>➝ Enter your Password:</p>
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-sky-400 text-amber-400 w-full mt-2"
                autoFocus
              />
              {errorMessage && ( // MOSTRAR ERROR AQUÍ
                <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
              <button
                onClick={() => setStep(step - 1)} // Esto regresa una página atrás
                className="mt-4 self-start text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                ← Go Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p>➝ Confirm your Password:</p>
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-sky-400 text-amber-400 w-full mt-2"
                autoFocus
              />
              {errorMessage && ( // 👈 Mostrar errores aquí
                <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
              <button
                onClick={() => setStep(step - 1)} // Esto regresa una página atrás
                className="mt-4 self-start text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                ← Go Back
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-green-400 text-center mt-6">
              ✅ Registration completed successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
