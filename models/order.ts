import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_item, order_itemId } from './order_item';
import type { transaction, transactionId } from './transaction';
import type { user, userId } from './user';

export interface orderAttributes {
  id: number;
  userId?: number;
  sessionId: string;
  token: string;
  status: number;
  subTotal: number;
  itemDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  promo?: string;
  discount: number;
  grandTotal: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  line1?: string;
  line2?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt: Date;
  updatedAt?: Date;
  content?: string;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderCreationAttributes = Optional<orderAttributes, orderPk>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  userId?: number;
  sessionId!: string;
  token!: string;
  status!: number;
  subTotal!: number;
  itemDiscount!: number;
  tax!: number;
  shipping!: number;
  total!: number;
  promo?: string;
  discount!: number;
  grandTotal!: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  line1?: string;
  line2?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt!: Date;
  updatedAt?: Date;
  content?: string;

  // order hasMany order_item via orderId
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
  // order hasMany transaction via orderId
  transactions!: transaction[];
  getTransactions!: Sequelize.HasManyGetAssociationsMixin<transaction>;
  setTransactions!: Sequelize.HasManySetAssociationsMixin<transaction, transactionId>;
  addTransaction!: Sequelize.HasManyAddAssociationMixin<transaction, transactionId>;
  addTransactions!: Sequelize.HasManyAddAssociationsMixin<transaction, transactionId>;
  createTransaction!: Sequelize.HasManyCreateAssociationMixin<transaction>;
  removeTransaction!: Sequelize.HasManyRemoveAssociationMixin<transaction, transactionId>;
  removeTransactions!: Sequelize.HasManyRemoveAssociationsMixin<transaction, transactionId>;
  hasTransaction!: Sequelize.HasManyHasAssociationMixin<transaction, transactionId>;
  hasTransactions!: Sequelize.HasManyHasAssociationsMixin<transaction, transactionId>;
  countTransactions!: Sequelize.HasManyCountAssociationsMixin;
  // order belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    order.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    sessionId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    itemDiscount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    shipping: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    promo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    grandTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    middleName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    line1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    line2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    tableName: 'order',
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
        name: "fk_transaction_user1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  return order;
  }
}
