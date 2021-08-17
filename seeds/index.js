
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
            description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629219781/YelpCamp/SKT14162_rggsrv.jpg',
                    filename: 'YelpCamp/SKT14162_rggsrv'
                },
                {
                    url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629219771/YelpCamp/SKT14088_xtr7o5.jpg',
                    filename: 'YelpCamp/SKT14088_xtr7o5'
                },
                {
                    url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629219770/YelpCamp/SKT13452_kwd2gp.jpg',
                    filename: 'YelpCamp/SKT13452_kwd2gp'
                },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215744/YelpCamp/mrsvzaxt0dx3e73rxnsx.jpg',
                //     filename: 'YelpCamp/mrsvzaxt0dx3e73rxnsx'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215482/YelpCamp/tpozsuexowmnllz5fscg.jpg',
                //     filename: 'YelpCamp/tpozsuexowmnllz5fscg'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215744/YelpCamp/mrsvzaxt0dx3e73rxnsx.jpg',
                //     filename: 'YelpCamp/mrsvzaxt0dx3e73rxnsx'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215482/YelpCamp/tpozsuexowmnllz5fscg.jpg',
                //     filename: 'YelpCamp/tpozsuexowmnllz5fscg'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215744/YelpCamp/mrsvzaxt0dx3e73rxnsx.jpg',
                //     filename: 'YelpCamp/mrsvzaxt0dx3e73rxnsx'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215482/YelpCamp/tpozsuexowmnllz5fscg.jpg',
                //     filename: 'YelpCamp/tpozsuexowmnllz5fscg'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215744/YelpCamp/mrsvzaxt0dx3e73rxnsx.jpg',
                //     filename: 'YelpCamp/mrsvzaxt0dx3e73rxnsx'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215482/YelpCamp/tpozsuexowmnllz5fscg.jpg',
                //     filename: 'YelpCamp/tpozsuexowmnllz5fscg'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215744/YelpCamp/mrsvzaxt0dx3e73rxnsx.jpg',
                //     filename: 'YelpCamp/mrsvzaxt0dx3e73rxnsx'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215482/YelpCamp/tpozsuexowmnllz5fscg.jpg',
                //     filename: 'YelpCamp/tpozsuexowmnllz5fscg'
                // },
                // {
                //     url: 'https://res.cloudinary.com/darioyelpcamp/image/upload/v1629215744/YelpCamp/mrsvzaxt0dx3e73rxnsx.jpg',
                //     filename: 'YelpCamp/mrsvzaxt0dx3e73rxnsx'
                // },
        
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
});