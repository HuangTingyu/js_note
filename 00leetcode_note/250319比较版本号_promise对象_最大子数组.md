### 比较版本号

https://leetcode.cn/problems/compare-version-numbers/description/

给你两个 **版本号字符串** `version1` 和 `version2` ，请你比较它们。版本号由被点 `'.'` 分开的修订号组成。**修订号的值** 是它 **转换为整数** 并忽略前导零。

比较版本号时，请按 **从左到右的顺序** 依次比较它们的修订号。如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 `0`。

返回规则如下：

- 如果 `*version1* < *version2*` 返回 `-1`，
- 如果 `*version1* > *version2*` 返回 `1`，
- 除此之外返回 `0`。

解法：

（1）注意这里for循环要记得break一下！

**从0到length，只要比较出某一位的大小，立刻break，防止覆盖！**

（2）注意change的情况

```js
var compareVersion = function(version1, version2) {
	if (!version1 || !version2) return
	let vInit1 = version1.split('.')
	let vInit2 = version2.split('.')
	let ifChange = false
	if (vInit2.length > vInit1.length) {
		const temp = vInit1
		vInit1 = vInit2
		vInit2 = temp
		ifChange = true
	}
	let result = 0
	for (let i = 0; i < vInit1.length; i++){
		const vItem1 = Number(vInit1[i])
		let vItem2 = Number(vInit2[i])
		if (!vItem2) vItem2 = 0
		if (vItem1 < vItem2) {
			result = -1
			break
		}
		else if (vItem1 > vItem2) {
			result = 1
			break
		}
	}
	
	if (ifChange) {
		if (result === 1) result = -1
		else if(result === -1) result = 1
	}
	return result
	
};
```



### 有时间限制的promise对象

https://leetcode.cn/problems/promise-time-limit/description/

请你编写一个函数，它接受一个异步函数 `fn` 和一个以毫秒为单位的时间 `t`。它应根据限时函数返回一个有 **限时** 效果的函数。函数 `fn` 接受提供给 **限时** 函数的参数。

**限时** 函数应遵循以下规则：

- 如果 `fn` 在 `t` 毫秒的时间限制内完成，**限时** 函数应返回结果。
- 如果 `fn` 的执行超过时间限制，**限时** 函数应拒绝并返回字符串 `"Time Limit Exceeded"` 。



注意这里的示例，

```
const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
```

**这里判题的结果是要接收一个`promise`对象，所以不要去管`async`，await那一套**

**必须要返回一个promise对象！！！**



```js
var timeLimit = function(fn, t) {
    
    return function(...args) {
        return new Promise((resolve, reject)=>{
            const timer = setTimeout(()=>{
                reject('Time Limit Exceeded')
            }, t)
            // ------timer
            fn(...args).then((reslut)=>{
                clearTimeout(timer)
                resolve(reslut)
            }).catch(err=>{
                clearTimeout(timer)
                reject(err)
            })
        })
        // ------Promise
    }
};
```



### 最大子数组之和

https://leetcode.cn/problems/maximum-subarray/description/

参考文档

https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0053.%E6%9C%80%E5%A4%A7%E5%AD%90%E5%BA%8F%E5%92%8C.md

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组**是数组中的一个连续部分。



动态规划

```
dp[i]含义最大子数组之和，要求dp[i]，就要先求出dp[i-1]
dp[i]要么是nums[i]本身，要么是nums[i]+dp[i-1]
dp[i] = Math.max(nums[i], (nums[i] + dp[i - 1]))
```

```js
var maxSubArray = function(nums) {
    if (!nums || nums.length === 0) return
	if(nums.length===1) return nums[0]
	const dp = new Array(nums.length)
	
	let max = nums[0]
	dp[0] = nums[0]
	for (let i = 1; i < nums.length; i++){
		dp[i] = Math.max(nums[i], (nums[i] + dp[i - 1]))
		if(dp[i]>max) max=dp[i]
	}
	return max
};
```

