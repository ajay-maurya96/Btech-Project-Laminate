function validateProvisionsLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!input.openingBalance) {
    throw new Error("openingBalance is required");
  }

  if (!input.alterId) {
    throw new Error("alterId is required");
  }

  if (!input.languageNames || !Array.isArray(input.languageNames)) {
    throw new Error("languageNames must be an array");
  }

  if (!input.languageId) {
    throw new Error("languageId is required");
  }

  // Banking validation (only if enabled)
  if (input.banking?.enabled) {
    const b = input.banking;

    if (!b.ifsc) throw new Error("IFSCODE is required");
    if (!b.bankName) throw new Error("BANKNAME is required");
    if (!b.accountNumber) throw new Error("ACCOUNTNUMBER is required");
    if (!b.favouring) throw new Error("PAYMENTFAVOURING is required");
    if (!b.transactionType)
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
  }
}

module.exports = validateProvisionsLedgerInput;
