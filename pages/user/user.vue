<template>
	<view>
		<view class="takephoto" @click="takephoto">拍照</view>
		<image v-for="(item,index) of list" :src="item" :key="index"></image>
		<navigator url="/pages/login/login">登录</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		methods: {
			takephoto(){
				uni.chooseImage({
					count:6,
					sizeType:['original','compressed'],
					sourceType:['album'],
					success:(res)=>{
						console.log(JSON.stringify(res.tempFilePaths))
						this.list = res.tempFilePaths
					}
				})
			}
		}
	}
</script>

<style>

</style>
