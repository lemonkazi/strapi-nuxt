<template>
  <div class="post-creation">
    <h1>Create Post</h1>
    <form @submit.prevent="submitPost" class="post-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" v-model="post.title" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="post.description" required class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image Upload:</label>
        <input type="file" @change="handleFileUpload" accept="image/*" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Save Post</button>
    </form>
    <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" class="image-preview" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        description: '',
        image: null
      },
      imagePreview: null
    }
  },
  methods: {

    handleFileUpload(event) {
      const file = event.target.files[0];
      this.post.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    async submitPost() {
      try {
        // First, upload the image
        let imageId = null;
        if (this.post.image) {
          const formData = new FormData();
          formData.append('files', this.post.image);
          const uploadResponse = await this.$strapiService.uploadFile(formData);
          imageId = uploadResponse[0].id; // Assuming the response contains the uploaded file info
        }



        // Then, create the post with the image reference
        const postData = {
          title: this.post.title,
          description: this.post.description,
          image: imageId // This should now be the ID of the uploaded image
        };

        await this.$strapiService.createPost(postData);
        this.$router.push('/'); // Redirect to the posts list after saving
      } catch (error) {
        console.error('Error saving post:', error);
      }
    }
  }
}
</script>

<style scoped>
.post-creation {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.post-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.image-preview {
  max-width: 200px;
  margin-top: 10px;
}
</style>
