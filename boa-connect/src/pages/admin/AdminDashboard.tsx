import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to new admin panel
    navigate('/admin', { replace: true });
  }, [navigate]);

  return null;
}
