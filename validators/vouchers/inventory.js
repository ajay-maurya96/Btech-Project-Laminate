function validateInventory(data) {
    const errors = [];

    if (!data || typeof data !== "object") {
        return { isValid: false, errors: ["Data object required"] };
    }

    // -------- Company --------
    if (!data.company || typeof data.company !== "string") {
        errors.push("Company is required");
    }

    // -------- Masters --------
    if (!Array.isArray(data.stockItems) || data.stockItems.length === 0) {
        errors.push("At least one stock item required");
    } else {
        data.stockItems.forEach((s, i) => {
            if (!s.name) errors.push(`StockItem[${i}] name missing`);
            if (!s.group) errors.push(`StockItem[${i}] group missing`);
        });
    }

    if (!Array.isArray(data.stockGroups)) {
        errors.push("StockGroups must be array");
    }

    if (!Array.isArray(data.godowns)) {
        errors.push("Godowns must be array");
    }

    // -------- Voucher --------
    const v = data.voucher;

    if (!v) {
        errors.push("Voucher missing");
    } else {
        if (!v.date || !/^\d{8}$/.test(v.date)) {
            errors.push("Voucher date must be YYYYMMDD");
        }

        if (!v.type) {
            errors.push("Voucher type required");
        }

        if (!Array.isArray(v.inEntries) || !Array.isArray(v.outEntries)) {
            errors.push("Inventory entries required");
        }

        const all = [...(v.inEntries || []), ...(v.outEntries || [])];

        all.forEach((e, i) => {
            if (!e.stockItemName) errors.push(`Entry[${i}] stock item missing`);
            if (!e.godown) errors.push(`Entry[${i}] godown missing`);
            if (typeof e.qty !== "number") errors.push(`Entry[${i}] qty invalid`);
        });

        if (all.length === 0) {
            errors.push("At least one inventory entry required");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateInventory;