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
        defaultValue: "",
      },
      email: {
        type: types.STRING,
        defaultValue: "",
      },
      user_password: {
        type: types.STRING,
        defaultValue: "",
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

  return Users;
};
