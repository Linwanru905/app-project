<template>
  <div id="Collection">
			<NavBar title='收藏'></NavBar>
			<div class="Collection">
				
				<!-- 循环内容 -->
				<el-card class="box-card"
					v-for='Clist in collectList' :key='Clist.id'
				>
					<div slot="header" class="clearfix">
						<span>{{Clist.author}}</span>
						<el-button style="float: right; padding: 3px 0" type="text">{{Clist.niceDate}}</el-button>
					</div>
					<div class="text item text1">{{Clist.chapterName}}</div>
					<div class="text item text2">{{Clist.title}}</div>
					<div class="text item">
						<el-button style="float:left; padding: 3px 0" type="text" id='text3'>{{Clist.link}}</el-button>
					</div>
				</el-card>
			</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
				collectList:[]
    }
  },
	created(){
		this.collectList = this.$store.state.Collect
		// console.log(this.$store.state.Collect)
	}
}
</script>

<style scoped>
#Collection{
	margin-bottom:0.55rem;
	position:relative;
	left:0;
	right:0;
	top:0.5rem;
	bottom:0.5rem;
}
.text{
	line-height:0.3rem;
	
}
#text3{
	line-height:0.4rem;
}
</style>
