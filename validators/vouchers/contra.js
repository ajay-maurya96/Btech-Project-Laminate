function validateVoucher(voucher) {
    const errors = [];
    const EPSILON = 0.0001;

    // -------- Basic Fields --------
    if (!voucher || typeof voucher !== "object") {
        return { isValid: false, errors: ["Voucher object is required"] };
    }

    if (!voucher.company || typeof voucher.company !== "string") {
        errors.push("Company name is required");
    }

    if (!voucher.type || typeof voucher.type !== "string") {
        errors.push("Voucher type is required");
    }

    if (!voucher.date || !/^\d{8}$/.test(voucher.date)) {
        errors.push("Voucher date must be in YYYYMMDD format");
    }

    // -------- Entries --------
    if (!Array.isArray(voucher.entries) || voucher.entries.length < 2) {
        errors.push("Voucher must have at least 2 ledger entries");
        return { isValid: false, errors };
    }

    let debit = 0;
    let credit = 0;

    let hasDebit = false;
    let hasCredit = false;

    const ledgerMap = new Map();

    for (const entry of voucher.entries) {
        if (!entry || typeof entry !== "object") {
            errors.push("Invalid entry object");
            continue;
        }

        const { ledgerName, amount, isDeemedPositive } = entry;

        // Ledger name
        if (!ledgerName || typeof ledgerName !== "string") {
            errors.push("Ledger name missing or invalid");
        }

        // Amount
        if (typeof amount !== "number" || isNaN(amount) || amount === 0) {
            errors.push(`Invalid amount for ledger ${ledgerName}`);
        }

        if (amount < 0) {
            errors.push(`Amount should be positive for ledger ${ledgerName}`);
        }

        // isDeemedPositive
        if (typeof isDeemedPositive !== "boolean") {
            errors.push(`Invalid isDeemedPositive for ledger ${ledgerName}`);
        }

        const absAmount = Math.abs(amount);

        // Sum
        if (isDeemedPositive) {
            credit += absAmount;
            hasCredit = true;
        } else {
            debit += absAmount;
            hasDebit = true;
        }

        // Ledger misuse tracking
        if (!ledgerMap.has(ledgerName)) {
            ledgerMap.set(ledgerName, { debit: 0, credit: 0 });
        }

        const record = ledgerMap.get(ledgerName);

        if (isDeemedPositive) {
            record.credit += absAmount;
        } else {
            record.debit += absAmount;
        }
    }

    // Must have both sides
    if (!hasDebit || !hasCredit) {
        errors.push("Voucher must have at least one debit and one credit entry");
    }

    // Balance check
    if (Math.abs(debit - credit) > EPSILON) {
        errors.push(`Voucher not balanced: Debit=${debit}, Credit=${credit}`);
    }

    // Same ledger misuse
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

module.exports = validateVoucher;