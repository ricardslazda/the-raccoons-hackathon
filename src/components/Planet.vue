<template>
    <div>
        {{this.planet}}
    </div>
</template>

<script>
    export default {
        name: 'Planet',
        data: function () {
            return {
                planet: null,
                name : null,
                valuation: null,
                materials: null,
                weight: null

            }
        },

        mounted() {
            this.planet= this.$route.params.planet;
        }
    }
</script>

