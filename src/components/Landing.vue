<template>
    <div>
        <div class="stars"></div>
        <div class="twinkling"></div>
        <main>
            <div class="landing__logo">
                <img src="images/logo.png" alt=""/>
            </div>
            <div class="landing__hero">
                <div class="landing__number">
                    00001
                </div>
                <div class="container landing">
                    <div class="landing__intro">
                        Without a doubt, outer space is the future. We will become multiplanetary
                        species. Asteroids hold a vast amount of resources. <br/><br/>
                        SpaceMine is here to help you jump-start your multiplanetary life!
                    </div>
                    <div class="row d-flex justify-content-center flex-column landing__text">
                        <div class="text-enter">
                            We help you
                        </div>
                        <div class="text-enter">mine the right asteroids</div>
                    </div>
                </div>
            </div>
            <div class="asteroids">
                <div class="showcase d-flex">
                    <div>
                        <p class="showcase__statement">
                            5 Closest <br/> asteroids to earth
                        </p>
                        <ul class="showcase__list">
                            <li class="showcase__list-item">
                                <p>23323235</p>
                                <div>
                                    <img src="images/asteroid.png" alt="" class="showcase__asteroid"/>
                                </div>
                            </li>
                            <li class="showcase__list-item">
                                <p>23323235</p>
                                <div>
                                    <img src="images/asteroid.png" alt="" class="showcase__asteroid"/>
                                </div>
                            </li >
                            <li class="showcase__list-item">
                                <p>23323235</p>
                                <div>
                                    <img src="images/asteroid.png" alt="" class="showcase__asteroid"/>
                                </div>
                            </li>
                            <li class="showcase__list-item">
                                <p>23323235</p>
                                <div>
                                    <img src="images/asteroid.png" alt="" class="showcase__asteroid"/>
                                </div>
                            </li>
                            <li class="showcase__list-item">
                                <p>23323235</p>
                                <div>
                                    <img src="images/asteroid.png" alt="" class="showcase__asteroid"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="solar_system">
                    <div>
                        <img class="earth" src="images/earth.png" alt=""/>
                    </div>
                    <div class="orbit orbit_1">
                        <h1 class="label-1 d-inline">Ryugu</h1>
                        <img src="images/asteroid.png" alt="" class="asteroid asteroid-1"/>
                    </div>
                    <div class="orbit orbit_2">
                        <h1 class="label-2 d-inline">1989 ML</h1>
                        <img src="images/asteroid.png" alt="" class="asteroid asteroid-2"/>
                    </div>
                    <div class="orbit orbit_3">
                        <h1 class="label-3 d-inline">Nereus</h1>
                        <img src="images/asteroid.png" alt="" class="asteroid asteroid-3"/>
                    </div>
                    <div class="orbit orbit_4">
                        <h1 class="label-4 d-inline">Bennu</h1>
                        <img src="images/asteroid.png" class="asteroid asteroid-4"/>
                    </div>
                    <div class="orbit orbit_5">
                        <h1 class="label-5 d-inline">Didymos</h1>
                        <img src="images/asteroid.png" class="asteroid asteroid-5" alt=""/>
                    </div>
                </div>
            </div>
            <div class="search">
                    <div class="search-container">
                        <input  v-model="search" id="searchBar" class="searchbar" type="text" placeholder="Search for Asteroid ID...">
                        <a id="btnSearch" v-on:click="searchPlanet" class="btn-search"><i class="fa fa-search"></i></a>
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
                .get('https://www.asterank.com/api/asterank?query={%22price%22:{%22$gt%22:0.0}}&limit=100000')
                .then(response => (this.asteroids = response.data))
                .catch(function () {
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
</script>

