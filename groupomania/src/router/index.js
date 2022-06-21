// Imports
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import { createRouter, createWebHistory } from 'vue-router'
import AddNewPost from '../components/AddNewPost.vue';
import UpdatePost from '../components/UpdatePost.vue';
import ListOfPosts from '../components/ListOfPosts.vue';
import Admin from '../components/Admin.vue';
import AccountUser from '../components/AccountUser.vue';
import UpdateAccountUser from'../components/UpdateAccountUser.vue';
import Assistance from'../components/Assistance.vue';

// Define routes
const routes = [
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
    name: 'AccountUser',
    component: AccountUser 
  },
  {
    path: '/users/myaccount/update/:id',
    name: 'UpdateAccountUser',
    component: UpdateAccountUser
  },
  {
    path: '/users',
    name: 'AdminPage',
    component: Admin 
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
  {
    path: '/posts',
    name: 'ListOfPosts',
    component: ListOfPosts 
  },
  {
    path: '/',
    name: 'app-assistance',
    component: Assistance
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
