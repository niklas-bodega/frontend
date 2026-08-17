import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.tsx';
import axiosInstance from '../../api/AxiosConfig.ts';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    axiosInstance
      .get('/api/user')
      .then((response) => {
        login(response.data.email);
        console.log(`User ${response.data.name} is logged in`);
        navigate('/');
      })
      .catch(() => navigate('/login'));
  }, [login, navigate]);
  return null;
};
export default OAuthRedirectPage;
