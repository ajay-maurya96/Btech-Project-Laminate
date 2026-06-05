function validateBankLedgerInput(input) {
  // Basic required fields
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!input.parent) {
    throw new Error("parent group is required");
  }

  if (!input.openingBalance) {
    throw new Error("openingBalance is required");
  }

  // Flags defaults
  if (!input.flags) {
    input.flags = {
      billwise: "No",
      costCentres: "No",
      interest: "No"
    };
  }
  
  // Mailing name default
  if (!input.mailingName) {
    input.mailingName = input.name;
  }

  // Language defaults
  if (!input.languageNames || !Array.isArray(input.languageNames) || input.languageNames.length === 0) {
    input.languageNames = [input.name];
  }
  if (!input.languageId) {
    input.languageId = "1033";
  }

  // Addresses
  if (!input.addresses || !Array.isArray(input.addresses)) {
    input.addresses = [];
  }

  // Banking / paymentDetails validation (optional)
  if (input.paymentDetails) {
    const pd = input.paymentDetails;

    if (!pd.favouring) {
      throw new Error("PAYMENTFAVOURING is required in paymentDetails");
    }

    if (!pd.transactionType) {
      throw new Error("DEFAULTTRANSACTIONTYPE is required in paymentDetails");
    }

    if (!pd.bankName) {
      throw new Error("BANKNAME is required in paymentDetails");
    }

    if (!pd.accountNumber) {
      throw new Error("ACCOUNTNUMBER is required in paymentDetails");
    }

    if (!pd.ifsc) {
      throw new Error("IFSCODE is required in paymentDetails");
    }
  }
}

module.exports = validateBankLedgerInput;
