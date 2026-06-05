function validateStockInHandLedgerInput(input) {
  if (!input) throw new Error("Input is required");

  if (!input.companyName)
    throw new Error("companyName is required");

  if (!input.name)
    throw new Error("Ledger name is required");

  if (!input.openingBalance)
    throw new Error("openingBalance is required");

  if (!input.language?.names || !Array.isArray(input.language.names))
    throw new Error("language.names must be an array");

  if (!input.language?.id)
    throw new Error("language.id is required");

  // Banking validation (mandatory here because XML has PAYMENTDETAILS)
  if (!input.banking)
    throw new Error("banking object is required");

  const b = input.banking;

  if (!b.ifsc) throw new Error("IFSCODE is required");
  if (!b.bankName) throw new Error("BANKNAME is required");
  if (!b.accountNumber) throw new Error("ACCOUNTNUMBER is required");
  if (!b.favouring) throw new Error("PAYMENTFAVOURING is required");
  if (!b.transactionType)
    throw new Error("DEFAULTTRANSACTIONTYPE is required");
}

module.exports = validateStockInHandLedgerInput;
