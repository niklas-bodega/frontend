const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 className="text-white text-2xl font-serif font-bold mb-4">
            Niklas Bodega
          </h4>
          <p className="text-sm max-w-sm">
            An exclusive escape designed for those who appreciate the finer
            notes of life.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-xs uppercase tracking-widest md:justify-end">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Sustainability
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
      <div className="mt-16 text-center text-[10px] uppercase tracking-[0.3em] border-t border-stone-800 pt-8">
        © 2026 Niklas Bodega — Handcrafted Hospitality
      </div>
    </footer>
  );
};

export default Footer;
