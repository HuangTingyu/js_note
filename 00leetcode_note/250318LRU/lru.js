/*
 * @Author: sakurahuang
 * @Description: 
 * @Date: 2025-03-18 15:24:10
 */

class LinkedNode {
	constructor(key, value) {
		this.key = key
		this.value = value
		this.prev = null
		this.next = null
	}
}

var LRUCache = function (capacity) {
	this.cacheHash = new Map()
	this.head = new LinkedNode(null, null)
	this.tail = new LinkedNode(null, null)
	this.head.next = this.tail
	this.tail.prev = this.head
	this.size = 0
	this.capacity = capacity
};

LRUCache.prototype.getNode = function (key) {
	const node = this.cacheHash.get(key)
	if (node) return node
	return -1
}
LRUCache.prototype.handleGet = function (key) {
	const node = this.getNode(key)
	if (node === -1) return -1
	this.removeNode(key)
	this.addNodeFirst(node)
	if(!node.value && node.value!==0) return -1
    return node.value
}

LRUCache.prototype.handleAddNode = function (node) {
	const existNode = this.getNode(node.key)
	if (existNode !== -1) {
		this.removeNode(node.key)
		this.addNodeFirst(node)
		this.cacheHash.set(node.key, node)	
		return
	}
	this.addNodeFirst(node)
	this.size++
	this.cacheHash.set(node.key, node)
	
	if (this.size > this.capacity) {
		this.handleRemove()
	}
}

LRUCache.prototype.handleRemove = function () {
	const lastNode = this.tail.prev
	this.removeNode(lastNode.key)
	this.cacheHash.delete(lastNode.key)
	this.size--
}

LRUCache.prototype.addNodeFirst = function (node) {
	const headNext = this.head.next
	if (headNext) headNext.prev = node
	node.prev = this.head
	node.next = headNext
	this.head.next = node
}

LRUCache.prototype.removeNode = function (key) {
	const node = this.getNode(key)
	if (node === -1) return
	const prevNode = node.prev
	const nextNode = node.next
	if (prevNode) prevNode.next = nextNode
	if (nextNode) nextNode.prev = prevNode
}

LRUCache.prototype.get = function (key) {
    return this.handleGet(key)
};

LRUCache.prototype.put = function (key, value) {
	const lNode = new LinkedNode(key, value)	
    return this.handleAddNode(lNode)
};

const lru = new LRUCache(2)
lru.put(2, 1)
lru.put(1, 1)
lru.put(2, 3)
lru.put(4, 1)
console.log(lru.get(1))
console.log(lru.get(2))


