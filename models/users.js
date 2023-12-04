const helper = require("../services/helper");
const bcrypt = require('bcryptjs');

module.exports = function model(sequelize, types) {
    const Users = sequelize.define('users', {
        uuid: {
            type: types.UUID,
            defaultValue: types.UUIDV4,
            primarykey: true,
            unique: true,
        },
        name: {
            type: types.STRING,
            defaultValue: ''
        },
        username: {
            type: types.STRING,
            allowNull: false
        },
        password: {
            type: types.STRING,
            allowNull: false
        },
        status: {
            type: types.STRING,
            defaultValue: 'Active'
        },
    }, {
        tableName: 'users',
        // defaultScope: {
        //     where: {
        //         status: 'Active'
        //     }
        // }
    });

    Users.beforeCreate(async (user) => {
        try {
            if (user.password) {
                user.password = await helper.hashPassword(user.password);
            }
        } catch (error) {
            console.log('\n save password hash error...', error);
        }
    });
    Users.addHook('beforeUpdate', async (user) => {
        try {
            if (user.changed('password') && user.password) {
                user.password = await commonService.hashPassword(user.password);
            }
        } catch (error) {
            console.log('\n update password hash error...', error);
        }
    });

    Users.associate = function (models) {
        Users.hasMany(models.posts, {
            as: 'posts',
            foreignKey: 'userId',
            sourceKey: 'uuid',
        });
    };

    return Users;
};