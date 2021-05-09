import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cart, cartId } from './cart';
import type { product, productId } from './product';

export interface cart_itemAttributes {
  id: number;
  productId: number;
  cartId: number;
  type: number;
  SKU: string;
  barcode: string;
  quantity: string;
  price?: number;
  discount?: number;
  createdAt: Date;
  updatedAt?: Date;
  content?: string;
}

export type cart_itemPk = "id";
export type cart_itemId = cart_item[cart_itemPk];
export type cart_itemCreationAttributes = Optional<cart_itemAttributes, cart_itemPk>;

export class cart_item extends Model<cart_itemAttributes, cart_itemCreationAttributes> implements cart_itemAttributes {
  id!: number;
  productId!: number;
  cartId!: number;
  type!: number;
  SKU!: string;
  barcode!: string;
  quantity!: string;
  price?: number;
  discount?: number;
  createdAt!: Date;
  updatedAt?: Date;
  content?: string;

  // cart_item belongsTo cart via cartId
  cart!: cart;
  getCart!: Sequelize.BelongsToGetAssociationMixin<cart>;
  setCart!: Sequelize.BelongsToSetAssociationMixin<cart, cartId>;
  createCart!: Sequelize.BelongsToCreateAssociationMixin<cart>;
  // cart_item belongsTo product via productId
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cart_item {
    cart_item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    cartId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id'
      }
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
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },    
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },    
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cart_item',
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
        name: "fk_cart_item_product1_idx",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "fk_cart_item_cart1_idx",
        using: "BTREE",
        fields: [
          { name: "cartId" },
        ]
      },
    ]
  });
  return cart_item;
  }
}
