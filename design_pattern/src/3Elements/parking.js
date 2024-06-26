/*
 * @Author: sakurahuang
 * @Description: 
 * @Date: 2024-07-01 15:41:52
 */
/*
某停车场，分3层，每层100车位
每个车位能监控到车辆的驶入和离开
车辆进入前，显示每层的空余车位数量
车辆进入时，摄像头可识别车牌号和时间
车辆出来时，出口显示器显示车牌号和停车时长
*/
//停车场
class Park {
	constructor(floors) {
		this.floors = floors || []
		this.carList = {} //存储摄像头拍摄返回的车辆信息
		this.camera = new Camera()
		this.screen = new Screen()
	}
	in(car) { 
		//通过摄像头获取信息
		const info = this.camera.shot(car)
		//停到某个停车位
		//由于此题目不太关心，所以这里用随机数表示，车辆停放的车位
		const i = parseInt(Math.random() * 100 % 100)
		const place = this.floors[0].places[i]
		place.in()
		info.place = place
		this.carList[car.num] = info
	}
	out(car) { 
		//获取信息
		const info = this.carList[car.num]
		//将停车位清空
		const place = info.place
		place.out()
		//显示时间
		this.screen.show(car, info.inTime)
		// 清空记录
		delete this.carList[car.num]
	}
	emptyNum() {
		return this.floors.map(floor => {
			return `${floor.index}层还有${floor.emptyPlaceNum()}个空余车位`
		}).join('\n')
	}
}

class Car {
	constructor(num) {
		this.num = num
	}
}

class Floor {
	constructor(index, places) {
		this.index = index
		this.places = places||[] // 这一层多少个停车位
	}
	emptyPlaceNum() {
		// 计算全部空余车位的数量
		let num = 0
		this.places.forEach(p => {
			if (p.empty) num = num + 1
		})
		return num
	}
}

// 车位
class Place {
	constructor() {
		this.empty = true
	}
	in() {
		this.empty = false
	}
	out() {
		this.empty = true
	}
}

// 摄像头
class Camera {
	shot(car) {
		return {
			num: car.num,
			inTime: Date.now()
		}
	}
}

class Screen {
	show(car, inTime) {
		console.log(`车牌号：${car.num}`)
		console.log(`停车时间: ${Date.now()-inTime}`)
	}
}

//调用
const floors = []
//创建3层停车场，每个停车场100个车位
for (let i = 0; i < 3; i++){
	const places = []
	for (let j = 0; j < 100; j++){
		places[j] = new Place()
	}
	floors[i] = new Floor(i + 1, places)
}
const park = new Park(floors)

//初始化车辆
const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)
console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)

