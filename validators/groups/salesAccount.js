// validators/validateSalesLedgerInput.js
function validateSalesLedgerInput(input) {
  if (!input.companyName)
    throw new Error("companyName is required");

  if (!input.name)
    throw new Error("Ledger name is required");

  if (!input.parent)
    throw new Error("Parent group is required");

  if (!input.openingBalance)
    throw new Error("OPENINGBALANCE is required");

  if (!input.language?.names?.length)
    throw new Error("At least one language NAME is required");

  if (!input.language?.id)
    throw new Error("LANGUAGEID is required");

  if (input.banking?.enabled) {
    if (!input.banking.favouring)
      throw new Error("PAYMENTFAVOURING is required");

    if (!input.banking.transactionType)
      throw new Error("DEFAULTTRANSACTIONTYPE is required");
  }

  if (input.audit?.oldAuditEntryIds) {
    if (!Array.isArray(input.audit.oldAuditEntryIds)) {
      throw new Error("oldAuditEntryIds must be an array");
    }
  }
}

module.exports = validateSalesLedgerInput;
