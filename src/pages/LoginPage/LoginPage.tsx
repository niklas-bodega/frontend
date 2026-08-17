import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.tsx';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.tsx';
import { loginUser } from '../../api/AuthenticationApiService.ts';
import { apiBaseUrl } from '../../api/AxiosConfig.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type LoginFormData,
  loginSchema,
} from '../../utils/ValidationUtils.ts';

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      login(data.email);
      navigate('/');
    } catch {
      setError('Could not log in');
    } finally {
      setLoading(false);
    }
  };

  //TODO needs some work on these two, will move to own file.
  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/oauth2/authorization/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${apiBaseUrl}/oauth2/authorization/github`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Navbar />

      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl border border-stone-100">
          <div className="text-center mb-8">
            <div className="text-lg font-serif font-bold tracking-tighter text-orange-900 mb-4">
              NIKLAS BODEGA
            </div>
            <h1 className="text-2xl font-serif text-stone-800 mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-stone-500">
              Sign in to manage your reservations
            </p>
          </div>
          <hr className="border-stone-200 mb-6" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Email
              </label>
              <input
                {...register('email')}
                type="text"
                placeholder="Enter your email"
                className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
              <div className="text-right mt-1">
                <a
                  onClick={() => navigate('/forgotpassword')}
                  className="text-xs text-orange-700 hover:text-orange-900"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition mt-4"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-stone-400">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex-1 flex items-center justify-center gap-2 border border-stone-200 py-2.5 rounded text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50 transition"
            >
              <img
                src="https://www.google.com/favicon.ico"
                className="w-4 h-4"
              />
              Google
            </button>
            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex-1 flex items-center justify-center gap-2 border border-stone-200 py-2.5 rounded text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50 transition"
            >
              <img src="https://github.com/favicon.ico" className="w-4 h-4" />
              GitHub
            </button>
          </div>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-stone-400">
              <span className="bg-white px-4">New here?</span>
            </div>
          </div>
          <Link
            to="/register"
            className="mt-4 w-full block text-center border border-orange-900 text-orange-900 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
