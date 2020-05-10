<template>
    <div>
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh; width: 100vw">
            <div class="spinner-border" role="status" style="height: 100px; width: 100px; color: black; margin-bottom: 10vh;">
                <span class="sr-only" style="color: black">Loading...</span>
            </div>
        </div>
        <div>
            <b-button class="data__sidebar" v-b-toggle.sidebar-right><img src="https://img.icons8.com/ios-filled/75/000000/menu.png"/></b-button>
            <b-sidebar id="sidebar-right" title="Browse by Resource" left bg-variant="dark" text-variant="light" shadow>
                <div class="px-3 py-2" style="text-align: center; margin-top: 8vh;">
                    <img src="../../public/images/composition/co.png" height=75px style="margin:10px"/>
                    <img src="../../public/images/composition/fe.png" height=75px style="margin:10px"/> <br>
                    <img src="../../public/images/composition/ni.png" height=75px style="margin:10px"/>
                    <img src="../../public/images/composition/n.png" height=75px style="margin:10px"/> <br>
                    <img src="../../public/images/composition/h.png" height=75px style="margin:10px"/>
                    <img src="../../public/images/composition/ho.png" height=75px style="margin:10px"/> <br>
                    <img src="../../public/images/composition/pt.png" height=75px style="margin:10px"/>
                    <img src="../../public/images/composition/al.png" height=75px style="margin:10px"/> <br>
                    <img src="../../public/images/composition/nh.png" height=75px style="margin:10px"/>
                    <img src="../../public/images/composition/nife.png" height=75px style="margin:10px"/> <br>
                    <img src="../../public/images/composition/fesio.png" height=75px style="margin:10px"/>
                    <img src="../../public/images/composition/mgosi.png" height=75px style="margin:10px"/>
                </div>
                <div class="data__back">
                    <router-link :to="'/'">Home</router-link>
                </div>
            </b-sidebar>
        </div>
        <main style="height: 100vh; width: 100%; overflow: hidden;" :class="{'d-none': loading}">
            <div class="text-center mt-5 data__title">
                <h1>Asteroid Mining Analytics</h1>
            </div>
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
                            <tr :key="asteroid.asteroidID" v-for="asteroid in data" @click="openModal(asteroid.asteroidID, asteroid)">
                                <th scope="row">{{asteroid.asteroidID}}</th>

                                <td><span v-bind:class="asteroid.suitability[1]">{{asteroid.suitability[0]}}</span></td>
                                <td><span v-bind:class="asteroid.safety[1]">{{asteroid.safety[0]}}</span></td>
                                <td><span v-bind:class="asteroid.fuelCost[1]">{{asteroid.fuelCost[0]}}</span></td>
                                <td>{{asteroid.rating}}</td>
                            </tr>
                            <tr :key="asteroid.id" v-for="asteroid in asteroids">
                                <th scope="row">{{asteroid.id}}</th>
                                <td><span class="nod">No data</span></td>
                                <td><span class="nod">No data</span></td>
                                <td><span class="nod">No data</span></td>
                                <td>0.00</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="d-flex flex-column">

                        </div>
                    </div>
                </div>
                <div class="col-lg-6 p-0" style="margin-top: 18vh">
                    <p class="asteroids__advice">If we calculate the <span>FUEL COSTS</span> and <span>CARGO VALUE</span>,<br/>we can roughly estimate the <span>PROFIT</span> of each trip</p>
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
                asteroid: null,
                data: [{"_id":"5eb7b3ca45c319d5e40f2585","asteroidID":"bJ98B13T","suitability":['suitable', 'hi'],"safety":["average", 'me'],"fuelCost":["medium", 'me'],"rating":"6.78","challenges":"Weak gravitational pull makes it hard to setup a base","advantage":"Not too far away"},{"_id":"5eb7b46f45c319d5e40f2586","asteroidID":"bK02D03Q","suitability":['suitable', 'hi'],"safety":["low", 'lo'],"fuelCost":["low", 'lo'],"rating":"8.1","challenges":"Diamond surface makes it hard to mine","advantage":"Low fuel cost and high grade minerals"},{"_id":"5eb7b47645c319d5e40f2587","asteroidID":"bK00Y00A","suitability":['suitable', 'hi'],"safety":["above average", 'me'],"fuelCost":["medium", 'me'],"rating":"6.3","challenges":"Orbits far away from earth","advantage":"Safety is high and normal fuel cost"},{"_id":"5eb7b47e45c319d5e40f2588","asteroidID":"a0025143","suitability":["unsuitable","lo"],"safety":["high", 'hi'],"fuelCost":["high", 'hi'],"rating":"5.6","challenges":"Not suitable or high grade material","advantage":"Very safe process of mining"},{"_id":"5eb7b48545c319d5e40f2589","asteroidID":"bK09D45D","suitability":["unsuitable","lo"],"safety":["average", 'me'],"fuelCost":["high", 'hi'],"rating":"4.53","challenges":"Weak gravitational pull makes it hard to setup a base","advantage":"Not too far away"},{"_id":"5eb7b48b45c319d5e40f258a","asteroidID":"bK00D08O","suitability":['suitable', 'hi'],"safety":["low", 'lo'],"fuelCost":["low", 'lo'],"rating":"7.5","challenges":"Abnormally high temperatures make it difficult to mine","advantage":"Very high valuation"},{"_id":"5eb7b49245c319d5e40f258b","asteroidID":"bK00AK5E","suitability":["unsuitable","lo"],"safety":["low", 'lo'],"fuelCost":["medium", 'me'],"rating":"3.7","challenges":"Extremely far away and in close vicinity of a black hole","advantage":"Medium valuation"},{"_id":"5eb7b49845c319d5e40f258c","asteroidID":"bJ99F19N","suitability":['suitable', 'hi'],"safety":["good", 'hi'],"fuelCost":["low", 'lo'],"rating":"8.8","challenges":"Only accessible once a decade","advantage":"Very valuable, safe and doesn't take much fuel!"},{"_id":"5eb7b49f45c319d5e40f258d","asteroidID":"bK00AK5H","suitability":['suitable', 'hi'],"safety":["average", 'me'],"fuelCost":["high", 'hi'],"rating":"5.4","challenges":"Weak gravitational pull makes it hard to setup a base","advantage":"Medium value"},{"_id":"5eb7b4a645c319d5e40f258e","asteroidID":"bJ99D02Y","suitability":["unsuitable","lo"],"safety":["average", 'me'],"fuelCost":["low", 'lo'],"rating":"7.4","challenges":"Very unstable and can break on mining","advantage":"Mostly made of gold and thus extremely valuable"}],
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
            openModal(id, data) {
                if (id){
                    this.search = id;
                }
                const style = { width: "70%", height: "70%" };
                this.$modal.show(Modal, {id: this.search, errors: this.errored, moreData: data}, style);
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