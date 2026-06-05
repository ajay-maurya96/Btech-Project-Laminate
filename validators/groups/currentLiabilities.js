function validateCurrentLiabilitiesLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!input.addresses || !Array.isArray(input.addresses)) {
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

  // Banking validation (ONLY if provided)
  if (input.paymentDetails) {
    const p = input.paymentDetails;

    if (!p.favouring) {
      throw new Error("PAYMENTFAVOURING is required");
    }

    if (!p.bankName) {
      throw new Error("BANKNAME is required");
    }

    if (!p.accountNumber) {
      throw new Error("ACCOUNTNUMBER is required");
    }

    if (!p.ifsc) {
      throw new Error("IFSCODE is required");
    }

    if (!p.transactionType) {
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
    }
  }
}

module.exports = validateCurrentLiabilitiesLedgerInput;
