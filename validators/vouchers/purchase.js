function validatePurchase(data) {
    const errors = [];

    if (!data || typeof data !== "object") {
        return { isValid: false, errors: ["Data object required"] };
    }

    // Company
    if (!data.company) errors.push("Company required");

    // Group (optional)
    if (data.group) {
        if (!data.group.name) errors.push("Group name required");
        if (!data.group.parent) errors.push("Group parent required");
    }

    // Ledgers
    if (!Array.isArray(data.ledgers) || data.ledgers.length < 2) {
        errors.push("At least 2 ledgers required");
    } else {
        data.ledgers.forEach((l, i) => {
            if (!l.name) errors.push(`Ledger[${i}] name missing`);
            if (!l.parent) errors.push(`Ledger[${i}] parent missing`);
        });
    }

    // Stock
    if (!data.stockItem?.name) {
        errors.push("Stock item required");
    }

    // Voucher
    const v = data.voucher;

    if (!v) {
        errors.push("Voucher missing");
    } else {
        if (!/^\d{8}$/.test(v.date)) {
            errors.push("Date must be YYYYMMDD");
        }

        if (!v.party) errors.push("Party required");

        if (!Array.isArray(v.items) || v.items.length === 0) {
            errors.push("At least 1 item required");
        } else {
            v.items.forEach((item, i) => {
                if (!item.name) errors.push(`Item[${i}] name missing`);
                if (typeof item.qty !== "number" || item.qty <= 0)
                    errors.push(`Item[${i}] invalid qty`);
                if (typeof item.rate !== "number" || item.rate <= 0)
                    errors.push(`Item[${i}] invalid rate`);
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validatePurchase;