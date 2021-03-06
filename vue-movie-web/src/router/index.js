import Vue from "vue";
import Router from "vue-router";
import user from "@/store/user.js";

const LoginPage = () => import("@/views/home/Login.vue");

const HomePage = () => import("@/views/home/Index.vue");

Vue.use(Router);

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  scrollBehavior: () => {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "LoginPage",
      component: LoginPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/HomePage",
      name: "HomePage",
      component: HomePage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(user.getters.authUser);
    if (user.getters.authUser) {
      next();
      return;
    }
    //let query = to.fullPath ? { returnUrl: to.fullPath } : null;
    // next({ name: "Login", query });

    let siteLink = location.href;
    location.href = `https://spp.scancom.net/login?returnUrl=${siteLink}`;
  } else {
    next();
  }
});

export default router;
