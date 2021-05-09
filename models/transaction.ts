import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { user, userId } from './user';

export interface transactionAttributes {
  id: number;
  userId: number;
  orderId: number;
  code: string;
  type?: number;
  mode?: number;
  staus?: number;
  createdAt: Date;
  updatedAt?: Date;
  content?: string;
}

export type transactionPk = "id";
export type transactionId = transaction[transactionPk];
export type transactionCreationAttributes = Optional<transactionAttributes, transactionPk>;

export class transaction extends Model<transactionAttributes, transactionCreationAttributes> implements transactionAttributes {
  id!: number;
  userId!: number;
  orderId!: number;
  code!: string;
  type?: number;
  mode?: number;
  staus?: number;
  createdAt!: Date;
  updatedAt?: Date;
  content?: string;

  // transaction belongsTo order via orderId
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // transaction belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof transaction {
    transaction.init({
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
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    mode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staus: {
      type: DataTypes.SMALLINT,
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
    tableName: 'transaction',
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
        name: "fk_transaction_user2_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_transaction_order1_idx",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
  return transaction;
  }
}
