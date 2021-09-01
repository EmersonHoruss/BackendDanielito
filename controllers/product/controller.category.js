import Category from "../../models/product/model.category.js";

export default {
  create: async (req, res) => {
    try {
      const { _name } = req.body;
      const newCategory = new Category({
        _name,
      });

      const savedCategory = await newCategory.save();

      res.status(200).json(savedCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const categories = await Category.find();
    return res.json(categories);
  },
};
