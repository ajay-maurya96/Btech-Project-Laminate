function validateIndirectIncomeLedger(input) {
  if (!input.companyName) {
    throw new Error("companyName is required");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (input.parent !== "Indirect Incomes") {
    throw new Error("parent must be 'Indirect Incomes'");
  }

  if (!input.costCentres) {
    throw new Error("ISCOSTCENTRESON flag is required (Yes/No)");
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

  // Banking is present in XML → mandatory
  if (!input.paymentDetails) {
    throw new Error("paymentDetails are mandatory for bank-enabled ledger");
  }

  const p = input.paymentDetails;

  if (!p.ifsc) throw new Error("IFSCODE is required");
  if (!p.bankName) throw new Error("BANKNAME is required");
  if (!p.accountNumber) throw new Error("ACCOUNTNUMBER is required");
  if (!p.favouring) throw new Error("PAYMENTFAVOURING is required");
  if (!p.defaultTransactionType)
    throw new Error("DEFAULTTRANSACTIONTYPE is required");

  return true;
}

module.exports = validateIndirectIncomeLedger;
