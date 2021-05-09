import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cart_item, cart_itemId } from './cart_item';
import type { user, userId } from './user';

export interface cartAttributes {
  id: number;
  userId?: number;
  sessionId: string;
  token: string;
  status?: number;
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

export type cartPk = "id";
export type cartId = cart[cartPk];
export type cartCreationAttributes = Optional<cartAttributes, cartPk>;

export class cart extends Model<cartAttributes, cartCreationAttributes> implements cartAttributes {
  id!: number;
  userId?: number;
  sessionId!: string;
  token!: string;
  status?: number;
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

  // cart hasMany cart_item via cartId
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
  // cart belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cart {
    cart.init({
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
      allowNull: true,
      defaultValue: 0
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
    tableName: 'cart',
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
        name: "fk_cart_user1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  return cart;
  }
}
