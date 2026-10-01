import { reviewAxios } from './AxiosConfig.ts';
import type { CreateReviewInterface } from '../types/CreateReview.ts';
import type { ShowcaseReview } from '../types/ShowcaseReview.ts';

export const getAllReviewRatingsByRoomType = async (): Promise<
  Record<number, number>
> => {
  try {
    const response = await reviewAxios.get('/api/review/ratings');
    const data = response.data;
    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Unexpected response format for review ratings');
    }
    return data;
  } catch (error) {
    console.error('Error getting all review ratings', error);
    throw error;
  }
};

export const createReview = async (newReview: CreateReviewInterface) => {
  try {
    const response = await reviewAxios.post('/api/review', newReview);
    return response.data;
  } catch (error) {
    console.error('Error creating review', error);
    throw error;
  }
};

export const getReviewForShowcase = async (): Promise<ShowcaseReview[]> => {
  try {
    const response = await reviewAxios.get('/api/review/showcase');
    if (!Array.isArray(response.data)) {
      throw new Error('Unexpected response format for showcase reviews');
    }
    return response.data;
  } catch (error) {
    console.error('Error getting review for showcase', error);
    throw error;
  }
};