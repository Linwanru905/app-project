<template>
  <div id="Project">
			<NavBar title='项目'></NavBar>
			<!-- 项目导航条 -->
			<nav>
				<a :class="((All == Plist.id )? 'P_Active':'')"
					v-for="Plist in Projectlist" :key='Plist.id'
					@click="changeAll(Plist.id)"
				>{{Plist.name}}</a>
			</nav>
	
			<div class="Project">
				<div class="Pcontent">
					
						<div class="P_card"
							v-for="P_Clist in PClist" :key='P_Clist.id'
							@click="collectmsg(P_Clist.id,P_Clist.collect)"
						>
							
								<div class="P-left">
									<a></a>
									<img :src="P_Clist.envelopePic" />
								</div>
					
								<div class="P-right">
								<div class="P-Body">
									<p class="p-Btitle">{{P_Clist.title}}</p>
									<p class="p-Bcontent">{{P_Clist.superChapterName}}</p>
									<p class="p-Bdesc">{{P_Clist.desc}}</p>
								</div>
								<div class="P-Bottom">
									<span>{{P_Clist.author}}</span>
									<span>{{P_Clist.niceDate}}</span>
								</div>
								<div class="Mask"
									@click="P_Clist.collect = !P_Clist.collect"
								><i :class="(P_Clist.collect ? 'el-icon-star-on Ismask':'el-icon-star-off') "></i></div>
							</div>
						</div>
						
						
						
						
				</div>	
			</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      Projectlist:[],
			All:294,
			PClist:[]
    }
  },
	methods:{
		collectmsg(id,state){
			// console.log(id,state)
			let _this = this
			if(!this.$store.state.AllState){
				Toast({
					message:'请先登录',
					duration:800,
					iconClass: 'icon icon-success'
				});
			}
			if(this.$store.state.AllState && state){
				this.PClist.map( item => {
					if(item.id == id){
						// console.log(item)
						_this.$store.commit('getCollect',item)
					}
				})
			}	
			if(this.$store.state.AllState && !state){
				_this.$store.commit('delCollect',id)
			}
		},
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
	},
	created(){
		let _this = this
		this.$ajax.get('/api/project/tree/json').then( res => {
			// console.log(res.data.data)
			_this.Projectlist = res.data.data
			_this.changeAll(_this.All)
		}).catch( err => {
			console.log(err)
		})
	}
}
</script>

<style scoped>
#Project{
	margin:0.5rem 0;
}
nav{
	height:0.5rem;
	display: flex;
	overflow-x:auto;
	white-space:nowrap;
	background:#ff6a6a;
	padding:0.04rem 0;
	position:fixed;
	top:0.5rem;
	left:0;
	width:100%;
	z-index:100;
}
nav a{
	display:inline-block;
	line-height: 0.4rem;
	padding:0 0.1rem;
	color:#fff;
}
nav a.P_Active{
	border-bottom:0.02rem solid #fff;
}
.Project{
	margin-top:1rem;
}
/* 真正的内容 */
.P_card{
	display:flex;
	justify-content:space-between;
	overflow: hidden;
	height:3rem;
	padding:0.1rem 0.04rem;
	border-bottom: 0.02rem solid #e5e5e5;
}
.P_card .P-left{
	display:block;
	width:40%;
	height: 100%;
	margin:0 0.06rem 0 0 ;
}
.P_card .P-left img{
	width:100%;
	height: 100%;
}

.P_card .P-right{
	width:60%;
	padding:0 0.04rem 0 0;
	position: relative;
}
.P_card .P-right .P-Body{
	min-height:40%;
	padding:0.1rem 0 0 0;
	font:0.16rem/1.5 '';
}
.P_card .P-right .P-Body .p-Btitle{
	color:#333;
	font:800 0.16rem/1.5 '';
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.P_card .P-right .P-Body .p-Bcontent{
	 color: #aaa;
}            
.P_card .P-right .P-Body .p-Bdesc{
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp:5;
	overflow: hidden;	
	color: #666;
	text-indent: 0.14rem;
}
.P_card .P-right .P-Bottom{
	margin-top: 0.2rem;
	display: flex;
	justify-content: space-between;
	color:#888;
}
.P_card .P-right .Mask{
	position:absolute;
	padding-top: 0.2rem;
	right:0.16rem;
	font-size:0.3rem;
	color:#666;
}
.P_card .P-right .Mask .Ismask{
		color:#ff6a6a;
}
</style>
