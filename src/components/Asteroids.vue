<template>
    <div>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh; width: 100vw">
            <div class="spinner-border" role="status" style="height: 100px; width: 100px; color: black; margin-bottom: 10vh;">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <main style="height: 100vh" :class="{'d-none': loading}">
            <div class="search">
                    <form v-on:submit.prevent="searchPlanet">
                        <div class="search-container">
                        <input  v-model="search" id="searchBar" class="searchbar" type="text" placeholder="Search based on Asteroid ID..">
                        <a id="btnSearch" v-on:click="searchPlanet" class="btn-search"><i class="fa fa-search"></i></a>
                        </div>
                    </form>
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
                    <tr :key="asteroid.id" v-for="asteroid in asteroids" @click="openModal(asteroid.id)">
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
    import Modal from "./Modal";

    export default {
        name: 'Landing',
        data: function () {
            return {
                asteroids: null,
                search: null,
                loading: true,
                errored: false,
                query: null
            }
        },
        methods:{
            searchPlanet: function () {
                Axios
                    .get('http://www.asterank.com/api/asterank?query={%22id%22:{%22$eq%22:%22' + this.search + '%22}}&limit=1')
                    .then(response => (this.query = response.data))
                    .catch(error => {
                        this.errored = error;
                    this.errored = true
                })
                    .finally(() => this.loading = false);
                this.openModal();
            },
            openModal(id) {
                if (id){
                    this.search = id;
                }
                const style = { width: "85%", height: "85%" };
                this.$modal.show(Modal, {id: this.search, errors: this.errored}, style);
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
        },

    }
</script>