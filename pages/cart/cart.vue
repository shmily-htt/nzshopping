<template>
	<view>
		<view v-if="flag" class="tip">
			购物车空空如也，请<navigator open-type="switchTab" url="/pages/home/home">选购</navigator>
		</view>
		<view v-else>
			<view class="cartlist">
				<checkbox-group @change="allselected()">
					<checkbox :checked="allchecked" />全选
				</checkbox-group>
				<view class="cartitem" v-for="(item,index) of cartlist" :key="index" >
					<checkbox-group @change="selected(item)">
						<checkbox :checked="item.flag" />
					</checkbox-group>
					<text class="name">{{ item.proname }}</text>
					<text>￥{{ item.price }} </text>
					<text @click="reduce(item)">[ - ]</text>
					<text>{{item.num}}</text>
					<text @click="add(item)">[ + ]</text>
					<text @click="del(item,index)">删除</text>
				</view>
			</view>
		</view>
		<view class="allNum">总数：{{totalNum}}</view>
		<view class="allprice">总价：￥{{totalPrice}}</view>
	</view>
</template>

<script>
	import {request,toast} from '../../untils/index.js'
	export default {
		data() {
			return {
				flag:true,
				cartlist:[],
				allchecked:true
			}
		},
		computed:{
			totalNum(){
				let totalNum = 0;
				this.cartlist.map(item => {
					item.flag ? totalNum += item.num : totalNum += 0
				})
				return totalNum
			},
			totalPrice(){
				let totalPrice = 0;
				this.cartlist.map(item => {
					item.flag ? totalPrice += item.num * item.price : totalPrice += 0
				})
				return totalPrice
			}
		},
		onShow() {
			try{
				let userid = uni.getStorageSync('userid')
				let token = uni.getStorageSync('token')
				if(userid && token){
					request({
						url:'/cart',
						data:{
							userid,token
						}
					}).then(res => {
						if(res.data.code === '10019'){
							toast({title:'请先登录'})
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}else if(res.data.code === '10012'){
							toast({title:'请先选购商品'})
							this.flag = true
						}else{
							toast({title:'购物车列表获取成功'})
							this.flag = false
							//赋值之前给数据添加数据项item.flag
							res.data.data.map( item => {
								item.flag = true
							})
							this.cartlist = res.data.data
						}
					})
				}else{
					toast({title:'请先登录'})
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		methods: {
			reduce(item){
				//判断如果当前数量为1，不操作，若大于一，减一操作
				let num = item.num
				if(num > 1){
					num -= 1
				}else{
					num = 1
				}
				let userid = uni.getStorageSync('userid')
				let token = uni.getStorageSync('token')
				request({
					url:'/cart/update',
					data:{
						token,
						cartid:item.cartid, // item包含购物车记录id
						num
					}
				}).then(res => {
					if(res.data.code === '10019'){
						toast({title:'请先登录'})
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}else{
						toast({title:'修改数量成功'})
						item.num -= 1 //服务器返回成功之后，视图才会更新
					}
				})
			},
			add(item){
				//加一
				let num = item.num
				num += 1
				let userid = uni.getStorageSync('userid')
				let token = uni.getStorageSync('token')
				request({
					url:'/cart/update',
					data:{
						token,
						cartid:item.cartid, // item包含购物车记录id
						num
					}
				}).then(res => {
					if(res.data.code === '10019'){
						toast({title:'请先登录'})
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}else{
						toast({title:'修改数量成功'})
						item.num += 1 //服务器返回成功之后，视图才会更新
					}
				})
			},
			del(item,index){
				let token = uni.getStorageSync('token')
				request({
					url:'/cart/delete',
					data:{
						token,
						cartid:item.cartid
					}
				}).then(res => {
					if(res.data.code === '10019'){
						toast({title:'请先登录'})
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}else{
						toast({title:'删除数据成功'})
						this.cartlist.splice(index,1) //删除当前数据
						//如果点击删除删完之后要是没有显示数据了 需要给出提示
						this.cartlist.length === 0 ? this.flag = true : this.flag = false
					}
				})
			},
			selected(item){
				item.flag = !item.flag
				//如果单独某一项没被选中，那么全选一定不被选中
				//如果单独某一项被选中，检测其他项是否被选中，如果都被选中了，全选才被选中
				if(!item.flag){
					this.allchecked = false
				}else{
					//检测其余项是否被选中
					const test = this.cartlist.every(item => {
						return item.flag === true
					})
					if(test){
						this.allchecked = true
					}else{
						this.allchecked = false
					}
				}
			},
			allselected(){
				this.allchecked = !this.allchecked
				//如果为真，修改数据的每一项的flag的值都为真，否则都为假
				if(this.allchecked){
					this.cartlist.map( item => {
						item.flag = true
					})
				}else{
					this.cartlist.map( item => {
						item.flag = false
					})
				}
			}
		}
	}
</script>

<style>
.tip{
	width: 100%;
	text-align: center;
	margin-top: 100px;
}
.allNum{
	width:100%;
	height:30px;
	line-height: 30px;
	margin-left: 10px;
	margin-bottom: 10px;
	color: red;
	font-size: 18px;
	margin-top: 20px;
}
.allprice{
	width:100%;
	height: 30px;
	line-height: 30px;
	margin-left: 10px;
	color: red;
	font-size: 18px;
}
.cartitem{
	display: flex;
	justify-content: space-between;
}
.name{
	flex: 1;
}
</style>
