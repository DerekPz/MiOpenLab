import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const CreateProjectPage = () => {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);  // Actualiza el valor del input
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (step === 1) {
        if (inputValue.trim().length < 3) {
          setErrorMessage('❌ Title must be at least 3 characters.');
          return;
        }
        setTitle(inputValue.trim());  // Aquí guardamos el título
        setInputValue('');  // Limpiar el input para el siguiente paso
        setErrorMessage('');
        setStep(2);  // Cambiar al paso 2
      } else if (step === 2) {
        const trimmedDesc = inputValue.trim();
        if (inputValue.trim().length < 5) {
          setErrorMessage('❌ Description must be at least 5 characters.');
          return;
        }
        setDescription(trimmedDesc);  // Aquí guardamos la descripción
        setInputValue('');  // Limpiar el input después de guardar la descripción
        setErrorMessage('');
        await handleCreateProject(trimmedDesc);  // Llama a la función para crear el proyecto
      }
    }
  };


  // Función para crear el proyecto en Firestore
  const handleCreateProject = async (desc: string) => {
    console.log("Title:", title);  // Verifica el título
    console.log("Description:", description);  // Verifica la descripción antes de enviarla a Firestore

    if (!desc.trim()) {
      setErrorMessage('❌ Description cannot be empty.');
      return;  // Si la descripción está vacía, termina la ejecución
    }

    const user = auth.currentUser;
    if (!user) {
      setErrorMessage('❌ No authenticated user.');
      return;
    }

    try {
      // Asegúrate de que tanto el título como la descripción se estén enviando correctamente
      const docRef = await addDoc(collection(firestore, 'projects'), {
        title,
        description: desc,  // Asegúrate de que description tenga un valor aquí
        uid: user.uid,
        author: user.displayName || user.email,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage('✅ Project created successfully!');
      setStep(3);  // Cambia al paso 3 (finalizar)
      console.log("Document written with ID: ", docRef.id);  // Verifica el ID del documento
    } catch (error) {
      setErrorMessage('❌ Failed to create project');
      console.error(error);
    }
  };


  const handleNavigateToProfile = () => {
    navigate('/profile'); // Redirige a la página de perfil después de crear el proyecto
  };

  const handleCreateAnotherProject = () => {
    setStep(1); // Resetea para crear un nuevo proyecto
    setTitle('');
    setDescription('');
    setInputValue('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 font-mono">
      <div className="w-full flex justify-end pt-6 pr-6">
        <ThemeToggle />
      </div>
      <div className="bg-gray-200 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg w-full max-w-lg">
        <div className="bg-zinc-700 text-yellow-500 dark:text-white p-2 flex items-center">
          <span className="text-red-500 text-5xl leading-[0px] -mt-2">•</span>
          <span className="text-yellow-500 text-5xl leading-[0px] ml-1 -mt-2">•</span>
          <span className="text-green-500 text-5xl leading-[0px] ml-1 -mt-2">•</span>
          <span className="ml-4">create-project --- bash - zsh</span>
        </div>

        <div className="p-6 text-gray-900 dark:text-sky-300 flex flex-col gap-4">
          {step === 1 && (
            <div>
              <p>➝ Enter Project Title:</p>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}  // Actualiza el estado mientras el usuario escribe
                onKeyDown={handleKeyDown}  // Solo captura el "Enter" para avanzar al siguiente paso
                className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-sky-400 text-amber-400 w-full mt-2"
              />
              {errorMessage && (
                <div className="text-yellow-500 dark:text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <p>➝ Enter Project Description:</p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-sky-400 text-amber-400 w-full mt-2"
                autoFocus
              />
              {errorMessage && (
                <div className="text-yellow-500 dark:text-red-400 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-yellow-500 dark:text-green-400 text-center mt-6">{successMessage}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleNavigateToProfile}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                  View Projects
                </button>
                <button
                  onClick={handleCreateAnotherProject}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Create Another Project
                </button>
              </div>
            </div>

          )}
          <button
            onClick={() => navigate(-1)} // Esto regresa una página atrás
            className="mt-4 self-start text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
