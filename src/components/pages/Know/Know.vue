<template>
  <div id="Know">
			<NavBar title='知识体系'></NavBar>
			
			<!-- 知识体系msg -->
			<div class="Know">			
				<el-card class="box-card"
					v-for='Klist in KnowList' :key='Klist.id'
				>
					<div class="Ktitle">{{Klist.name}}</div>
					<p class="Kbody">
							<span
								v-for="K_Clist in Klist.children" :key='K_Clist.id'
							>
								<router-link :to="{name:'KnowList',params:{id:K_Clist.id,name:K_Clist.name}}">
									{{K_Clist.name}}
								</router-link>
						</span>
					</p>
					<div class="Knext"><i class="el-icon-arrow-right"></i></div>
				</el-card>				
			</div>
			
  </div>
</template>

<script>
export default {
  data () {
    return {
			KnowList:[]
    }
  },
	created(){
		let _this = this
			this.$ajax.get('/api/tree/json').then(res=>{
				// console.log(res.data.data)
				_this.KnowList = res.data.data
			}).catch( err => {
				console.log(err)
			})
	}
}
</script>

<style scoped>
#Know{
	margin:50px 0;
	position:relative;
}
.Klist{
	display: flex;
	width:100%;
	justify-content: space-between;
}
.el-card {
    background-color: #fff;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
		position: relative;
}
.Knext{
		width: 0.3rem;
		font-size:0.24rem;
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: -0.1rem;
		color: #333;	
}
.Ktitle{
	font:normal 0.16rem/1.5 '';
	display: flex;
	display: inline-block;
	flex-wrap:wrap;
	color:#fff;
	padding: 0.06rem;
	border-radius: 0.04rem;
	background-color: #26a2ff;
}
.Know .is-always-shadow:nth-child(2n) .el-card__body .Ktitle{
	background-color: rgb(31,204,31);
}
.Know .is-always-shadow:nth-child(3n) .el-card__body .Ktitle{
	background-color: #ff6a6a;
}
.Kbody span{
	font:0.16rem/0.2rem '';
	word-break: break-all;
	display: inline-block;
	padding:0.1rem 0.08rem 0rem 0.02rem;
}
.Kbody span a{
	color: #555;
}
</style>
