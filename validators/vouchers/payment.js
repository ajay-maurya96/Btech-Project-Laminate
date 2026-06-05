function validateAll(data) {
    const errors = [];

    if (!data || typeof data !== "object") {
        return { isValid: false, errors: ["Data object required"] };
    }

    // -------- Company --------
    if (!data.company || typeof data.company !== "string") {
        errors.push("Company name is required");
    }

    // -------- Groups (optional) --------
    if (data.groups && !Array.isArray(data.groups)) {
        errors.push("Groups must be an array");
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
            errors.push("Voucher date must be YYYYMMDD");
        }

        if (!v.type) errors.push("Voucher type required");

        if (!Array.isArray(v.entries) || v.entries.length < 2) {
            errors.push("Voucher must have >= 2 entries");
        } else {
            let debit = 0, credit = 0;

            v.entries.forEach((e, i) => {
                if (!e.ledgerName) errors.push(`Entry[${i}] ledger missing`);
                if (typeof e.amount !== "number" || e.amount <= 0) {
                    errors.push(`Entry[${i}] invalid amount`);
                }

                if (e.isDeemedPositive) credit += e.amount;
                else debit += e.amount;
            });

            if (Math.abs(debit - credit) > 0.0001) {
                errors.push("Voucher not balanced");
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateAll;