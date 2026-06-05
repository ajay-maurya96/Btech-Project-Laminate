// environment variables injection
require('dotenv').config();

// inject pipeline endpoint
const runPipeline = require('./services/pipeline/main');

// user requests
const userText = [
    // "Create a new Ledger for company Google named Bhutani Infra, under stocks in hand with initial capital Rs. 12,000. The Bank IFSC code is AAAA0123456, Bank Name is Bank of India, account number is 1234567890, favouring Deepanshu with transaction type being Inter Bank Transfer",

    // "Create a new ledger under secured loans for company Google based in Y-05 South Punjab 118100 with opening balance Rs. 8000 and name ESOP stakes, use PAN number as AAAPS1234A and for banking details ifsc is AAAA0123456, bank of india favouring shanky thakur for account number 11001002011619",

    // "Create a ledger for company Google named Sharma Traders under sundry creditors with address C-45 Lajpat Nagar Delhi 110024, opening balance Rs. 55,000 and PAN number AABCS2345D",

    // "Add a new ledger under sundry debtors for company Google called Alpha Solutions, located at 12 MG Road Bangalore 560001 with GSTIN 29ABCDE1234F1Z5 and opening balance Rs. 32,500",

    // "Create a bank account ledger for company Google named HDFC Main Account, branch Saket, IFSC HDFC0001234, account number 9988776655 with opening balance Rs. 2,00,000",

    // "Create a bank OD ledger under bank OD for company Google named SBI Overdraft, IFSC SBIN0005678, account number 4455667788, OD limit Rs. 5,00,000 and opening balance Rs. 10,000",

    // "Create a bank division ledger for company Google named Corporate Division Delhi with opening balance Rs. 15,000 and transaction type Cheque favouring Google",

    // "Create a capital account ledger for company Google named Deepanshu Capital with PAN AAAPS1234A and opening balance Rs. 1,00,000",

    // "Create a cash in hand ledger for company Google named Office Cash with opening balance Rs. 8,500",

    // "Add a ledger under current liabilities for company Google named Outstanding Rent with opening balance Rs. 45,000 and favouring Google by cheque",

    // "Create a deposit asset ledger for company Google named Security Deposit Landlord with opening balance minus Rs. 25,000 and transaction type Cheque",

    // "Create a direct expense ledger for company Google named Raw Material Purchase with opening balance Rs. -12,000 and bank transfer through IFSC AAAA0123456",

    // "Create a direct income ledger for company Google named Export Sales Income with opening balance Rs. 75,000 and transaction type Others",

    // "Create a duties and taxes ledger for company Google named GST Output with tax rate 18 percent and opening balance Rs. 5,000",

    // "Create a fixed asset ledger for company Google named Office Furniture with opening balance Rs. -85,000 and PAN AAAPS1234A",

    // "Add an indirect expense ledger for company Google named Electricity Charges with opening balance Rs. -9,500 and bank account 1234567890",

    // "Create an indirect income ledger for company Google named Interest Received with opening balance Rs. 4,200 and IFSC AAAA0123456",

    // "Create an investment ledger for company Google named Mutual Fund Holdings with opening balance Rs. -1,50,000 and transaction type Inter Bank Transfer",

    // "Create a loans and advances asset ledger for company Google named Advance to Supplier Ramesh with opening balance Rs. -30,000",

    // "Create a loan liability ledger for company Google named Term Loan SBI with opening balance Rs. 2,50,000 and IFSC SBIN0009999",

    // "Create a stock in hand ledger for company Google named Closing Stock Raw Material with opening balance Rs. -5,00,000",

    // "Create a secured loan ledger for company Google named Car Loan HDFC with opening balance Rs. 3,00,000, IFSC HDFC0004567 and account number 5566778899"
];

// run pipeline
runPipeline(userText);
