function validateIndirectExpensesLedger(input) {
  if (!input.companyName) throw new Error("companyName is required");

  if (!input.name) throw new Error("Ledger name is required");
  if (!input.parent || input.parent !== "Indirect Expenses")
    throw new Error("parent must be 'Indirect Expenses'");

  // Cost centre flag (important for Indirect Expenses)
  if (!input.costCentres)
    throw new Error("costCentres flag is required (Yes/No)");

  // Opening balance
  if (input.openingBalance === undefined)
    throw new Error("openingBalance is required");

  // Language
  if (!Array.isArray(input.languageNames) || input.languageNames.length === 0)
    throw new Error("languageNames is required");

  if (!input.languageId)
    throw new Error("languageId is required");

  // Banking (because PAYMENTDETAILS.LIST exists)
  if (!input.paymentDetails)
    throw new Error("paymentDetails are mandatory for bank-enabled ledger");

  const p = input.paymentDetails;

  if (!p.ifsc) throw new Error("IFSCODE is required");
  if (!p.bankName) throw new Error("BANKNAME is required");
  if (!p.accountNumber) throw new Error("ACCOUNTNUMBER is required");
  if (!p.favouring) throw new Error("PAYMENTFAVOURING is required");
  if (!p.defaultTransactionType)
    throw new Error("DEFAULTTRANSACTIONTYPE is required");

  return true;
}

module.exports = validateIndirectExpensesLedger;
