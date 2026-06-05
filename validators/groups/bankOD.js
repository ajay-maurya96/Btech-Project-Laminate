// validators/groups/bankOD.js

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const PINCODE_REGEX = /^[0-9]{6}$/;

function validateBankODLedger(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Ledger input must be an object");
  }

  if (!data.name || typeof data.name !== "string") {
    throw new Error("Ledger name is mandatory");
  }

  if (!data.companyName) {
    throw new Error("SVCURRENTCOMPANY (companyName) is mandatory");
  }

  if (data.ifsc && !IFSC_REGEX.test(data.ifsc)) {
    throw new Error("Invalid IFSC code format");
  }

  if (data.pincode && !PINCODE_REGEX.test(data.pincode)) {
    throw new Error("Invalid PINCODE format");
  }

  if (data.openingBalance !== undefined && isNaN(data.openingBalance)) {
    throw new Error("Opening balance must be numeric");
  }

  if (data.odLimit !== undefined && isNaN(data.odLimit)) {
    throw new Error("OD limit must be numeric");
  }
}

module.exports = validateBankODLedger;
