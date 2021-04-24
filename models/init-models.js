var DataTypes = require("sequelize").DataTypes;
var _cart = require("./cart");
var _cart_item = require("./cart_item");
var _category = require("./category");
var _country = require("./country");
var _order = require("./order");
var _order_item = require("./order_item");
var _product = require("./product");
var _product_category = require("./product_category");
var _product_meta = require("./product_meta");
var _product_review = require("./product_review");
var _product_tag = require("./product_tag");
var _tag = require("./tag");
var _transaction = require("./transaction");
var _user = require("./user");

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);
  var cart_item = _cart_item(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var country = _country(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_item = _order_item(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var product_meta = _product_meta(sequelize, DataTypes);
  var product_review = _product_review(sequelize, DataTypes);
  var product_tag = _product_tag(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  category.belongsToMany(product, { as: 'products', through: product_category, foreignKey: "categoryId", otherKey: "productId" });
  product.belongsToMany(category, { as: 'categories', through: product_category, foreignKey: "productId", otherKey: "categoryId" });
  product.belongsToMany(tag, { as: 'tags', through: product_tag, foreignKey: "productId", otherKey: "tagId" });
  tag.belongsToMany(product, { as: 'products', through: product_tag, foreignKey: "tagId", otherKey: "productId" });
  cart_item.belongsTo(cart, { as: "cart", foreignKey: "cartId"});
  cart.hasMany(cart_item, { as: "cart_items", foreignKey: "cartId"});
  product_category.belongsTo(category, { as: "category", foreignKey: "categoryId"});
  category.hasMany(product_category, { as: "product_categories", foreignKey: "categoryId"});
  product.belongsTo(country, { as: "country", foreignKey: "countryID"});
  country.hasMany(product, { as: "products", foreignKey: "countryID"});
  order_item.belongsTo(order, { as: "order", foreignKey: "orderId"});
  order.hasMany(order_item, { as: "order_items", foreignKey: "orderId"});
  transaction.belongsTo(order, { as: "order", foreignKey: "orderId"});
  order.hasMany(transaction, { as: "transactions", foreignKey: "orderId"});
  cart_item.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(cart_item, { as: "cart_items", foreignKey: "productId"});
  order_item.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(order_item, { as: "order_items", foreignKey: "productId"});
  product_category.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(product_category, { as: "product_categories", foreignKey: "productId"});
  product_meta.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(product_meta, { as: "product_meta", foreignKey: "productId"});
  product_review.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(product_review, { as: "product_reviews", foreignKey: "productId"});
  product_tag.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(product_tag, { as: "product_tags", foreignKey: "productId"});
  product_tag.belongsTo(tag, { as: "tag", foreignKey: "tagId"});
  tag.hasMany(product_tag, { as: "product_tags", foreignKey: "tagId"});
  cart.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(cart, { as: "carts", foreignKey: "userId"});
  order.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(order, { as: "orders", foreignKey: "userId"});
  product.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(product, { as: "products", foreignKey: "userId"});
  transaction.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(transaction, { as: "transactions", foreignKey: "userId"});

  return {
    cart,
    cart_item,
    category,
    country,
    order,
    order_item,
    product,
    product_category,
    product_meta,
    product_review,
    product_tag,
    tag,
    transaction,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
