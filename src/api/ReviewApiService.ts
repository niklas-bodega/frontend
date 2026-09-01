
import {reviewAxios} from './AxiosConfig.ts';
import type { CreateReviewInterface } from '../types/CreateReview.ts';

export const getAllReviewRatingsByRoomType = async () => {
  try {
    const response = await reviewAxios.get('/api/review/ratings');
    return response.data;
  } catch (error) {
    console.error('Error getting all review ratings', error);
    throw error;
  }
};

export const createReview = async (newReview : CreateReviewInterface) => {
  try {
    const response = await reviewAxios.post('/api/review', newReview);
    return response.data;
  } catch (error) {
    console.error('Error creating review', error);
    throw error;
  }
};

export const getReviewForShowcase = async () => {
  try{
    const response = await reviewAxios.get('/api/review/showcase');
    return response.data;
  } catch (error) {
    console.error('Error getting review for showcase', error);
    throw error;
  }
}