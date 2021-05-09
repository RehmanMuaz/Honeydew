import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { category, categoryId } from './category';
import type { product, productId } from './product';

export interface product_categoryAttributes {
  productId: number;
  categoryId: number;
}

export type product_categoryPk = "productId" | "categoryId";
export type product_categoryId = product_category[product_categoryPk];
export type product_categoryCreationAttributes = Optional<product_categoryAttributes, product_categoryPk>;

export class product_category extends Model<product_categoryAttributes, product_categoryCreationAttributes> implements product_categoryAttributes {
  productId!: number;
  categoryId!: number;

  // product_category belongsTo category via categoryId
  category!: category;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<category>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<category, categoryId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<category>;
  // product_category belongsTo product via productId
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_category {
    product_category.init({
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
          { name: "categoryId" },
        ]
      },
      {
        name: "fk_product_category_category1_idx",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
    ]
  });
  return product_category;
  }
}
