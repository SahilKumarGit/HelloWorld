const userModule = require("../models/userModule")
const productModule = require("../models/productModule")
const orderModule = require("../models/orderModule")
const moment = require('moment')


/*Q1. */
const createProduct = async (req, res) => {
    const data = req.body;
    // create product and save to DB
    const createProduct = await productModule.create(data).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: err.message
        }
    });
    res.send(createProduct)
}


/*Q2. */

const createUser = async (req, res) => {
    // get body
    const data = req.body;
    //get isFreeAppUser data 
    data.isFreeAppUser = req.isFreeAppUser;
    // create product
    const createUser = await userModule.create(data).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: err.message
        }
    })
    res.send(createUser)
}




/*Q3 */

const placeOrder = async (req, res) => {
    // get body data 
    const data = req.body;
    //get isFreeAppUser 
    const isFreeAppUser = req.isFreeAppUser;

    if (!data.userId) {
        return res.send({
            status: false,
            data: "😔 user id is NOT defined"
        })
    }

    if (!data.productId) {
        return res.send({
            status: false,
            data: "😔 product id is NOT defined"
        })
    }

    // validate data for user
    const userData = await userModule.findById(data.userId).catch(arr => null);
    if (!userData) {
        return res.send({
            status: false,
            data: "😔 invalid user id, please enter a currect user id !"
        })
    }

    // validate data for product
    const productData = await productModule.findById(data.productId).catch(arr => null);
    if (!productData) {
        return res.send({
            status: false,
            data: "😔 invalid product id, please enter a currect product id !"
        })
    }

    let productPrice = 0;

    // check header value of isFreeAppUser
    if (!isFreeAppUser) { //false
        // check user balance < product
        if (userData.balance < productData.price) {
            return res.send({
                status: false,
                data: `😔 insufficient balance, product price is ₹${productData.price} but your balance is ₹${userData.balance} !`
            })
        }

        // update user balance
        await userModule.findOneAndUpdate({
            _id: userData._id
        }, {
            $inc: {
                balance: -productData.price
            }
        })

        // update bookPrice
        productPrice = productData.price
    }

    // create order field and value
    const orderData = {
        userId: userData._id,
        productId: productData._id,
        amount: productPrice,
        isFreeAppUser: isFreeAppUser,
        date: moment().format('DD/MM/YYYY')
    }

    const createOrder = await orderModule.create(orderData).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: err.message
        }
    })


    res.send(createOrder)
}



module.exports.createUser = createUser
module.exports.createProduct = createProduct
module.exports.placeOrder = placeOrder