import Client from "../../models/saleOrder/model.client.js";

export default {
  create: async (req, res) => {
    try {
      const { _DNI, _name, _address, _cel, _shipping, _RUC } = req.body;
      const newClient = new Client({
        _DNI,
        _name,
        _address,
        _cel,
        _shipping,
        _RUC,
      });

      const savedClient = await newClient.save();

      res.status(200).json(savedClient);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const clients = await Client.find();
    return res.json(clients);
  },
};
