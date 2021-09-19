import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/green'
  }, 
  {    
    path: "/green",
    name: "Green",
    component: () =>
        import("../views/Green.vue")
  },
  {
    path: "/yellow",
    name: "Yellow",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/Yellow.vue")
  },
  {
    path: "/red",
    name: "Red",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/Red.vue")
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
