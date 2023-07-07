const mongoose = require('mongoose');
const axios = require('axios');

/* mongoose
  .connect('mongodb+srv://Pure:1234@cluster0.cy0kfn9.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connection successful!'))
  .catch((err) => console.error(err)); */

const GameSchema = new mongoose.Schema({
    id: Number,
    thumbnail: String,
    title: String,
    release_date: String,
    genre: String,
    platform: String,
    publisher: String,
    developer: String,
    short_description: String,
    game_url: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', GameSchema);

/* const Game = mongoose.model('Game', GameSchema);

const API = 'https://www.mmobomb.com/api1/games';

async function getData() {
  try {
    const res = await axios.get(API);
    const data = res.data;
    const inserted = await Game.insertMany(data);
    console.log(inserted);
    process.exit(0);
  } catch (err) {
    console.error('An error occurred:', err.message);
    process.exit(1);
  }
}

getData(); */
