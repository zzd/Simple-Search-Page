<template>
  <div v-if="data" id="frame-box">
    <div id="left-menu">
      <ul id="left-menu-ul">
        <li v-for="e in data" v-bind:key="e.info" :class="{selected:menu_selected===e.info}"
            @click="menu_select(e.info)">
          <a>{{ e.info }}</a></li>
      </ul>
    </div>
    <div id="right-main">
      <div v-for="e in data[list[menu_selected]].data" v-bind:key="e">
        <span>{{ e.title }}</span>
        <br>{{ e.name }}
        <br>{{ e.url }}
      </div>
    </div>
  </div>
  <div v-else>
    数据加载中...
  </div>
</template>

<script>
import storage from "@/utils/storage";
import axios from "axios";

export default {
  name: "os",
  data() {
    return {
      list: {},
      menu_selected: "",
      data: "",
    }
  },
  methods: {
    menu_select(val) {
      this.menu_selected = val
    },
  },
  created() {
    let osdata;
    osdata = () => axios.get("./json/osData.json")
    osdata().then(res => {
      let i;
      for (i in res.data) {
        this.list[res.data[i].info] = i
      }
      storage.set("data", res.data)
      this.data = res.data
      this.menu_selected = this.data[0].info
    })
  },
}
</script>

<style scoped>

</style>