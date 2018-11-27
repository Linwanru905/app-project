import Vue from 'vue'
import App from './App'
import router from './router'

//引入全局样式
import './stylesheet/global.css'


//引入全局组件
import NavBar from './components/common/NavBar.vue'
Vue.component("NavBar",NavBar)


Vue.config.productionTip = false

//数据请求
import Axios from 'axios'
Vue.prototype.$ajax = Axios


//引用Element-ui
import	ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引用mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//引用mui
import '../static/vendor/mui/dist/css/mui.css'

// 引入全局Loading
Axios.interceptors.request.use(function(config){
	//显示图标
	Mint.Indicator.open({
		text:'加载中........',
		spinnerType:'fading-circle'
	});
	return config;
})

Axios.interceptors.response.use(function(config){
	// 隐藏图标
	Mint.Indicator.close();
	return config;
})

// 引入全局store
import store from './Store.js'




















/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
