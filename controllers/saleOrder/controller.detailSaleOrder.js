import DetailSO from "../../models/saleOrder/model.detailSaleOrder.js";
import _FProductH from "../headquarter/function.productHeadquarter.js";

export default {
  create: async (req, res) => {
    try {
      const { _price, _amount, _idProductHeadquarter, _idSaleOrder } = req.body;
      let _msje = await _FProductH._fUpdate(0, _amount, _idProductH);

      if (typeof _possibleMsje !== typeof "") {
        const newDetailSaleOrder = new DetailSO({
          _price,
          _amount,
          _idProductHeadquarter,
          _idSaleOrder,
        });

        _msje = await newDetailSaleOrder.save();
      }

      res.json(_msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const {
      _idDetailSaleOrder: _id,
      _amount,
      _idProductHeadquarter: _idProductH,
    } = req.body;

    const _detailSO = await ProductH.find({ _id });
    const _lastAmount = _detailSO._amount;

    const _msje = await _FProductH._fUpdate(_lastAmount, _amount, _idProduct);
    res.json(_msje);
  },

  red: async (req, res) => {
    const { _idSaleOrder } = req.body;
    const detailsSaleOrder = await DetailSO.find({ _idSaleOrder });
    return res.json(detailsSaleOrder);
  },
};
