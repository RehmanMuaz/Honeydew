import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product, productId } from './product';
import type { tag, tagId } from './tag';

export interface product_tagAttributes {
  productId: number;
  tagId: number;
}

export type product_tagPk = "productId" | "tagId";
export type product_tagId = product_tag[product_tagPk];
export type product_tagCreationAttributes = Optional<product_tagAttributes, product_tagPk>;

export class product_tag extends Model<product_tagAttributes, product_tagCreationAttributes> implements product_tagAttributes {
  productId!: number;
  tagId!: number;

  // product_tag belongsTo product via productId
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;
  // product_tag belongsTo tag via tagId
  tag!: tag;
  getTag!: Sequelize.BelongsToGetAssociationMixin<tag>;
  setTag!: Sequelize.BelongsToSetAssociationMixin<tag, tagId>;
  createTag!: Sequelize.BelongsToCreateAssociationMixin<tag>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_tag {
    product_tag.init({
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_tag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
          { name: "tagId" },
        ]
      },
      {
        name: "fk_product_tag_tag1_idx",
        using: "BTREE",
        fields: [
          { name: "tagId" },
        ]
      },
    ]
  });
  return product_tag;
  }
}
