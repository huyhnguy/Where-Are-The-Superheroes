const Character = "./models/character.js";

const characters = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCharacters();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function characterCreate({ name, xmin, xmax, ymin, ymax }) {
    const character = new Character({

        x_min: 
    })
}