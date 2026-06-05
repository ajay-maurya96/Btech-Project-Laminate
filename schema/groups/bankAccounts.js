// createLedgerObject.js
const validateLedgerData = require('../../validators/groups/bankAccounts');

function createLedgerObject(data) {
    // Validate input
    validateLedgerData(data);

    // Base ledger object
    const ledger = {
        "@_NAME": data.name,
        "@_RESERVEDNAME": "",
        PARENT: "Bank Accounts",
        OLDAUDITENTRYIDS: { "@_LISTTYPE": "Number", OLDAUDITENTRYIDS: -1 },
        STARTINGFROM: data.startingFrom || "20250401",
        GUID: data.guid || `ledger-${Date.now()}`,
        BANKACCHOLDERNAME: data.companyName || "",
        ISBILLWISEON: "No",
        ISCOSTCENTRESON: "No",
        ISINTERESTON: "No",
        ALLOWINMOBILE: "No",
        ASORIGINAL: "Yes",
        SORTPOSITION: "1000",
        ALTERID: data.alterId || "100",
    };

    // ───── ADDRESS ─────
    if (Array.isArray(data.address) && data.address.length > 0) {
        ledger["ADDRESS.LIST"] = {
            "@_TYPE": "String",
            ADDRESS: data.address.map(line => ({ "#text": line })),
        };
    }

    // ───── MAILING NAME ─────
    ledger["MAILINGNAME.LIST"] = {
        "@_TYPE": "String",
        MAILINGNAME: { "#text": data.mailingName || data.name },
    };

    // ───── LOCATION ─────
    if (data.state) ledger.LEDSTATENAME = data.state;
    if (data.pincode) ledger.PINCODE = data.pincode;
    if (data.country) ledger.COUNTRYNAME = data.country;
    if (data.priorStateName) ledger.PRIORSTATENAME = data.priorStateName;

    // ───── CONTACT DETAILS ─────
    if (data.email) ledger.EMAIL = data.email;
    if (data.emailCC) ledger.EMAILCC = data.emailCC;
    if (data.phone) ledger.LEDGERPHONE = data.phone;
    if (data.mobile) ledger.LEDGERMOBILE = data.mobile;
    if (data.contactPerson) ledger.LEDGERCONTACT = data.contactPerson;

    // ───── BANK DETAILS ─────
    if (data.bankDetails) {
        ledger.IFSCODE = data.bankDetails.ifsc;
        ledger.BANKNAME = data.bankDetails.bankName;
        ledger.BANKDETAILS = data.bankDetails.accountNumber;
        ledger.BANKBRANCHNAME = data.bankDetails.branch || "";
    }

    // ───── TAX / GST ─────
    if (data.pan) ledger.INCOMETAXNUMBER = data.pan;
    if (data.gstRegistrationType) ledger.GSTREGISTRATIONTYPE = data.gstRegistrationType;
    if (data.gstin) ledger.PARTYGSTIN = data.gstin;
    if (data.gstNature) ledger.GSTNATUREOFSUPPLY = data.gstNature;
    if (data.countryOfResidence) ledger.COUNTRYOFRESIDENCE = data.countryOfResidence;

    // ───── OPENING BALANCE ─────
    if (data.openingBalance) ledger.OPENINGBALANCE = data.openingBalance;

    // ───── LANGUAGE ─────
    ledger["LANGUAGENAME.LIST"] = {
        "NAME.LIST": {
            "@_TYPE": "String",
            NAME: (Array.isArray(data.languageNames) ? data.languageNames : [data.name]).map(name => ({ "#text": name })),
        },
        LANGUAGEID: data.languageId || "1033",
    };

    return {
        ENVELOPE: {
            HEADER: {
                TALLYREQUEST: "Import Data",
            },
            BODY: {
                IMPORTDATA: {
                    REQUESTDESC: {
                        REPORTNAME: "All Masters",
                        STATICVARIABLES: {
                            SVCURRENTCOMPANY: data.companyName,
                        },
                    },
                    REQUESTDATA: {
                        TALLYMESSAGE: {
                            "@_xmlns:UDF": "TallyUDF",
                            LEDGER: ledger,
                        },
                    },
                },
            },
        },
    };
}

module.exports = createLedgerObject;
