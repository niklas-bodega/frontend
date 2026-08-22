import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { userAxios } from '../api/AxiosConfig';
import { logoutUser } from '../api/AuthenticationApiService.ts';

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  role: string | null;
  login: (email: string) => void;
  logout: () => void;
  clearAuth: () => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setemail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = useCallback((email: string) => {
    setIsAuthenticated(true);
    setemail(email);
  }, []);

  const clearAuth = useCallback(() => {
    setIsAuthenticated(false);
    setemail(null);
    setRole(null);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    clearAuth();
  }, [clearAuth]);

  useEffect(() => {
    userAxios
      .get('/api/user')
      .then((response) => {
        login(response.data.email);
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsAuthLoading(false));
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        email,
        role,
        login,
        logout,
        clearAuth,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
