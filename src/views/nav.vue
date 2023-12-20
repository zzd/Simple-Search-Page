<template>
  <div id="frame-box">
    <div id="left-menu">
      <ul id="left-menu-ul">
        <li v-for="e in list" v-bind:key="e" :class="{selected:menu_selected===e}" @click="menu_select(e)">
          <a>{{ e }}</a></li>
      </ul>
    </div>
    <div id="right-main">
    </div>
  </div>
</template>

<script>
export default {
  name: "navs",
  data() {
    return {
      list: ["常用", "娱乐", "学习", "设计", "开发"],
      menu_selected: "",
    }
  },
  methods: {
    menu_select(val) {
      this.menu_selected = val
    },
  },
  created() {
    this.menu_selected = this.list[0]
  }
}
</script>

<style scoped>

</style>