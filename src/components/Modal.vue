<template >
  <div class="asteroid-det">
    <div class="data__close" @click="$emit('close')">X</div>
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100%">
      <div class="spinner-border" role="status" style="height: 100px; width: 100px">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div :class="{'d-none': loading}" class="h-100">
      <div v-if="!errored" class="h-100">
        <div class="row h-100" >
          <div class="col-lg-6 h-100">
            <div class="data__information">
            </div>
            <div class="data__number">
              {{this.id}}
            </div>
          </div>
          <div class="col-lg-6 h-100 data__image">
            <div class="h-100">
              <img src="images/asteroid-background.jpg" alt="" class="h-100 w-100">
            </div>
            <div class="data__elements">
              <img src="../../public/images/composition/fe.png" class="mr-2"/>
              <img src="../../public/images/composition/al.png" class="mr-2"/>
              <img src="../../public/images/composition/co.png" class="mr-2"/>
              <img src="../../public/images/composition/h.png"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="data__error d-flex justify-content-center align-items-center" style="height: 82vh">
          <div>
            {{errored}}
          </div>
        </div>
      </div>
    </div>
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
      valuation: null,
      materialType: null,
      weight: null,
      distanceToEarth: null
    };
  },
  props: ['id', 'errored'],
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
    background-color: gainsboro;
    height: 100%;
    font-size: 2rem;
}
</style>