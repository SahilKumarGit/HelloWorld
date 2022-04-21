const checkHeaderValidation = (req, res, next) => {
    let headers = req.headers.isfreeappuser;
    // console.log(headers)
    if (headers) {
        if (headers == "true" || headers == "false") {
            if (headers == "true") {
                req.isFreeAppUser = true
            } else {
                req.isFreeAppUser = false
            }
            next()
        } else {
            res.send({
                status: false,
                data: "😔 Header key: 'isFreeAppUser' only accept true OR false!"
            })
        }
    } else {
        res.send({
            status: false,
            data: "😔 Header key: 'isFreeAppUser' is not found!"
        })
    }
}


module.exports = checkHeaderValidation