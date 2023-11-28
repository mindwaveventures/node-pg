module.exports = function model(sequelize, types) {
    const Posts = sequelize.define('posts', {
        uuid: {
            type: types.UUID,
            defaultValue: types.UUIDV4,
            primarykey: true,
            unique: true,
        },
        content: {
            type: types.TEXT,
            defaultValue: ''
        },
        userId: {
            type: types.UUID,
            references: {
                model: {
                    tableName: 'users',
                },
                key: 'uuid',
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        status: {
            type: types.STRING,
            defaultValue: 'Active'
        },
    }, {
        tableName: 'posts',
        // defaultScope: {
        //     where: {
        //         status: 'Active'
        //     }
        // }
    });

    Posts.associate = function (models) {
        Posts.belongsTo(models.users, {
            as: 'userData',
            foreignKey: 'userId',
            targetKey: 'uuid',
        });
    };

    return Posts;
};