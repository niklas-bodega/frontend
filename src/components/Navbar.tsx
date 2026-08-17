import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = [
    { label: 'Rooms', path: '/roomspage' },
    { label: 'Bookings', path: '/myBookings', protected: true },
    { label: 'Settings', path: '/settings', protected: true },
  ];
  const authenticatedNavItems = navItems.filter(
    (item) => !item.protected || isAuthenticated,
  );

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-stone-200 sticky top-0 z-50">
      <div>
        <Link
          to="/"
          className="text-2xl font-serif font-bold tracking-tighter text-orange-900"
        >
          NIKLAS BODEGA
        </Link>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
        {authenticatedNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="hover:text-orange-700 transition cursor-pointer"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              navigate('/');
            }} // what goes here? just logout(), or more?
            className="border border-red-700 text-red-700 px-6 py-2 rounded-full text-sm font-bold hover:bg-red-50 transition"
          >
            LOGOUT
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="border border-orange-900 text-orange-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-50 transition"
          >
            LOGIN
          </button>
        )}
        <button className="bg-orange-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-800 transition">
          BOOK NOW
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
