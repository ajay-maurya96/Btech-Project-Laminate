function validateDepositsAssetLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!Array.isArray(input.addresses)) {
    throw new Error("addresses must be an array");
  }

  if (!input.state) {
    throw new Error("state is required");
  }

  if (!input.pincode) {
    throw new Error("pincode is required");
  }

  if (!input.pan) {
    throw new Error("PAN (INCOMETAXNUMBER) is required");
  }

  if (!input.openingBalance) {
    throw new Error("openingBalance is required");
  }

  if (!input.alterId) {
    throw new Error("alterId is required");
  }

  // Payment validation (Cheque-based)
  if (input.paymentDetails) {
    const p = input.paymentDetails;

    if (!p.favouring) {
      throw new Error("PAYMENTFAVOURING is required");
    }

    if (!p.transactionType) {
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
    }

    if (p.transactionType !== "Cheque") {
      throw new Error("Deposits (Asset) supports Cheque transaction type only");
    }
  }
}

module.exports = validateDepositsAssetLedgerInput;
