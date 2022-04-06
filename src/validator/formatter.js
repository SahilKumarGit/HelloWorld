let trimFn = function trim(val) {
    return val.trim();
}


let toLowerCase = function changetoLowerCase(val) {
    return val.toLowerCase();
}

let toUpperCase = function changetoUpperCase(val) {
    return val.toUpperCase();
}


module.exports = {
    trim: trimFn,
    changetoUpperCase: toUpperCase,
    changetoLowerCase: toLowerCase
}