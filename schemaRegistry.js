const schema = {
  ledger: {
    sundryCreditors: {
      required: ["companyName", "name"],
      optional: ["mailingName", "address", "pincode", "country", "state", "email", "emailCC", "phone", "mobile", "contactPerson", "pan", "gstRegistrationType", "gstin", "gstNature", "languageNames", "languageId", "bankDetails.ifsc", "bankDetails.bankName", "bankDetails.accountNumber"]
    },
    sundryDebtors: {
      required: ["companyName", "name"],
      optional: ["mailingName", "address", "pincode", "country", "state", "email", "emailCC", "phone", "mobile", "contactPerson", "pan", "gstRegistrationType", "gstin", "gstNature", "languageNames", "languageId", "bankDetails.ifsc", "bankDetails.bankName", "bankDetails.accountNumber"]
    },
    bankAccounts: {
      required: ["companyName", "name"],
      optional: ["mailingName", "address", "pincode", "country", "state", "priorStateName", "email", "emailCC", "phone", "mobile", "contactPerson", "bankDetails.ifsc", "bankDetails.bankName", "bankDetails.accountNumber", "bankDetails.branch", "pan", "gstRegistrationType", "gstin", "gstNature", "countryOfResidence", "languageNames", "languageId", "openingBalance", "startingFrom"]
    },
    bankOd: {
      required: ["companyName", "name"],
      optional: ["mailingName", "address", "startingFrom", "priorStateName", "state", "pincode", "country", "countryOfResidence", "ifsc", "bankAccountNumber", "bankBranch", "bankAccountHolder", "openingBalance", "odLimit", "languageNames", "languageId"]
    },
    bankDivisions: {
      required: ["companyName", "name"],
      optional: ["mailingName", "address", "priorState", "state", "country", "countryOfResidence", "pan", "gstRegistrationType", "vatDealerType", "openingBalance", "languageNames", "languageId", "paymentDetails.favouring", "paymentDetails.transactionName", "paymentDetails.chequeCrossComment", "paymentDetails.defaultTransactionType", "paymentDetails.setAsDefault"]
    },
    capitalAccount: {
      required: ["companyName", "name"],
      optional: ["mailingName", "address", "state", "country", "pincode", "pan", "gstRegistrationType", "openingBalance", "languageNames", "languageId"]
    },
    cashInHand: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "allowBanking", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring"]
    },
    currentLiabilities: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingName", "state", "pincode", "country", "pan", "gstRegistrationType", "openingBalance", "languageNames", "languageId", "paymentDetails.favouring", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.ifsc", "paymentDetails.transactionType", "paymentDetails.transactionName"]
    },
    depositAssets: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingName", "state", "pincode", "country", "pan", "gstRegistrationType", "openingBalance", "languageNames", "languageId", "paymentDetails.favouring", "paymentDetails.transactionName", "paymentDetails.chequeCrossComment", "paymentDetails.transactionType"]
    },
    directExpenses: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "roundingMethod", "roundingLimit", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.transactionName", "paymentDetails.transactionType", "vatDealerNature"]
    },
    directIncomes: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "roundingMethod", "roundingLimit", "languageNames", "languageId", "paymentDetails.favouring", "paymentDetails.transactionName", "paymentDetails.transactionType", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.ifsc", "vatDealerNature"]
    },
    dutiesAndTaxes: {
      required: ["companyName", "name"],
      optional: ["tax.basicTypeOfDuty", "tax.rateOfTax", "rounding.method", "rounding.limit", "openingBalance", "language.names", "language.id", "paymentDetails.favouring", "paymentDetails.transactionType", "paymentDetails.ifsc"]
    },
    fixedAssets: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingName", "state", "pincode", "country", "pan", "gstRegistrationType", "openingBalance", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.defaultTransactionType"]
    },
    indirectExpenses: {
      required: ["companyName", "name"],
      optional: ["costCentres", "openingBalance", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.defaultTransactionType"]
    },
    indirectIncome: {
      required: ["companyName", "name"],
      optional: ["costCentres", "openingBalance", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.defaultTransactionType"]
    },
    investments: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingName", "state", "pincode", "country", "pan", "openingBalance", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.defaultTransactionType"]
    },
    loanAndAdvencesAssets: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingName", "state", "pincode", "country", "pan", "gstRegistrationType", "openingBalance", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.defaultTransactionType"]
    },
    loanLiability: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingName", "state", "pincode", "country", "pan", "gstRegistrationType", "openingBalance", "languageNames", "languageId", "paymentDetails.ifsc", "paymentDetails.bankName", "paymentDetails.accountNumber", "paymentDetails.favouring", "paymentDetails.defaultTransactionType"]
    },
    missExpensesAsset: {
      required: ["companyName", "name"],
      optional: ["flags.billwise", "flags.costCentres", "flags.interest", "openingBalance", "languageNames", "languageId", "banking.enabled", "banking.ifsc", "banking.bankName", "banking.accountNumber", "banking.favouring", "banking.transactionType"]
    },
    provision: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "flags.billwise", "flags.costCentres", "flags.interest", "languageNames", "languageId", "banking.enabled", "banking.ifsc", "banking.bankName", "banking.accountNumber", "banking.favouring", "banking.transactionType"]
    },
    purchaseAccount: {
      required: ["companyName", "ledgerName"],
      optional: ["openingBalance", "aliases", "bank.enabled", "bank.ifsc", "bank.bankName", "bank.accountNumber", "bank.transactionType"]
    },
    reservesAndSurplus: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "languageNames", "languageId", "paymentDetails.favouring", "paymentDetails.transactionType", "paymentDetails.chequeCross"]
    },
    salesAccount: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "rounding.method", "rounding.limit", "tax.taxType", "flags.billwise", "flags.costCentres", "flags.interest", "flags.affectsStock", "flags.chequePrinting", "flags.ebanking", "language.names", "language.id", "banking.enabled", "banking.favouring", "banking.transactionType", "banking.chequeCrossComment", "udf.vatDealerNature"]
    },
    securedLoans: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingNames", "state", "country", "pincode", "pan", "gstRegistrationType", "openingBalance", "language.names", "language.id", "banking.enabled", "banking.ifsc", "banking.bankName", "banking.accountNumber", "banking.favouring", "banking.transactionType"]
    },
    stockInHand: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "language.names", "language.id", "banking.ifsc", "banking.bankName", "banking.accountNumber", "banking.favouring", "banking.transactionType"]
    },
    suspense: {
      required: ["companyName", "name"],
      optional: ["openingBalance", "flags.billwise", "flags.costCentres", "languageNames", "languageId", "banking.enabled", "banking.ifsc", "banking.bankName", "banking.accountNumber", "banking.favouring", "banking.transactionType"]
    },
    unsecuredLoan: {
      required: ["companyName", "name"],
      optional: ["addresses", "mailingNames", "state", "pincode", "country", "pan", "gstType", "openingBalance", "flags.billwise", "flags.costCentres", "languageNames", "languageId", "payment.enabled", "payment.favouring", "payment.transactionType", "payment.chequeComment"]
    }
  },
  voucher: {
    contra: {
      required: ["company", "type", "date", "entries"],
      optional: ["narration"],
      entriesFormat: ["ledgerName", "amount", "isDeemedPositive"]
    },
    journal: {
      required: ["company", "type", "date", "entries"],
      optional: ["narration"],
      entriesFormat: ["ledgerName", "amount", "isDeemedPositive"]
    },
    payment: {
      required: ["company", "voucher.type", "voucher.date", "voucher.entries"],
      optional: ["ledgers", "voucher.narration"],
      entriesFormat: ["ledgerName", "amount", "isDeemedPositive"]
    },
    purchase: {
      required: ["company", "voucher.type", "voucher.date", "voucher.party", "voucher.items"],
      optional: ["group", "ledgers", "stockItem", "voucher.narration", "voucher.reference"],
      itemsFormat: ["name", "qty", "rate"]
    },
    receipt: {
      required: ["company", "voucher.date", "voucher.party", "voucher.entries"],
      optional: ["voucher.narration", "voucher.instrumentNumber", "voucher.bankName"],
      entriesFormat: ["ledger", "amount"]
    },
    sales: {
      required: ["company", "voucher.type", "voucher.date", "voucher.partyLedger", "voucher.items"],
      optional: ["ledgers", "voucher.narration"],
      itemsFormat: ["name", "amount", "salesLedger"]
    },
    inventory: {
      required: ["company", "voucher.type", "voucher.date"],
      optional: ["stockGroups", "stockItems", "godowns", "voucher.narration", "voucher.inEntries", "voucher.outEntries"],
      entriesFormat: ["stockItemName", "qty", "amount", "godown", "batch"]
    },
    stockGroup: {
      required: ["company", "stockGroups"],
      optional: [],
      stockGroupFormat: ["name", "parent"]
    },
    stockItem: {
      required: ["company", "groups", "items"],
      optional: [],
      itemsFormat: ["name", "parent", "unit", "gstApplicable"]
    }
  }
};

function getSchema(operation, type) {
  const operationSchema = schema[operation];
  if (!operationSchema) return null;
  const typeSchema = operationSchema[type];
  if (!typeSchema) return null;
  return { operation, type, ...typeSchema };
}

function listTypes(operation) {
  const operationSchema = schema[operation];
  if (!operationSchema) return null;
  return Object.keys(operationSchema);
}

function listOperations() {
  return Object.keys(schema);
}

module.exports = { getSchema, listTypes, listOperations };
