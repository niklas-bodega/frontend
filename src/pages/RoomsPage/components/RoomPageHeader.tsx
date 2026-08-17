const RoomPageHeader = () => {
    
    return (
      <header className="relative h-64 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2000"
          alt="Rooms"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-5xl mb-2">Our Rooms & Suites</h1>
          <p className="text-sm font-light opacity-85">
            Thoughtfully designed spaces for every kind of stay
          </p>
        </div>
      </header>
    );
    
}
export default RoomPageHeader;