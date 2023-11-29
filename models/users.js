module.exports = function model(sequelize, types) {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
        defaultValue: "",
      },
      last_name: {
        type: types.STRING,
        defaultValue: "",
      },
      user_name: {
        type: types.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: types.STRING,
        allowNull: false,
      },
      user_password: {
        type: types.STRING,
        allowNull: false,
      },
      phone_no: {
        type: types.STRING,
        defaultValue: "",
      },
    },
    {
      tableName: "users",
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  Users.associate = function (models) {
    Users.hasMany(models.posts, {
      as: "posts",
      foreignKey: "userId",
      sourceKey: "uuid",
    });
  };

  return Users;
};

// create table account_users (
//     id SERIAL primary key,
//     first_name VARCHAR not null,
//     last_name VARCHAR ,
//     user_name VARCHAR not null unique,
//     email VARCHAR not null,
//     user_password VARCHAR not null,
//     phone_no VARCHAR,
//     created_at TIMESTAMP default current_timestamp
// )
