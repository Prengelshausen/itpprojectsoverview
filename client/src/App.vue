<template>
  <v-app>
    <v-app-bar
      app
    >
      <div class="d-flex align-center">
        <h3>ITP PROJECTS</h3>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
