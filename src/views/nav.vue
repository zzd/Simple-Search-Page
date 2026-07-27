<template>
  <div v-if="bookmarks" id="frame-box">
    <div id="left-menu">
      <ul id="left-menu-ul">
        <li v-for="item in bookmarks" v-bind:key="item.title" :class="{selected:menu_selected===item.title}"
            @click="menu_select(item.title)">
          <a>{{ item.title }}</a></li>
      </ul>
    </div>
    <div id="right-main">
      <div v-for="elem in selectedItems" v-bind:key="elem.url">
        <a :href="elem.url" target="_blank" rel="nofollow">{{ elem.text }}</a>
        <br>{{ elem.url }}
      </div>
    </div>
  </div>
  <div v-else>数据加载中...</div>
</template>

<script>
import storage from "@/utils/storage";
import axios from "axios";

export default {
  name: "navs",
  data() {
    return {
      bookmarks: "",
      menu_selected: "",
    }
  },
  computed: {
    selectedItems() {
      const group = this.bookmarks.find(item => item.title === this.menu_selected)
      return group ? group.node : []
    }
  },
  methods: {
    menu_select(val) {
      this.menu_selected = val
    },
  },
  created() {
    const cached = storage.get("bookmarks")
    if (cached) {
      this.bookmarks = cached
      this.menu_selected = cached[0]?.title || ""
    } else {
      axios.get("./json/url.json").then(res => {
        storage.set("bookmarks", res.data)
        this.bookmarks = res.data
        this.menu_selected = res.data[0]?.title || ""
      })
    }
  }
}
</script>

<style scoped>

</style>
