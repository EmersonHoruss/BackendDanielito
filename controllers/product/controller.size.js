import Size from "../../models/product/model.size.js";

export default {
  create: async (req, res) => {
    try {
      const { _name } = req.body;
      const newSize = new Size({
        _name,
      });

      const savedSize = await newSize.save();

      res.status(200).json(savedSize);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const sizes = await Size.find();
    return res.json(sizes);
  },
};
