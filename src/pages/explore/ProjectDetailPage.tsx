// ProjectDetailPage.tsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProjectDetailPage = () => {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const [project, setProject] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectRef = doc(firestore, 'projects', id || ''); // Obtiene el documento del proyecto por ID
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          setErrorMessage('❌ Project not found');
        }
      } catch (error) {
        setErrorMessage('❌ Error fetching project details');
        console.error(error);
      }
    };

    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6 font-mono flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-black text-white p-6 rounded-lg w-full">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {project ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-sm">bash</p>
            </div>

            <h1 className="text-green-400 text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-400 mb-4">{project.description}</p> {/* Descripción extendida */}
            <p className="text-green-400 ">By: {project.author || 'No author specified'}</p>

            <div className="mt-6">
              <button
                onClick={() => navigate('/explore')}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                Back to Explore
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading project details...</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
