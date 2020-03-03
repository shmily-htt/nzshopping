<template>
	<view>
		<input type="text" v-model="tel" />
		<text :class="tel.length !== 11 ? 'error' : 'success'">{{teltip}}</text>
		<input type="text" v-model="password" />
		<text :class="password.length < 6 ? 'error' : 'success'">{{passwordtip}}</text>
		<button 
		:disabled="tel.length !== 11 || password.length < 6" 
		:type="tel.length === 11 && password.length >= 6 ? 'warn' : 'default'" 
		@click="login">
			登录</button>
	</view>
</template>

<script>
	/**
	 * 注册登录
	 * 表单的展示形式 --- 用户体验
	 **/
	 import {request,toast} from '../../untils/index.js'
	export default {
		data() {
			return {
				tel: '18813007814',
				password: '123456'
			}
		},
		computed: {
			teltip() {
				if (this.tel.length !== 11) {
					return '手机号码格式不正确'
				} else {
					return '手机号码ok'
				}
			},
			passwordtip() {
				if (this.password.length < 6) {
					return '密码格式不正确'
				} else {
					return '密码ok'
				}
			}
		},
		methods: {
			//上面进行过表单的校验，此处可以直接提交数据
			login() {
				request({
					url: '/users/login',
					method: 'POST',
					data:{
						tel:this.tel,
						password:this.password
					}
				}).then(res => {
					console.log(res.data)
					const { code } = res.data
					if(code === '1006'){
						toast({title:'该用户还未注册'})
					}else if(code === '1007'){
						toast({title:'密码错误'})
					}else{
						//登录成功
						toast({title:'登录成功'})
						/**
						 * 来到登录页面的渠道
						 * 用户在个人中心点击登录按钮时 ---- 返回个人中心页面
						 * 点击详情的加入购物车的时候 ----- 返回详情页面
						 * 点击浏览加入购物车的时候 ---- 返回购物车的页面
						 * 。。。。。。
						 * 打哪来，去哪去
						 * token验证用户登录状态
						 * 将token信息存储在本地，以后再请求数据需要携带token时从本地获取，
						 * 也可以将用户的id存储在本地
						 * 
						 * uniapp中如何使用本地存储
						 **/
						 try{
						 	uni.setStorageSync('token',res.data.data.token)
							uni.setStorageSync('userid',res.data.data.userid)
							uni.navigateBack()
						 }catch(e){
						 	console.log(e)
						 }
					}
				})
			}
		}
	}
</script>

<style>
	.error {
		color: red
	}

	.success {
		color: #808080
	}
</style>
