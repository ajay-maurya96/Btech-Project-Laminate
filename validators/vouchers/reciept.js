function validateReceipt(data) {
    const errors = [];

    if (!data.company) errors.push("Company required");

    const v = data.voucher;

    if (!v) {
        errors.push("Voucher missing");
    } else {
        if (!/^\d{8}$/.test(v.date)) {
            errors.push("Date must be YYYYMMDD");
        }

        if (!v.party) errors.push("Party (bank/cash ledger) required");

        if (!Array.isArray(v.entries) || v.entries.length === 0) {
            errors.push("At least one receipt entry required");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateReceipt;