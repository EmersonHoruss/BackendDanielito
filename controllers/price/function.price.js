import Price from "../../models/price/model.price.js";
import { _fGetKindPrice } from "./function.kindPrice.js";

// FUNCTIONS
const _fBuildFullPrice = async (_price) => {
  const _fullPrice = JSON.parse(JSON.stringify(_price));

  const _idKindPrice = _fullPrice._idKindPrice;
  delete _fullPrice._idKindPrice;
  _fullPrice._kindPrice = await _fGetKindPrice(_idKindPrice);
  //   console.log(_fullPrice);
  return _fullPrice;
};

export const _fGetFullPrices = async (_prices) => {
  return (_fullPrices = await Promise.all(
    _prices.map(async (_price) => await _fBuildFullPrice(_price))
  ));
  //   console.log("GET FULL PRICES:", _fullPrices);
};
