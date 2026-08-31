
import {reviewAxios} from './AxiosConfig.ts';

export const getAllReviewRatingsByRoomType = async () => {
  try {
    const response = await reviewAxios.get('/api/review/ratings');
    return response.data;
  } catch (error) {
    console.error('Error getting all review ratings', error);
    throw error;
  }
};