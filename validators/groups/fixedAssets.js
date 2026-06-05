function validateFixedAssetsLedger(input) {
  if (!input.companyName) throw new Error("companyName is required");

  if (!input.name) throw new Error("Ledger name is required");
  if (!input.parent || input.parent !== "Fixed Assets")
    throw new Error("parent must be 'Fixed Assets'");

  // Address & identity
  if (!Array.isArray(input.addresses) || input.addresses.length === 0)
    throw new Error("addresses must be a non-empty array");

  if (!input.mailingName) throw new Error("mailingName is required");
  if (!input.state) throw new Error("state is required");
  if (!input.country) throw new Error("country is required");

  // Statutory
  if (!input.pan) throw new Error("PAN (INCOMETAXNUMBER) is required");
  if (!input.gstRegistrationType)
    throw new Error("GSTREGISTRATIONTYPE is required");

  // Opening balance
  if (input.openingBalance === undefined)
    throw new Error("openingBalance is required");

  // Language
  if (!Array.isArray(input.languageNames) || input.languageNames.length === 0)
    throw new Error("languageNames is required");

  if (!input.languageId) throw new Error("languageId is required");

  // Banking (mandatory because PAYMENTDETAILS.LIST exists)
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

module.exports = validateFixedAssetsLedger;
