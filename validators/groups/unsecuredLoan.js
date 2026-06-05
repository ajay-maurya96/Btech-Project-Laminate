function validateUnsecuredLedgerInput(input) {
  if (!input.companyName) throw new Error("companyName is required");
  if (!input.name) throw new Error("Ledger name is required");
  if (!input.openingBalance && input.openingBalance !== 0) 
    throw new Error("openingBalance is required");

  if (!Array.isArray(input.addresses) || input.addresses.length === 0)
    throw new Error("At least one address is required");

  if (!Array.isArray(input.mailingNames) || input.mailingNames.length === 0)
    throw new Error("At least one mailing name is required");

  // Optional GST / PAN
  if (input.pan && !/^[A-Z]{5}\d{4}[A-Z]$/.test(input.pan))
    throw new Error("Invalid PAN format");

  // Payment details (cheque)
  if (input.payment?.enabled) {
    const p = input.payment;
    if (!p.favouring) throw new Error("PAYMENTFAVOURING is required");
    if (!p.transactionType) throw new Error("DEFAULTTRANSACTIONTYPE is required");
  }
}

module.exports = validateUnsecuredLedgerInput;
