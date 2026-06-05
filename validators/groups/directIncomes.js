function validateLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!input.openingBalance) {
    throw new Error("openingBalance is required");
  }

  // If PAYMENTDETAILS exists → strict validation
  if (input.paymentDetails) {
    const pd = input.paymentDetails;

    if (!pd.favouring) {
      throw new Error("PAYMENTFAVOURING is required");
    }

    if (!pd.transactionType) {
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
    }

    if (!pd.bankName) {
      throw new Error("BANKNAME is required");
    }

    if (!pd.accountNumber) {
      throw new Error("ACCOUNTNUMBER is required");
    }

    if (!pd.ifsc) {
      throw new Error("IFSCODE is required");
    }
  }
}

module.exports = validateLedgerInput;
