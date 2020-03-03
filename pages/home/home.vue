<template>
	<view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular="true">
			<swiper-item v-for="( item,index ) of bannerlist" :key="index">
				<image :src="'http://daxun.kuboy.top' + item" mode="widthFix" :lazy-load="true"></image>
			</swiper-item>
		</swiper>
		<prolist :prolist="prolist"/>
		<view class="tip" v-if="flag">没有更多数据了</view>
		<view class="backtop" @click="backtop">回到顶部</view>
	</view>
</template>

<script>
	import prolist from '../../components/prolist/prolist.vue'
	import { request } from '../../untils/index.js'
	export default {
		data() {
			return {
				bannerlist:[],
				prolist:[],
				pageCode:1,
				flag:false
			}
		},
		components:{
			prolist,
		},
		mounted() {
			request({
				url:'/pro/banner'
			}).then(res => {
				console.log(res.data)
				this.bannerlist = res.data.data
			})
			request({
				url:'/pro'
			}).then(res => {
				console.log(res.data)
				this.prolist = res.data.data
			})
		},
		onPullDownRefresh() {
			console.log('下拉刷新')
			request({
				url:'/pro'
			}).then(res => {
				console.log(res.data)
				this.prolist = res.data.data
				this.pageCode = 1
				this.flag = false
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {//上拉加载
			request({
				url:'/pro',
				data:{
					pageCode:this.pageCode,
					limitNum:10
				}
			}).then(res => {
				this.pageCode++
				if(res.data.code === '10000'){
					this.flag = true
				}else{
					this.prolist = [...this.prolist,...res.data.data]
				}
			})
		},
		methods: {
			backtop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:200
				})
			}
		}
	}
</script>

<style>
image{
	width: 100%;
}
.backtop{
	position: fixed;
	bottom: 20px;
	right: 10px;
	background: #f66;
}
</style>
