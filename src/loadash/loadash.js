
var _ = require('lodash');


let chunkExample = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    return _.chunk(months, [size = 3])
}

let tailExamole = () => {
    // first 10 odd Number
    let odd = []
    let count = 0
    while (odd.length < 10) {
        count++
        if (count % 2 != 0) {
            odd.push(count)
        }
    }

    return _.tail(odd)
}


let unionExample = () => {
    let arr0 = [1, 2, 3, 4, 5, 6, 7]
    let arr1 = [1, 7, 8, 9, 11, 20, 33, 55, 66]
    let arr2 = [10, 20, 30]
    let arr3 = [59, 69, 79]
    let arr4 = [45, 55, 65, 75]

    return _.union(arr0, arr1, arr2, arr3, arr4);
}




let useOffromPairs = (...arr) => {
    // console.log(arr)
    return _.fromPairs(arr)
}

module.exports = {
    chunkExample: chunkExample,
    tailExamole: tailExamole,
    unionExample: unionExample,
    useOffromPairs: useOffromPairs
}