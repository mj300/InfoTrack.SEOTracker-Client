
<template>
  <a-layout id="layout">
    <a-layout-header class="header">
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="home">
          <router-link to="/" >SEO Tracker</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout class="main-layout">
     <router-view />
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      selectedMenu: []
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  },
  components: {
  },
};
</script>

<style lang="css" scoped>
.logo {
  max-width: 40px;
  margin: 12px 25px 12px 0;
  float: left;
}

</style>