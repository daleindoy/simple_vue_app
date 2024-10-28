<template>
  <div class="arrays-container">
    <h2>Hello, {{ appStore.name }}!</h2>
    <label for="number" class="name-label"
      >Enter numbers (0-9) separated by commas and up to 50 elements</label
    >
    <div class="input-area">
      <input
        type="text"
        id="number"
        v-model="inputNumbers"
        class="number-input"
      />
      <button @click="submitHandler" class="submit-button">Submit</button>
    </div>

    <div class="error-message">{{ errorMessage }}</div>
    <div class="results" v-if="results.length">
      <h3>Results:</h3>
      <ul>
        <li v-for="(count, number) in sortedResults" :key="number">
          {{ count.number }} - {{ count.count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAppStore } from "@/store/appStore";

const appStore = useAppStore();
const inputNumbers = ref("");
const results = ref([]);
const errorMessage = ref();

// Function to process input and count unique numbers
const submitHandler = () => {
  errorMessage.value = "";
  results.value = [];

  // Check if the input is empty or does not contain or delimited by comma
  if (!inputNumbers.value.trim()) {
    errorMessage.value = "Input cannot be empty!";
    return;
  } else if (!inputNumbers.value.includes(",")) {
    errorMessage.value = "Input must be comma-delimited!";
    return;
  }

  const numberArray = inputNumbers.value
    .split(",")
    .map((num) => num.trim())
    .filter((num) => !isNaN(num) && num >= 0 && num <= 9)
    .map(Number); // Convert strings to numbers

  const countMap = {};
  numberArray.forEach((num) => {
    countMap[num] = (countMap[num] || 0) + 1;
  });

  results.value = Object.entries(countMap).map(([number, count]) => ({
    number: parseInt(number),
    count,
  }));
};

// Computed property to sort results
const sortedResults = computed(() => {
  return [...results.value].sort((a, b) => {
    if (b.count === a.count) {
      return b.number - a.number; // Sort by number if counts are equal
    }
    return b.count - a.count; // Sort by count
  });
});
</script>

<style scoped lang="scss">
.arrays-container {
  padding: 20px;
  border-radius: 8px;
}
.greeting {
  font-size: 24px;
  margin-bottom: 20px;
}
.error-message {
  color: red;
}
.input-area {
  gap: 10px;
  margin-bottom: 20px;

  .number-input {
    width: 50%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
    padding-right: 80px;

    &:focus {
      border-color: #4caf50;
      outline: none;
    }
  }
  .submit-button {
    padding: 8px 15px;
    margin-left: -75px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: darken(#4caf50, 10%);
    }
  }
}

.results {
  margin-top: 20px;
  h3 {
    margin: 0;
    font-size: 20px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
  }
}
</style>
