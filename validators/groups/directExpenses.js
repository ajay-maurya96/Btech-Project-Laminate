function validateDirectExpensesLedgerInput(input) {
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

  // Payment validation (Bank-based)
  if (input.paymentDetails) {
    const p = input.paymentDetails;

    if (!p.ifsc) {
      throw new Error("IFSCODE is required");
    }

    if (!p.bankName) {
      throw new Error("BANKNAME is required");
    }

    if (!p.accountNumber) {
      throw new Error("ACCOUNTNUMBER is required");
    }

    if (!p.favouring) {
      throw new Error("PAYMENTFAVOURING is required");
    }

    if (!p.transactionType) {
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
    }
  }

  if (input.roundingLimit && isNaN(Number(input.roundingLimit))) {
    throw new Error("ROUNDINGLIMIT must be numeric");
  }
}

module.exports = validateDirectExpensesLedgerInput;
