if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places, images } = require('./seedHelpers');
const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const dbUrl = process.env.DB_URL;
// const dbUrl = 'mongodb://localhost:27017/yelp-camp';
const User = require('../models/user');

// 'mongodb://localhost:27017/yelp-camp' <-- local db 

mongoose.connect(dbUrl, {
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
    const allUsers = await User.find();
    const authorsIds = [];
    for (let user of allUsers) {
        authorsIds.push(user.id);
    };
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*40) + 10;
        const sample = array => array[Math.floor(Math.random() * array.length)];
        const location = `${cities[random1000].city}, ${cities[random1000].state}`;
        const geoData = await geocoder.forwardGeocode({
            query: location,
            limit: 1
        }).send();
        const geometry = geoData.body.features[0].geometry;
        const drawImages= () => {
            const campImages = [];
            for (let img = 0; img < 3; img++) {
                campImages.push(images[Math.floor(Math.random() * images.length)]);
            };
            return campImages;
        }
        const camp = new Campground({
            author: sample(authorsIds),
            location,
            geometry,
            title: `${sample(descriptors)} ${sample(places)}`, 
            description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.',
            price,
            images: drawImages()
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
});