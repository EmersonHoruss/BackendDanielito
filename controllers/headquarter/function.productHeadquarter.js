import ProductH from "../../models/headquarter/model.productHeadquarter.js";
import {
  _fGetFullProduct,
  _fGetProductById,
} from "../product/function.product.js";

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
  // let _msje;
  return typeof _validation === typeof ""
    ? _validation
    : await ProductH.findByIdAndUpdate(
        _idProductH,
        {
          $set: { _stock: _validation },
        },
        {
          new: true,
        }
      );
};

const _fUpdate = async (_lastAmount, _requiredAmount, _idProductH) => {
  const _productH = await ProductH.findById(_idProductH);
  const _stock = _productH._stock;
  // console.log('VALUES')
  // console.log(_productH)
  // console.log(_stock,typeof _stock)
  // console.log(_lastAmount,typeof _lastAmount)
  // console.log(_requiredAmount,typeof _requiredAmount)

  const _validation = _fIncreaseOrDecrease(
    _stock,
    _lastAmount,
    _requiredAmount
  );
  return _fMainUpdate(_validation, _idProductH);
  // return _validation
};

export const _fGetFullProductH = async (_productH) => {
  const _fullProductH = JSON.parse(JSON.stringify(_productH));
  const _product = await _fGetProductById(_fullProductH._idProduct);
  // console.log(_product);
  _fullProductH._product = await _fGetFullProduct(_product);
  delete _fullProductH._idProduct;

  return _fullProductH;
};

export const _fGetFullProductHs = async (_productHs) => {
  const _fullProductHs = [];
  for (const _productH of _productHs) {
    const _fullProductH = await _fGetFullProductH(_productH);
    _fullProductHs.push(_fullProductH);
  }
  return _fullProductHs;
};

// Let us just the brands of a list of products
const _fGetBrands = async (_productHs) => {
  const _fullBrandHs = [];
  for (const _productH of _productHs) {
    const _fullBrandH = (await _fGetFullProductH(_productH))._product._brand;
    _fullBrandHs.push(_fullBrandH);
  }
  return _fullBrandHs;
};

// Let us just the categories of a list of products
const _fGetCategories = async (_productHs) => {
  const _fullCategoryHs = [];
  for (const _productH of _productHs) {
    const _fullBrandH = (await _fGetFullProductH(_productH))._product._category;
    _fullCategoryHs.push(_fullBrandH);
  }
  return _fullCategoryHs;
};

// Let us just the sizes of a list of products
const _fGetSizes = async (_productHs) => {
  const _fullSizeHs = [];
  for (const _productH of _productHs) {
    const _fullBrandH = (await _fGetFullProductH(_productH))._product._size;
    _fullSizeHs.push(_fullBrandH);
  }
  return _fullSizeHs;
};

// A component is a brand, a category or a size
// because they are components of a product
export const _fGetComponentByIdHs = async (
  _idHeadquarter,
  required = "brand"
) => {
  const _productHs = await ProductH.find({
    _idHeadquarter,
  });
  const _fullBrandHs =
    required === "brand"
      ? _fGetBrands(_productHs)
      : required === "category"
      ? _fGetCategories(_productHs)
      : required === "size"
      ? _fGetSizes(_productHs)
      : [];
  // console.log(_idHeadquarter);
  return _fullBrandHs;
};

//Update the stock when make a deleting in a detail sale order
export const _fUpdateStockDeleting = async (_idProductH, _amountDetailSO) => {
  const _productH = await ProductH.findById(_idProductH);
  const _stockProductH = _productH._stock;
  const _stockAfterDeleting = _stockProductH + _amountDetailSO;

  await ProductH.findOneAndUpdate(
    { _id: _idProductH },
    { $set: { _stock: _stockAfterDeleting } },
    { new: true }
  );
};

// When it's deleted we have to update the global stock in the products
export const _fDeleteOne = async ()=>{

}

export default { _fUpdate };






