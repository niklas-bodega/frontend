import { useEffect, useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import LoadingMessage from '../components/LoadingMessage.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import { useAuth } from '../hooks/useAuth.tsx';
import {
  deleteUserAccount,
  getUserInformation,
  updateUserInformation,
} from '../api/UserApiService.ts';
import { logoutAllDevices } from '../api/AuthenticationApiService.ts';
import type { UserInformation } from '../types/User.ts';
import {
  type UserSettingsFormData,
  userSettingsSchema,
} from '../utils/ValidationUtils.ts';
import DeleteAccountConfirmationModal from './UserSettings/components/DeleteAccountConfirmationModal.tsx';

const UserSettingsPage = () => {
  const { login, clearAuth } = useAuth();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loggingOutAllDevices, setLoggingOutAllDevices] = useState(false);
  const [logoutAllDevicesError, setLogoutAllDevicesError] = useState<
    string | null
  >(null);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(
    null,
  );
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(10);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      email: '',
      name: '',
      currentPassword: '',
      password: '',
      passwordConfirm: '',
      userHasAPassword: false,
    },
  });

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const currentUserInformation = await getUserInformation();
        setUserInformation(currentUserInformation);
        reset({
          email: '',
          name: '',
          currentPassword: '',
          password: '',
          passwordConfirm: '',
          userHasAPassword: currentUserInformation.userHasAPassword,
        });
      } catch {
        setError('Failed loading user settings.');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserInformation();
  }, [reset]);

  useEffect(() => {
    if (!accountDeleted) {
      return;
    }

    if (redirectCountdown === 0) {
      clearAuth();
      navigate('/login', { replace: true });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRedirectCountdown((currentCountdown) => currentCountdown - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [accountDeleted, clearAuth, navigate, redirectCountdown]);

  const onSubmit = async (data: UserSettingsFormData) => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    const hasChanges = Boolean(data.email || data.name || data.password);

    const updatedUser = {
      email: data.email || undefined,
      name: data.name || undefined,
      currentPassword:
        hasChanges && data.userHasAPassword ? data.currentPassword : undefined,
      password: data.password || undefined,
    };

    try {
      await updateUserInformation(updatedUser);

      const updatedUserInformation = await getUserInformation();
      setUserInformation(updatedUserInformation);
      login(updatedUserInformation.email);
      reset({
        email: '',
        name: '',
        currentPassword: '',
        password: '',
        passwordConfirm: '',
        userHasAPassword: updatedUserInformation.userHasAPassword,
      });
      setSuccess('Your settings were updated.');
    } catch (caughtError) {
      if (axios.isAxiosError(caughtError)) {
        const responseData = caughtError.response?.data;

        setError(
          typeof responseData?.message === 'string'
            ? responseData.message
            : typeof responseData === 'string'
              ? responseData
              : 'Failed to update user settings.',
        );
      } else {
        setError('Failed to update user settings.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleOpenDeleteAccountModal = () => {
    setDeleteAccountError(null);
    setDeleteAccountModalOpen(true);
  };

  const handleLogoutAllDevices = async () => {
    setLogoutAllDevicesError(null);
    setLoggingOutAllDevices(true);

    try {
      await logoutAllDevices();
      clearAuth();
      navigate('/login', { replace: true });
    } catch {
      setLogoutAllDevicesError('Failed to log out all devices.');
      setLoggingOutAllDevices(false);
    }
  };

  const handleCloseDeleteAccountModal = () => {
    if (deletingAccount || accountDeleted) {
      return;
    }

    setDeleteAccountModalOpen(false);
    setDeleteAccountError(null);
  };

  const handleDeleteAccount = async () => {
    setDeleteAccountError(null);
    setDeletingAccount(true);

    try {
      await deleteUserAccount();
      setAccountDeleted(true);
      setRedirectCountdown(10);
    } catch {
      setDeleteAccountError(
        'Failed to delete your account. User with active bookings may not delete their account. Please contact support for assistance.',
      );
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loadingUser)
    return <LoadingMessage message={'Loading user settings...'} />;

  if (!userInformation) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error ?? 'Failed loading user settings.'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {deleteAccountModalOpen && (
        <DeleteAccountConfirmationModal
          isDeleting={deletingAccount}
          isDeleted={accountDeleted}
          countdown={redirectCountdown}
          error={deleteAccountError}
          onConfirm={handleDeleteAccount}
          onCancel={handleCloseDeleteAccountModal}
        />
      )}

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-orange-900 font-bold mb-2">
            Account
          </p>
          <h1 className="text-3xl font-serif text-stone-900">User settings</h1>
          <p className="text-sm text-stone-500 mt-2">
            Update only the details you want to change.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-stone-200 rounded-lg shadow-sm p-8"
          >
            <input
              type="hidden"
              value={String(userInformation.userHasAPassword)}
              {...register('userHasAPassword', {
                setValueAs: (value) => value === true || value === 'true',
              })}
            />

            {errors.root && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 py-2 px-3 rounded">
                {errors.root.message}
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 py-2 px-3 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-700 text-sm mb-4 bg-green-50 py-2 px-3 rounded">
                {success}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="text"
                  placeholder={userInformation.email}
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  Full name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={userInformation.name}
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  {userInformation.userHasAPassword
                    ? 'Current password'
                    : 'Create password'}
                </label>
                <input
                  {...register(
                    userInformation.userHasAPassword
                      ? 'currentPassword'
                      : 'password',
                  )}
                  type="password"
                  placeholder={
                    userInformation.userHasAPassword
                      ? 'Enter current password'
                      : 'Create a password'
                  }
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {userInformation.userHasAPassword && errors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.currentPassword.message}
                  </p>
                )}
                {!userInformation.userHasAPassword && errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {userInformation.userHasAPassword && (
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                    New password
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Enter new password"
                    className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  {userInformation.userHasAPassword
                    ? 'Confirm new password'
                    : 'Confirm created password'}
                </label>
                <input
                  {...register('passwordConfirm')}
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto bg-orange-900 text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>

          <aside className="bg-white border border-stone-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-serif text-stone-900 mb-4">
              Current information
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Email
                </dt>
                <dd className="text-stone-800 mt-1 break-words">
                  {userInformation.email}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Full name
                </dt>
                <dd className="text-stone-800 mt-1 break-words">
                  {userInformation.name}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Customer since
                </dt>
                <dd className="text-stone-800 mt-1">
                  {new Date(userInformation.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className="mt-6 bg-white border border-stone-200 rounded-lg shadow-sm p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                Security
              </p>
              <h2 className="text-lg font-serif text-stone-900">
                Log out all devices
              </h2>
              <p className="text-sm text-stone-500 mt-1 max-w-2xl">
                End every active session for this account, including this
                browser.
              </p>
              {logoutAllDevicesError && (
                <p className="text-red-600 text-sm mt-3 bg-red-50 py-2 px-3 rounded">
                  {logoutAllDevicesError}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleLogoutAllDevices}
              disabled={loggingOutAllDevices}
              className="w-full sm:w-auto border border-stone-700 text-stone-800 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingOutAllDevices ? 'Logging out...' : 'Log out all devices'}
            </button>
          </div>
        </section>

        <section className="mt-6 bg-white border border-red-100 rounded-lg shadow-sm p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-red-700 mb-2">
                Danger zone
              </p>
              <h2 className="text-lg font-serif text-stone-900">
                Remove account
              </h2>
              <p className="text-sm text-stone-500 mt-1 max-w-2xl">
                Permanently delete your account and access to your booking
                history.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenDeleteAccountModal}
              className="w-full sm:w-auto border border-red-700 text-red-700 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition"
            >
              Remove account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserSettingsPage;
