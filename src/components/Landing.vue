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
                        The future is now. As we have become multiplanetary
                        species, asteroids have become an important source of vast amount of resources.<br/><br/>
                        SpaceMine is here to help you take control of the asteroid business!
                    </div>
                    <div class="row d-flex justify-content-center flex-column landing__text">
                        <div class="text-enter">
                            SpaceMine is here to help you
                        </div>
                        <div class="text-enter">take control of the asteroid business!</div>
                    </div>
                </div>
            </div>
            <div class="landing__introduction d-flex justify-content-end">
                <div>
                    <p>
                        Asteroid mining is the exploitation of raw materials from asteroids and other minor planets. As our planet struggles with resource scarcity,
                        a potential solution can be found exploring the great unknown. Metals, minerals and energy sources have been found to exist in massive quantities within our
                        solar system located on asteroids.
                    </p>
                    <span>Check out all the future opportunities <router-link class="landing__link" v-bind:to="'asteroids'"><br/>Start Here</router-link> </span>
                </div>
                <div>
                </div>
            </div>
            <div class="asteroids">
                <div class="solar_system">
                    <div>
                        <img class="earth" src="images/earth.png" alt=""/>
                    </div>
                    <div class="orbit orbit_1">
                        <h1 class="label-1 d-inline">bJ98B13T</h1>
                        <img @click="openModal('bJ98B13T')" src="images/asteroid.png" alt="" class="asteroid asteroid-1"/>
                    </div>
                    <div class="orbit orbit_2">
                        <h1 class="label-2 d-inline">bK09D45D</h1>
                        <img @click="openModal('bK09D45D')" src="images/asteroid.png" alt="" class="asteroid asteroid-2"/>
                    </div>
                    <div class="orbit orbit_3">
                        <h1 class="label-3 d-inline">bK00D08O</h1>
                        <img @click="openModal('bK00D08O')" src="images/asteroid.png" alt="" class="asteroid asteroid-3"/>
                    </div>
                    <div class="orbit orbit_4">
                        <h1 class="label-4 d-inline">a0025143</h1>
                        <img @click="openModal('a0025143')" src="images/asteroid.png" class="asteroid asteroid-4"/>
                    </div>
                    <div class="orbit orbit_5">
                        <h1 class="label-5 d-inline">bK02D03Q</h1>
                        <img @click="openModal('bK02D03Q')" src="images/asteroid.png" class="asteroid asteroid-5" alt=""/>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

    import Modal from "./Modal";

    export default {
        name: 'Landing',
        methods: {
            openModal(id) {
                this.$router.push('asteroids');
                const style = { width: "70%", height: "70%" };
                this.$modal.show(Modal, {id: id}, style);
            }
        },
    }
</script>

