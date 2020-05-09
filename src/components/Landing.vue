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
        </main>
    </div>
</template>

<script>

    export default {
        name: 'Landing',
    }
</script>

