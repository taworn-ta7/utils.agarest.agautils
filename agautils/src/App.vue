<template>
  <header>
    <h1>Agarest Utilities</h1>
  </header>

  <main>
    {{ hello }}
  </main>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: function () {
    return {
      hello: "Hello, Agarest :)"
    };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}
</style>
