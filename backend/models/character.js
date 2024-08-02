const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    x_min: { type: Number, required: true },
    x_max: { type: Number, required: true },
    y_min: { type: Number, required: true },
    y_max: { type: Number, required: true },
});

module.exports = mongoose.model("Character", CharacterSchema);