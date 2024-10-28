import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const isDarkMode = ref(false);
  const name = ref();
  const images = ref([]);

  const updateNameHandler = (nameProp) => {
    name.value = nameProp;
  };

  const updateImagesHandler = (image) => {
    images.value.push(image);
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const getImages = computed(() => images.value);

  return {
    isDarkMode,
    toggleDarkMode,
    updateNameHandler,
    updateImagesHandler,
    getImages,
  };
});
