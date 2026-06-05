function validateJournal(voucher) {
    const errors = [];
    const EPSILON = 0.0001;

    // Basic fields
    if (!voucher.company) errors.push("Company name is required");
    if (!voucher.type) errors.push("Voucher type is required");
    if (!voucher.date) errors.push("Voucher date is required");

    // Entries validation
    if (!Array.isArray(voucher.entries) || voucher.entries.length < 2) {
        errors.push("Journal must have at least 2 entries");
        return { isValid: false, errors };
    }

    let debit = 0;
    let credit = 0;

    const ledgerMap = new Map();

    for (const entry of voucher.entries) {

        if (!entry.ledgerName) {
            errors.push("Ledger name missing");
        }

        if (typeof entry.amount !== "number" || entry.amount <= 0) {
            errors.push(`Invalid amount for ledger ${entry.ledgerName}`);
        }

        if (typeof entry.isDeemedPositive !== "boolean") {
            errors.push(`Invalid isDeemedPositive for ledger ${entry.ledgerName}`);
        }

        // Sum
        if (entry.isDeemedPositive) {
            credit += entry.amount;
        } else {
            debit += entry.amount;
        }

        // Track misuse
        if (!ledgerMap.has(entry.ledgerName)) {
            ledgerMap.set(entry.ledgerName, { debit: 0, credit: 0 });
        }

        const rec = ledgerMap.get(entry.ledgerName);

        if (entry.isDeemedPositive) {
            rec.credit += entry.amount;
        } else {
            rec.debit += entry.amount;
        }
    }

    // Balance check
    if (Math.abs(debit - credit) > EPSILON) {
        errors.push(`Journal not balanced: Debit=${debit}, Credit=${credit}`);
    }

    // Same ledger both debit & credit (OPTIONAL: Journal may allow this, so warning)
    for (const [ledger, val] of ledgerMap.entries()) {
        if (val.debit > 0 && val.credit > 0) {
            errors.push(`Ledger "${ledger}" used in both debit and credit`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateJournal;