import React, { useState } from 'react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (step === 1) {
        if (!inputValue.includes('@')) {
          setErrorMessage('❌ Please enter a valid email address');
          return;
        }
        setEmail(inputValue);
        setInputValue('');
        setStep(2);
        setErrorMessage('');
      } else if (step === 2) {
        if (inputValue.length < 6) {
          setErrorMessage('❌ Password must be at least 6 characters');
          return;
        }
        setErrorMessage('');
        handleLogin(inputValue);
      }
    }
  };

  const handleLogin = async (passwordInput: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, passwordInput);
      console.log("✅ Logged in successfully");

      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error: any) {
      console.error(error);

      if (error.code === 'auth/user-not-found') {
        setErrorMessage('❌ User not found. Please register.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('❌ Wrong password. Please try again.');
      } else if (error.code === 'auth/invalid-credential') {
        setErrorMessage('❌ User not found or wrong credentials. Please check.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('❌ Invalid email address.');
      } else {
        setErrorMessage(`❌ ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 font-mono">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-full max-w-lg">
        <div className="bg-zinc-700 text-white p-2 flex items-center">
          <span className="text-red-500 text-5xl leading-[0px] -mt-2">•</span>
          <span className="text-yellow-500 text-5xl leading-[0px] ml-1 -mt-2">•</span>
          <span className="text-green-500 text-5xl leading-[0px] ml-1 -mt-2">•</span>
          <span className="ml-4">login --- bash - zsh</span>
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
              {errorMessage && (
                <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
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
              {errorMessage && (
                <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
