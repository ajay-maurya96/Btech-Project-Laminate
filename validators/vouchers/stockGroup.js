function validateStockGroup(data) {
    const errors = [];

    if (!data || typeof data !== "object") {
        return { isValid: false, errors: ["Data object required"] };
    }

    // -------- Company --------
    if (!data.company || typeof data.company !== "string") {
        errors.push("Company name is required");
    }

    // -------- Stock Groups --------
    if (!Array.isArray(data.stockGroups) || data.stockGroups.length === 0) {
        errors.push("At least one stock group required");
    } else {
        data.stockGroups.forEach((g, i) => {
            if (!g.name) errors.push(`StockGroup[${i}] name missing`);
            if (g.parent === undefined) {
                errors.push(`StockGroup[${i}] parent must be defined (can be empty string)`);
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateStockGroup;