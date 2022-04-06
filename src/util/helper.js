let currDate = new Date();

let date = function printDate() {
    return currDate.getDate()
}


let month = function printMonth() {
    // month starts from 0 (jan) to 11 (dec)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[currDate.getMonth()]
}


let batchInfo = function getBatchInfo(branch, week, day, topic) {
    return `${branch}, W${week}D${day}, the topic for today is ${topic}`;
}


module.exports = {
    printDate: date,
    printMonth: month,
    getBatchInfo: batchInfo
}