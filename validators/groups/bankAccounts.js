// validators/groups/bankAccounts.js

function validateLedgerData(data) {
    if (!data.name || typeof data.name !== "string") {
        throw new Error("Ledger name is mandatory and must be a string");
    }

    if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan)) {
        throw new Error("Invalid PAN format. Example: ABCDE1234F");
    }

    if (data.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(data.gstin)) {
        throw new Error("Invalid GSTIN format. Example: 27ABCDE1234F1Z5");
    }

    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        throw new Error("Invalid email format");
    }

    if (data.emailCC && !/^\S+@\S+\.\S+$/.test(data.emailCC)) {
        throw new Error("Invalid CC email format");
    }

    if (data.openingBalance && isNaN(Number(data.openingBalance))) {
        throw new Error("Opening balance must be a number");
    }

    if (data.languageNames && !Array.isArray(data.languageNames)) {
        throw new Error("languageNames must be an array");
    }

    return true; // valid
}

module.exports = validateLedgerData;
