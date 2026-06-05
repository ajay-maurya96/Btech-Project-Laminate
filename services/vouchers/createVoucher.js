const buildContraXML = require('../../schema/vouchers/contra');
const buildJournalXML = require('../../schema/vouchers/journal');
const buildPaymentXML = require('../../schema/vouchers/payment');
const buildPurchaseXML = require('../../schema/vouchers/purchase');
const buildReceiptXML = require('../../schema/vouchers/reciept');
const buildSalesXML = require('../../schema/vouchers/sales');
const buildInventoryXML = require('../../schema/vouchers/inventory');
const buildStockGroupXML = require('../../schema/vouchers/stockGroup');
const buildStockItemXML = require('../../schema/vouchers/stockItem');
const sendToTally = require('../pipeline/sendToTally');
const classifyVoucher = require('../pipeline/mistralVoucher');

const voucherBuilders = {
    "contra": buildContraXML,
    "journal": buildJournalXML,
    "payment": buildPaymentXML,
    "purchase": buildPurchaseXML,
    "receipt": buildReceiptXML,
    "sales": buildSalesXML,
    "inventory": buildInventoryXML,
    "stockGroup": buildStockGroupXML,
    "stockItem": buildStockItemXML
};

async function createVoucherFromData(voucherData) {
    const { type } = voucherData;

    if (!type) {
        throw new Error("Voucher type is required. Available types: " + Object.keys(voucherBuilders).join(", "));
    }

    const normalizedType = type.toLowerCase().replace(/\s+/g, '');
    const typeKey = Object.keys(voucherBuilders).find(
        k => k.toLowerCase() === normalizedType
    );

    if (!typeKey) {
        throw new Error(`Unknown voucher type: "${type}". Available: ${Object.keys(voucherBuilders).join(", ")}`);
    }

    console.log("[createVoucher] building XML for voucher type:", typeKey);
    const builder = voucherBuilders[typeKey];
    const xml = builder(voucherData);
    console.log("[createVoucher] XML constructed, sending to Tally");

    const tallyResponse = await sendToTally(xml);
    console.log("[createVoucher] Tally response received");

    return {
        type: typeKey,
        voucherData,
        xml,
        tallyResponse
    };
}

async function createVoucherFromCommand(command) {
    console.log("[createVoucher] invoking LLM to classify voucher request");
    const llmResponse = await classifyVoucher(command);
    console.log("[createVoucher] LLM classified as type:", llmResponse.type);

    return createVoucherFromData(llmResponse.voucherData);
}

module.exports = { createVoucherFromData, createVoucherFromCommand };