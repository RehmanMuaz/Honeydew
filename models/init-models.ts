import type { Sequelize, Model } from "sequelize";
import { cart } from "./cart";
import type { cartAttributes, cartCreationAttributes } from "./cart";
import { cart_item } from "./cart_item";
import type { cart_itemAttributes, cart_itemCreationAttributes } from "./cart_item";
import { category } from "./category";
import type { categoryAttributes, categoryCreationAttributes } from "./category";
import { country } from "./country";
import type { countryAttributes, countryCreationAttributes } from "./country";
import { order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";
import { order_item } from "./order_item";
import type { order_itemAttributes, order_itemCreationAttributes } from "./order_item";
import { product } from "./product";
import type { productAttributes, productCreationAttributes } from "./product";
import { product_category } from "./product_category";
import type { product_categoryAttributes, product_categoryCreationAttributes } from "./product_category";
import { product_meta } from "./product_meta";
import type { product_metaAttributes, product_metaCreationAttributes } from "./product_meta";
import { product_review } from "./product_review";
import type { product_reviewAttributes, product_reviewCreationAttributes } from "./product_review";
import { product_tag } from "./product_tag";
import type { product_tagAttributes, product_tagCreationAttributes } from "./product_tag";
import { tag } from "./tag";
import type { tagAttributes, tagCreationAttributes } from "./tag";
import { transaction } from "./transaction";
import type { transactionAttributes, transactionCreationAttributes } from "./transaction";
import { user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
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

export type {
  cartAttributes,
  cartCreationAttributes,
  cart_itemAttributes,
  cart_itemCreationAttributes,
  categoryAttributes,
  categoryCreationAttributes,
  countryAttributes,
  countryCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
  order_itemAttributes,
  order_itemCreationAttributes,
  productAttributes,
  productCreationAttributes,
  product_categoryAttributes,
  product_categoryCreationAttributes,
  product_metaAttributes,
  product_metaCreationAttributes,
  product_reviewAttributes,
  product_reviewCreationAttributes,
  product_tagAttributes,
  product_tagCreationAttributes,
  tagAttributes,
  tagCreationAttributes,
  transactionAttributes,
  transactionCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  cart.initModel(sequelize);
  cart_item.initModel(sequelize);
  category.initModel(sequelize);
  country.initModel(sequelize);
  order.initModel(sequelize);
  order_item.initModel(sequelize);
  product.initModel(sequelize);
  product_category.initModel(sequelize);
  product_meta.initModel(sequelize);
  product_review.initModel(sequelize);
  product_tag.initModel(sequelize);
  tag.initModel(sequelize);
  transaction.initModel(sequelize);
  user.initModel(sequelize);

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
    cart: cart,
    cart_item: cart_item,
    category: category,
    country: country,
    order: order,
    order_item: order_item,
    product: product,
    product_category: product_category,
    product_meta: product_meta,
    product_review: product_review,
    product_tag: product_tag,
    tag: tag,
    transaction: transaction,
    user: user,
  };
}
