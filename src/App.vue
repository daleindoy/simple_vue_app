<template>
  <div
    class="app-container"
    :class="{
      'dark-mode': appStore.isDarkMode,
      'light-mode': !appStore.isDarkMode,
    }"
  >
    <h1 class="app-title">{{ title }}</h1>
    <div class="container">
      <nav class="nav">
        <ul>
          <li @click="setCurrentComponent('Home')">Home</li>
          <li
            @click="setCurrentComponent('ILoveArrays')"
            :class="{ 'is-disabled': !appStore.name }"
          >
            I love Arrays
          </li>
          <li
            :class="{ 'is-disabled': !appStore.name }"
            @click="setCurrentComponent('RESTAPI')"
          >
            REST API
          </li>
          <li>
            <button @click="appStore.toggleDarkMode">Toggle Dark Mode</button>
          </li>
        </ul>
      </nav>

      <main class="content">
        <component :is="currentComponent"></component>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from "vue";
import { useAppStore } from "./store/appStore";

const asyncComponents = {
  Home: defineAsyncComponent(() => import("./components/Home.vue")),
  ILoveArrays: defineAsyncComponent(() =>
    import("./components/ILoveArrays.vue")
  ),
  RESTAPI: defineAsyncComponent(() => import("./components/RESTAPI.vue")),
};

const appStore = useAppStore();
const title = ref("My Vue App");
const componentToRender = ref("Home");

const currentComponent = computed(
  () => asyncComponents[componentToRender.value]
);

const setCurrentComponent = (component) => {
  componentToRender.value = component;
};

// const toggleDarkMode = () => {
//   document.body.classList.toggle("dark-mode");
// };
</script>
