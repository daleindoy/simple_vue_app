<template>
  <div class="home-container">
    <h2>Welcome to the Home page!</h2>
    <label for="name" class="name-label">Name</label>
    <input type="text" id="name" v-model="appStore.name" class="name-input" />
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/appStore";

const appStore = useAppStore();
</script>

<style scoped>
.home-container {
  padding: 20px;
  /* background-color: #f9f9f9; */
  border-radius: 8px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
}

.welcome-message {
  font-size: 24px;
  margin-bottom: 20px;
}

.name-label {
  font-size: 18px;
  margin-bottom: 8px;
  padding-right: 5px;
}

.name-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
}
</style>
