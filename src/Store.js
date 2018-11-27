import Vue from 'vue'
import router from './router'

//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import { Toast } from 'mint-ui';

//定义一个变量,用来获取localStorage中的数据
let Collect = JSON.parse(localStorage.getItem('collect')) || []
let store = new Vuex.Store({
	state:{
		Collect:Collect,
		AllState:false,
		name:''
	},
	mutations:{
		getCollect(state,options){
			// console.log(options)
			var flag = false
			state.Collect.map( item => {
				if(item.id == options.id){
					flag = true;
					Toast({
					  message: '收藏已存在',
						duration:800,
					  iconClass: 'icon icon-success'
					});
					return true;
				}
			})
			
			if(!flag){
				state.Collect.push(options)
				Toast({
				message: '收藏成功',
				duration:800,
				iconClass: 'icon icon-success'
				});
			}
			
			localStorage.setItem('collect',JSON.stringify(state.Collect))
			// console.log(state.Collect)
		},
		delCollect(state,id){
			state.Collect.map( (item,i) => {
				if(item.id == id){
					state.Collect.splice(i,1)
					Toast({
					message: '取消收藏',
					duration:800,
					iconClass: 'icon icon-fail'
					});
				}
			})
			localStorage.setItem('collect',JSON.stringify(state.Collect))
			
		},
		changeState(state,username){
			state.AllState = true
			state.name = username
		}
	},
	getters:{
		
	}
})

export default store