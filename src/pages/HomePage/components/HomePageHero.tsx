import SearchBar from './SearchBar.tsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePageHero = () => {
  const location = useLocation();
  const state = location.state as {
    checkInDate?: string;
    checkOutDate?: string;
    adults?: number;
    children?: number;
  } | null;
  const [checkInDate, setCheckInDate] = useState(state?.checkInDate ?? '');
  const [checkOutDate, setCheckOutDate] = useState(state?.checkOutDate ?? '');
  const [adults, setAdults] = useState(state?.adults ?? 1);
  const [children, setChildren] = useState(state?.children ?? 0);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!checkOutDate || !checkInDate) return;

    const totalGuests = adults + children;
    navigate(
      `/searchpage?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&nrOfGuests=${totalGuests}&adults=${adults}&children=${children}`,
    );
  };

  return (
    <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
        alt="Luxury Hotel"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
          Rustic Luxury. <br /> Timeless Comfort.
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
          Experience the warmth of the Mediterranean at Niklas Bodega.
        </p>
        <SearchBar
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onCheckInDateChange={setCheckInDate}
          onCheckOutDateChange={setCheckOutDate}
          adults={adults}
          children={children}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          onSearch={handleSearch}
        />
      </div>
    </header>
  );
};
export default HomePageHero;
