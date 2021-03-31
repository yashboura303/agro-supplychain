const mongoose = require('mongoose');

const supplyChainReceipt = mongoose.Schema({
    batchNo: { type: String, required: true },
});

const supplyChainSchema = mongoose.model('SupplyChain', supplyChainReceipt);
module.exports = supplyChainSchema;
