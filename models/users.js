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

    Users.associate = function (models) {
        Users.hasMany(models.posts, {
            as: 'posts',
            foreignKey: 'userId',
            sourceKey: 'uuid',
        });
    };

    return Users;
};