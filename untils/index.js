const baseUrl = "http://daxun.kuboy.top/api"

export function request (options){
	const { url, method, data, header } = options
	return new Promise((resolve,reject) => {
		uni.request({
			url:baseUrl + url,
			data:data || {},
			method:method || 'GET',
			header:header || {},
			timeout:6000,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}

export function toast (options){
	const {title,icon} = options
	uni.showToast({
		title:title,
		icon:icon || 'none'
	})
}