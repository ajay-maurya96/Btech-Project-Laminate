// schema services
const createSundryCreditorsLedgerObject = require('../../schema/groups/sundryCreditors');
const createSundryDebtorsLedgerObject = require('../../schema/groups/sundryDebtors');
const createBankAccoutsLedgerObject = require('../../schema/groups/bankAccounts');
const createBankODLedgerObject = require('../../schema/groups/bankOD');
const createBranchDivisionsLedgerObject = require('../../schema/groups/branchDivisions');
const createCapitalAccountLedgerObject = require('../../schema/groups/capitalAccount');
const createCashInHandLedgerObject = require('../../schema/groups/cashInHand');
const createCurrentAssetsLedgerObject = require('../../schema/groups/currentAssets');
const createCurrentLiabilitiesLedgerObject = require('../../schema/groups/currentLiabilities');
const createDepositsAssetLedgerObject = require('../../schema/groups/depositAssets');
const createDirectExpensesLedgerObject = require('../../schema/groups/directExpenses');
const createDirectIncomesLedgerObject = require('../../schema/groups/directIncomes');
const createDutiesAndTaxesLedger = require('../../schema/groups/dutiesAndTaxes');
const createFixedAssetsLedgerSchema = require('../../schema/groups/fixedAssets');
const createIndirectExpensesLedgerSchema = require('../../schema/groups/indirectExpenses');
const createIndirectIncomeLedgerSchema = require('../../schema/groups/indirectIncome');
const createInvestmentLedgerSchema = require('../../schema/groups/investments');
const createLoanLedgerSchema = require('../../schema/groups/loansAndAdvanceAssets');
const createLoanLiabilityLedgerSchema = require('../../schema/groups/loansLiability');
const createMiscExpensesLedgerObject = require('../../schema/groups/missExpenseAsset');
const createProvisionsLedgerObject = require('../../schema/groups/provision');
const createPurchaseAccountLedgerSchema = require('../../schema/groups/purchaseAccount');
const createReservesSurplusLedgerObject = require('../../schema/groups/reserveAndSurplus');
const createSalesAccountsLedgerObject = require('../../schema/groups/salesAccount');
const createSecuredLoanLedgerObject = require('../../schema/groups/securedLoans');
const createStockInHandLedgerObject = require('../../schema/groups/stokInHand');
const createSuspenseLedgerObject = require('../../schema/groups/suspense');
const createUnsecuredLedgerObject = require('../../schema/groups/unsecuredLoan');

// pipeline
const convertLedgerToXML = require('../pipeline/convertToXML');
const sendToTally = require('../pipeline/sendToTally');
const guessLedgerParent = require('../pipeline/mistral');

const ledgerType = {
    "sundryCreditors": createSundryCreditorsLedgerObject,
    "sundryDebtors": createSundryDebtorsLedgerObject,
    "bankAccounts": createBankAccoutsLedgerObject,
    "bankOd": createBankODLedgerObject,
    "branchDivisions": createBranchDivisionsLedgerObject,
    "capitalAccount": createCapitalAccountLedgerObject,
    "cashInHand": createCashInHandLedgerObject,
    "currentAssets": createCurrentAssetsLedgerObject,
    "currentLiabilities": createCurrentLiabilitiesLedgerObject,
    "depositAssets": createDepositsAssetLedgerObject,
    "directExpenses": createDirectExpensesLedgerObject,
    "directIncomes": createDirectIncomesLedgerObject,
    "dutiesAndTaxes": createDutiesAndTaxesLedger,
    "fixedAssets": createFixedAssetsLedgerSchema,
    "indirectExpenses": createIndirectExpensesLedgerSchema,
    "indirectIncome": createIndirectIncomeLedgerSchema,
    "investments": createInvestmentLedgerSchema,
    "loanAndAdvencesAssets": createLoanLedgerSchema,
    "loanLiability": createLoanLiabilityLedgerSchema,
    "missExpensesAsset": createMiscExpensesLedgerObject,
    "provision": createProvisionsLedgerObject,
    "purchaseAccount": createPurchaseAccountLedgerSchema,
    "reservesAndSurplus": createReservesSurplusLedgerObject,
    "salesAccount": createSalesAccountsLedgerObject,
    "securedLoans": createSecuredLoanLedgerObject,
    "stockInHand": createStockInHandLedgerObject,
    "suspense": createSuspenseLedgerObject,
    "unsecuredLoan": createUnsecuredLedgerObject,
}

async function createLedger(userText) {
    try {
        console.log("[createLedger] invoking LLM to analyze user instructions");
        const llmResponse = await guessLedgerParent(userText);
        console.log("[createLedger] LLM response received, type:", llmResponse.type);

        const ledgerFunction = ledgerType[llmResponse.type];
        if (!ledgerFunction) {
            throw new Error(`Unknown ledger type: ${llmResponse.type}`);
        }

        console.log("[createLedger] building XML for group:", llmResponse.type);
        const ledgerObject = ledgerFunction(llmResponse.ledgerInput);
        const xmlData = convertLedgerToXML(ledgerObject);
        console.log("[createLedger] XML constructed, sending to Tally");

        const tallyResponse = await sendToTally(xmlData);
        console.log("[createLedger] Tally response received");

        return {
            type: llmResponse.type,
            ledgerInput: llmResponse.ledgerInput,
            xml: xmlData,
            tallyResponse
        };
    }
    catch (err) {
        console.error("[createLedger] Error:", err.message);
        throw err;
    }
}

async function createLedgerFromData(type, data) {
    const ledgerFunction = ledgerType[type];
    if (!ledgerFunction) {
        throw new Error(`Unknown ledger type: "${type}". Available: ${Object.keys(ledgerType).join(", ")}`);
    }

    console.log("[createLedgerFromData] building XML for type:", type);
    const ledgerObject = ledgerFunction(data);
    const xmlData = convertLedgerToXML(ledgerObject);
    console.log("[createLedgerFromData] XML constructed, sending to Tally");

    const tallyResponse = await sendToTally(xmlData);
    console.log("[createLedgerFromData] Tally response received");

    return {
        type,
        ledgerInput: data,
        xml: xmlData,
        tallyResponse
    };
}

module.exports = createLedger;
module.exports.createLedgerFromData = createLedgerFromData;