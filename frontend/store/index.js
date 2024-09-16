export const state = () => ({
  posts: [], // Added state property to hold posts
  post: null, // Added state property to hold a single post
});

export const mutations = {
  SET_DATA(state, data) { // Added mutation to set posts data
    state.posts = data;
  },
  SET_SINGLE_POST(state, data) { // Added mutation to set a single post
    state.post = data;
  },
  ADD_POST(state, post) { // New mutation to add a post
    state.posts.push(post);
  },
  // Your mutations
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit }) {
    // Perform your server-side logic here
    console.log("nuxtServerInit called");
    // Example: Fetch data and commit to the store
    const data = await this.$strapiService.getPosts(); // Fetch data using the injected strapiService
    commit('SET_DATA', data); // Commit the fetched data to the store
  },
  // Other actions can be defined here

  async fetchSinglePost({ commit }, postId) { // New action to fetch a single post
    try {
      const data = await this.$strapiService.getPost(postId);
      //console.log('data', data);
      commit('SET_SINGLE_POST', data.data); // Commit the fetched single post data to the store
      //commit('SET_DATA', [data]); // Commit the fetched single post data to the store
    } catch (error) {
      console.error('Error fetching single post:', error); // Handle errors
    }
  },
  async createPost({ commit }, postData) { // New action to create a post
    try {
      const data = await this.$strapiService.createPost(postData);
      commit('ADD_POST', data); // Commit the new post to the store
    } catch (error) {
      console.error('Error creating post:', error);
    }
  },
};

export const getters = {
  getPosts(state) { // Getter to access posts data
    return state.posts; // Return the posts from the state
  },
  getSinglePost(state) { // Getter to access a single post
    return state.post; // Return the first post from the posts array
  },
  // Your other getters
};
