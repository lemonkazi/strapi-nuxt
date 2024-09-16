<template>
  <div class="container">
    <h1 class="title">Update Post</h1>
    <form @submit.prevent="updatePost" v-if="post" class="form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" v-model="post.title" required class="input" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="post.description" required class="textarea"></textarea>
      </div>
      <div class="votes">
        <label for="votes">Votes: {{ post.votes }}</label>
      </div>
      <button type="submit" :disabled="isSubmitting" class="button">Update Post</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="message">{{ message }}</p>

    <div class="voteButton">
      <button @click="vote" :disabled="isVoting || hasVotedRecently" class="vote-button">Vote</button>
    </div>
    <div class="back-button-container">
      <button @click="goBack" class="back-button">Back to Home</button>
    </div>

  </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default {
  data() {
    return {
      post: null,
      isSubmitting: false,
      isVoting: false,
      error: null,
      message: null,
      userIdentifier: null,
      hasVotedRecently: false
    }
  },
  async mounted() {
    // Generate a user identifier
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    this.userIdentifier = result.visitorId

    // Fetch the post data
    await this.fetchPost()

    // Check if the user has voted recently
    this.checkRecentVote()
  },
  methods: {
    async fetchPost() {
      try {
        const postId = this.$route.params.id // Assuming you're using vue-router
        const response = await this.$strapiService.getPost(postId)
        this.post = response.data.attributes
      } catch (error) {
        console.error('Error fetching post:', error)
        this.error = "Failed to load the post. Please try again."
      }
    },
    async updatePost() {
      this.isSubmitting = true
      this.error = null
      this.message = null
      try {
        const updatedData = {
          title: this.post.title,
          description: this.post.description,
        }
        await this.$strapiService.updatePost(this.$route.params.id, updatedData)
        this.message = "Post updated successfully!"
      } catch (error) {
        console.error('Error updating post:', error)
        this.error = "Failed to update the post. Please try again."
      } finally {
        this.isSubmitting = false
      }
    },
    async vote() {
      this.isVoting = true
      this.error = null
      this.message = null
      try {
        const response = await this.$strapiService.votePost(this.$route.params.id, this.userIdentifier)
        console.log('response');
        console.log(response);
        if (response.votes > this.post.votes) {
          this.post.votes = response.votes
          this.message = "Vote recorded successfully!"
          this.hasVotedRecently = true
          localStorage.setItem(`lastVote_${this.$route.params.id}`, Date.now().toString())
        } else {
          this.error = "You can only vote once every 24 hours."
        }
      } catch (error) {
        console.error('Error voting:', error)
        this.error = "Failed to record your vote. Please try again."
      } finally {
        this.isVoting = false
      }
    },
    checkRecentVote() {
      const lastVoteTime = localStorage.getItem(`lastVote_${this.$route.params.id}`)
      if (lastVoteTime) {
        const timeSinceLastVote = Date.now() - parseInt(lastVoteTime)
        this.hasVotedRecently = timeSinceLastVote < 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.input, .textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.textarea {
  height: 100px;
}
.voteButton {
  margin: 0 auto;
  padding-top: 10px;
}
.vote-button {
  margin: 0 auto;
  display: flex;
}
.button, .vote-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:disabled, .vote-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button:hover:not(:disabled), .vote-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

.message {
  color: green;
  margin-top: 10px;
}

</style>
