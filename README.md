## To use node to connect to databse and query it

### Use PgClient to config and query

## Joi for validation

## Add Rating to items

## Add items to cart

### For using Transactions

    https://node-postgres.com/features/transactions

## To run

    npm i
    npm run dev

<!-- app.get("/fav", async function (req, res) {
  try {
    let query =
      "SELECT items.* FROM items JOIN favourites ON items.item_id = favourites.item_id";

    //http://localhost:5001/fav?user_id=2
    if (req.query.user_id) {
      query += ` WHERE favourites.user_id = ${req.query.user_id}`;
    }

    // Adding search
    //http://localhost:5001/fav?search=Cashews
    // if (req.query.search) {
    //   if (req.query.category) {
    //     query += ` AND`;
    //   }
    //   else {
    //     query += ` WHERE`;
    //   }
    //   query += ` items.item_name ILIKE '%${req.query.search}%'`;
    // }

    if (req.query.search) {
        query += ` WHERE items.item_name ILIKE '%${req.query.search}%'`;
      }
       -->
