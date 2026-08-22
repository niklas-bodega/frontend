import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.tsx';
import { userAxios } from '../../api/AxiosConfig.ts';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    userAxios
      .get('/api/user')
      .then((response: any) => {
        login(response.data.email);
        console.log(`User ${response.data.name} is logged in`);
        navigate('/');
      })
      .catch(() => navigate('/login'));
  }, [login, navigate]);
  return null;
};
export default OAuthRedirectPage;
