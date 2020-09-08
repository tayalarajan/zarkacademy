import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Course from "../views/Course.vue";
import Main from "../views/Main.vue";
import UserAccount from "../views/UserAccount.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import Bookmarked from "../views/Bookmarked.vue";
import UserPosts from "../views/UserPosts.vue";
import UserBlog from "../views/UserBlog.vue";
import DiscussionCentre from "../views/DiscussionCentre.vue";
import IndividualPost from "../views/IndividualPost.vue";
import AllUser from "../views/AllUser.vue";
import IndividualUserChat from "../views/IndividualUserChat.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "Admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { requiresAuth: true , reload:true}
  },
  {
    path: "/course",
    name: "Course",
    component: Course,
    meta: { requiresAuth: true }
  },
  {
    path: "/userAccount",
    name: "UserAccount",
    component: UserAccount,
    meta: { requiresAuth: true }
  },
  {
    path: "/updateProfile",
    name: "UpdateProfile",
    component: UpdateProfile,
    meta: { requiresAuth: true }
  },
  {
    path: "/bookmarked",
    name: "Bookmarked",
    component: Bookmarked,
    meta: { requiresAuth: true }
  },
  {
    path: "/userPosts",
    name: "UserPosts",
    component: UserPosts,
    meta: { requiresAuth: true }
  },
  {
    path: "/userBlog/:id",
    name: "UserBlog",
    component: UserBlog,
    meta: { requiresAuth: true }
  },
  {
    path: "/discussionCentre",
    name: "DiscussionCentre",
    component: DiscussionCentre,
    meta: { requiresAuth: true }
  },
  {
    path: "/individualPost/:userid/:postid",
    name: "IndividualPost",
    component: IndividualPost,
    meta: { requiresAuth: true }
  },
  {
    path: "/allUser",
    name: "AllUser",
    component: AllUser,
    meta: { requiresAuth: true }
  },
  {
    path: "/individualUserChat/:id",
    name: "IndividualUserChat",
    component: IndividualUserChat,
    meta: { requiresAuth: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
