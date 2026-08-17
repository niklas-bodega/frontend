const SearchDateField = ({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
}) => {
  return (
    <div className="flex-1 text-left min-w-[150px]">
      <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
        {label}
      </label>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none"
      />
    </div>
  );
};

export default SearchDateField;
