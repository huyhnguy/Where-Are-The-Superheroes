const Score = require("../models/score");
const asyncHandler = require("express-async-handler");

exports.score = asyncHandler(async (req, res, next) => {
    const score = new Score({
        name: req.body.name,
        time: req.body.time,
    })

    await score.save();

    res.send({message: "Score saved"});

});

exports.scoreboard = asyncHandler(async (req, res, next) => {
    const scoreboard = await Score.find().exec();
    console.log(scoreboard);
    res.json(scoreboard);
})