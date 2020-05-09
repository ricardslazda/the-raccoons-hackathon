<template>
    <div>
        <main style="height: 100vh">
            <div class="search">
                <div class="search-container">
                    <input  v-model="search" id="searchBar" class="searchbar" type="text" placeholder="Search based on Asteroid ID..">
                    <a id="btnSearch" v-on:click="searchPlanet" class="btn-search"><i class="fa fa-search"></i></a>
                </div>
            </div>
            <div class="asteroids d-flex justify-content-start">
                <table class="asteroids__database">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Valuation</th>
                    <th scope="col">Class</th>
                    <th scope="col">Status</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Suitability</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Name</th>
                </tr>
                </thead>
                    <tbody>
                    <tr :key="asteroid.id" v-for="asteroid in asteroids">
                        <th scope="row">{{asteroid.id}}</th>
                        <td>{{asteroid.price}}</td>
                        <td><div class="btn btn-warning rounded-pill p-3">X</div></td>
                        <td><span class="asteroids__status--uns asteroids__status">Unsuitable</span></td>
                        <td>>Abdim</td>
                        <td><span class="asteroids__suitability--hi">Medium</span></td>
                        <td>{{asteroid.closeness}}</td>
                        <td>{{asteroid.name}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="d-flex flex-column">

                </div>
            </div>
        </main>
    </div>
</template>

<script>

    import Axios from "axios";

    export default {
        name: 'Landing',
        data: function () {
            return {
                asteroids: null,
                search: null,
                loading: true,
                errored: false
            }
        },
        methods:{
            searchPlanet: function () {
                this.loading = true;
                this.$router.push({ name: "asteroid", params: {id: this.search}});
            }
        },
        mounted () {
            Axios
                .get('https://www.asterank.com/api/asterank?query={%22price%22:{%22$gt%22:0.0}}&limit=7')
                .then(response => (this.asteroids = response.data))
                .catch(function () {
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
</script>