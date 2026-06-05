// ledgerValidator.js

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

function validateLedgerInput(input) {
  if (!input.companyName) {
    throw new Error("companyName is required (SVCURRENTCOMPANY)");
  }

  if (!input.name) {
    throw new Error("Ledger name is required");
  }

  if (!input.parent) {
    throw new Error("Parent group is required");
  }

  if (input.pan && !PAN_REGEX.test(input.pan)) {
    throw new Error("Invalid PAN format");
  }

  if (input.pincode && !PINCODE_REGEX.test(input.pincode)) {
    throw new Error("Invalid PINCODE");
  }

  if (input.address && !Array.isArray(input.address)) {
    throw new Error("Address must be an array of strings");
  }

  return true;
}

module.exports = validateLedgerInput;
