const Score = require("../models/score");
const asyncHandler = require("express-async-handler");

exports.score = asyncHandler(async (req, res, next) => {
    const score = new Score({
        name: req.body.name,
        time: req.body.time,
    })

    await score.save();

    const scoreDb = await Score.findOne({ name: score.name }).exec();

    res.send({
        id: scoreDb._id,
        message: "Score saved"
    });
});

exports.scoreboard = asyncHandler(async (req, res, next) => {
    const scoreboard = await Score.find().sort({"time": 1}).exec();
    res.json(scoreboard);
})