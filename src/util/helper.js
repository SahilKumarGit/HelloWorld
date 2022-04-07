let currDate = new Date();

let printDate = () => {
    return currDate;
}

let printMonth = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    return months[currDate.getMonth()]
}


let getBatchInfo = (name, week, day, topic) => {
    return `${name}, W${week}D${day}, the topic for today is ${topic}`
}




module.exports.printDate = printDate;
module.exports.printMonth = printMonth;
module.exports.getBatchInfo = getBatchInfo;