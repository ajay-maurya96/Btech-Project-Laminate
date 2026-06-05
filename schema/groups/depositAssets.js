const validateDepositsAssetLedgerInput = require('../../validators/groups/depositAssets');

function createDepositsAssetLedgerObject(input) {
    validateDepositsAssetLedgerInput(input);

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
                            LEDGER: {
                                "@_NAME": input.name,
                                "@_RESERVEDNAME": "",

                                "ADDRESS.LIST": {
                                    "@_TYPE": "String",
                                    ADDRESS: input.addresses
                                },

                                "MAILINGNAME.LIST": {
                                    "@_TYPE": "String",
                                    MAILINGNAME: [input.mailingName || input.name]
                                },

                                "OLDAUDITENTRYIDS.LIST": {
                                    "@_TYPE": "Number",
                                    OLDAUDITENTRYIDS: [-1]
                                },

                                PRIORSTATENAME: input.state,
                                PINCODE: input.pincode,
                                INCOMETAXNUMBER: input.pan,
                                COUNTRYNAME: input.country || "India",
                                GSTREGISTRATIONTYPE: input.gstRegistrationType || "Regular",

                                PARENT: "Deposits (Asset)",

                                TAXTYPE: "Others",
                                COUNTRYOFRESIDENCE: "India",
                                LEDSTATENAME: input.state,

                                ISBILLWISEON: "No",
                                ISCOSTCENTRESON: "No",
                                ISINTERESTON: "No",

                                AFFECTSSTOCK: "Yes",

                                ISCHEQUEPRINTINGENABLED: input.paymentDetails ? "Yes" : "No",
                                ISEBANKINGENABLED: "No",

                                SORTPOSITION: input.sortPosition || "1000",
                                ALTERID: input.alterId,
                                OPENINGBALANCE: input.openingBalance,

                                "LANGUAGENAME.LIST": {
                                    "NAME.LIST": {
                                        "@_TYPE": "String",
                                        NAME: input.languageNames || [input.name]
                                    },
                                    LANGUAGEID: input.languageId || "1033"
                                },

                                ...(input.paymentDetails && {
                                    "PAYMENTDETAILS.LIST": {
                                        PAYMENTFAVOURING: input.paymentDetails.favouring,
                                        TRANSACTIONNAME: input.paymentDetails.transactionName || "Primary",
                                        CHEQUECROSSCOMMENT: input.paymentDetails.chequeCrossComment || "A/c Payee",
                                        SETASDEFAULT: "No",
                                        DEFAULTTRANSACTIONTYPE: input.paymentDetails.transactionType,
                                        "BENEFICIARYCODEDETAILS.LIST": {}
                                    }
                                })
                            }
                        }
                    }
                }
            }
        }
    };
}

module.exports = createDepositsAssetLedgerObject;
