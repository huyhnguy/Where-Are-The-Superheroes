const Character = require("../models/character");
const asyncHandler = require("express-async-handler");

exports.deadpool = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const deadpool = await Character.findOne({ name: "Deadpool"}).exec();

    if (deadpool === null) {
        const err = new Error("Deadpool not in database");
        err.status = 404;
        return next(err);
    }

    if (req.body.xCoordinatePercentage > deadpool.x_min && 
        req.body.xCoordinatePercentage < deadpool.x_max && 
        req.body.yCoordinatePercentage > deadpool.y_min && 
        req.body.yCoordinatePercentage < deadpool.y_max) {
            res.send({message: "Pass"});
        } else {
            res.send({message: "Fail"});
        }
});

exports.flash = asyncHandler(async (req, res, next) => {
    const flash = await Character.findOne({ name: "Flash"}).exec();

    if (flash === null) {
        const err = new Error("Flash not in database");
        err.status = 404;
        return next(err);
    }

    if (req.body.xCoordinatePercentage > flash.x_min && 
        req.body.xCoordinatePercentage < flash.x_max && 
        req.body.yCoordinatePercentage > flash.y_min && 
        req.body.yCoordinatePercentage < flash.y_max) {
            res.send({message: "Pass"});
        } else {
            res.send({message: "Fail"});
        }
});

exports.spiderman = asyncHandler(async (req, res, next) => {
    const spiderman = await Character.findOne({ name: "Spiderman"}).exec();

    if (spiderman === null) {
        const err = new Error("Spiderman not in database");
        err.status = 404;
        return next(err);
    }

    if (req.body.xCoordinatePercentage > spiderman.x_min && 
        req.body.xCoordinatePercentage < spiderman.x_max && 
        req.body.yCoordinatePercentage > spiderman.y_min && 
        req.body.yCoordinatePercentage < spiderman.y_max) {
            res.send({message: "Pass"});
        } else {
            res.send({message: "Fail"});
        }
});