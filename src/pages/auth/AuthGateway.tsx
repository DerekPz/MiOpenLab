import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Card from '../../components/Card';

const AuthGateway = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/profile');
      } else {
        setLoading(false); // Ya terminó de verificar y no hay usuario
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-950 font-mono text-sky-300">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950">
      <Card />
    </div>
  );
};

export default AuthGateway;
