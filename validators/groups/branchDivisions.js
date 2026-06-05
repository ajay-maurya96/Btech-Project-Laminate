// validators/groups/branchDivisions.js

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PINCODE_REGEX = /^[0-9]{6}$/;

function validateBranchDivisionLedger(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Ledger input must be an object");
  }

  if (!data.name) {
    throw new Error("Ledger name is mandatory");
  }

  if (!data.companyName) {
    throw new Error("SVCURRENTCOMPANY (companyName) is mandatory");
  }

  if (data.pan && !PAN_REGEX.test(data.pan)) {
    throw new Error("Invalid PAN format");
  }

  if (data.pincode && !PINCODE_REGEX.test(data.pincode)) {
    throw new Error("Invalid PINCODE format");
  }

  if (
    data.openingBalance !== undefined &&
    isNaN(data.openingBalance)
  ) {
    throw new Error("Opening balance must be numeric");
  }
}

module.exports = validateBranchDivisionLedger;
