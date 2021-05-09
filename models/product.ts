import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cart_item, cart_itemId } from './cart_item';
import type { category, categoryId } from './category';
import type { country, countryId } from './country';
import type { order_item, order_itemId } from './order_item';
import type { product_category, product_categoryId } from './product_category';
import type { product_meta, product_metaId } from './product_meta';
import type { product_review, product_reviewId } from './product_review';
import type { product_tag, product_tagId } from './product_tag';
import type { tag, tagId } from './tag';
import type { user, userId } from './user';

export interface productAttributes {
  id: number;
  userId: number;
  title: string;
  metaTitle?: string;
  slug: string;
  type: number;
  SKU: string;
  barcode: string;
  quantity: string;
  price?: number;
  summary: string;
  discount?: number;
  cost?: string;
  forSale?: number;
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  startsAt?: Date;
  endsAt?: Date;
  content?: string;
  weight: number;
  countryID: number;
}

export type productPk = "id";
export type productId = product[productPk];
export type productCreationAttributes = Optional<productAttributes, productPk>;

export class product extends Model<productAttributes, productCreationAttributes> implements productAttributes {
  id!: number;
  userId!: number;
  title!: string;
  metaTitle?: string;
  slug!: string;
  type!: number;
  SKU!: string;
  barcode!: string;
  quantity!: string;
  price?: number;
  summary!: string;
  discount?: number;
  cost?: string;
  forSale?: number;
  createdAt!: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  startsAt?: Date;
  endsAt?: Date;
  content?: string;
  weight!: number;
  countryID!: number;

