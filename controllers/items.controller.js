const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addItemController = async (req, res) => {
  try {
    const itemsCreate = await models.items.create({
      item_name: req.body.item_name,
      item_content: req.body.item_content,
      price: req.body.price,
      item_count: req.body.item_count,
    });
    return res.json({
      itemsCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
// update item content
const updateitemController = async (req, res) => {
  try {
    const itemsUpdate = await models.items.update(
      {
        item_name: req.body.item_name,
        item_content: req.body.item_content,
        price: req.body.price,
        item_count: req.body.item_count,
      },
      {
        where: {
          item_id: req.query.item_id,
        },
        returning: true,
      }
    );
    return res.json({
      itemsUpdate,
    });
  } catch {
    console.log(error);
    return res.send(error);
  }
};
// get all items
const getallitemcontroller = async (req, res) => {
  try {
    const items = await models.items.findAll();

    return res.json({
      items,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// get single item by id
const getbysingleitemcontroller = async (req, res) => {
  try {
    const items = await models.items.findAll({
      where: {
        item_id: req.query.item_id,
      },
    });

    return res.json({
      items,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// Sort price
const sortItemPriceController = async (req, res) => {
  try {
    const { sortOrder } = req.query;

    if (sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
      const items = await models.items.findAll({
        order: [["price", sortOrder]],
      });

      return res.json({
        items,
      });
    } else {
      return res.status(400).json({
        error: 'Invalid sortOrder parameter. Use "asc" or "desc".',
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

// sort  item name
const sortItemNameController = async (req, res) => {
  try {
    const { sortOrder } = req.query;

    if (
      sortOrder &&
      (sortOrder.toLowerCase() === "asc" || sortOrder.toLowerCase() === "desc")
    ) {
      const items = await models.items.findAll({
        order: [["item_name", sortOrder.toUpperCase()]],
      });

      return res.json({
        items,
      });
    } else {
      return res.status(400).json({
        error: 'Invalid sortOrder parameter. Use "asc" or "desc".',
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

// filter by price

const filterItemPricecontroller = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    const items = await models.items.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice],
        },
      },
      order: [["price", "ASC"]],
    });

    return res.json({
      items,
    });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

//  search by item name
const SearchItemNamecontroller = async (req, res) => {
  try {
    const itemsFind = await models.items.findAndCountAll({
      attributes: ["item_name"],
      where: {
        item_name: {
          [Op.iLike]: `%${req.query.item_name}%`,
        },
      },
      logging: true,
    });
    return res.json({
      itemsFind,
    });
  } catch (error) {
    console.log("\n error...", error);
    return res.send(error);
  }
};
module.exports = {
  addItemController,
  updateitemController,
  getallitemcontroller,
  getbysingleitemcontroller,
  filterItemPricecontroller,
  SearchItemNamecontroller,
  sortItemNameController,
  sortItemPriceController,
};
