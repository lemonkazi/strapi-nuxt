import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default ($axios, $strapi) => ({
  async getPosts() {
    try {
      //console.log('getPosts', $strapi);
      const response = await $axios.$get('/api/posts', {
        headers: {
          Authorization: `Bearer 44fbe684098619fb861240655ac1fc7e3d8a5f2933a7b20f1f3c3f2de351208289e5e879b96a442c53fa005069d1d5c7c3231589f67f50861c75d59b7cd6d01e94b8f937012d55e26b5f4dc300554ad238309893e46026c7337436184391756685d8ad6fd59e99226152afb89cb07ce61b930bb19959e9c04e9d8c2e1a808ac4` // Use the token from .env
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  async getPost(id) {
    try {
      const response = await $axios.$get('/api/posts/'+id+'?fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=votes&populate[image][fields][0]=name&populate[image][fields][1]=url', {
      //await $strapi.findOne('posts', id, {
        headers: {
          Authorization: `Bearer 44fbe684098619fb861240655ac1fc7e3d8a5f2933a7b20f1f3c3f2de351208289e5e879b96a442c53fa005069d1d5c7c3231589f67f50861c75d59b7cd6d01e94b8f937012d55e26b5f4dc300554ad238309893e46026c7337436184391756685d8ad6fd59e99226152afb89cb07ce61b930bb19959e9c04e9d8c2e1a808ac4` // Use the token from .env
        }
      });
      return response;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  },
  async createPost(postData) {
    try {
      const response = await $axios.$post('/api/posts', {
        data: postData
      }, {
        headers: {
          Authorization: `Bearer 44fbe684098619fb861240655ac1fc7e3d8a5f2933a7b20f1f3c3f2de351208289e5e879b96a442c53fa005069d1d5c7c3231589f67f50861c75d59b7cd6d01e94b8f937012d55e26b5f4dc300554ad238309893e46026c7337436184391756685d8ad6fd59e99226152afb89cb07ce61b930bb19959e9c04e9d8c2e1a808ac4` // Use the token from .env
        }
      });
      return response.data; // Return the created post data
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  async uploadFile(formData) {
    const response = await $axios.$post(`/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer 44fbe684098619fb861240655ac1fc7e3d8a5f2933a7b20f1f3c3f2de351208289e5e879b96a442c53fa005069d1d5c7c3231589f67f50861c75d59b7cd6d01e94b8f937012d55e26b5f4dc300554ad238309893e46026c7337436184391756685d8ad6fd59e99226152afb89cb07ce61b930bb19959e9c04e9d8c2e1a808ac4` // Use the token from .env
      }
    });
    return response;
  },
  async updatePost(id, postData) {
    try {
      const response = await $axios.$put(`/api/posts/${id}`, { data: postData }, {
        headers: {
          Authorization: `Bearer 44fbe684098619fb861240655ac1fc7e3d8a5f2933a7b20f1f3c3f2de351208289e5e879b96a442c53fa005069d1d5c7c3231589f67f50861c75d59b7cd6d01e94b8f937012d55e26b5f4dc300554ad238309893e46026c7337436184391756685d8ad6fd59e99226152afb89cb07ce61b930bb19959e9c04e9d8c2e1a808ac4` // Use the token from .env
        }
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },
  async votePost(id, userIdentifier) {
    try {
      const response = await $axios.$post(`/api/posts/${id}/vote`, { userIdentifier }, {
        headers: {
          Authorization: `Bearer 44fbe684098619fb861240655ac1fc7e3d8a5f2933a7b20f1f3c3f2de351208289e5e879b96a442c53fa005069d1d5c7c3231589f67f50861c75d59b7cd6d01e94b8f937012d55e26b5f4dc300554ad238309893e46026c7337436184391756685d8ad6fd59e99226152afb89cb07ce61b930bb19959e9c04e9d8c2e1a808ac4` // Use the token from .env
        }
      })
      return response;
    } catch (error) {
      this.handleError(error);
    }
  },

  handleError(error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
});
