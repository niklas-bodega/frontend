type StarRatingProps = {
  rating: number;
  maxStars?: number;
};

const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating.toFixed(1)} out of ${maxStars}`}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.round(rating);

        return (
          <span
            key={index}
            className={isFilled ? 'text-orange-700' : 'text-stone-300'}
          >
            ★
          </span>
        );
      })}
      <span className="ml-1 text-sm text-stone-500">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
