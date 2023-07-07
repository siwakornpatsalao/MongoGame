const mongoose = require('mongoose');
const axios = require('axios');
/* 
mongoose
  .connect('mongodb+srv://Pure:1234@cluster0.cy0kfn9.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connection successful news!'))
  .catch((err) => console.error(err));  
 */
const NewsSchema = new mongoose.Schema({
    title: String,
    article_url: String,
    thumbnail: String,
    short_description: String,
    main_image: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);
/* 
const News = mongoose.model('News', NewsSchema);

const API = 'https://www.mmobomb.com/api1/latestnews';

async function getData() {
  try {
    const res = await axios.get(API);
    const data = res.data;
    const inserted = await News.insertMany(data);
    console.log(inserted);
    process.exit(0);
  } catch (err) {
    console.error('An error occurred:', err.message);
    process.exit(1);
  }
}

getData();  */