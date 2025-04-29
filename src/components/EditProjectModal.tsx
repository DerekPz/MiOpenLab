import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../src/services/firebase';

interface EditProjectModalProps {
  project: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProjects: (userId: string) => void;
}

const EditProjectModal = ({ project, setIsEditing, fetchProjects }: EditProjectModalProps) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  useEffect(() => {
    // Actualiza el estado cuando el proyecto cambia
    setTitle(project.title);
    setDescription(project.description);
  }, [project]);

  const handleSave = async () => {
    console.log("Saving project with ID:", project.id);  // Verifica que el ID esté disponible
    if (!project.id) {
      console.error("No project ID found!");  // Manejo del error
      return;
    }
    try {
      const projectRef = doc(firestore, 'projects', project.id);
      await updateDoc(projectRef, { title, description });
      fetchProjects(project.uid);  // Refresca los proyectos después de guardar
      setIsEditing(false);  // Cierra el modal de edición
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h3 className="text-white mb-4">Edit Project</h3>

        {/* Título del Proyecto */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 text-black rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Project Title"
        />

        {/* Descripción del Proyecto */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 text-black rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Project Description"
        />

        <div className="flex justify-around">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaSave className="inline mr-2" />
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
