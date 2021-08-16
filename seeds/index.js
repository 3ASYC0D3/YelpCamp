
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err'));
db.once('open', () => {
    console.log('Database connected');
});


const seedDB = async () => {
    await Campground.deleteMany({});
    const random1000 = Math.floor(Math.random()*1000);
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*40) + 10;
        const sample = array => array[Math.floor(Math.random() * array.length)];
        const camp = new Campground({
            author: '61168c48446bd001e024ab68',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            image: 'https://source.unsplash.com/collection/483251/960x540', 
            description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.',
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
});