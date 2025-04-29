import { FaTrashAlt } from 'react-icons/fa';
import { doc, deleteDoc } from 'firebase/firestore';
import { firestore, auth } from '../../src/services/firebase';

interface DeleteProjectModalProps {
  projectId: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProjects: (userId: string) => void;
}

const DeleteProjectModal = ({ projectId, setShowModal, fetchProjects }: DeleteProjectModalProps) => {
  const handleDelete = async () => {
    console.log("Deleting project with ID:", projectId);  // Verifica que el ID esté disponible
    if (!projectId) {
      console.error("No project ID found!");  // Manejo del error
      return;
    }
    try {
      const projectRef = doc(firestore, 'projects', projectId);
      await deleteDoc(projectRef);
      setShowModal(false);
      fetchProjects(auth.currentUser!.uid);  // Refresca los proyectos después de eliminar
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h3 className="text-white mb-4">Confirm Deletion</h3>
        <p className="text-gray-300 mb-6">Are you sure you want to delete this project?</p>
        <div className="flex justify-around">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <FaTrashAlt className="inline mr-2" />
            Yes
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
