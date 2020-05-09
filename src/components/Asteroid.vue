<template>
    <div>
        <main class="data">
            <div class="data__hero">
                <div>Valuation: <span>{{this.valuation}}</span></div>
                <div>Class: <span>{{this.materialType}}</span></div>
                <div>Distance to Earth: <span>{{this.distanceToEarth}}</span></div>
                <div class="data__number">
                    {{this.id}}
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: 'Asteroid',
        data: function () {
            return {
                id: null,
                asteroid: null,
                loading: false,
                errored: false,
                valuation: null,
                materialType: null,
                weight: null,
                distanceToEarth: null
            }
        },

        mounted() {
            this.id = this.$route.params.id;
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
    }
</script>