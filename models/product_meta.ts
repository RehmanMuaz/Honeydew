import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product, productId } from './product';

export interface product_metaAttributes {
  id: number;
  productId: number;
  key: string;
  content?: string;
}

export type product_metaPk = "id";
export type product_metaId = product_meta[product_metaPk];
export type product_metaCreationAttributes = Optional<product_metaAttributes, product_metaPk>;

export class product_meta extends Model<product_metaAttributes, product_metaCreationAttributes> implements product_metaAttributes {
  id!: number;
  productId!: number;
  key!: string;
  content?: string;

  // product_meta belongsTo product via productId
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_meta {
    product_meta.init({
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
    key: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_meta',
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
      {
        name: "fk_product_meta_product1_idx",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
  return product_meta;
  }
}
