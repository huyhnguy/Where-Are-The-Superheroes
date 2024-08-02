#! /usr/bin/env node

const Character = require("./models/character.js");

const characters = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCharacters();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function characterCreate(index, name, xmin, xmax, ymin, ymax) {
    const character = new Character({
        name: name,
        x_min: xmin,
        x_max: xmax,
        y_min: ymin,
        y_max: ymax
    });

    await character.save();
    characters[index] = character;
    console.log(`added character: ${name}`);
}

async function createCharacters() {
    console.log('adding all characters');
    await Promise.all([
        characterCreate(0, "Deadpool", 0.73, 0.75, 0.72, 0.77),
        characterCreate(1, "Flash", 0.42, 0.44, 0.59, 0.63),
        characterCreate(2, "Spiderman", 0.75, 0.77, 0.18, 0.21),
    ])
}