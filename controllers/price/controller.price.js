import Price from "../../models/price/model.price.js";
import { _fGetFullPrices } from "./function.price.js";

export default {
  create: async (req, res) => {
    try {
      const { _amount, _idKindPrice, _idProduct } = req.body;
      const newPrice = new Price({
        _amount,
        _idKindPrice,
        _idProduct,
      });

      const savedPrice = await newPrice.save();

      res.status(200).json(savedPrice);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  readFullByIdProductH: async (req, res) => {
    const _idProduct = req.params._idProduct;
    const _prices = await Price.find({ _idProduct });
    const _fullPrices = await _fGetFullPrices(_prices);

    return res.json(_fullPrices);
    // console.log(_fullPrices);
  },

  red: async (req, res) => {
    const _prices = await Price.find();
    return res.json(_prices);
  },
};
