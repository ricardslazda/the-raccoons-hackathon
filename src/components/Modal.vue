<template >
  <div class="asteroid-det">
    <div class="btn btn-danger mt-5 ml-5" @click="$emit('close')">X</div>
    <div>Valuation: <span>{{this.valuation}}</span></div>
    <div>Class: <span>{{this.materialType}}</span></div>
    <div>Distance to Earth: <span>{{this.distanceToEarth}}</span></div>
    <div>Estimated Profit: <span>{{this.estProfit}}</span></div>
    <div>Composition: <span>{{this.comp}}</span></div>
  <div v-if="(materialType.includes('S',0)||materialType.includes('V',0)|| materialType=='R')">
    <img src="../../public/images/composition/mgosi.png" height="150px"/>
    <img src="../../public/images/composition/fesio.png" height="150px"/>
  </div>
   <div v-if="(materialType.includes('L',0))">
    <img src="../../public/images/composition/mgosi.png" height="150px"/>
    <img src="../../public/images/composition/al.png" height="150px"/>
    <img src="../../public/images/composition/fesio.png" height="150px"/>
  </div>
   <div v-if="(materialType.includes('C',0)||materialType.includes('K',0)|| materialType=='R')">
    <img src="../../public/images/composition/ni.png" height="150px"/>
    <img src="../../public/images/composition/fe.png" height="150px"/>
    <img src="../../public/images/composition/co.png" height="150px"/>
    <img src="../../public/images/composition/ho.png" height="150px"/>
    <img src="../../public/images/composition/n.png" height="150px"/>
    <img src="../../public/images/composition/h.png" height="150px"/>
    <img src="../../public/images/composition/nh.png" height="150px"/>
  </div>
  <div v-if="(materialType.includes('X',0)&& materialType&&'Xc')">
    <img src="../../public/images/composition/ni.png" height="150px"/>
    <img src="../../public/images/composition/fe.png" height="150px"/>
    <img src="../../public/images/composition/co.png" height="150px"/>
  </div>
  <div v-if="(materialType=='Xc')">
    <img src="../../public/images/composition/ni.png" height="150px"/>
    <img src="../../public/images/composition/fe.png" height="150px"/>
    <img src="../../public/images/composition/co.png" height="150px"/>
    <img src="../../public/images/composition/pt.png" height="150px"/>
  </div>
   <div v-if="(materialType=='D')">
    <img src="../../public/images/composition/ho.png" height="150px"/>
  </div>
  <div v-if="(materialType=='T')">
    <img src="../../public/images/composition/fe.png" height="150px"/>
  </div>
  <div v-if="(materialType=='B')">
    <img src="../../public/images/composition/fe.png" height="150px"/>
    <img src="../../public/images/composition/h.png" height="150px"/>
    <img src="../../public/images/composition/nh.png" height="150px"/>
    <img src="../../public/images/composition/n.png" height="150px"/>
  </div>
  <div v-else>
    <img src="../../public/images/composition/unknown.png" height="150px"/>
  </div>
  
  
    <div class="data__number">
      {{this.id}}
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
      errored: false,
      valuation: null,
      materialType: null,
      weight: null,
      distanceToEarth: null,
      estCost: null,
      estProfit: null
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
              this.estProfit = this.asteroid[0].profit;
              if(this.asteroid[0].spec.includes('S',0)|| this.asteroid[0].spec.includes('V',0)|| this.asteroid[0].spec=='R'){
                this.comp="Magnesium Silicate, Iron Silicate";
              }
              else if(this.asteroid[0].spec.includes('L',0) ){
                this.comp="Magnesium Silicate, Alunminium, Iron Silicate";
              }
              else if(this.asteroid[0].spec.includes('C',0) || this.asteroid[0].spec.includes('K',0)){
                this.comp="Nickel, Iron, Cobalt, Water, Nitrogen, Hydrogen, Ammonia";
              }
              else if(this.asteroid[0].spec.includes('X',0) && this.asteroid[0].spec!='Xc'){
                this.comp="Nickel, Iron, Cobalt";
              }
              else if(this.asteroid[0].spec=='Xc'){
                this.comp="Platinum, Nickel, Iron, Cobalt";
              }
              else if(this.asteroid[0].spec=='D'){
                this.comp="Water";
              }
              else if(this.asteroid[0].spec=='T'){
                this.comp="Iron";
              }
              else if(this.asteroid[0].spec=='B'){
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