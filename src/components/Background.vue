<template>
  <a class="exchange" @click="closed=false">换肤</a>
  <div :class="{closed: closed}" class="background-main">
    <div class="background-pics">
      <ul>
        <li><img src="https://s4.ax1x.com/2021/12/18/TEtGGV.png"
                 @click="set_background('/img/bg1.jpg')">
          <p>预设1</p></li>
        <li><img src="https://s4.ax1x.com/2021/12/18/TEtGGV.png">
          <p>预设2</p></li>
        <li><img src="https://s4.ax1x.com/2021/12/18/TEtGGV.png">
          <p>预设3</p></li>
        <li><img src="https://s4.ax1x.com/2021/12/18/TEtGGV.png">
          <p>预设4</p></li>
        <li><img src="https://s4.ax1x.com/2021/12/18/TEtGGV.png">
          <p>预设5</p></li>
      </ul>
    </div>
    <div class="background-custom">自定义背景：
      <input ref="ipt_url" placeholder="http(s)://" type="url">
    </div>
    <input type="submit" value="保存" @click="save()">
    <input type="submit" value="取消" @click="closed = true">
  </div>
</template>

<script>
import storage from "@/utils/storage";

export default {
  name: "Background",
  emits: ["background"],
  data() {
    return {
      data: "",
      closed: true,
    };
  },
  created() {
    let background;
    background = storage.get("background")
    if (background) {
      this.data = background
    }
    this.$emit('background', this.data);
  },
  methods: {
    set_background(url) {
      this.data = "url(" + url + ") center center / cover no-repeat"
      this.$emit('background', this.data);
      storage.set("background", this.data)
    },
    save() {
      let url;
      url = this.$refs.ipt_url.value
      if (url) {
        this.set_background(url)
      }
      this.closed = true
    }
  },
}
</script>

<style lang="less" scoped>
.background-main {
  height: 350px;
  position: absolute;
  bottom: 0;
  z-index: 1001;
  width: 100%;
  color: #444444;
  line-height: 20px;
  font-size: 14px;
  padding: 25px 0;
  text-align: center;
  background-color: #e5e5e5;
  transition: 0.3s all ease;
}

.background-main.closed {
  bottom: -350px;
}

.background-banner, .background-custom {
  font-size: 16px;
  height: 46px;
  margin: 15px 0;
}

.background-pics {
  width: 1120px;
  height: 170px;
  margin: auto;

  ul {
    li {
      float: left;
      height: 170px;
      overflow: hidden;
      width: 20%;
      text-align: center;
      padding: 15px 0;
      font-size: 16px;

      img {
        cursor: pointer;
        height: 120px;
        border: 3px solid #cdcdcd;
        border-radius: 5px;
        transition: 0.3s all ease;
      }

      img:hover {
        border: 3px solid #838383;
      }
    }
  }
}

.background-custom {
  input[type="url"] {
    width: 470px;
  }
}

input[type="submit"] {
  width: 130px;
  margin: 0 50px;
}

.exchange {
  width: 50px;
  height: 50px;
  transform: scale(0.8);
  position: absolute;
  right: 10px;
  top: 80px;
  cursor: pointer;
  z-index: 1999;
  text-align: center;
  line-height: 50px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  transition: 0.3s all ease;
}

.exchange:hover {
  border: 1px solid #838383;
}
</style>