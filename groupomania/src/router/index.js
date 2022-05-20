// Imports
import HomePage from '../components/HomePage.vue';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import { createRouter, createWebHistory } from 'vue-router'
import AddNewPost from '../components/AddNewPost.vue';
import UpdatePost from '../components/UpdatePost.vue';


// Define routes
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/users/signup',
    name: 'sign-up',
    component: Signup
  },
  {
    path: '/users/login',
    name: 'log-in',
    component: Login
  },
  {
    path: '/users/myaccount',
    name: '',
    //component: 
  },
  {
    path: '/posts/new',
    name: 'AddNewPost',
    component: AddNewPost
  },
  {
    path: '/posts/:id',
    name: 'UpdatePost',
    component: UpdatePost 
  },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