// {
//   "_id": "6137ecf7adc2fe2e182dcf35",
//   "createdAt": "2021-09-07T22:51:35.930Z",
//   "updatedAt": "2021-09-07T22:51:35.930Z"
// },
// {
//   "_id": "6137f82d199319580ce5642c",
//   "createdAt": "2021-09-07T23:39:25.187Z",
//   "updatedAt": "2021-09-07T23:39:25.187Z"
// },
// {
//   "_id": "6137f982199319580ce5642e",
//   "createdAt": "2021-09-07T23:45:06.558Z",
//   "updatedAt": "2021-09-07T23:45:06.558Z"
// },
// {
//   "_id": "6137f9ba199319580ce56430",
//   "createdAt": "2021-09-07T23:46:02.553Z",
//   "updatedAt": "2021-09-07T23:46:02.553Z"
// },
// {
//   "_id": "6137f9f5199319580ce56432",
//   "createdAt": "2021-09-07T23:47:01.006Z",
//   "updatedAt": "2021-09-07T23:47:01.006Z"
// },
// {
//   "_id": "6137fa11199319580ce56434",
//   "createdAt": "2021-09-07T23:47:29.722Z",
//   "updatedAt": "2021-09-07T23:47:29.722Z"
// },
// {
//   "_id": "613801d4199319580ce56436",
//   "createdAt": "2021-09-08T00:20:36.444Z",
//   "updatedAt": "2021-09-08T00:20:36.444Z"
// },
// {
//   "_id": "613801d9199319580ce56438",
//   "createdAt": "2021-09-08T00:20:41.336Z",
//   "updatedAt": "2021-09-08T00:20:41.336Z"
// },
// {
//   "_id": "613801de199319580ce5643a",
//   "createdAt": "2021-09-08T00:20:46.123Z",
//   "updatedAt": "2021-09-08T00:20:46.123Z"
// },
// {
//   "_id": "613801df199319580ce5643c",
//   "createdAt": "2021-09-08T00:20:47.255Z",
//   "updatedAt": "2021-09-08T00:20:47.255Z"
// },
// {
//   "_id": "61380212199319580ce5643e",
//   "createdAt": "2021-09-08T00:21:38.918Z",
//   "updatedAt": "2021-09-08T00:21:38.918Z"
// },
// {
//   "_id": "61380216199319580ce56440",
//   "createdAt": "2021-09-08T00:21:42.974Z",
//   "updatedAt": "2021-09-08T00:21:42.974Z"
// },
// {
//   "_id": "6138024d199319580ce56442",
//   "createdAt": "2021-09-08T00:22:37.230Z",
//   "updatedAt": "2021-09-08T00:22:37.230Z"
// },
// {
//   "_id": "613802f9199319580ce56444",
//   "createdAt": "2021-09-08T00:25:29.929Z",
//   "updatedAt": "2021-09-08T00:25:29.929Z"
// },
// {
//   "_id": "613a5b594e18de43e855cf16",
//   "createdAt": "2021-09-09T19:07:05.309Z",
//   "updatedAt": "2021-09-09T19:07:05.309Z"
// },
// {
//   "_id": "613a6e734e18de43e855cf28",
//   "createdAt": "2021-09-09T20:28:35.786Z",
//   "updatedAt": "2021-09-09T20:28:35.786Z"
// },
// {
//   "_id": "613ae8f22a056d335c695ee6",
//   "createdAt": "2021-09-10T05:11:14.139Z",
//   "updatedAt": "2021-09-10T05:11:14.139Z"
// },
// {
//   "_id": "613eab76e3e1cf3e886d1619",
//   "createdAt": "2021-09-13T01:37:58.085Z",
//   "updatedAt": "2021-09-13T01:37:58.085Z"
// },
// {
//   "_id": "613eb033e3e1cf3e886d161d",
//   "createdAt": "2021-09-13T01:58:11.351Z",
//   "updatedAt": "2021-09-13T01:58:11.351Z"
// },
// {
//   "_id": "613eb04fe3e1cf3e886d161f",
//   "createdAt": "2021-09-13T01:58:39.807Z",
//   "updatedAt": "2021-09-13T01:58:39.807Z"
// },
// {
//   "_id": "613faed718daea5054dc29ef",
//   "createdAt": "2021-09-13T20:04:39.491Z",
//   "updatedAt": "2021-09-13T20:04:39.491Z"
// },
// {
//   "_id": "613fb6b818daea5054dc31b6",
//   "createdAt": "2021-09-13T20:38:16.311Z",
//   "updatedAt": "2021-09-13T20:38:16.311Z"
// },
// {
//   "_id": "614372445fbd904ef8188b63",
//   "createdAt": "2021-09-16T16:35:16.760Z",
//   "updatedAt": "2021-09-16T16:35:16.760Z"
// },
// {
//   "_id": "614372fa5fbd904ef8188c33",
//   "createdAt": "2021-09-16T16:38:18.739Z",
//   "updatedAt": "2021-09-16T16:38:18.739Z"
// },
// {
//   "_id": "6143741e5fbd904ef8188ceb",
//   "createdAt": "2021-09-16T16:43:10.359Z",
//   "updatedAt": "2021-09-16T16:43:10.359Z"
// },
// {
//   "_id": "614375dd5fbd904ef8188d72",
//   "createdAt": "2021-09-16T16:50:37.261Z",
//   "updatedAt": "2021-09-16T16:50:37.261Z"
// },
// {
//   "_id": "614391605fbd904ef8189076",
//   "createdAt": "2021-09-16T18:48:00.894Z",
//   "updatedAt": "2021-09-16T18:48:00.894Z"
// },
// {
//   "_id": "614392525fbd904ef81890c9",
//   "createdAt": "2021-09-16T18:52:02.298Z",
//   "updatedAt": "2021-09-16T18:52:02.298Z"
// },
// {
//   "_id": "61440ff2ecc05847dcd92759",
//   "createdAt": "2021-09-17T03:48:02.086Z",
//   "updatedAt": "2021-09-17T03:48:02.086Z"
// },
// {
//   "_id": "6144114cecc05847dcd928e2",
//   "createdAt": "2021-09-17T03:53:48.639Z",
//   "updatedAt": "2021-09-17T03:53:48.639Z"
// },
// {
//   "_id": "61459590c4d2192510a861ea",
//   "createdAt": "2021-09-18T07:30:24.734Z",
//   "updatedAt": "2021-09-18T07:30:24.734Z"
// },
// {
//   "_id": "61466cbff61cc54034af7bef",
//   "createdAt": "2021-09-18T22:48:31.955Z",
//   "updatedAt": "2021-09-18T22:48:31.955Z"
// },
// {
//   "_id": "6146aed953319047849924a8",
//   "createdAt": "2021-09-19T03:30:33.706Z",
//   "updatedAt": "2021-09-19T03:30:33.706Z"
// },
// {
//   "_id": "6146df02533190478499402f",
//   "createdAt": "2021-09-19T06:56:02.793Z",
//   "updatedAt": "2021-09-19T06:56:02.793Z"
// },
// {
//   "_id": "61476cd7eefdc33074cb124a",
//   "createdAt": "2021-09-19T17:01:11.328Z",
//   "updatedAt": "2021-09-19T17:01:11.328Z"
// },
// {
//   "_id": "6147acea488a8e4f64a4cfc0",
//   "createdAt": "2021-09-19T21:34:34.916Z",
//   "updatedAt": "2021-09-19T21:34:34.916Z"
// },
// {
//   "_id": "6147ad81488a8e4f64a4d052",
//   "createdAt": "2021-09-19T21:37:05.561Z",
//   "updatedAt": "2021-09-19T21:37:05.561Z"
// },
// {
//   "_id": "6147ae44488a8e4f64a4d315",
//   "createdAt": "2021-09-19T21:40:20.410Z",
//   "updatedAt": "2021-09-19T21:40:20.410Z"
// },
// {
//   "_id": "6147aee6488a8e4f64a4d3a7",
//   "createdAt": "2021-09-19T21:43:02.945Z",
//   "updatedAt": "2021-09-19T21:43:02.945Z"
// },
// {
//   "_id": "6147af80488a8e4f64a4d3f1",
//   "createdAt": "2021-09-19T21:45:36.359Z",
//   "updatedAt": "2021-09-19T21:45:36.359Z"
// },
// {
//   "_id": "6147b0c81578e9318c9aa5ce",
//   "createdAt": "2021-09-19T21:51:04.968Z",
//   "updatedAt": "2021-09-19T21:51:04.968Z"
// },
// {
//   "_id": "6147b1221578e9318c9aa618",
//   "createdAt": "2021-09-19T21:52:34.386Z",
//   "updatedAt": "2021-09-19T21:52:34.386Z"
// },
// {
//   "_id": "6147b9f81fe81f3648b7ed62",
//   "createdAt": "2021-09-19T22:30:16.476Z",
//   "updatedAt": "2021-09-19T22:30:16.476Z"
// },
// {
//   "_id": "6147ba2c1fe81f3648b7edad",
//   "createdAt": "2021-09-19T22:31:08.503Z",
//   "updatedAt": "2021-09-19T22:31:08.503Z"
// },
// {
//   "_id": "6147cd111fe81f3648b7edfa",
//   "createdAt": "2021-09-19T23:51:45.589Z",
//   "updatedAt": "2021-09-19T23:51:45.589Z"
// },
// {
//   "_id": "6147cd151fe81f3648b7edfc",
//   "createdAt": "2021-09-19T23:51:49.589Z",
//   "updatedAt": "2021-09-19T23:51:49.589Z"
// },
// {
//   "_id": "6147cd3a1fe81f3648b7edfe",
//   "createdAt": "2021-09-19T23:52:26.736Z",
//   "updatedAt": "2021-09-19T23:52:26.736Z"
// },
// {
//   "_id": "6147f00d75130212ac480056",
//   "createdAt": "2021-09-20T02:21:01.251Z",
//   "updatedAt": "2021-09-20T02:21:01.251Z"
// },
// {
//   "_id": "6147f4a575130212ac480255",
//   "createdAt": "2021-09-20T02:40:37.439Z",
//   "updatedAt": "2021-09-20T02:40:37.439Z"
// },
// {
//   "_id": "6147fb9d75130212ac48039a",
//   "createdAt": "2021-09-20T03:10:21.014Z",
//   "updatedAt": "2021-09-20T03:10:21.014Z"
// },
// {
//   "_id": "6147fc4175130212ac480432",
//   "createdAt": "2021-09-20T03:13:05.011Z",
//   "updatedAt": "2021-09-20T03:13:05.011Z"
// },
// {
//   "_id": "61497daa2d80213488c4d1b6",
//   "createdAt": "2021-09-21T06:37:30.501Z",
//   "updatedAt": "2021-09-21T06:37:30.501Z"
// },
// {
//   "_id": "61497e352d80213488c4d1bf",
//   "createdAt": "2021-09-21T06:39:49.441Z",
//   "updatedAt": "2021-09-21T06:39:49.441Z"
// },
// {
//   "_id": "61497e562d80213488c4d1c5",
//   "createdAt": "2021-09-21T06:40:22.554Z",
//   "updatedAt": "2021-09-21T06:40:22.554Z"
// },
// {
//   "_id": "61497e902d80213488c4d1cb",
//   "createdAt": "2021-09-21T06:41:20.182Z",
//   "updatedAt": "2021-09-21T06:41:20.182Z"
// },
// {
//   "_id": "61497e922d80213488c4d1ce",
//   "createdAt": "2021-09-21T06:41:22.798Z",
//   "updatedAt": "2021-09-21T06:41:22.798Z"
// },
// {
//   "_id": "61497ea02d80213488c4d1d1",
//   "createdAt": "2021-09-21T06:41:36.136Z",
//   "updatedAt": "2021-09-21T06:41:36.136Z"
// },
// {
//   "_id": "61497ec72d80213488c4d1da",
//   "createdAt": "2021-09-21T06:42:15.763Z",
//   "updatedAt": "2021-09-21T06:42:15.763Z"
// },
// {
//   "_id": "61497eff2d80213488c4d1e4",
//   "createdAt": "2021-09-21T06:43:11.678Z",
//   "updatedAt": "2021-09-21T06:43:11.678Z"
// },
// {
//   "_id": "61497f0d2d80213488c4d1ea",
//   "createdAt": "2021-09-21T06:43:25.716Z",
//   "updatedAt": "2021-09-21T06:43:25.716Z"
// },
// {
//   "_id": "614980be2d80213488c4d210",
//   "createdAt": "2021-09-21T06:50:38.241Z",
//   "updatedAt": "2021-09-21T06:50:38.241Z"
// }
// ]