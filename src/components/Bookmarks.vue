<template>
  <span v-if="bookmarks">
      <span v-for="bookmark in bookmarks" v-bind:key="bookmark">
        <li class="element-title"><span>{{ bookmark.title }}</span></li>
        <li v-for="elem in bookmark.node" v-bind:key="elem"><a :href="elem.url" rel="nofollow"
                                                               target="_blank">{{ elem.text }}</a></li>
      </span>
  </span>
  <span v-else>努力加载中...</span>
</template>

<script>
import storage from "@/utils/storage";
import axios from "axios";

export default {
  name: "Bookmarks",
  // props: ["bookmarks"],
  data() {
    return {
      data: "",
      bookmarks: ""
    };
  },
  created() {
    let bookmarks;
    bookmarks = storage.get("bookmarks")
    if (bookmarks) {
      this.bookmarks = bookmarks
    } else {
      let bookmarkData;
      bookmarkData = () => axios.get("./json/url.json")
      bookmarkData().then(res => {
        storage.set("bookmarks", res.data)
        this.bookmarks = res.data
      })
    }
  },
}
</script>

<style scoped>

</style>