<template>
  <form class="form" @submit="handleSubmit">
    <div class="form__input--block">
      <label for="github_username">Usuário do Github</label>
      <input
        type="text"
        name="github_username"
        id="github_username"
        v-model="github_username"
        required
      />
    </div>

    <div class="form__input--block">
      <label for="techs">Tecnologias</label>
      <input type="text" name="techs" id="techs" v-model="techs" required />
    </div>

    <div class="form__input--block">
      <label for="latitude">Latitude</label>
      <input
        type="text"
        name="latitude"
        id="latitude"
        v-model="latitude"
        required
      />
    </div>

    <div class="form__input--block">
      <label for="longitude">Longitude</label>
      <input
        type="text"
        name="longitude"
        id="longitude"
        v-model="longitude"
        required
      />
    </div>

    <button type="submit" class="form__submit">
      Salvar
    </button>
  </form>
</template>

<script>
export default {
  name: "DevForm",

  data() {
    return {
      github_username: "",
      techs: [],
      latitude: "",
      longitude: "",
    };
  },

  methods: {
    async handleSubmit(event) {
      event.preventDefault();

      const data = {
        github_username: this.github_username,
        techs: this.techs,
        latitude: this.latitude,
        longitude: this.longitude,
      };

      await this.$emit("onSubmit", data);

      this.github_username = "";
      this.techs = [];
      this.latitude = "";
      this.longitude = "";
    },

    getPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {
          timeout: 3000,
        });
      } else {
        alert("You browser dont support geolocation");
      }
    },

    onSuccess({ coords }) {
      const { latitude, longitude } = coords;
      this.latitude = latitude;
      this.longitude = longitude;
    },

    onError(error) {
      console.warn(error.message);
    },
  },

  created() {
    this.getPosition();
  },
};
</script>
