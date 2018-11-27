<template>
  <div class="NavBar">
				<!-- 页面头部 -->
					<header class="mui-bar mui-bar-nav">
						<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
						<h1 class="mui-title">{{title}}</h1>
					</header>
				<!-- 页面头部 -->
  </div>
</template>

<script>
export default {
	props:["title"],
	methods:{
		goback(){
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped>
header{
	position:fixed;
}
.mui-bar{
	height:0.5rem;
	background: #ff6a6a;
}
.mui-title{
	line-height:0.5rem;
	color:#fff
}
a{
	color:#fff
}
</style>
