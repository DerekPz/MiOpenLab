import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import EditProjectModal from '../../components/EditProjectModal';
import DeleteProjectModal from '../../components/DeleteProjectModal';
import { signOut } from 'firebase/auth';

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchProjects(user.uid);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  // Obtener proyectos del usuario
  const fetchProjects = async (userId: string) => {
    try {
      const q = query(collection(firestore, 'projects'), where('uid', '==', userId));
      const querySnapshot = await getDocs(q);
      const userProjects = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Agregar el id de cada documento
      }));
      setProjects(userProjects);
    } catch (error) {
      setErrorMessage('❌ Error fetching projects');
      console.error(error);
    }
  };

  // Abrir modal de eliminación
  const handleOpenDeleteModal = (projectId: string) => {
    setProjectIdToDelete(projectId);
    setShowModal(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirige al inicio después de cerrar sesión
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGoToExplore = () => {
    navigate('/explore'); // Redirige a la página ExploreProjects
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6 font-mono flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back{userEmail ? `, ${userEmail.split('@')[0]}` : ''}
            </h1>
            <p className="text-gray-400 mt-2">Manage your projects easily from here.</p>
          </div>
          <button
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={() => navigate('/create-project')}
          >
            + New Project
          </button>
          <button
            onClick={handleLogout}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Log Out
          </button>
          <button
            onClick={handleGoToExplore}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Go to Explore Projects
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Your Projects</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-gray-900 p-10 rounded-lg shadow-md border border-gray-800">
              <svg
                className="w-16 h-16 text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v4a1 1 0 001 1h16a1 1 0 001-1V7m-2 10h-4a1 1 0 01-1-1v-1H9v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-5h18v5a1 1 0 01-1 1z"
                />
              </svg>
              <h3 className="text-xl text-gray-300 font-bold mb-2">No projects yet</h3>
              <p className="text-gray-500">Start by creating your first project!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700 relative"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400">
                    {project.description ? project.description : 'No description available'}
                  </p>

                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setProjectToEdit(project); // Establece el proyecto para editar
                      }}
                      className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(project.id)} // Abre el modal de eliminación
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>

      {/* Modals */}
      {isEditing && (
        <EditProjectModal project={projectToEdit} setIsEditing={setIsEditing} fetchProjects={fetchProjects} />
      )}
      {showModal && (
        <DeleteProjectModal projectId={projectIdToDelete} setShowModal={setShowModal} fetchProjects={fetchProjects} />
      )}
    </div>
  );
};

export default ProfilePage;
