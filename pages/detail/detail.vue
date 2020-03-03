<template>
	<view>
		<image :src="proimg"></image>
		<view>{{proname}}</view>
		<view>{{price}}</view>
		<button @click="addCart">加入购物车</button>
	</view>
</template>

<script>
	import { request,toast } from '../../untils/index.js'
	export default {
		data() {
			return {
				proname:'',
				proid:'',
				proimg:'',
				price:0
			}
		},
		onLoad(options) {
			console.log(options)
			const { proid } = options
			request({
				url:`/pro/detail?proid=${proid}`
			}).then(res => {
				console.log(res.data.data)
				const { proname, proimg, price } = res.data.data
				this.proname = proname
				this.proimg = proimg
				this.price = price
				this.proid = proid
				uni.setNavigationBarTitle({
					title:proname
				})
			})
		},
		methods: {
			addCart(){
				//获取本地存储信息 token userid
				try{
					const token = uni.getStorageSync('token');
					const userid = uni.getStorageSync('userid');
					if(token && userid){
						//加入购物车判断用户是不是登录状态 ---- 登录 ---继续加入购物车
						request({
							url:'/cart/add',
							method:'POST',
							data:{
								token,
								userid,
								num:1,
								proid:this.proid
							}
						}).then(res => {
							if(res.data.code === '10119'){
								toast({title:'请先登录'})
								uni.navigateTo({
									url:'/pages/login/login'
								})
							}else{
								toast({title:'加入购物车成功'})
								uni.switchTab({
									url:'/pages/cart/cart'
								})
							}
						})
					}else{
						toast({title:'请先登录'})
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}
				}catch(e){
					//error
				}
			}
		}
	}
</script>

<style>

</style>
