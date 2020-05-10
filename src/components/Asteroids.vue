<template>
    <div>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh; width: 100vw">
            <div class="spinner-border" role="status" style="height: 100px; width: 100px; color: black; margin-bottom: 10vh;">
                <span class="sr-only" style="color: black">Loading...</span>
            </div>
        </div>
        <main style="height: 100vh; width: 100%; overflow: hidden;" :class="{'d-none': loading}">
            <div class="search">
                    <form v-on:submit.prevent="searchPlanet">
                        <div class="search-container">
                        <input  v-model="search" id="searchBar" class="searchbar" type="text" placeholder="Search based on Asteroid ID..">
                        <a id="btnSearch" v-on:click="searchPlanet" class="btn-search"><i class="fa fa-search"></i></a>
                        </div>
                    </form>
            </div>
            <div class="row">
                <div class="col-lg-6 p-0">
                    <div class="asteroids d-flex justify-content-start">
                        <table class="asteroids__database">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Suitability</th>
                                <th scope="col">Safety</th>
                                <th scope="col">Fuel Cost</th>
                                <th scope="col">Rating</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr :key="asteroid.id" v-for="asteroid in asteroids" @click="openModal(asteroid.id)">
                                <th scope="row">{{asteroid.id}}</th>
                                <td><span class="asteroids__suitability--me">Sustainable</span></td>
                                <td><span class="asteroids__suitability--hi">Good</span></td>
                                <td><span class="asteroids__suitability--lo">High</span></td>
                                <td>7.32</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="d-flex flex-column">

                        </div>
                    </div>
                </div>
                <div class="col-lg-6 p-0">
                    <table class="asteroids__calculations">
                        <thead>
                        <th>Fuel Costs</th>
                        <th>
                            <p class="asteroids__label">Price per km without cargo<br/>( € )</p>
                            <input v-on:input="calculateFuelCost" v-model="distanceWithoutCargo" type="number" min="0" max="1000" step="1" value="0" class="asteroids__input">
                        </th>
                        <th>
                            <p class="asteroids__label">Price per km with cargo<br/>( € )</p>
                            <input v-on:input="calculateFuelCost" v-model="distanceWithCargo" type="number" min="0" max="1000" step="1" value="0" class="asteroids__input">
                        </th>
                        <th style="padding-top: 30px">
                            <p class="asteroids__label">Distance<br/>( x 100'000 km)</p>
                            <input v-on:input="calculateFuelCost" v-model="distance" type="number" min="0" step="10" value="0" class="asteroids__input" style="width: 100px">
                        </th>
                        <th style="width: 60px">
                            <p class="asteroids__label">Cost<br/>( x100'000€ )</p>
                            {{fuelCost}}
                        </th>
                        </thead>
                    </table>
                    <table class="asteroids__calculations" style="margin-top: 5vh">
                        <thead>
                        <th>Cargo Value</th>
                        <th>
                            <p class="asteroids__label">Cargo Capacity<br/>( x10'000Kg )</p>
                            <input v-on:input="calculateCargoValue" v-model="cargoCapacity" type="number" min="0" max="1000" step="1" value="0" class="asteroids__input">
                        </th>
                        <th>
                            <p class="asteroids__label">Cargo Value Per 10'000 kg<br/>( x10'000€  )</p>
                            <input v-on:input="calculateCargoValue" v-model="cargoValuePerKg" type="number" min="0" max="1000" step="1" value="0" class="asteroids__input">
                        </th>
                        <th style="width: 60px">
                            <p class="asteroids__label">Value<br/>( x100'000€ )</p>
                            {{cargoValue}}
                        </th>
                        </thead>
                    </table>
                    <table class="asteroids__calculations" style="margin-top: 5vh">
                        <thead>
                        <th>Estimated profit</th>
                        <th>
                            <p class="asteroids__label">Fuel costs<br/>( x100'000€ )</p>
                            <input v-model="fuelCostSecond" v-on:input="calculateEstimatedProfit" type="number" min="0" max="1000" step="1" value="0" class="asteroids__input">
                        </th>
                        <th>
                            <p class="asteroids__label">Cargo Value<br/>( x100'000€  )</p>
                            <input v-model="cargoValueSecond" v-on:input="calculateEstimatedProfit" type="number" min="0" max="1000" step="1" value="0" class="asteroids__input">
                        </th>
                        <th>
                            <p class="asteroids__label">Profit<br/>( x100'000€ )</p>
                            {{estimatedProfit}}
                        </th>
                        </thead>
                    </table>
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
                cargoValuePerKg: 1,
                asteroids: null,
                search: null,
                loading: true,
                errored: false,
                query: null,
                fuelCost: 20,
                fuelCostSecond: 1,
                distanceWithCargo: 1,
                distanceWithoutCargo: 1,
                distance: 10,
                cargoCapacity: 1,
                cargoValue: 0.1,
                estimatedProfit: 0,
                cargoValueSecond: 1,
                asteroid: null
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
                const style = { width: "70%", height: "70%" };
                this.$modal.show(Modal, {id: this.search, errors: this.errored}, style);
            },
            calculateFuelCost(){
                this.fuelCost = ((this.distanceWithCargo * this.distance) + (this.distanceWithoutCargo * this.distance)).toFixed(2);
            },
            calculateEstimatedProfit(){
                this.estimatedProfit = (this.cargoValueSecond - this.fuelCostSecond).toFixed(2);
            },
            calculateCargoValue(){
                this.cargoValue = ((this.cargoCapacity * this.cargoValuePerKg) * 0.1).toFixed(2);
            }
        },
        mounted () {
            Axios
                .get('https://www.asterank.com/api/asterank?query={%22price%22:{%22$gt%22:0.0}}&limit=10')
                .then(response => (
                    this.asteroids = response.data
                ))
                .catch(function () {
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },

    }
</script>