import Home from "../views/Home.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/os",
    name: "os",
    component: () => import("../views/os.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const routerHistory = createWebHistory(import.meta.env.BASE_URL)
const router = createRouter({
  history: routerHistory,
  routes
})

export default router
