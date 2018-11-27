<template>
  <div id="Login">
			<NavBar title='登录'></NavBar>
  		<div class="Login">
				<div class="login">	
					<input type="text" id="text" placeholder="用户名" v-model="userName" />
					<input type="password" id="pass" placeholder="密码" v-model="passWord" />
					<div class="Btn">
						<button
							@click="OnLogin"
						>登录</button>
						<button
							@click="OnResgest"
						>注册</button>
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
      userName:'',
			passWord:'',
			returnMsg:''
    }
  },
	methods:{
		OnResgest(){
			this.$router.push({name:'Register'})
		},
		OnLogin(){
// 			console.log(this.userName)
// 			console.log(this.passWord)
			let _this = this
			this.$ajax.post('/api/user/login',`username=${this.userName}&password=${this.passWord}`)
			.then( res => {
				// console.log(res.data)
				let errCode = res.data.errorCode
				if(errCode == 0){
					//登录成功
					_this.returnMsg = '登录成功,正在前往首页······'
					_this.changeMsg(_this.returnMsg)
					_this.$store.commit("changeState",_this.userName)
					setTimeout( () => {
						_this.$router.push({name:'Home'})
					},3000)
					// console.log(_this.$store.state.AllState)
				}else{
					//登录失败
					if(res.data.errorMsg == '账号密码不匹配！'){
						_this.returnMsg = '登录失败,账号密码不匹配！'
						_this.changeMsg(_this.returnMsg)
					}
				}
			}).catch( err => {
				console.log(err)
			})
		},
		changeMsg(val){
			Toast({
				message: val,
				iconClass: 'icon icon-success'
			});
		}
	}
	
}
</script>

<style scoped>
.Login{
	position:fixed;
	top:0.5rem;
	bottom:0.5rem;
	left:0;
	right:0;
	background:url(../../../assets/loginBg.jpg) no-repeat center;
	background-size:100% 100%;
}
.Login .login{
	width:90%;
	height:3rem;
	margin:0 auto;
	position:absolute;
	top:50%;
	left:0;
	right:0;
	margin-top:-1.5rem;
}
.Login .login input{
	height:0.5rem;
	border:#eee 0.01rem solid;
	background:rgba(220,220,200,0.6);
	color:#fff;
}
.Btn{
	display:flex;
	justify-content: space-between;
	
}
.Btn button{
	width:40%;
	height:0.5rem;
	border:#eee 0.01rem solid;
	background:rgba(220,220,200,0.6);
	color:#fff;
}
.Btn button.active{
	background:deepskyblue;
	border:0;
}
</style>
