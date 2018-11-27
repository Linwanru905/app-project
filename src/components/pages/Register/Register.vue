<template>
  <div id="Register">
			<NavBar title='注册'></NavBar>
  		<div class="Register">
				<div class="register">	
					<input type="text" id="text" placeholder="用户名" v-model="User" />
					<input type="password" id="pass1" placeholder="密码" v-model="PassWord" />
					<input type="password" id="pass2" placeholder="再次密码" v-model="rePassWord" />
					<div class="Btn">
						<button
							@click="register"
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
      User:'',
			PassWord:'',
			rePassWord:'',
			returnMsg:''
    }
  },
	methods:{
		toastmsg(val){
			// 注册成功,正在前往登录页面······
			Toast({
				message:val,
				iconClass: 'icon icon-success'
			});
		},
		register(){
// 			console.log(this.User)
// 			console.log(this.PassWord)
// 			console.log(this.rePassWord)
			let _this = this
			this.$ajax.post('/api/user/register',`username=${this.User}&password=${this.PassWord}&repassword=${this.rePassWord}`)
			.then( res => {
				// console.log(res.data)
				let errcode = res.data.errorCode
				if(errcode == 0){
					//注册成功
					_this.toastmsg('注册成功,正在前往登录页面······')
					setTimeout(()=>{
						_this.$router.push({name:'Login'})
					},3000)
				}else{
					//注册失败
					if(res.data.errorMsg == '用户名已经被注册！'){
						_this.toastmsg('注册失败,用户名已经被注册！')
					}
					if(res.data.errorMsg == '两次输入的密码不一致！'){
						_this.toastmsg('注册失败,两次输入的密码不一致！')
					}
					if(res.data.errorMsg == '账号或者密码长度必须大于6位！'){
						_this.toastmsg('注册失败,账号或者密码长度必须大于6位！')
					}
					
				}
			}).catch( err => {
				console.log(err)
			})
		}
	}
}
</script>

<style scoped>
.Register{
	position:fixed;
	top:0.5rem;
	bottom:0.5rem;
	left:0;
	right:0;
	background:url(../../../assets/loginBg.jpg) no-repeat center;
	background-size:100% 100%;
}
.Register .register{
	width:90%;
	height:3rem;
	margin:0 auto;
	position:absolute;
	top:50%;
	left:0;
	right:0;
	margin-top:-1.5rem;
}
.Register .register input{
	height:0.5rem;
	border:#eee 0.01rem solid;
	background:rgba(220,220,200,0.6);
	color:#fff;
}
.Btn{
	display:flex;
	justify-content: center;
	
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



9b0ef9573b2b2f2eef8031bad2124ec2
c7c1e9bb1b02206fdbff6353f603e48a