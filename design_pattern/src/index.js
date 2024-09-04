/*
 * @Author: sakurahuang
 * @Description: 
 * @Date: 2024-06-26 16:00:16
 */

import './3Elements/polymorphic.js'
import './3Elements/jqueryApply.js'
import './3Elements/inherit.js'
// import './3Elements/parking.js'
import './3Elements/jqueryProxy.js'



// class Person {
//     constructor(name) {
//         this.name = name
//     }
//     getName() {
//         return this.name
//     }
// }
// let p = new Person('bacra')
// p.getName()

let star = {
	name: '罗云熙',
	age: 36,
	prhone: 'star_18828838878'
}

let agent = new Proxy(star, {
	get: function (target, key) {
		if (key === 'phone') {
			// 返回经纪人手机号
			return 'agent_17727737787'
		}
		if (key === 'price') {
			// 经纪人报价
			return 120000
		}
		return target[key]
	},

	set: function (target, key, val) {
		if (key === 'customPrice') {
			if(val < 100000) throw new Error('价格太低')
		}
		target[key] = val
		return true;
	}

})

console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

agent.customPrice = 150000
console.log(`agent.customPrice_${agent.customPrice}`)