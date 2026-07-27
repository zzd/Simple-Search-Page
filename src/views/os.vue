<template>
  <div v-if="data" id="frame-box">
    <div id="left-menu">
      <ul id="left-menu-ul">
        <li v-for="e in data" :key="e.info" :class="{selected:menu_selected===e.info}"
            @click="menu_select(e.info)">
          <a>{{ e.info }}</a></li>
      </ul>
    </div>
    <div id="right-main">
      <div v-for="e in currentData" :key="e.url">
        <span>{{ e.title }}</span>
        <br><a :href="e.url" rel="noopener noreferrer" target="_blank">{{ e.name }}</a>
        <br><a :href="e.url" rel="noopener noreferrer" target="_blank">{{ e.url }}</a>
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
      data: null,
    }
  },
  computed: {
    currentData() {
      const index = this.list[this.menu_selected]
      if (index === undefined || !this.data[index]) {
        return []
      }
      return this.data[index].data || []
    }
  },
  methods: {
    menu_select(val) {
      this.menu_selected = val
    },
  },
  created() {
    axios.get("./json/osData.json").then(res => {
      const list = {}
      res.data.forEach((item, index) => {
        list[item.info] = index
      })
      this.list = list
      storage.set("osData", res.data)
      this.data = res.data
      this.menu_selected = res.data[0]?.info || ""
    }).catch(error => {
      console.error("加载 OS 数据失败:", error)
    })
  },
}
</script>

<style scoped>

</style>
