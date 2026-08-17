import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  registerSchema,
  type RegisterFormData,
} from '../../utils/ValidationUtils.ts';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.tsx';
import { registerUser } from '../../api/AuthenticationApiService.ts';

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setLoading(true);

    try {
      await registerUser(data.fullName, data.email, data.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      setError('Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-1 flex items-center justify-center relative overflow-hidden py-12">
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
                Create an account
              </h1>
              <p className="text-sm text-stone-500">
                Join us and start booking your stay
              </p>
            </div>

            <hr className="border-stone-200 mb-6" />

            {error && (
              <p className="text-red-600 text-sm text-center mb-4 bg-red-50 py-2 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-600 text-sm text-center mb-4 bg-green-50 py-2 rounded">
                Account created! Redirecting to login...
              </p>
            )}

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

            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Full name
              </label>
              <input
                {...register('fullName')}
                type="text"
                placeholder="Enter full name"
                className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('passwordConfirm')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.passwordConfirm && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-stone-400">
                <span className="bg-white px-4">Already have an account?</span>
              </div>
            </div>
            <Link
              to="/login"
              className="mt-4 w-full block text-center border border-orange-900 text-orange-900 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
