import Brand from "../../models/product/model.brand.js";

export default {
  create: async (req, res) => {
    try {
      const { _name } = req.body;
      const newBrand = new Brand({
        _name,
      });

      const savedBrand = await newBrand.save();

      res.status(200).json(savedBrand);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const brands = await Brand.find();
    return res.json(brands);
  },
};

