import ProductH from "../../models/headquarter/model.productHeadquarter.js";

// FUNCTIONS
// if increase the amount so decrease the stock else you get an error
const _fCanIncreaseAmount = (_stock, lastAmount, _requiredAmount) => {
  const _jump = _requiredAmount - lastAmount;
  const _hopedStock = _stock - _jump;
  return _hopedStock < 0 ? "ERROR: amount is bigger" : _hopedStock;
};

// if decrease the amount so increase the stock else you get an error
const _fCanDecreaseAmount = (_stock, lastAmount, _requiredAmount) => {
  const _jump = lastAmount - _requiredAmount;
  const _hopedStock = _stock + _jump;
  return _jump < 0 ? "ERROR: amount is smaller" : _hopedStock;
};

// decide what operation executes if a increase amount or decrease amount
// and return a error msj or correct stock
const _fIncreaseOrDecrease = (_stock, lastAmount, _requiredAmount) => {
  return _requiredAmount >= lastAmount
    ? _fCanIncreaseAmount(_stock, lastAmount, _requiredAmount)
    : _fCanDecreaseAmount(_stock, lastAmount, _requiredAmount);
};

// make changes in db if is possible any operation and send a error msje or the
// product in the headquarter updated
const _fMainUpdate = async (_validation, _idProductH) => {
  let _msje = null;
  return typeof _validation === typeof ""
    ? (msje = _validation)
    : (updatedProductHeadquarter = await ProductH.findByIdAndUpdate(
        _idProductH,
        {
          $set: { _stock: _validation },
        },
        {
          new: true,
        }
      ));
};

const _fUpdate = async (_lastAmount, _requiredAmount, _idProduct) => {
  const _productH = await ProductH.find({ _idProductH });
  const _stock = _productH._stock;

  const _validation = _fIncreaseOrDecrease(
    _stock,
    _lastAmount,
    _requiredAmount
  );
  return _fMainUpdate(_validation, _idProductH);
};

export default { _fUpdate };
