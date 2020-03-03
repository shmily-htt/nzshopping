<template>
	<view class="prolist">
		<!-- <view class="proitem" v-for="(item,index) of prolist" :key="index">
			<view class="itemimg">
				<image :src="item.proimg" mode=""></image>
			</view>
			<view class="iteminfo">
				<view class="title">{{item.proname}}</view>
			</view>
		</view> -->
		<!-- 声明式跳转 -->
		<!-- <navigator :url="'/pages/detail/detail?proid=' + item.proid" class="proitem" v-for="(item,index) of prolist" :key="index">
			<view class="itemimg">
				<image :src="item.proimg" mode=""></image>
			</view>
			<view class="iteminfo">
				<view class="title">{{item.proname}}</view>
			</view>
		</navigator> -->
		<!-- 编程式跳转 -->
		<view @click="toDetail(item.proid)" class="proitem" v-for="(item,index) of prolist" :key="index">
			<view class="itemimg">
				<image :src="item.proimg" mode=""></image>
			</view>
			<view class="iteminfo">
				<view class="title">{{item.proname}}</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		// props:['prolist'],
		props:{
			prolist:Array
			// prolist:{
			// 	type:Array,
			// 	default:function(){
			// 		return:[]
			// 	}
			// }
		},
		data() {
			return {
				
			};
		},
		methods:{
			toDetail(proid){
				uni.navigateTo({
					url:'/pages/detail/detail?proid=' + proid
				})
			}
		}
	}
</script>

<style lang="scss">
.prolist{
	
	.proitem{
		width: 100%;
		height: 100px;
		display: flex;
		.itemimg{
			width: 100px;
			height: 100px;
			image{
				width: 90px;
				height: 90px;
			}
		}
		
		.iteminfo{
			flex: 1;
		}
	}
}
</style>
