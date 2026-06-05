function validateLedgerInput(input) {
  if (!input) throw new Error("Ledger input is required");

  // ─── Mandatory (Tally-level) ───
  if (!input.companyName) throw new Error("companyName (SVCURRENTCOMPANY) is mandatory");
  if (!input.name) throw new Error("Ledger name is mandatory");

  // ─── Optional format checks ───
  if (input.paymentDetails && input.allowBanking !== true) {
    throw new Error(
      "Bank details are not allowed for Cash-in-Hand ledger"
    );
  }
  if (input.openingBalance && isNaN(Number(input.openingBalance))) {
    throw new Error("openingBalance must be numeric");
  }

  if (input.languageId && !/^\d+$/.test(input.languageId)) {
    throw new Error("languageId must be numeric (e.g. 1033)");
  }

  // Service Category MUST NOT be UI placeholder
  if (input.serviceCategory === "&#4; Not Applicable") {
    throw new Error("UI placeholder service category is not allowed");
  }

  // Payment details sanity
  if (input.paymentDetails) {
    const { ifsc, accountNumber } = input.paymentDetails;
    if (ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      throw new Error("Invalid IFSC format");
    }
    if (accountNumber && !/^\d+$/.test(accountNumber)) {
      throw new Error("Account number must be numeric");
    }
  }
}

module.exports = validateLedgerInput;
