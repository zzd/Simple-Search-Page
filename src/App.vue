<template>
  <div id="menu" :class="{ on: is_on }" @click="menu_client()"><i></i></div>
  <div :class="{ closed: !is_on }" class="list">
    <ul id="setting">
      <li :class="{ selected: menu_selected === 'bookmark' }" @click="menu_select('bookmark')"><a>书签</a></li>
      <li :class="{ selected: menu_selected === 'setting' }" @click="menu_select('setting')"><a>设置</a></li>
    </ul>
    <ul id="element">
      <span v-if="menu_selected === 'bookmark'">
        <Bookmarks></Bookmarks>
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
    <div id="foot">©2018-2025
      <a class="out_link" href="https://www.zhangdi.net/" target="_blank">ZHANGDI</a> 版权所有
      <a class="out_link beian" href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备18024871号</a>
      <a>&nbsp;</a>
      <a class="out_link beian" href="https://beian.mps.gov.cn/#/query/webSearch?code=51019002006069"
        target="_blank">川公网安备51019002006069号</a>
    </div>
  </div>
</template>

<script>
import packageJson from '../package.json'
import Bookmarks from "./components/Bookmarks.vue";
import Setting from "./components/Setting.vue";
import { RouterView } from 'vue-router'

export default {
  name: "Home",
  components: { Setting, Bookmarks },
  data() {
    return {
      version: packageJson.version,
      is_on: false,
      menu_selected: "bookmark",
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
  },
};
(function (a, h, g, f, e, d, c, b) {
  b = function () {
    d = h.createElement(g);
    c = h.getElementsByTagName(g)[0];
    d.src = e;
    d.charset = "utf-8";
    d.async = 1;
    c.parentNode.insertBefore(d, c)
  };
  a["SeniverseWeatherWidgetObject"] = f;
  a[f] || (a[f] = function () {
    (a[f].q = a[f].q || []).push(arguments)
  });
  a[f].l = +new Date();
  if (a.attachEvent) {
    a.attachEvent("onload", b)
  } else {
    a.addEventListener("load", b, false)
  }
}(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10)));
window.SeniverseWeatherWidget('show', {
  flavor: "slim",
  location: "WM6N2PM3WY2K",
  geolocation: true,
  language: "auto",
  unit: "c",
  theme: "light",
  token: import.meta.env.VITE_WEATHER_TOKEN,
  hover: "enabled",
  container: "tp-weather-widget"
})
</script>

<style lang='less'>
@import "style/main";

#he-plugin-simple {
  z-index: 1;
}
</style>
