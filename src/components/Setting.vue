<template>
  <li class="element-title"><span>自定义书签</span></li>
  <li><a @click="download_json()">备份Json</a></li>
  <li><label for="files"><a>上传Json</a></label></li>
  <input id="files" ref="refFile" style="display: none" type="file" @change="upload_json">
  <li><a @click="recover_json()">恢复默认</a></li>

  <li class="element-title"><span>关于本项目</span></li>
  <div>
    <p style="color: red">无云端功能，本次构建版本为v3.0.1。</p>
    <h4>作者：</h4>
    <p>ZhangDi，https://git.io/zd，<br>群 1065753778</p>
    <h4>项目介绍：</h4>
    <p>本项目使用Vue3构建，推荐使用Chrome内核浏览器。</p>
    <h4>项目地址：</h4>
    <p>https://github.com/zzd/Simple-Search-Page</p>
    <h4>BUG反馈：</h4>
    <a href="https://github.com/zzd/Simple-Search-Page/issues/new/choose" rel="noopener noreferrer" target="_blank">Github issues</a>
    <h4>版权声明：</h4>
    <p>本项目开源。</p>
  </div>
</template>

<script>
import storage from "@/utils/storage"

export default {
  name: "Setting",
  inject: ["reloadBookmarks", "resetBookmarks"],
  data() {
    return {
      data: "",
      setting: ""
    }
  },
  methods: {
    download_json() {
      const jsonData = storage.get("bookmarks")
      const blob = new Blob([JSON.stringify(jsonData, null, 4)], { type: "application/json" })
      const element = document.createElement("a")
      element.href = URL.createObjectURL(blob)
      element.setAttribute("download", "bookmarks.json")
      element.style.display = "none"
      element.click()
      URL.revokeObjectURL(element.href)
    },
    upload_json() {
      const selectedFile = this.$refs.refFile.files[0]
      if (!selectedFile) {
        return
      }
      const reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = () => {
        try {
          storage.set("bookmarks", JSON.parse(reader.result))
          this.reloadBookmarks()
        } catch (error) {
          console.error("解析失败，你的文件可能有问题。", error)
        }
      }
    },
    recover_json() {
      this.resetBookmarks()
    }
  }
}
</script>

<style lang="less" scoped>

</style>