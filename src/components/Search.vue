<template>
    <div style="color: black; font-size: 20px">
        <div v-if="loading">Loading....</div>
        <input type="text" v-model="search" placeholder="Search asteroid ID"/>
        <button v-on:click="searchPlanet">Search</button>
        {{planet}}
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: 'Search',
        data: function () {
            return {
                planet: null,
                search: null,
                loading: false,
                errored: false
            }
        },
        methods:{
            searchPlanet: function () {
                this.loading = true;
                Axios
                    .get("https://www.asterank.com/api/asterank?query={%22id%22:{%22$eq%22:%22" + this.search + "%22}}&limit=100000")
                    .then(response => {
                        this.planet = response.data;
                        // this.$router.push({ name: "Landing"})
                    })
                    .catch(function () {
                        this.errored = true
                    })
                    .finally(() => this.loading = false)
                }
            }
        }
</script>

