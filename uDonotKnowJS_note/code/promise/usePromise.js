function add(xPromise, yPromise) {
    return Promise.all([xPromise, yPromise]).then(function(values) {
        return values[0] + values[1];
    })
}

function fetchX() {
    return 1
}

function fetchY() {
    return 2
}
add(fetchX(), fetchY()).then(function(sum) {
    console.log(sum)
})
add(fetchX(), fetchY()).then(function(sum) {
    console.log(sum)
}, function(err) {
    console.error(err)
})