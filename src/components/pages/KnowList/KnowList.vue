<template>
  <div id="KnowList">
			<NavBar :title='Ktitle'></NavBar>
			
			<div class="KnowList">
					<div class="Kcontent">
						<el-card class="box-card"
							v-for='KLlist in KnowData' :key='KLlist.id'
						>
							<div slot="header" class="clearfix">
								<span>{{KLlist.author}}</span>
								<el-button style="float: right; padding: 3px 0" type="text">{{KLlist.niceDate}}</el-button>
							</div>
							<div class="text item">
								{{KLlist.title}}
							</div>
						</el-card>
					</div>
			</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      KnowData:[],
			Ktitle:null
    }
  },
	created(){
		let id = this.$route.params.id
		let name = this.$route.params.name
		this.Ktitle = name
		let _this = this
		// console.log(id,name)
		this.$ajax.get('/api/article/list/0/json?cid=' + id).then( res => {
			// console.log(res.data.data.datas)
			_this.KnowData = res.data.data.datas
		}).catch( err => {
			console.log(err)
		})
	}
}
</script>

<style scoped>
.KnowList{
	margin:0.5rem 0;
}
</style>
