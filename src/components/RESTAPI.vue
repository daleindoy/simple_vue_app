<template>
  <div class="image-gallery">
    <h2>Hello, {{ appStore.name }}</h2>
    <div class="grid">
      <img
        v-for="(image, index) in appStore.getImages"
        :key="index"
        :src="image"
        alt="Dog Image"
      />
    </div>
    <button @click="fetchImages" :disabled="isLoading">
      New Images {{ isLoading ? "..." : "" }}
    </button>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/appStore";
import { ref } from "vue";

const appStore = useAppStore();
const isLoading = ref(true);

// Function to fetch images from the API
const fetchImages = async () => {
  let count = 0;
  while (count < 6) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    appStore.updateImagesHandler(data.message);
    count++;
  }
  isLoading.value = false;
};

// Fetch initial set of images
fetchImages();
</script>

<style scoped>
.image-gallery {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 20px auto;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      object-fit: cover;
    }
  }
}
</style>
