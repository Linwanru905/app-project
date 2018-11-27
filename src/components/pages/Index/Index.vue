<template>
  <div id="Home">		
			<header class="mui-bar mui-bar-nav">
				<a class="mui-action-back mui-icon mui-icon-left-nav mui-icon-bars"
					@click="flag=!flag"
				></a>
				<h1 class="mui-title">玩 Android</h1>
			</header>
			
			
			<div class='Home'>
					<!-- 轮播图 -->
				<div class="Banner">
					<mt-swipe :auto="4000">
					  <mt-swipe-item
							v-for='Blist in bannerList' :key='Blist.id'
						>
							<img :src='Blist.imagePath' />
						</mt-swipe-item>
					</mt-swipe>
				</div>
				
				<!-- 首页图文信息 -->
					<div class="PhotoMsg">
						<el-card class="box-card"
							v-for='PList in photoList' :key='PList.id'
						>
							<div slot="header" class="clearfix">
								<img src='/api/resources/image/pc/logo.png' />
								<span>{{PList.author}}</span>
								<el-button style="float: right; padding: 3px 0" type="text">{{PList.niceDate}}</el-button>
							</div>
							<div class="text item">
								{{PList.title}}
							</div>
							<span class='span'>{{PList.superChapterName}}</span>
							<el-button style="float: right; padding: 3px 0" type="text"
								@click ='ChangeState(PList.id,PList.collect)'
							>
								<i 
									@click="PList.collect = !PList.collect"
								:class="(PList.collect ? 'el-icon-star-on  Mask' :'el-icon-star-off mask')"
								></i>
							</el-button>
						</el-card>						
					</div>
				
			</div>
			
			<transition name="leftNav">
        <ul class="leftNav" v-show="flag">
            <li class="user-logo">
              <img src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=8d92cdd953df8db1a32e7a643922dddb/0ff41bd5ad6eddc4802878ba34dbb6fd536633a0.jpg" />
            </li>
            <li class="user-name"
							@click="ILogin"
						>
              {{this.$store.state.AllState? this.$store.state.name:"请先登录"}}
            </li>
            <li class="collect"
							@click="collectJump"
						>
								<i class="mui-icon mui-icon-starhalf"></i>
								我的收藏
								<span class="collect-num mui-badge mui-badge-danger"
								v-if='(this.$store.state.AllState)'
								>{{this.$store.state.Collect.length}}</span>
						<li class="theme">
              <i class="mui-icon mui-icon-paperplane"></i>
              夜间模式</li>
            <li class="setting">
              <i class="mui-icon mui-icon-gear"></i>
              系统设置</li>
            <li class="aboutMe">
              <i class="mui-icon mui-icon-info"></i>
              关于我们</li>
            <li class="loginout"
							v-if='(this.$store.state.AllState)'
							@click="delstate"
						>
              <i class="mui-icon mui-icon-close"></i>
              退出登录</li>
        </ul>
    </transition>
			
  </div>
</template>

<script>
	import { Toast } from 'mint-ui';
export default {
  data () {
    return {
     bannerList:[],
		 photoList:[],
		 isMask:false,
		 flag:false,
		 istemp:false,
		 userName:'请先登录',
		 userLogo:'',
		 collectNum:''
    }
  },
	methods:{
		delstate(){
			// this.$store.state.AllState = false
			let _this = this
			this.$ajax.get('/api/user/logout/json').then( res => {
				console.log(res)
				_this.$store.state.AllState = false
				_this.$store.state.name = ''
			}).catch( err => {
				console.log(err)
			})
		},
		collectJump(){
			if(this.$store.state.AllState){
				this.$router.push({name:'Collection'})
			}else{
				Toast({
					message:'请先登录',
					iconClass: 'icon icon-success'
				});
			}
		},
		ChangeState(id,state){
				let _this = this
				// console.log(this.$store.state.AllState)
				if(!this.$store.state.AllState){
					Toast({
						message:'请先登录',
						iconClass: 'icon icon-success'
					});
				}
			 if(this.$store.state.AllState && state){
					this.photoList.map( item => {
						if(item.id == id){
							_this.$store.commit('getCollect',item)
						}
					})
			 }
			 
			 if(this.$store.state.AllState && !state){
					_this.$store.commit('delCollect',id)
			 }
		},
		ILogin(){
			// console.log(this.$store.state)
			if(this.$store.state.name == ''){
				setTimeout( () => {
					this.$router.push({name:'Login'})
				},2000)
				}
			}
	},
	created(){
		let _this = this
		this.$ajax.all([
			this.$ajax.get('/api/banner/json'),
			this.$ajax.get('/api/article/list/0/json')
		]).then(this.$ajax.spread(function(userResp, reposResp){
// 				console.log(userResp.data.data)
// 				console.log(reposResp.data.data.datas)
				_this.bannerList = userResp.data.data
				_this.photoList = reposResp.data.data.datas
		}))
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
.Home{
	margin: 0.5rem 0;
}
.Banner{
	height:2.4rem;
}
.mt-swipe{
		height:100%
}
img{
	height:100%;
	width: 100%;
}
 /* 首页图文信息 */
.text {
    font-size:0.14rem;
  }
.item {
    margin-bottom:0.1rem;
  }
.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}
.el-card__header{
	display: flex;
	justify-content: space-between;
	padding:0.14rem 0.2rem;
}
.el-card__header img{
	width:0.55rem;
	height:0.55rem;
	margin-right:0.1rem;
	vertical-align: middle;
}
.el-card__body .span{
	padding:0.03rem 0.06rem;
	background: #8B4C39;
	border-radius:0.06rem;
	color:#EAEAEA;
	font:0.1rem/1.5 '';
}
.mask{
	font-size:0.24rem;
	color:#666;
}
.Mask{
	font-size:0.24rem;
}


.leftNav {
    position: fixed;
    height: 100%;
    background: #fff;
    color: #333;
    top: 0.5rem;
    z-index:0;
    box-shadow: 0.01rem 0.01rem 0.01rem #ccc;
}

.leftNav li {
    padding: 0.15rem 0.25rem;
    width: 3rem;
}

.leftNav-enter,
.leftNav-leave-to {
    transform: translateX(-100%);
}

.leftNav-enter-active,
.leftNav-leave-active {
    transition: all 0.5s ease-out;
}
.leftNav li a{
  font-size: 0.18rem;
  color: #333;
}
.leftNav li i{
  font-weight: bold;
}
.user-logo,.user-name{
  background-color: #ff5053; 
  color: #fff !important;
  text-align: center;
}
.collect{
  margin-top: 0.1rem;
  position: relative;
}
.collect-num{
  position: absolute;
  top: 0.1rem;
}




</style>
