<template>
  <div id="app">
    <aside class="aside">
      <strong class="aside__title">Cadastrar</strong>
      <DevForm @onSubmit="handleAddDev" />
    </aside>

    <main class="app__main">
      <ul class="main__list">
        <DevItem v-for="dev in devs" :dev="dev" :key="dev._id" />
      </ul>
    </main>
  </div>
</template>

<script>
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import api from "./services/api";

export default {
  name: "App",
  components: {
    DevForm,
    DevItem,
  },

  data() {
    return {
      devs: [],
    };
  },

  methods: {
    async loadDev() {
      try {
        const response = await api.get("/dev");
        this.devs = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async handleAddDev(data) {
      try {
        const response = await api.post("/dev", data);
        this.devs = [...this.devs, response.data];
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.loadDev();
  },
};
</script>

<style lang="scss" src="./assets/css/main.scss"></style>
