const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword1 = await bcrypt.hash('password123', 10);
        const hashedPassword2 = await bcrypt.hash('securepass456', 10);

        await queryInterface.bulkInsert('Users', [
            {
                username: 'user1',
                password: hashedPassword1,
                acknowledgments: JSON.stringify([{ location: 'Vancouver', text: 'We acknowledge...' }]),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'user2',
                password: hashedPassword2,
                acknowledgments: JSON.stringify([{ location: 'Toronto', text: 'We respectfully...' }]),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
