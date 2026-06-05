function validateSuspenseLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (input.openingBalance === undefined || input.openingBalance === null) {
    throw new Error("openingBalance is required");
  }

  // Banking validation (only if enabled)
  if (input.banking?.enabled) {
    const b = input.banking;

    if (!b.ifsc) throw new Error("IFSCODE is required");
    if (!b.bankName) throw new Error("BANKNAME is required");
    if (!b.accountNumber) throw new Error("ACCOUNTNUMBER is required");
    if (!b.favouring) throw new Error("PAYMENTFAVOURING is required");
    if (!b.transactionType) throw new Error("DEFAULTTRANSACTIONTYPE is required");
  }
}

module.exports = validateSuspenseLedgerInput;
