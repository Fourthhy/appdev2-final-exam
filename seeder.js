const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error('DB Connection Error:', err));

const seedDatabase = async () => {
    try {
        console.log('Clearing existing users and events...');
        await User.deleteMany({});
        await Event.deleteMany({});
        console.log('Existing data cleared.');

        // --- Seed at least 5 Fake Users ---
        console.log('Seeding fake users...');
        const usersToCreate = 5;
        const defaultPassword = 'secret123';

        const usersData = [];
        for (let i = 0; i < usersToCreate; i++) {
            usersData.push({
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                password: defaultPassword,
            });
        }
        
        
        const createdUsers = await User.insertMany(usersData);
        console.log(`${createdUsers.length} users seeded.`);

        // --- Seed at least 10 Fake Events, each linked to a random user ---
        console.log('Seeding fake events...');
        const eventsToCreate = 10;
        const eventsData = [];

        for (let i = 0; i < eventsToCreate; i++) {
            const randomUser = faker.helpers.arrayElement(createdUsers);
            const eventDate = faker.date.future({ years: 1, refDate: new Date() });

            eventsData.push({
                title: faker.lorem.words({ min: 4, max: 10 }) + ' ' + faker.helpers.arrayElement(['Conference', 'Workshop', 'Meetup', 'Festival', 'Webinar', 'Gala']),
                description: faker.lorem.paragraphs({ min: 1, max: 2}),
                location: faker.location.streetAddress({ useFullAddress: true }) + ', ' + faker.location.city() + ', ' + faker.location.stateAbbr(),
                date: eventDate,
                userId: randomUser._id,
            });
        }

        const createdEvents = await Event.insertMany(eventsData);
        console.log(`${createdEvents.length} events seeded.`);

        console.log('Database seeding complete!');
        process.exit();

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1); 
    }
};

seedDatabase();