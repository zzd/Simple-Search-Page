<template>
  <div id="logo"><a href="/"><img alt="简洁导航" src="../assets/img/simple-so.svg"> </a></div>

  <div v-if="engines" id="site-main">
    <div id="search-bar">
      <div id="container">
        <div id="headline-content">
          <div id="search-tab">
            <span v-for="engine_name in engine_names" :key="engine_name"
                  :class="{active: get_search_engine() === engine_name}"
                  @click="set_search_engine(engine_name)">{{ engines[engine_name][3] }}</span>
          </div>
          <form id="search-form" ref="search_form" :action="engines[search_engine][0]" rel="noopener noreferrer" target="_blank">
            <input id="search-keyword" v-model="keyword" :name="engines[search_engine][1]"
                   :placeholder="engines[search_engine][2]"
                   autocomplete="off" autofocus class="float-left" type="search"
                   @blur="blur()" @focus="focus()" @input="get_hot_keyword()" @keydown.down="down()"
                   @keydown.prevent.up="up()">
            <input id="search-form-submit" class="float-right" type="submit" value="搜索">
          </form>
          <div id="search-hot" :style="search_hot_display">
            <ul>
              <li v-for="(key, index) in keywords" :key="key" :class="{selected: key_selected === index}"
                  @click="go_submit(key)">
                <span :class="'search_index' + index">{{ index + 1 }}</span>{{ key }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import storage from "@/utils/storage"
import fetchJsonp from "fetch-jsonp"

export default {
  name: "Home",
  data() {
    return {
      search_engine: "",
      engines: "",
      engine_names: "",
      keyword: "",
      keywords: [],
      key_selected: -1,
      search_hot_display: "display: none"
    }
  },
  created() {
    const cachedEngines = storage.get("engines")
    if (cachedEngines) {
      this.engines = cachedEngines
      this.engine_names = cachedEngines["list"]
      this.set_search_engine(storage.get("search_engine") || this.engine_names[0])
    } else {
      axios.get("./json/search_engine.json").then(res => {
        storage.set("engines", res.data)
        this.engines = res.data
        this.engine_names = res.data["list"]
        this.set_search_engine(this.engine_names[0])
      }).catch(error => {
        console.error("加载搜索引擎配置失败:", error)
      })
    }
  },
  methods: {
    set_search_engine(engine) {
      storage.set("search_engine", engine)
      this.search_engine = engine
    },
    get_search_engine() {
      return storage.get("search_engine")
    },
    get_hot_keyword() {
      if (this.keyword === "") {
        this.keywords = []
        return
      }
      if (this.keyword !== "0") {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const api = "https://www.baidu.com/su?wd=" + this.keyword
          fetchJsonp(api, {
            jsonpCallback: "cb"
          })
            .then(response => response.json())
            .then(data => {
              this.keywords = data.s || []
            })
            .catch(error => {
              console.error("获取搜索热词失败:", error)
              this.keywords = []
            })
        }, 50)
      } else {
        this.keywords = []
      }
    },
    go_submit(val) {
      this.keyword = val
      this.$refs.search_form.submit()
    },
    down() {
      this.key_selected = (this.key_selected + 1) % this.keywords.length
      this.keyword = this.keywords[this.key_selected]
    },
    up() {
      this.key_selected = (this.key_selected - 1 + this.keywords.length) % this.keywords.length
      this.keyword = this.keywords[this.key_selected]
    },
    blur() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.search_hot_display = "display: none"
        this.key_selected = -1
      }, 100)
    },
    focus() {
      this.search_hot_display = "display: block"
      this.key_selected = -1
      this.get_hot_keyword()
    }
  }
}
</script>
<style lang="less">
@import "../style/search";
</style>
