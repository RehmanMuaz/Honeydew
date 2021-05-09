import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product, productId } from './product';

export interface product_reviewAttributes {
  id: number;
  productId: number;
  parentId?: number;
  title: string;
  rating?: number;
  published?: number;
  createdAt: Date;
  publishedAt?: Date;
  content?: string;
}

export type product_reviewPk = "id";
export type product_reviewId = product_review[product_reviewPk];
export type product_reviewCreationAttributes = Optional<product_reviewAttributes, product_reviewPk>;

export class product_review extends Model<product_reviewAttributes, product_reviewCreationAttributes> implements product_reviewAttributes {
  id!: number;
  productId!: number;
  parentId?: number;
  title!: string;
  rating?: number;
  published?: number;
  createdAt!: Date;
  publishedAt?: Date;
  content?: string;

  // product_review belongsTo product via productId
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_review {
    product_review.init({
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
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    published: {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_review',
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
        name: "fk_product_review_product_idx",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
  return product_review;
  }
}
