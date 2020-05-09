<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      asteroids: null
    }
  },
  mounted () {
    Axios
            .get('https://www.asterank.com/api/asterank?query={%22price%22:{%22$gt%22:0.0}}&limit=100000')
            .then(response => (this.asteroids = response.data))
  }
}
</script>

