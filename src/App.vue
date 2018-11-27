<template>
  <div id="app">
		
		<transition name='router'>
			<router-view></router-view>
		</transition>

		
		<!-- 页面底部 -->
			<mt-tabbar >
				<mt-tab-item id="外卖">
					<router-link :to='{name:"Home"}' activeClass="active">
						<i class="el-icon-mobile-phone"></i>
						首页
					</router-link>
				</mt-tab-item>
				
				<mt-tab-item id="订单">
					<router-link :to='{name:"Know"}' activeClass="active">
					<i class="el-icon-share"></i>
					知识体系
					</router-link>
				</mt-tab-item>
				
				<mt-tab-item id="发现">
					<router-link :to='{name:"Tab"}' activeClass="active">
						<i class="el-icon-news"></i>
						导航
					</router-link>
				</mt-tab-item>
				
				<mt-tab-item id="我的">
					<router-link :to='{name:"Project"}' activeClass="active">
						<i class="el-icon-edit"></i>
						项目
					</router-link>
				</mt-tab-item>
			</mt-tabbar>
			
			
			
		
  </div>
</template>

<script>

export default {
	name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	background:#fff;
}
.router-enter-active,.router-leave-active{
	transition:opacity 0.2s; 
}
.router-enter,.router-leave-to{
	opacity:0;
}

.mint-tab-item-label {
    color: #666666;
    font-size: 16px;
    line-height: 1;
}

.mint-tab-item-label i{
	display: block;
	margin-bottom: 0.08rem;
	margin-top: 0.02rem;
}
a{
	color: #666666;
}
.active{
	color: #6495ED;
}
.mint-tabbar{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
}
</style>