  // product belongsTo country via countryID
  country!: country;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<country>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<country, countryId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<country>;
  // product hasMany cart_item via productId
  cart_items!: cart_item[];
  getCart_items!: Sequelize.HasManyGetAssociationsMixin<cart_item>;
  setCart_items!: Sequelize.HasManySetAssociationsMixin<cart_item, cart_itemId>;
  addCart_item!: Sequelize.HasManyAddAssociationMixin<cart_item, cart_itemId>;
  addCart_items!: Sequelize.HasManyAddAssociationsMixin<cart_item, cart_itemId>;
  createCart_item!: Sequelize.HasManyCreateAssociationMixin<cart_item>;
  removeCart_item!: Sequelize.HasManyRemoveAssociationMixin<cart_item, cart_itemId>;
  removeCart_items!: Sequelize.HasManyRemoveAssociationsMixin<cart_item, cart_itemId>;
  hasCart_item!: Sequelize.HasManyHasAssociationMixin<cart_item, cart_itemId>;
  hasCart_items!: Sequelize.HasManyHasAssociationsMixin<cart_item, cart_itemId>;
  countCart_items!: Sequelize.HasManyCountAssociationsMixin;
  // product belongsToMany category via productId and categoryId
  categories!: category[];
  getCategories!: Sequelize.BelongsToManyGetAssociationsMixin<category>;
  setCategories!: Sequelize.BelongsToManySetAssociationsMixin<category, categoryId>;
  addCategory!: Sequelize.BelongsToManyAddAssociationMixin<category, categoryId>;
  addCategories!: Sequelize.BelongsToManyAddAssociationsMixin<category, categoryId>;
  createCategory!: Sequelize.BelongsToManyCreateAssociationMixin<category>;
  removeCategory!: Sequelize.BelongsToManyRemoveAssociationMixin<category, categoryId>;
  removeCategories!: Sequelize.BelongsToManyRemoveAssociationsMixin<category, categoryId>;
  hasCategory!: Sequelize.BelongsToManyHasAssociationMixin<category, categoryId>;
  hasCategories!: Sequelize.BelongsToManyHasAssociationsMixin<category, categoryId>;
  countCategories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // product hasMany order_item via productId
  order_items!: order_item[];
  getOrder_items!: Sequelize.HasManyGetAssociationsMixin<order_item>;
  setOrder_items!: Sequelize.HasManySetAssociationsMixin<order_item, order_itemId>;
  addOrder_item!: Sequelize.HasManyAddAssociationMixin<order_item, order_itemId>;
  addOrder_items!: Sequelize.HasManyAddAssociationsMixin<order_item, order_itemId>;
  createOrder_item!: Sequelize.HasManyCreateAssociationMixin<order_item>;
  removeOrder_item!: Sequelize.HasManyRemoveAssociationMixin<order_item, order_itemId>;
  removeOrder_items!: Sequelize.HasManyRemoveAssociationsMixin<order_item, order_itemId>;
  hasOrder_item!: Sequelize.HasManyHasAssociationMixin<order_item, order_itemId>;
  hasOrder_items!: Sequelize.HasManyHasAssociationsMixin<order_item, order_itemId>;
  countOrder_items!: Sequelize.HasManyCountAssociationsMixin;
  // product hasMany product_category via productId
  product_categories!: product_category[];
  getProduct_categories!: Sequelize.HasManyGetAssociationsMixin<product_category>;
  setProduct_categories!: Sequelize.HasManySetAssociationsMixin<product_category, product_categoryId>;
  addProduct_category!: Sequelize.HasManyAddAssociationMixin<product_category, product_categoryId>;
  addProduct_categories!: Sequelize.HasManyAddAssociationsMixin<product_category, product_categoryId>;
  createProduct_category!: Sequelize.HasManyCreateAssociationMixin<product_category>;
  removeProduct_category!: Sequelize.HasManyRemoveAssociationMixin<product_category, product_categoryId>;
  removeProduct_categories!: Sequelize.HasManyRemoveAssociationsMixin<product_category, product_categoryId>;
  hasProduct_category!: Sequelize.HasManyHasAssociationMixin<product_category, product_categoryId>;
  hasProduct_categories!: Sequelize.HasManyHasAssociationsMixin<product_category, product_categoryId>;
  countProduct_categories!: Sequelize.HasManyCountAssociationsMixin;
  // product hasMany product_meta via productId
  product_meta!: product_meta[];
  getProduct_meta!: Sequelize.HasManyGetAssociationsMixin<product_meta>;
  setProduct_meta!: Sequelize.HasManySetAssociationsMixin<product_meta, product_metaId>;
  addProduct_metum!: Sequelize.HasManyAddAssociationMixin<product_meta, product_metaId>;
  addProduct_meta!: Sequelize.HasManyAddAssociationsMixin<product_meta, product_metaId>;
  createProduct_metum!: Sequelize.HasManyCreateAssociationMixin<product_meta>;
  removeProduct_metum!: Sequelize.HasManyRemoveAssociationMixin<product_meta, product_metaId>;
  removeProduct_meta!: Sequelize.HasManyRemoveAssociationsMixin<product_meta, product_metaId>;
  hasProduct_metum!: Sequelize.HasManyHasAssociationMixin<product_meta, product_metaId>;
  hasProduct_meta!: Sequelize.HasManyHasAssociationsMixin<product_meta, product_metaId>;
  countProduct_meta!: Sequelize.HasManyCountAssociationsMixin;
  // product hasMany product_review via productId
  product_reviews!: product_review[];
  getProduct_reviews!: Sequelize.HasManyGetAssociationsMixin<product_review>;
  setProduct_reviews!: Sequelize.HasManySetAssociationsMixin<product_review, product_reviewId>;
  addProduct_review!: Sequelize.HasManyAddAssociationMixin<product_review, product_reviewId>;
  addProduct_reviews!: Sequelize.HasManyAddAssociationsMixin<product_review, product_reviewId>;
  createProduct_review!: Sequelize.HasManyCreateAssociationMixin<product_review>;
  removeProduct_review!: Sequelize.HasManyRemoveAssociationMixin<product_review, product_reviewId>;
  removeProduct_reviews!: Sequelize.HasManyRemoveAssociationsMixin<product_review, product_reviewId>;
  hasProduct_review!: Sequelize.HasManyHasAssociationMixin<product_review, product_reviewId>;
  hasProduct_reviews!: Sequelize.HasManyHasAssociationsMixin<product_review, product_reviewId>;
  countProduct_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // product hasMany product_tag via productId
  product_tags!: product_tag[];
  getProduct_tags!: Sequelize.HasManyGetAssociationsMixin<product_tag>;
  setProduct_tags!: Sequelize.HasManySetAssociationsMixin<product_tag, product_tagId>;
  addProduct_tag!: Sequelize.HasManyAddAssociationMixin<product_tag, product_tagId>;
  addProduct_tags!: Sequelize.HasManyAddAssociationsMixin<product_tag, product_tagId>;
  createProduct_tag!: Sequelize.HasManyCreateAssociationMixin<product_tag>;
  removeProduct_tag!: Sequelize.HasManyRemoveAssociationMixin<product_tag, product_tagId>;
  removeProduct_tags!: Sequelize.HasManyRemoveAssociationsMixin<product_tag, product_tagId>;
  hasProduct_tag!: Sequelize.HasManyHasAssociationMixin<product_tag, product_tagId>;
  hasProduct_tags!: Sequelize.HasManyHasAssociationsMixin<product_tag, product_tagId>;
  countProduct_tags!: Sequelize.HasManyCountAssociationsMixin;
  // product belongsToMany tag via productId and tagId
  tags!: tag[];
  getTags!: Sequelize.BelongsToManyGetAssociationsMixin<tag>;
  setTags!: Sequelize.BelongsToManySetAssociationsMixin<tag, tagId>;
  addTag!: Sequelize.BelongsToManyAddAssociationMixin<tag, tagId>;
  addTags!: Sequelize.BelongsToManyAddAssociationsMixin<tag, tagId>;
  createTag!: Sequelize.BelongsToManyCreateAssociationMixin<tag>;
  removeTag!: Sequelize.BelongsToManyRemoveAssociationMixin<tag, tagId>;
  removeTags!: Sequelize.BelongsToManyRemoveAssociationsMixin<tag, tagId>;
  hasTag!: Sequelize.BelongsToManyHasAssociationMixin<tag, tagId>;
  hasTags!: Sequelize.BelongsToManyHasAssociationsMixin<tag, tagId>;
  countTags!: Sequelize.BelongsToManyCountAssociationsMixin;
  // product belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product {
    product.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    metaTitle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SKU: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    barcode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    cost: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    forSale: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },    
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    countryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_product_user1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_product_country1_idx",
        using: "BTREE",
        fields: [
          { name: "countryID" },
        ]
      },
    ]
  });
  return product;
  }
}
