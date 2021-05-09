import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product, productId } from './product';
import type { product_tag, product_tagId } from './product_tag';

export interface tagAttributes {
  id: number;
  title: string;
  metaTitle?: string;
  slug: string;
  content?: string;
}

export type tagPk = "id";
export type tagId = tag[tagPk];
export type tagCreationAttributes = Optional<tagAttributes, tagPk>;

export class tag extends Model<tagAttributes, tagCreationAttributes> implements tagAttributes {
  id!: number;
  title!: string;
  metaTitle?: string;
  slug!: string;
  content?: string;

  // tag belongsToMany product via tagId and productId
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
  // tag hasMany product_tag via tagId
  product_tags!: product_tag[];
  getProduct_tags!: Sequelize.HasManyGetAssociationsMixin<product_tag>;
  setProduct_tags!: Sequelize.HasManySetAssociationsMixin<product_tag, product_tagId>;
  addProduct_tag!: Sequelize.HasManyAddAssociationMixin<product_tag, product_tagId>;
  addProduct_tags!: Sequelize.HasManyAddAssociationsMixin<product_tag, product_tagId>;
  createProduct_tag!: Sequelize.HasManyCreateAssociationMixin<product_tag>;
  removeProduct_tag!: Sequelize.HasManyRemoveAssociationMixin<product_tag, product_tagId>;
  removeProduct_tags!: Sequelize.HasManyRemoveAssociationsMixin<product_tag, product_tagId>;
  hasProduct_tag!: Sequelize.HasManyHasAssociationMixin<product_tag, product_tagId>;
  hasProduct_tags!: Sequelize.HasManyHasAssociationsMixin<product_tag, product_tagId>;
  countProduct_tags!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tag {
    tag.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    tableName: 'tag',
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
  return tag;
  }
}
