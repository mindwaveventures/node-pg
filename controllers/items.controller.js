const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

// To get list of items
const getItemsController = async (req, res, next) => {
  try {
    const getItems = await models.items.findAll();

    return res.json({
      getItems,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// To add a item
const addItemController = async (req, res, next) => {
  try {
    const addItem = await models.items.create({
      item_name: req.body.item_name,
      item_content: req.body.item_content,
      item_price: req.body.item_price,
      item_count: req.body.item_count,
    });
    return res.json({
      addItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// To update item content
const updateItemContentController = async (req, res, next) => {
  try {
    const updateItem = await models.items.update(
      {
        item_name: req.body.item_name,
        item_content: req.body.item_content,
        item_price: req.body.item_price,
        item_count: req.body.item_count,
      },
      {
        where: {
          item_id: req.params.id,
        },
        returning: true,
      }
    );

    res.json({
      updateItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// To get single item
const getSingleItemController = async (req, res, next) => {
  try {
    const getSingleItem = await models.items.findAll({
      where: {
        item_id: req.params.id,
      },
    });

    return res.json({
      getSingleItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// Sort price in ascending order
const sortPriceAscController = async (req, res, next) => {
  try {
    const sortItem = await models.items.findAll({
      order: [["item_price", "ASC"]],
    });

    return res.json({
      sortItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// Sort price in descending order
const sortPriceDescController = async (req, res, next) => {
  try {
    const sortItem = await models.items.findAll({
      order: [["item_price", "DESC"]],
    });

    return res.json({
      sortItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

//ascending by item name
const sortItemnameAscController = async (req, res, next) => {
  try {
    const sortItem = await models.items.findAll({
      order: [["item_name", "ASC"]],
    });

    return res.json({
      sortItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

//Descending by item name
const sortItemnameDescController = async (req, res, next) => {
  try {
    const sortItem = await models.items.findAll({
      order: [["item_name", "DESC"]],
    });

    return res.json({
      sortItem,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// to filter the price range
const filterPriceController = async (req, res, next) => {
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
    return next({
      status: 400,
      message: error.message,
    });
  }
};

// To search
const searchController = async (req, res, next) => {
  try {
    const itemsFind = await models.items.findAndCountAll({
      attributes: ["item_name"],
      where: {
        item_name: {
          [Op.iLike]: `%${req.query.item_name}`,
        },
      },
    });
    return res.json({
      itemsFind,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = {
  addItemController,
  updateItemContentController,
  getSingleItemController,
  getItemsController,
  sortPriceAscController,
  sortPriceDescController,
  sortItemnameAscController,
  sortItemnameDescController,
  filterPriceController,
  searchController,
};
