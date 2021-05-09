import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { product, productId } from './product';

export interface order_itemAttributes {
  id: number;
  productId: number;
  orderId: number;
  SKU: string;
  barcode: string;
  price?: number;
  discount?: number;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
  content?: string;
}

export type order_itemPk = "id";
export type order_itemId = order_item[order_itemPk];
export type order_itemCreationAttributes = Optional<order_itemAttributes, order_itemPk>;

export class order_item extends Model<order_itemAttributes, order_itemCreationAttributes> implements order_itemAttributes {
  id!: number;
  productId!: number;
  orderId!: number;
  SKU!: string;
  barcode!: string;
  price?: number;
  discount?: number;
  quantity!: number;
  createdAt!: Date;
  updatedAt?: Date;
  content?: string;

  // order_item belongsTo order via orderId
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // order_item belongsTo product via productId
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_item {
    order_item.init({
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
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    SKU: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    barcode: {
      type: DataTypes.STRING(100),
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
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
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
    tableName: 'order_item',
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
        name: "fk_order_item_product1_idx",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "fk_order_item_order1_idx",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
  return order_item;
  }
}
