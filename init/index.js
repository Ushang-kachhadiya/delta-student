const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");



main().then(() => {
    console.log("connect to DB")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    // give me solution owner name not show in data base
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "66b45fdcf5d01d23cc1a0afe"
    }));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();

