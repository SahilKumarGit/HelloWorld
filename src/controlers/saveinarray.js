let dataSaves = (array, value) => {
    array.push(value)
    return array;
}
let arr = [2, 3, 11, 14];
let dataSave = function (req, res) { //#handeler
    let value = req.body.value
    arr.push(value)
    res.send({
        message: arr
    })
}

module.exports.arraySave = dataSave;