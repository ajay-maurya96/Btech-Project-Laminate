const validateLoanLedger = require('../../validators/groups/loansAndAdvanceAssets');

function createLoanLedgerSchema(input) {
    validateLoanLedger(input);

    return {
        ENVELOPE: {
            HEADER: {
                TALLYREQUEST: "Import Data"
            },
            BODY: {
                IMPORTDATA: {
                    REQUESTDESC: {
                        REPORTNAME: "All Masters",
                        STATICVARIABLES: {
                            SVCURRENTCOMPANY: input.companyName
                        }
                    },
                    REQUESTDATA: {
                        TALLYMESSAGE: {
                            "@_xmlns:UDF": "TallyUDF",
                            LEDGER: {
                                "@_NAME": input.name,
                                "@_RESERVEDNAME": "",

                                "ADDRESS.LIST": {
                                    "@_TYPE": "String",
                                    ADDRESS: input.addresses
                                },

                                "MAILINGNAME.LIST": {
                                    "@_TYPE": "String",
                                    MAILINGNAME: input.mailingName
                                },

                                "OLDAUDITENTRYIDS.LIST": {
                                    "@_TYPE": "Number",
                                    OLDAUDITENTRYIDS: "-1"
                                },

                                PRIORSTATENAME: input.state,
                                PINCODE: input.pincode,
                                INCOMETAXNUMBER: input.pan,
                                COUNTRYNAME: input.country,
                                GSTREGISTRATIONTYPE: input.gstRegistrationType,

                                PARENT: "Loans & Advances (Asset)",
                                TAXTYPE: "Others",
                                COUNTRYOFRESIDENCE: input.country,
                                LEDSTATENAME: input.state,

                                ISBILLWISEON: "No",
                                ISCOSTCENTRESON: "No",
                                ISINTERESTON: "No",

                                AFFECTSSTOCK: "Yes",
                                FORPAYROLL: "No",

                                ISGSTAPPLICABLE: "No",
                                ISTDSAPPLICABLE: "No",

                                ISCHEQUEPRINTINGENABLED: "Yes",

                                SORTPOSITION: "1000",
                                ALTERID: input.alterId || "0",
                                OPENINGBALANCE: input.openingBalance,

                                "LANGUAGENAME.LIST": {
                                    "NAME.LIST": {
                                        "@_TYPE": "String",
                                        NAME: input.languageNames
                                    },
                                    LANGUAGEID: input.languageId
                                },

                                "PAYMENTDETAILS.LIST": {
                                    IFSCODE: input.paymentDetails.ifsc,
                                    BANKNAME: input.paymentDetails.bankName,
                                    ACCOUNTNUMBER: input.paymentDetails.accountNumber,
                                    PAYMENTFAVOURING: input.paymentDetails.favouring,
                                    TRANSACTIONNAME: "Primary",
                                    SETASDEFAULT: "No",
                                    DEFAULTTRANSACTIONTYPE:
                                        input.paymentDetails.defaultTransactionType,
                                    "BENEFICIARYCODEDETAILS.LIST": {}
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}

module.exports = createLoanLedgerSchema;
