import ProductH from "../../models/headquarter/model.productHeadquarter.js";
import Product from "../../models/product/model.product.js";
import Validation from "../../library/validations.js";

// if headquarter and product already exists create error otherwise rigester
// const _fCheckCreate = async (_idHeadquarter, _idProduct) => {
//   return await Validation._fExist({ _idHeadquarter, _idProduct });
// };

const _fSaveProductH = async (_save) => {
  const newProductH = new ProductH(_save);
  return await newProductH.save();
};

export default {
  create: async (req, res) => {
    try {
      const { _stock, _idHeadquarter, _idProduct } = req.body;
      const _save = { _stock, _idHeadquarter, _idProduct };
      const _alreadyExists = await Validation._fManageExist(
        {
          _idHeadquarter,
          _idProduct,
        },
        ProductH,
        false
      );
      const _msje = Validation._fHasError(_alreadyExists)
        ? _alreadyExists
        : await _fSaveProductH(_save);

      res.status(200).json(_msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const productsH = await ProductH.find();
    return res.json(productsH);
  },

  getProductsByHeadquarter: async (req, res) => {
    const _idHeadquarter = req.params._idHeadquarter;
    const productsH = await ProductH.find({
      _idHeadquarter,
    });
    return res.json(productsH);
  },

  // not yet implemented
  update: async (req, res) => {
    try {
      const { _idProductH, _lastAmount, _requiredAmount } = req.body;

      res.send(msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

// If we have still product we can distribute
// update: async (req, res) => {
//   const { _stock, _idHeadquarter, _idProduct } = req.body;
//   const canDistribute = await _fcanDistribute(_stock, _idProduct);
//   if (canDistribute) {
//     const productHeadquarter = await updateStock(
//       _stock,
//       _idHeadquarter,
//       _idProduct
//     );
//     res.send(productHeadquarter);
//   }
//   res.send(
//     "Error! You can't distribute product bacause your input stock is bigger or all the products have beend distributed"
//   );
// },

// reduceStock: async (_idProductHeadquarter, _amount) => {
//   const productHeadquarter = await ProductHeadquarter.findById(
//     _idProductHeadquarter
//   );
//   const validation = productHeadquarter._stock - _amount;
//   const msje =
//     validation < 0
//       ? "Error: amount is bigger than current product's stock in the headquarter"
//       : (updatedProductHeadquarter =
//           await ProductHeadquarter.findByIdAndUpdate(
//             _idProductHeadquarter,
//             {
//               $set: { _stock: validation },
//             },
//             {
//               new: true,
//             }
//           ));

//   return msje;
// },
