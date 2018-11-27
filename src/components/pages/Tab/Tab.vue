<template>
  <div id="Tab">
			<NavBar title='导航'></NavBar>
			<div class="Tab">
				<ul class="Theader">
					<li 
						v-for="(Tlist,index) in TabList" :key='Tlist.cid'
						:class="{T_Hactive:index==num}"
						@click="Tchange(index,Tlist.cid)"
					>{{Tlist.name}}</li>
				</ul>
				
				<ul class="Tbody">
					<li>
						<a
							v-for="Alist in AsideList" :key='Alist.id'
						>{{Alist.title}}</a>
					</li>
				</ul>
			</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      TabList:[],
			num:0,
			AsideList:[]
    }
  },
	created(){
		let _this = this
		this.$ajax.get('/api/navi/json').then( res => {
			// console.log(res.data.data)
			_this.TabList = res.data.data
			_this.Tchange(_this.num)
		}).catch( err => {
			console.log(err)
		})
		
		document.body.addEventListener('scroll',function(e){
			e.preventDefault()
			e.stopPropagation()
		}),{passive:false}
		
	},
	methods:{
		Tchange(index){
			let _this = this
			this.num = index
			for(let i = 0; i < this.TabList.length; i++){
				if(	i == this.num){
					_this.AsideList = this.TabList[i].articles
				}
			}

		}
	}
}
</script>

<style scoped>
#Tab{
	/* margin:0.5rem 0; */
}
.Tab{
	display: flex;
	position: relative;
	top:0.5rem;
	bottom:0.5rem;
	left:0;
	right:0;
	
}
.Theader{
	width: 30%;
	background:#eee;
	height:100%;
	overflow-y:scroll;
}
.Theader li{
	padding:0.15rem;
	color:#333 ;
}
.Theader li.T_Hactive{
	background:#fff;
	color:#333;
	border-left:0.03rem solid #FF5053;
}
.Tbody{
	width:70%;
	position:fixed;
	top:0.5rem;
	bottom:0.5rem;
	left:30%;
	right:0;
	overflow-y:scroll;
}
.Tbody li{
	display:flex;
	flex-wrap: wrap;
	padding:0.1rem;
}
.Tbody li a{
	padding:0.14rem 0.1rem;
	margin:0.1rem 0.08rem;
	border-radius:0.05rem;
	background:#FFC125;
	color:#fff;

}
.Tbody li a:nth-child(n){
	background:#26a2ff;
}
.Tbody li a:nth-child(2n+1){
	background:#9F79EE;
	color:#fff;
}
.Tbody li a:nth-child(3n+1){
	background:rgb(31,204,31);
}
.Tbody li a:nth-child(4n+1){
	background: #ff6a6a;
}

</style>
