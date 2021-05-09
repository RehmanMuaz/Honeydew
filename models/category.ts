import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product, productId } from './product';
import type { product_category, product_categoryId } from './product_category';

export interface categoryAttributes {
  id: number;
  parentId?: number;
  title: string;
  metaTitle?: string;
  slug: string;
  content?: string;
}

export type categoryPk = "id";
export type categoryId = category[categoryPk];
export type categoryCreationAttributes = Optional<categoryAttributes, categoryPk>;

export class category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
  id!: number;
  parentId?: number;
  title!: string;
  metaTitle?: string;
  slug!: string;
  content?: string;

  // category belongsToMany product via categoryId and productId
  products!: product[];
  getProducts!: Sequelize.BelongsToManyGetAssociationsMixin<product>;
  setProducts!: Sequelize.BelongsToManySetAssociationsMixin<product, productId>;
  addProduct!: Sequelize.BelongsToManyAddAssociationMixin<product, productId>;
  addProducts!: Sequelize.BelongsToManyAddAssociationsMixin<product, productId>;
  createProduct!: Sequelize.BelongsToManyCreateAssociationMixin<product>;
  removeProduct!: Sequelize.BelongsToManyRemoveAssociationMixin<product, productId>;
  removeProducts!: Sequelize.BelongsToManyRemoveAssociationsMixin<product, productId>;
  hasProduct!: Sequelize.BelongsToManyHasAssociationMixin<product, productId>;
  hasProducts!: Sequelize.BelongsToManyHasAssociationsMixin<product, productId>;
  countProducts!: Sequelize.BelongsToManyCountAssociationsMixin;
  // category hasMany product_category via categoryId
  product_categories!: product_category[];
  getProduct_categories!: Sequelize.HasManyGetAssociationsMixin<product_category>;
  setProduct_categories!: Sequelize.HasManySetAssociationsMixin<product_category, product_categoryId>;
  addProduct_category!: Sequelize.HasManyAddAssociationMixin<product_category, product_categoryId>;
  addProduct_categories!: Sequelize.HasManyAddAssociationsMixin<product_category, product_categoryId>;
  createProduct_category!: Sequelize.HasManyCreateAssociationMixin<product_category>;
  removeProduct_category!: Sequelize.HasManyRemoveAssociationMixin<product_category, product_categoryId>;
  removeProduct_categories!: Sequelize.HasManyRemoveAssociationsMixin<product_category, product_categoryId>;
  hasProduct_category!: Sequelize.HasManyHasAssociationMixin<product_category, product_categoryId>;
  hasProduct_categories!: Sequelize.HasManyHasAssociationsMixin<product_category, product_categoryId>;
  countProduct_categories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
    category.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    metaTitle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
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
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return category;
  }
}
