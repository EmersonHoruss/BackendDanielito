import Product from "../../models/product/model.product.js";
import Brand from "../../models/product/model.brand.js";
import Category from "../../models/product/model.category.js";
import Size from "../../models/product/model.size.js";

// FUNCTIONS
// I don't
const _fregistered = (requirements) => {
  return Product.find(requirements).exec();
};

const _fGetBrand = async (_idBrand) => {
  return await Brand.findById(_idBrand);
};

const _fGetCategory = async (_idCategory) => {
  return await Category.findById(_idCategory);
};

const _fGetSize = async (_idSize) => {
  return await Size.findById(_idSize);
};

export const _fGetFullProduct = async (_product) => {
  const _fullProduct = JSON.parse(JSON.stringify(_product));
  delete _fullProduct._idBrand;
  delete _fullProduct._idCategory;
  delete _fullProduct._idSize;
  _fullProduct._brand = await _fGetBrand(_product._idBrand);
  _fullProduct._category = await _fGetCategory(_product._idCategory);
  _fullProduct._size = await _fGetSize(_product._idSize);

  return _fullProduct;
};

export const _fGetFullProducts = async (_products) => {
  const _fullProducts = [];
  for (const _product of _products) {
    const _fullProduct = await _fGetFullProduct(_product);
    _fullProducts.push(_fullProduct);
  }
  return _fullProducts;
};

export const _fGetProductById = async (_idProduct) => {
  const _product = await Product.findById(_idProduct);
  // console.log(_idProduct,typeof _idProduct)
  // console.log(_product)
  return _product;
};
