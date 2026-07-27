<p align="center">
  <a href="./" target="_blank">
    <img width="180" src="https://s1.ax1x.com/2020/06/13/tvwVuF.png" alt="logo">
  </a>
</p>
<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/zzd/Simple-Search-Page">
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/zzd/Simple-Search-Page/total">
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/zzd/Simple-Search-Page/latest/total">
  <a href="https://github.com/zzd/Simple-Search-Page/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/zzd/Simple-Search-Page"></a>
  <a href="https://github.com/zzd/Simple-Search-Page/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/zzd/Simple-Search-Page?style=social"></a>
</p>

# simple-search-page-vue

3.0.2 新版，基于 Vue 3 + Vite 实现的极简搜索导航主页，无广告、无干扰。

## 功能

- 多引擎搜索（百度、谷歌、必应、搜狗、360、谷歌学术）
- 百度搜索热词提示
- 侧边栏书签导航
- 书签 JSON 备份/恢复
- 天气挂件

## 技术栈

- Vue 3
- Vue Router 4
- Vite 5
- Less
- Axios / fetch-jsonp

## 环境变量

复制 `.env` 文件并根据需要修改：

```
BASE_URL="/"
VITE_WEATHER_TOKEN="your_seniverse_weather_token"
```

## 项目启动

```sh
npm install
npm run dev
```

### 生产构建

```sh
npm run build
```
