<template>
  <div class="post-container">
    <div v-if="post" class="post-content">
      <h1 class="post-title">{{ post.attributes.title }}</h1>
      <p class="post-description">{{ post.attributes.description }}</p>
      <img
        :src="`http://localhost:1337${post.attributes.image.data.attributes.url}`"
        :alt="post.attributes.image.data.attributes.name"
        class="post-image"
      >
    </div>
    <p v-else class="loading">Loading post...</p>
    <div class="button-container">
      <button @click="goBack" class="back-button">Back to Home</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    post() {
      return this.$store.getters.getSinglePost;
    }
  },
  methods: {
    ...mapActions(['fetchSinglePost']),

    async loadPost() {
      const postId = this.$route.params.id;
      await this.fetchSinglePost(postId);
    },
    logPost() {
      console.log(this.post);
      return null;
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.loadPost();
  }
}
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-content {
  margin-bottom: 20px;
}

.post-title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.post-description {
  font-size: 1.1em;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  font-size: 1.2em;
  color: #888;
  text-align: center;
  padding: 20px;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

.back-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}
</style>
