<template>
  <span v-if="bookmarks && bookmarks.length">
      <span v-for="bookmark in bookmarks" :key="bookmark.title">
        <li class="element-title"><span>{{ bookmark.title }}</span></li>
        <li v-for="elem in bookmark.node" :key="elem.text">
          <a :href="elem.url" rel="noopener noreferrer nofollow" target="_blank">{{ elem.text }}</a>
        </li>
      </span>
  </span>
  <span v-else>努力加载中...</span>
</template>

<script>
export default {
  name: "Bookmarks",
  props: ["bookmarks"]
}
</script>

<style scoped>

</style>