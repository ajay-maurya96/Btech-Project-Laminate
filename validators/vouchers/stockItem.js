function validateStockItem(data) {
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
    } else if (data.groups) {
        data.groups.forEach((g, i) => {
            if (!g.name) errors.push(`Group[${i}] name missing`);
        });
    }

    // -------- Stock Items --------
    if (!Array.isArray(data.items) || data.items.length === 0) {
        errors.push("At least one stock item required");
    } else {
        data.items.forEach((item, i) => {
            if (!item.name) errors.push(`Item[${i}] name missing`);
            if (!item.parent) errors.push(`Item[${i}] parent (group) missing`);
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = validateStockItem;