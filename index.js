import Vue from 'vue'
import App from './App'
import Router from 'vue-router'


Vue.use(Router);

const router = new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: App.name,
      component: App
    }
  ],
});


new Vue({
  router,
  el: '#app',
  template: '<div><router-view/></div>',
})
