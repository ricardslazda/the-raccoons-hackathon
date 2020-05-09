<template>
  <div class="asteroid-det">
    <h1>{{ msg }}</h1>
    <h2>Composition</h2>
    <img src="../../public/images/composition/fe.png" height="75px"/>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      msg: "Asteroid Name"
    };
  }
};
</script>
<style>
.asteroid-det{
    background-color: rgba(00, 00, 00, 0.7);
}
h1,h2{
    color: black;
}
</style>