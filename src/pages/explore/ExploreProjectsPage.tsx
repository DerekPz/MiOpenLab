import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ThemeToggle from '../../components/ThemeToggle'; // Importa el componente de cambio de tema

const ExploreProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    fetchProjects();
    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(firestore, 'projects'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(projectsData);
    } catch (error) {
      setErrorMessage('❌ Error fetching projects');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6 font-mono">
      <div className="flex justify-between items-center mb-8">
        <div className="text-white text-3xl">Explore Projects</div>

        {/* Login/Register or Go to Profile Button */}
        {!isUserLoggedIn && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg px-5 py-2.5"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-white bg-green-700 hover:bg-green-800 rounded-lg px-5 py-2.5"
            >
              Register
            </button>
          </div>
        )}

        {/* Go to Profile Button */}
        {isUserLoggedIn && (
          <button
            onClick={() => navigate('/profile')}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Go to Profile
          </button>
        )}

        {/* Theme toggle */}
        <ThemeToggle /> {/* Agrega el toggle de tema */}
      </div>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-sm">bash</p>
            </div>
            <div className="mt-4">
              <p className="text-green-400">{project.title}</p>
              <p className="text-white">
                {project.description && project.description.length > 50
                  ? project.description.substring(0, 50) + '...'
                  : project.description || 'No description available'}
              </p>
              <p className="text-green-400 mt-2">
                {project.author ? `By: ${project.author}` : 'No author specified'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProjectsPage;
