<template >
  <div class="asteroid-det">
    <div class="btn btn-danger mt-5 ml-5" @click="$emit('close')">X</div>
    <div>Valuation: <span>{{this.valuation}}</span></div>
    <div>Class: <span>{{this.materialType}}</span></div>
    <div>Distance to Earth: <span>{{this.distanceToEarth}}</span></div>
    <div class="data__number">
      {{this.id}}
    </div>
    <img src="../../public/images/composition/fe.png" height="75px"/>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      msg: "Asteroid Name",
      asteroid: null,
      loading: false,
      errored: false,
      valuation: null,
      materialType: null,
      weight: null,
      distanceToEarth: null
    };
  },
  props: ['id'],
  mounted() {
    this.loading = true;
    Axios
            .get("https://www.asterank.com/api/asterank?query={%22id%22:{%22$eq%22:%22" + this.id + "%22}}&limit=100000")
            .then(response => {
              this.asteroid = response.data;
              this.valuation = this.asteroid[0].price;
              this.materialType = this.asteroid[0].spec;
              this.distanceToEarth = this.asteroid[0].closeness;
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
              this.errored = "Asteroid was not found";
            })
            .finally(() => this.loading = false)
  }
};
</script>
<style>
.asteroid-det{
    background-color: rgba(00, 00, 00, 0.7);
  height: 100%;
  font-size: 2rem;
}
h1{
    color: black;
}
</style>