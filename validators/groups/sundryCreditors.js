// validators/groups/sundryCreditors.js

function validateLedgerData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Ledger data must be an object");
  }

  // ───── REQUIRED ─────
  if (!data.name || typeof data.name !== "string") {
    throw new Error("Ledger name is required and must be a string");
  }
  if (!data.companyName) {
    throw new Error("companyName is mandatory for Tally import");
  }

  // ───── OPTIONAL VALIDATIONS ─────

  if (data.address) {
    if (!Array.isArray(data.address)) {
      throw new Error("Address must be an array of strings");
    }
    data.address.forEach(line => {
      if (typeof line !== "string") {
        throw new Error("Each address line must be a string");
      }
    });
  }

  if (data.state && typeof data.state !== "string") {
    throw new Error("State must be a string");
  }

  if (data.country && typeof data.country !== "string") {
    throw new Error("Country must be a string");
  }

  if (data.pincode && !/^\d{4,8}$/.test(String(data.pincode))) {
    throw new Error("Invalid pincode format");
  }

  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    throw new Error("Invalid email format");
  }

  if (data.mobile && !/^\d{6,15}$/.test(String(data.mobile))) {
    throw new Error("Invalid mobile number");
  }

  if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan)) {
    throw new Error("Invalid PAN format");
  }

  if (data.gstin && !/^[0-9A-Z]{15}$/.test(data.gstin)) {
    throw new Error("Invalid GSTIN format");
  }

  if (data.bankDetails) {
    const { ifsc, bankName, accountNumber } = data.bankDetails;

    if (!ifsc || !bankName || !accountNumber) {
      throw new Error("Incomplete bank details");
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      throw new Error("Invalid IFSC code");
    }
  }

  if (!data.companyName) {
    throw new Error("SVCURRENTCOMPANY is mandatory");
  }

  return true;
}

module.exports = validateLedgerData;
