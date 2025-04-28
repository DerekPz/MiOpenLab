import  { useEffect, useState } from 'react';
import { auth } from '../../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 font-mono">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-full max-w-3xl">
        <div className="bg-zinc-700 text-white p-2 flex items-center">
          <span className="text-red-500 text-5xl leading-[0px] -mt-2">•</span>
          <span className="text-yellow-500 text-5xl leading-[0px] ml-1 -mt-2">•</span>
          <span className="text-green-500 text-5xl leading-[0px] ml-1 -mt-2">•</span>
          <span className="ml-4">profile --- bash - zsh</span>
        </div>

        <div className="p-6 text-sky-300 flex flex-col gap-4">
          <p>➝ Welcome back{userEmail ? `, ${userEmail}` : ''}!</p>

          <p>➝ Here are your projects:</p>

          <div className="mt-4 text-gray-400">
            {/* 🔥 Aquí más adelante mostraremos los proyectos */}
            <p>No projects yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
