<template>
  <div>
    <h1>Posts</h1>
    <button @click="createPost" class="create-post-btn">Create New Post</button> <!-- New Post Button -->
    <ul v-if="currentPosts.length">
      <li v-for="post in currentPosts" :key="post.id" class="post-item">
        <nuxt-link :to="`/posts/${post.id}`">{{ post.attributes.title }}</nuxt-link>
        <nuxt-link :to="`/posts/edit/${post.id}`" class="edit-btn">Edit</nuxt-link> <!-- Edit Button -->
      </li>
    </ul>
    <p v-else>Loading posts...</p>

    <!-- Pagination Controls -->
    <div class="pagination" v-if="totalPages > 1"> <!-- Only show if more than one page -->
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    {{ logPosts() }} <!-- Call the log method to log posts -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {

  data() {
    return {
      currentPage: 1,
      postsPerPage: 10, // Set the number of posts per page
      //posts: []
    }
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts; // Access posts from the store
    },
    totalPages() {
      return Math.ceil(this.posts.meta.total / this.postsPerPage); // Calculate total pages
    },
    currentPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      return this.posts.data.slice(start, start + this.postsPerPage); // Get posts for the current page
    }
  },
  methods: {
    ...mapActions(['nuxtServerInit']), // Map the action
    logPosts() {
      console.log(this.posts); // Log the posts to the console
      return null; // Return null to avoid rendering in the template
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    createPost() {
      // Logic to create a new post
      this.$router.push('/posts/new'); // Redirect to new post creation page
    }
    // async fetchPosts() {
    //   try {
    //     await this.$store.getters.getPosts;
    //     //await this.$strapiService.getPosts(); // Fetch posts from your API
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // }
  },
  created() {
    this.nuxtServerInit(); // Call the action
  }
}
</script>

<style scoped>
.create-post-btn {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-post-btn:hover {
  background-color: #0056b3;
}

.post-item {
  margin: 10px 0;
}

.edit-btn {
  margin-left: 10px;
  color: #007BFF;
  text-decoration: none;
}

.edit-btn:hover {
  text-decoration: underline;
}
</style>
