import { API_BASE } from '../routes/api.js';
import fetch from 'node-fetch';
import { postReview } from '../utils/reviewsUtils.js';

const cmsAdapter = {
  async loadMoviesReviews(id) {

    const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`);

    const payload = await res.json();
    return payload.data;
  },
  async postReview(review) {

    const author = review.data.author;
    const rating = review.data.rating;

       if (author && rating) {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      return res.json();
    } else {
      throw new Error('Invalid review data');
    }
},

  async fetchScreenings() {
    try {
      const response = await fetch(`${API_BASE}/screenings?populate=movie`);
      const screenings = await response.json();
      return screenings;
    } catch (error) {
      console.error('Error fetching screenings:', error);
      throw error;
    }
  },
  async fetchMovieScreenings(id) {
    const response = await fetch(`${API_BASE}/screenings?filters[movie]=${id}`);
    const payload = await response.json();
    return payload;
  }
}

export default cmsAdapter;
