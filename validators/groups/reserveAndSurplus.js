function validateReservesSurplusLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!input.openingBalance) {
    throw new Error("openingBalance is required");
  }

  // Banking rules (VERY IMPORTANT)
  if (input.banking?.enabled === true) {
    throw new Error(
      "Banking cannot be enabled for Reserves & Surplus ledger"
    );
  }

  // If payment details exist, only cheque-related fields are allowed
  if (input.paymentDetails) {
    if (!input.paymentDetails.favouring) {
      throw new Error("PAYMENTFAVOURING is required");
    }

    if (!input.paymentDetails.transactionType) {
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
    }
  }
}

module.exports = validateReservesSurplusLedgerInput;
