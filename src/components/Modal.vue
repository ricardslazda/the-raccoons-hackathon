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
          <div class="col-lg-12 h-100 data__container">
            <div class="data__information">
              <div class="mb-5">
                <p>Made of <span style="font-weight: 600;">{{this.comp}}</span></p>
              </div>
              <div class="mb-5">Possible Challenges: <span style="font-weight: 600;">{{this.moreData.challenges}}</span></div>
              <div>Advantages: <span style="font-weight: 600;">{{this.moreData.advantage}}</span></div>
            </div>
            <div class="data__number">
              {{this.id}}
            </div>
            <div class="data__class">
              {{this.materialType}}
            </div>
            <div class="data__value">
              <p>Estimated Value <span>{{this.valuation}}€</span></p>
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
      distanceToEarth: null,
      comp:null,
    };
  },
  props: ['id', 'errored', 'moreData'],
  mounted() {
    this.loading = true;
    Axios
            .get("https://www.asterank.com/api/asterank?query={%22id%22:{%22$eq%22:%22" + this.id + "%22}}&limit=100000")
            .then(response => {
              this.asteroid = response.data;
              this.valuation = this.asteroid[0].price;
              this.materialType = this.asteroid[0].spec;
              this.distanceToEarth = this.asteroid[0].closeness;
              if(this.asteroid[0].spec.includes('S',0)|| this.asteroid[0].spec.includes('V',0)|| this.asteroid[0].spec==='R'){
                this.comp="Magnesium Silicate, Iron Silicate";
              }
              else if(this.asteroid[0].spec.includes('L',0) ){
                this.comp="Magnesium Silicate, Alunminium, Iron Silicate";
              }
              else if(this.asteroid[0].spec.includes('C',0) || this.asteroid[0].spec.includes('K',0)){
                this.comp="Nickel, Iron, Cobalt, Water, Nitrogen, Hydrogen, Ammonia";
              }
              else if(this.asteroid[0].spec.includes('X',0) && this.asteroid[0].spec!=='Xc'){
                this.comp="Nickel, Iron, Cobalt";
              }
              else if(this.asteroid[0].spec==='Xc'){
                this.comp="Platinum, Nickel, Iron, Cobalt";
              }
              else if(this.asteroid[0].spec==='D'){
                this.comp="Water";
              }
              else if(this.asteroid[0].spec==='T'){
                this.comp="Iron";
              }
              else if(this.asteroid[0].spec==='B'){
                this.comp="Iron, Hydrogen, Ammonia, Nitrogen";
              }
              else{
                this.comp="Unknown";
              }
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
              this.errored = "Asteroid was not found";
            })
            .finally(() => this.loading = false)
  },
};
</script>
<style>
.asteroid-det{
    background-color: gainsboro;
    height: 100%;
    font-size: 2rem;
}
</style>