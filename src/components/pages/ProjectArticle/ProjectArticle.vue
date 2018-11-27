<template>
  <div id="ProjectArticle">
			<NavBar :title='PAtitle'></NavBar>
			<div class="ProjectArticle">
				<a :href="Plink"></a>
			</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
				PAtitle:null,
				Plink:null
    }
  },
	created(){
		let link = this.$route.params.link
		let title = this.$route.params.title
		this.Plink = link
		this.PAtitle = title
		console.log(link,title)
	}
}
</script>

<style scoped>

</style>
