function validateSecuredLoanLedgerInput(input) {
  if (!input) throw new Error("Input is required");

  if (!input.companyName)
    throw new Error("companyName is required");

  if (!input.name)
    throw new Error("Ledger name is required");

  if (!Array.isArray(input.addresses) || input.addresses.length === 0)
    throw new Error("At least one address is required");

  if (!input.mailingNames || !Array.isArray(input.mailingNames))
    throw new Error("Mailing names must be an array");

  if (!input.state)
    throw new Error("State is required");

  if (!input.country)
    throw new Error("Country is required");

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

module.exports = validateSecuredLoanLedgerInput;
