module.exports = function model(sequelize, types) {
  const Items = sequelize.define(
    "items",
    {
      item_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      item_name: {
        type: types.STRING,
        defaultValue: "",
      },
      item_content: {
        type: types.STRING,
        defaultValue: "",
      },
      price: {
        type: types.DECIMAL(10, 2),
        defaultValue: 0,
      },
      item_count: {
        type: types.INTEGER,
        defaultValue: 0,
      },
    },

    {
      tableName: "items",
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  //   Items.associate = function (models) {
  //     Items.belongsTo(models.users, {
  //       as: "userData",
  //       foreignKey: "userId",
  //       targetKey: "uuid",
  //     });
  //   };

  return Items;
};

// CREATE TABLE items (
//     item_id SERIAL PRIMARY KEY,
//     item_name VARCHAR not null,
//     item_content VARCHAR,
//     price DECIMAL(10, 2) not null,
//     item_count integer not null
// );

// userId: {
//     type: types.UUID,
//     references: {
//       model: {
//         tableName: "users",
//       },
//       key: "uuid",
//     },
//     allowNull: false,
//     onDelete: "CASCADE",
//   },
