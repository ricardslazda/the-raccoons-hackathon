<template>
    <div>
        <div>
        <b-button v-b-toggle.sidebar-right style="top:2px,left:2px"><img src="https://img.icons8.com/ios-filled/75/000000/menu.png"/></b-button>
        <b-sidebar id="sidebar-right" title="Browse by Resource" right bg-variant="dark" text-variant="light" shadow>
        <div class="px-3 py-2">
           <router-link class="landing__link" v-bind:to="'cobalt'"><img src="../../public/images/composition/co.png" height=75px style="margin:10px"/></router-link> 
            <router-link class="landing__link" v-bind:to="'iron'"><img src="../../public/images/composition/fe.png" height=75px style="margin:10px"/></router-link> <br>
            <router-link class="landing__link" v-bind:to="'nickel'"><img src="../../public/images/composition/ni.png" height=75px style="margin:10px"/></router-link> 
            <router-link class="landing__link" v-bind:to="'nitogen'"><img src="../../public/images/composition/n.png" height=75px style="margin:10px"/></router-link> <br>
            <router-link class="landing__link" v-bind:to="'hydrogen'"><img src="../../public/images/composition/h.png" height=75px style="margin:10px"/></router-link> 
            <router-link class="landing__link" v-bind:to="'water'"><img src="../../public/images/composition/ho.png" height=75px style="margin:10px"/></router-link> <br>
            <router-link class="landing__link" v-bind:to="'platinum'"><img src="../../public/images/composition/pt.png" height=75px style="margin:10px"/></router-link> 
            <router-link class="landing__link" v-bind:to="'aluminium'"><img src="../../public/images/composition/al.png" height=75px style="margin:10px"/></router-link> <br>
            <router-link class="landing__link" v-bind:to="'ammonia'"><img src="../../public/images/composition/nh.png" height=75px style="margin:10px"/></router-link> 
            <router-link class="landing__link" v-bind:to="'nife'"><img src="../../public/images/composition/nife.png" height=75px style="margin:10px"/></router-link> <br>
            <router-link class="landing__link" v-bind:to="'fesio'"><img src="../../public/images/composition/fesio.png" height=75px style="margin:10px"/></router-link> 
            <router-link class="landing__link" v-bind:to="'mgosi'"><img src="../../public/images/composition/mgosi.png" height=75px style="margin:10px"/></router-link> 
        </div>
        </b-sidebar>
        </div>
        <main style="height: 100vh">

            <div class="asteroids d-flex justify-content-start">
                <table class="asteroids__database">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Valuation</th>
                    <th scope="col">Class</th>
                    <th scope="col">Status</th>
                    <th scope="col">Producer</th>
                    <th scope="col">Suitability</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Name</th>
                </tr>
                </thead>
                    <tbody>
                    <tr :key="asteroid.id" v-for="asteroid in asteroids">
                        <th scope="row"><a id="btnSearch" v-on:click="searchPlanet(asteroid.id)" class="btn-search">{{asteroid.id}}</a></th>
                        <td>{{asteroid.price}}</td>
                        <td><div class="btn btn-warning rounded-pill p-3">{{asteroid.spec}}</div></td>
                        <td><span class="asteroids__status--uns asteroids__status">Unsuitable</span></td>
                        <td>{{asteroid.producer}}</td>
                        <td><span class="asteroids__suitability--hi">Medium</span></td>
                        <td>{{asteroid.closeness}}</td>
                        <td>{{asteroid.full_name}}</td>
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
            searchPlanet: function (search) { 
                Axios
                    .get('http://www.asterank.com/api/asterank?query={%22id%22:{%22$eq%22:%22' + search + '%22}}&limit=1')
                    .then(response => (this.query = response.data))
                console.log(search);
                this.openModal(search);
                
            },
            openModal(search) {
                const style = { width: "70%", height: "70%" };
                this.$modal.show(Modal, {id: search}, style);
                
            }
        },
        mounted () {
            Axios
                .get('https://www.asterank.com/api/asterank?query={%22spec%22:{%22$in%22%20:%20[%22C%22,%20%22C:%22,%20%22Cb%22,%20%22Cg%22,%20%22Cgh%22,%20%22Ch%22,%20%22K%22,%20%22K:%22,%20%22B%22]}}&limit=20')
                .then(response => (this.asteroids = response.data))
                .catch(function () {
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        

    }
</script>