<template>
  <div id="menu" :class="{ on: is_on }" @click="menu_client()"><i></i></div>
  <div :class="{ closed: !is_on }" class="list">
    <ul id="setting">
      <li :class="{ selected: menu_selected === 'bookmark' }" @click="menu_select('bookmark')"><a>书签</a></li>
      <li :class="{ selected: menu_selected === 'setting' }" @click="menu_select('setting')"><a>设置</a></li>
    </ul>
    <ul id="element">
      <span v-if="menu_selected === 'bookmark'">
        <Bookmarks :bookmarks="bookmarks"></Bookmarks>
      </span>
      <span v-else-if="menu_selected === 'setting'">
        <Setting></Setting>
      </span>
    </ul>
  </div>
  <div id="content" ref="content" @click="menu_close()">
    <div id="top-menu-list">
      <div id="tp-weather-widget"></div>
    </div>
    <RouterView />
    <div id="message"></div>
    <div id="foot">©2018-2026
      <a class="out_link" href="https://www.zhangdi.net/" rel="noopener noreferrer" target="_blank">ZHANGDI</a> 版权所有
      <a>&nbsp;</a>
      <a class="out_link beian" href="https://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">蜀ICP备18024871号</a>
      <a>&nbsp;</a>
      <a class="out_link beian" href="https://beian.mps.gov.cn/#/query/webSearch?code=51019002006069"
        rel="noopener noreferrer" target="_blank">川公网安备51019002006069号</a>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage"
import axios from "axios"
import Bookmarks from "./components/Bookmarks.vue"
import Setting from "./components/Setting.vue"
import { RouterView } from "vue-router"

export default {
  name: "Home",
  components: { Setting, Bookmarks },
  provide() {
    return {
      reloadBookmarks: this.reloadBookmarks,
      resetBookmarks: this.resetBookmarks
    }
  },
  data() {
    return {
      is_on: false,
      menu_selected: "bookmark",
      bookmarks: []
    }
  },
  methods: {
    menu_client() {
      this.is_on = !this.is_on
    },
    menu_close() {
      this.is_on = false
    },
    menu_select(val) {
      this.menu_selected = val
    },
    reloadBookmarks() {
      this.bookmarks = storage.get("bookmarks") || []
    },
    resetBookmarks() {
      storage.remove("bookmarks")
      this.loadBookmarks()
    },
    loadBookmarks() {
      const bookmarks = storage.get("bookmarks")
      if (bookmarks) {
        this.bookmarks = bookmarks
      } else {
        axios.get("./json/url.json").then(res => {
          storage.set("bookmarks", res.data)
          this.bookmarks = res.data
        }).catch(error => {
          console.error("加载书签数据失败:", error)
        })
      }
    }
  },
  created() {
    this.loadBookmarks()
  }
};
(function (window, document, scriptName, widgetName, scriptUrl) {
  const loadScript = function () {
    const script = document.createElement(scriptName)
    const firstScript = document.getElementsByTagName(scriptName)[0]
    script.src = scriptUrl
    script.charset = "utf-8"
    script.async = 1
    script.onerror = function () {
      console.error("天气组件脚本加载失败:", scriptUrl)
    }
    firstScript.parentNode.insertBefore(script, firstScript)
  }
  window["SeniverseWeatherWidgetObject"] = widgetName
  window[widgetName] = window[widgetName] || function () {
    (window[widgetName].q = window[widgetName].q || []).push(arguments)
  }
  window[widgetName].l = Date.now()
  if (window.attachEvent) {
    window.attachEvent("onload", loadScript)
  } else {
    window.addEventListener("load", loadScript, false)
  }
})(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + Math.floor(Date.now() / 100000000))

try {
  window.SeniverseWeatherWidget("show", {
    flavor: "slim",
    location: "WM6N2PM3WY2K",
    geolocation: true,
    language: "auto",
    unit: "c",
    theme: "light",
    token: import.meta.env.VITE_SENIVERSE_TOKEN,
    hover: "enabled",
    container: "tp-weather-widget"
  })
} catch (error) {
  console.error("天气组件初始化失败:", error)
}
</script>

<style lang="less">
@import "style/main";
</style>
