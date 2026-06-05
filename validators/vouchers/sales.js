function validateSales(data) {
    const errors = [];

    if (!data || typeof data !== "object") {
        return { isValid: false, errors: ["Data object required"] };
    }

    // -------- Company --------
    if (!data.company || typeof data.company !== "string") {
        errors.push("Company name is required");
    }

    // -------- Ledgers --------
    if (!Array.isArray(data.ledgers) || data.ledgers.length === 0) {
        errors.push("At least one ledger required");
    } else {
        data.ledgers.forEach((l, i) => {
            if (!l.name) errors.push(`Ledger[${i}] name missing`);
            if (!l.parent) errors.push(`Ledger[${i}] parent missing`);
        });
    }

    // -------- Voucher --------
    const v = data.voucher;

    if (!v) {
        errors.push("Voucher missing");
    } else {
        if (!v.date || !/^\d{8}$/.test(v.date)) {
            errors.push("Date must be YYYYMMDD");
        }

        if (!v.type) errors.push("Voucher type required");

        if (!v.partyLedger) {
            errors.push("Party ledger required");
        }

        if (!Array.isArray(v.items) || v.items.length === 0) {
            errors.push("At least one inventory item required");
        } else {
            v.items.forEach((item, i) => {
                if (!item.name) errors.push(`Item[${i}] name missing`);
                if (typeof item.amount !== "number" || item.amount <= 0) {
                    errors.push(`Item[${i}] invalid amount`);
                }
                if (!item.salesLedger) {
                    errors.push(`Item[${i}] sales ledger missing`);
                }
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateSales;