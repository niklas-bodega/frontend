import { useEffect, useState } from 'react';
import { getAllReviewRatingsByRoomType } from '../api/ReviewApiService.ts';

export const useRatingsByRoomType = () => {
  const [ratingsByRoomType, setRatingsByRoomType] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    getAllReviewRatingsByRoomType()
      .then(setRatingsByRoomType)
      .catch((error) => console.error('Failed to load ratings', error));
  }, []);

  return ratingsByRoomType;
};
