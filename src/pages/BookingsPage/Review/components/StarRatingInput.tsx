function StarRatingInput({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            className={`text-2xl transition ${
              isFilled ? 'text-orange-700' : 'text-stone-300'
            } hover:text-orange-500`}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
export default StarRatingInput;