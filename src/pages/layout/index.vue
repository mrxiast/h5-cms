<template>
  <div :class="{navCollapsed:isSidebarNavCollapse}">
    <sidebarNav class="sidebar" />
    <div class="main-container">
      <TopAside />
      <el-card class="elCardMargin">
        <router-view></router-view>
      </el-card>
    </div>
  </div>
</template>

<script>
import TopAside from "./component/top-aside";
import sidebarNav from "./component/sidebar-nav";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isSidebarNavCollapse"])
  },
  components: {
    TopAside,
    sidebarNav
  }
};
</script>
