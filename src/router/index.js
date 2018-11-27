import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Home from '../components/pages/Index/Index.vue'
import Know from '../components/pages/Know/Know.vue'
import Project from '../components/pages/Project/Project.vue'
import Tab from '../components/pages/Tab/Tab.vue'
import KnowList from '../components/pages/KnowList/KnowList.vue'
import Login from '../components/pages/Login/Login.vue'
import Register from '../components/pages/Register/Register.vue'
import Collection from '../components/pages/Collection/Collection.vue'



export default new Router({
  routes: [
		{
			//重定向
			path: '/',
			redirect:'/home',
		},
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/know',
      name: 'Know',
      component: Know
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/tab',
      name: 'Tab',
      component: Tab
    },
    {
      path: '/know/know-list',
      name: 'KnowList',
      component: KnowList
    },{
			path:'/home/login',
			name:'Login',
			component:Login
		},{
			path:'/home/login/register',
			name:'Register',
			component:Register
		},{
			path:'/home/collection',
			name:'Collection',
			component:Collection
		}
  ]
})
