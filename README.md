# android

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 项目前搭建
		1. 配置数据请求axios
			import Axios from 'axios'
			Vue.prototype.$ajax = Axios
			
		2. 引ui组件
			//引用Element-ui
			import	ElementUI from 'element-ui'
			import 'element-ui/lib/theme-chalk/index.css'
			Vue.use(ElementUI)
			
			//引用mint-ui
			import Mint from 'mint-ui'
			import 'mint-ui/lib/style.css'
			Vue.use(Mint)
			
		3. 引入全局样式
			//引入全局样式
			import './stylesheet/global.css'
			
		4. 引入公共组件
			//引入全局组件
			import NavBar from './components/common/NavBar.vue'
			Vue.component("NavBar",NavBar)
		
		5. 配置路由
			import Home from '../components/pages/Index/Index.vue'
			{
				path: '/home',
				name: 'Home',
				component: Home
			}
		
		6. 配置跨域
			proxyTable: {
				'/api':{
					target:'http://www.wanandroid.com',
					changeOrigin:true,
					pathRewrite:{
						'^/api':''
					}
				}

#### 开始项目
	1.利用Mint-ui 制作头部	并且注册为全局组件
	
	2.利用mint-ui和element共同制作底部
	
	3.在各个页面引用头部组件
		给头部添加点击事件,点击的时候返回浏览器记录的上一层
	
	4.配置各个主页面的路由
		import Home from '../components/pages/Index/Index.vue'
		import Know from '../components/pages/Know/Know.vue'
		import Project from '../components/pages/Project/Project.vue'
		import Tab from '../components/pages/Tab/Tab.vue'
		
		routes: [
			{
				//重定向
				path: '/',
				redirect:{name:Home}
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
			}
		]
	
	5.制作首页Index/home
		利用axios去请求数据
			 获取banner的数据信息
				this.$ajax.get('/api/banner/json')
				.then(res=>{
					console.log(res)
					this.bannerList = res.data.data
					console.log(this.bannerList)
				})
				.catch(err=>{
					console.log((err))
				})
		这里用了axios的同时执行多个请求
			let _this = this
			this.$ajax.all([
				this.$ajax.get('/api/banner/json'),
				this.$ajax.get('/api/article/list/0/json')
			]).then(this.$ajax.spread(function(userResp, reposResp){
					console.log(userResp.data.data)
					console.log(reposResp.data.data.datas)
					_this.bannerList = userResp.data.data
					_this.photoList = reposResp.data.data.datas
			}))
		然后利用V-for去渲染数据	通过改变PList.collect = !PList.collect去选择是否收藏
				<el-button style="float: right; padding: 3px 0" type="text"
					@click ='PList.collect = !PList.collect'
				>
					<i :class="(PList.collect ? 'el-icon-star-on  Mask' :'el-icon-star-off mask')"></i>
				</el-button>
			</el-card>			
	
	6.制作路由动画
			<transition name='router'>
				<router-view></router-view>
			</transition>
		书写css样式
			.router-enter-active,.router-leave-active{
				transition:opacity 0.2s; 
			}
			.router-enter,.router-leave-to{
				opacity:0;
			}
	
	7.设置底部路由 并设置当前点击的样式 activeClass="active"
		<mt-tab-item id="订单">
			<router-link :to='{name:"Know"}' activeClass="active">
			<i class="el-icon-share"></i>
			知识体系
			</router-link>
		</mt-tab-item>
		并且自定义点击前与点击后的样式
			a{
				color: #666666;
			}
			.active{
				color: #6495ED;
			}
	
	8.制作组织体系页面Know
		利用element-ui制作	然后利用axios去渲染数据
		
	9.制作导航页面Tab
		首先获取数据，并保存在TabList:[]中
		然后定义一个num:0变量去保存index,并且每次点击的时候改变num的值
		其次把当前点击的数据的子数据保存在一个新的变量里AsideList:[]
		最后我们要禁掉页面的滚动事件	给大框设置一个定位
			.Tab{
				display: flex;
				position: relative;
				top:0.5rem;
				bottom:0.5rem;
				left:0;
				right:0;
				
			}
		给左边的ul加上overflow-y:scroll
		给右边的ul加上定位和滚动
			.Tbody{
				width:70%;
				position:fixed;
				top:0.5rem;
				bottom:0.5rem;
				left:30%;
				right:0;
				overflow-y:scroll;
			}
	
	10.制作项目页面Project
		首先制作nav		利用axios获取数据
						把当前点击数据传给变量All,然后判断是否是当前点击的数据,
						是的话，就添加样式;不是的话,不是做任何改变
							changeAll(all){
								this.All = all;
							}
		其次制作正文部分,根据你点击的数据的id,利用传参的形式去请求当前点击的数据的内容
			changeAll(all){
				this.All = all;
				let _this = this
				this.$ajax.get('/api/project/list/1/json?cid='+ this.All).then( res => {
					// console.log(res.data.data.datas)
					_this.PClist = res.data.data.datas
				}).catch( err => {
					console.log(err)
				})
			}
		最后点击时改变收藏的状态
			<div class="Mask"
				@click="P_Clist.collect = !P_Clist.collect"
			><i :class="(P_Clist.collect ? 'el-icon-star-on Ismask':'el-icon-star-off') "></i></div>
			</div>
	
	11.制作首页侧边栏并用anmiate.css/vue自带的transition做出淡入淡出的效果
				<transition name="leftNav">
					<ul class="leftNav" v-show="flag">
							<li class="user-logo">
								<img src="" />
							</li>
							<li class="user-name"
								@click="ILogin"
							>
								{{userName}}
							</li>
							<li class="collect">
								<i class="mui-icon mui-icon-starhalf"></i>
								我的收藏<span class="collect-num mui-badge mui-badge-danger">45</span>
							<li class="theme">
								<i class="mui-icon mui-icon-paperplane"></i>
								夜间模式</li>
							<li class="setting">
								<i class="mui-icon mui-icon-gear"></i>
								系统设置</li>
							<li class="aboutMe">
								<i class="mui-icon mui-icon-info"></i>
								关于我们</li>
							<li class="loginout">
								<i class="mui-icon mui-icon-close"></i>
								退出登录</li>
					</ul>
			</transition>
			
			.leftNav-enter,
			.leftNav-leave-to {
			    transform: translateX(-100%);
			}
			
			.leftNav-enter-active,
			.leftNav-leave-active {
			    transition: all 0.5s ease-out;
			}
	
	12.配置全局仓库
		安装vuex cnpm i vuex -S
		在src下新建仓库store
			import Vue from 'vue'
			import router from './router'
			
			//引入vuex
			import Vuex from 'vuex'
			Vue.use(Vuex)
		在store中定义一个全局状态为false,以及登录成功后的名字,collect用来保存收藏的数据
			let Collect = JSON.parse(localStorage.getItem('collect')) || []
			state:{
				Collect:Collect,
				AllState:false,
				name:''
			},
		在main下直接引用store,并且挂载到vue的上面
		
	13.制作登录注册页面
		利用element-ui简单的制作页面,当我点击登录的时候,判断接口数据中是否有数据
		有则登录成功,反之,则登录失败
		当我登陆成功的时候改变store中的全局状态以及name值,用来判断是否能够收藏
			changeState(state,username){
				state.AllState = true
				state.name = username
			}
		当我点击退出登录的时候,要让全局状态为false,name的值为空
			_this.$store.state.AllState = false
			_this.$store.state.name = ''
			
	14.制作收藏的效果
		当我们点击收藏的时候,
		利用store中的一个方法去获取数据并且保存在store中的state下的collect中
		以及localStoragezhong
			getCollect(state,options){
				// console.log(options)
				var flag = false
				state.Collect.map( item => {
					if(item.id == options.id){
						flag = true;
						Toast({
							message: '收藏已存在',
							iconClass: 'icon icon-success'
						});
						return true;
					}
				})
				if(!flag){
					state.Collect.push(options)
					Toast({
					message: '收藏成功',
					iconClass: 'icon icon-success'
					});
				}	
				localStorage.setItem('collect',JSON.stringify(state.Collect))
				// console.log(state.Collect)
			}
		取消收藏:
			若全局是登陆状态,但当前收藏的状态为false时,我们需要在仓库中删除当前数据
				delCollect(state,id){
					state.Collect.map( (item,i) => {
						if(item.id == id){
							//删除当前数据
							state.Collect.splice(i,1)
							Toast({
							message: '取消收藏',
							duration:800,
							iconClass: 'icon icon-fail'
							});
						}
					})
					localStorage.setItem('collect',JSON.stringify(state.Collect))
					
				}

### 项目结束	
		到这里项目就结束啦!!!!!
		首先非常鸿洋大神提供的帮助,也非常感谢玩Android提供的API,
		本应用采用Vue+MUI,根据WanAndroid的JAVA客户端的样式,
		尽力去完善各项功能.当然这只是目前的功能,
		后续我会在WanAndroid的原本基础上新增一些新的功能,
		未来我将使用JS极力去完善和提供更加便捷的功能.对于使用JS去模仿原生APP,
		此外我还会使用ReactNative去实现,极力去接近原生APP的体验,
		如果您有任何好的建议、想法、意见,欢迎Issue.

		