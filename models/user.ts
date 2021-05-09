import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cart, cartId } from './cart';
import type { order, orderId } from './order';
import type { product, productId } from './product';
import type { transaction, transactionId } from './transaction';

export interface userAttributes {
  id: number;
  googleId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  passwordHash: string;
  admin: number;
  vendor: number;
  registeredAt: Date;
  lastLogin?: Date;
  intro?: string;
  profile?: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userCreationAttributes = Optional<userAttributes, userPk>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  googleId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  passwordHash!: string;
  admin!: number;
  vendor!: number;
  registeredAt!: Date;
  lastLogin?: Date;
  intro?: string;
  profile?: string;

  // user hasMany cart via userId
  carts!: cart[];
  getCarts!: Sequelize.HasManyGetAssociationsMixin<cart>;
  setCarts!: Sequelize.HasManySetAssociationsMixin<cart, cartId>;
  addCart!: Sequelize.HasManyAddAssociationMixin<cart, cartId>;
  addCarts!: Sequelize.HasManyAddAssociationsMixin<cart, cartId>;
  createCart!: Sequelize.HasManyCreateAssociationMixin<cart>;
  removeCart!: Sequelize.HasManyRemoveAssociationMixin<cart, cartId>;
  removeCarts!: Sequelize.HasManyRemoveAssociationsMixin<cart, cartId>;
  hasCart!: Sequelize.HasManyHasAssociationMixin<cart, cartId>;
  hasCarts!: Sequelize.HasManyHasAssociationsMixin<cart, cartId>;
  countCarts!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order via userId
  orders!: order[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany product via userId
  products!: product[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<product>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<product, productId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<product, productId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<product, productId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<product>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<product, productId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<product, productId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<product, productId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<product, productId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany transaction via userId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    googleId: {
      type: DataTypes.BIGINT,
      allowNull: true
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
    passwordHash: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    vendor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    registeredAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return user;
  }
}
