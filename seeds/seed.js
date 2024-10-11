// entry for models
const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        console.log("Users seeded successfully");
        // const blogs = await Blog.bulkCreate(blogData, {
        //     returning: true,
        // });

        for (const blog of blogData) {
            await Blog.create({
                ...blog,
            });
        };
        console.log('Blog posts seeded successfully');

        process.exit(0);
}

seedDatabase();