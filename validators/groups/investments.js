function validateInvestmentLedger(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (input.parent !== "Investments") {
    throw new Error("parent must be 'Investments'");
  }

  if (!Array.isArray(input.addresses) || input.addresses.length === 0) {
    throw new Error("addresses are required");
  }

  if (!input.mailingName) {
    throw new Error("mailingName is required");
  }

  if (!input.state) {
    throw new Error("state is required");
  }

  if (!input.pincode) {
    throw new Error("pincode is required");
  }

  if (!input.country) {
    throw new Error("country is required");
  }

  if (!input.pan) {
    throw new Error("INCOMETAXNUMBER (PAN) is required");
  }

  if (input.openingBalance === undefined) {
    throw new Error("OPENINGBALANCE is required");
  }

  if (!Array.isArray(input.languageNames) || input.languageNames.length === 0) {
    throw new Error("languageNames is required");
  }

  if (!input.languageId) {
    throw new Error("languageId is required");
  }

  // Banking is ON in XML
  if (!input.paymentDetails) {
    throw new Error("paymentDetails are mandatory for Investments ledger");
  }

  const p = input.paymentDetails;

  if (!p.ifsc) throw new Error("IFSCODE is required");
  if (!p.bankName) throw new Error("BANKNAME is required");
  if (!p.accountNumber) throw new Error("ACCOUNTNUMBER is required");
  if (!p.favouring) throw new Error("PAYMENTFAVOURING is required");
  if (!p.defaultTransactionType) {
    throw new Error("DEFAULTTRANSACTIONTYPE is required");
  }

  return true;
}

module.exports = validateInvestmentLedger;
