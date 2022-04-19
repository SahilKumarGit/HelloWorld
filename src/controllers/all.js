const batchModule = require('../models/batchModule');
const devloperModule = require('../models/devloperModule');


/*1.  Write an api POST /batches that creates a batch from the details in the request body. 
    Please note that the program should be an enum with the following allowed values only - backend and frontend */

const createBatch = async (req, res) => {
    // 
    let data = req.body;
    let output = await batchModule.create(data);
    res.send({
        message: output
    })
}


/*2. Write an api POST  /developers that creates a developer from the details in the request body. 
    Please note that the gender should be an enum with the following allowed values 
    - male, female and other. Also, batch attribute is a reference to the batches collection.*/

const createDevloper = async (req, res) => {
    // 
    let data = req.body;
    // check batch OBJID
    let batch = await batchModule.findById(data.batch)
    if (!batch) {
        return res.send({
            message: "batch id NOT valid!"
        })
    }
    let output = await devloperModule.create(data);
    res.send({
        message: output
    })
}


/*3. Write an api GET /scholarship-developers that fetches the list of eligible developers for scholarship. 
    An eligible developer is female with percentage greater than or equal to 70*/

const scholarshipDevelopers = async (req, res) => {
    let output = await devloperModule.find({
        gender: "female",
        percentage: {
            $gte: 70
        }
    }).populate('batch')
    res.send({
        message: output
    })
}



/*4. Write an api GET /developers?percentage=value1&program=value2 that only returns the developers 
    for a given program with a percentage greater than or equal to the received value. 
    Please note the batch name and the program values are received in the request as query params.*/

const devlopers = async (req, res) => {
    // console.log(req.socket.remoteAddress)
    let data = req.query;
    let batch = await batchModule.find({
        program: data.program
    })

    if (!batch) {
        return res.send({
            message: "No Batch exist related to this program name."
        })
    }
    let batchID = batch.map((x) => {
        return x._id
    })

    let output = await devloperModule.find({
        percentage: {
            $gte: data.percentage
        },
        batch: {
            $in: batchID
        }
    }).populate('batch')

    res.send({
        message: output
    })
}

module.exports.createBatch = createBatch
module.exports.createDevloper = createDevloper
module.exports.scholarshipDevelopers = scholarshipDevelopers
module.exports.devlopers = devlopers