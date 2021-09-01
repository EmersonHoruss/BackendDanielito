import Product from "../../models/product/model.product.js";

const _fregistered = (requirements) => {
  return Product.find(requirements).exec();
};

export default {
  // not yet implement the validation for each field
  // for example we should know if _idBrand is included in all the brands
  create: async (req, res) => {
    try {
      const { _stock, _manufactured, _idBrand, _idCategory, _idSize } =
        req.body;
      console.log(typeof _idBrand);
      const _registered = await Product.find({
        _idBrand,
        _idCategory,
        _idSize,
      });
      let msje = "Error! ya existe producto";

      if (!_registered.length) {
        const newProduct = new Product({
          _stock,
          _manufactured,
          _idBrand,
          _idCategory,
          _idSize,
        });

        msje = await newProduct.save();
      }

      res.status(200).json(msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  distribute: async (req, res) => {},

  add: async (req, res) => {},

  red: async (req, res) => {
    const products = await Product.find();
    return res.json(products);
  },
};
