// validators/dutiesAndTaxesLedger.js
function validateDutiesAndTaxesLedger(input) {
  if (!input.companyName) throw new Error("companyName is required");

  if (!input.name) throw new Error("Ledger name is required");
  if (!input.parent) throw new Error("parent is required");

  if (!input.tax?.basicTypeOfDuty)
    throw new Error("BASICTYPEOFDUTY is required");

  if (!input.tax?.rateOfTax)
    throw new Error("RATEOFTAXCALCULATION is required");

  if (!input.rounding?.method)
    throw new Error("ROUNDINGMETHOD is required");

  if (!input.rounding?.limit)
    throw new Error("ROUNDINGLIMIT is required");

  if (!input.openingBalance)
    throw new Error("OPENINGBALANCE is required");

  if (!input.alterId)
    throw new Error("ALTERID is required");

  if (!Array.isArray(input.language?.names) || !input.language.names.length)
    throw new Error("At least one language name is required");

  if (!input.language?.id)
    throw new Error("LANGUAGEID is required");

  // PAYMENTDETAILS → cheque printing → bank validation
  if (input.paymentDetails) {
    const p = input.paymentDetails;

    if (!p.favouring)
      throw new Error("PAYMENTFAVOURING is required");

    if (!p.transactionType)
      throw new Error("DEFAULTTRANSACTIONTYPE is required");

    // Even though ISEBANKINGENABLED = No
    // Tally enforces IFSC once PAYMENTDETAILS exists
    if (!p.ifsc) throw new Error("IFSCODE is required");
  }
}

module.exports = validateDutiesAndTaxesLedger;
