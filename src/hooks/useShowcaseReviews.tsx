import { useEffect, useState } from 'react';
import { getReviewForShowcase, } from '../api/ReviewApiService.ts';
import type { ShowcaseReview } from '../types/ShowcaseReview.ts';


export const useShowcaseReviews = () => {
  const [showcaseReviews, setShowcaseReviews] = useState<ShowcaseReview[]>([]);
  
  useEffect(() => {
    getReviewForShowcase()
      .then(setShowcaseReviews)
      .catch((error) => console.error('Failed to load showcaseReviews', error));
  },[]);

  return showcaseReviews;
}