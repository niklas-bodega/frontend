import { useEffect, useState } from 'react';
import StarRating from '../../../components/StarRatingProps.tsx';
import { useShowcaseReviews } from '../../../hooks/useShowcaseReviews.tsx';

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = useShowcaseReviews();
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-24 px-8 bg-stone-100">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-orange-700 font-bold tracking-[0.2em] text-xs uppercase">
          What Our Guests Say
        </span>
        <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-12">
          Guest Stories
        </h2>

        <div
          key={currentReview.reviewId}
          className="transition-opacity duration-700 ease-in-out"
        >
          <div className="flex justify-center">
            <StarRating rating={currentReview.rating} />
          </div>
          <p className="font-serif text-xl text-stone-700 leading-relaxed my-6 italic">
            "{currentReview.comment}"
          </p>
          <p className="text-sm font-bold text-stone-800">
            {currentReview.username}
          </p>
          <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
            {currentReview.roomTypeName}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentIndex ? 'bg-orange-700' : 'bg-stone-300'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
