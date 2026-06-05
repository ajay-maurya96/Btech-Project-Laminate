const validateDirectIncomesLedgerInput = require('../../validators/groups/directIncomes');

function createDirectIncomesLedgerObject(input) {
    validateDirectIncomesLedgerInput(input);

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

                                "OLDAUDITENTRYIDS.LIST": {
                                    "@_TYPE": "Number",
                                    OLDAUDITENTRYIDS: [-1]
                                },

                                PARENT: "Direct Incomes",

                                TAXTYPE: "Others",

                                ROUNDINGMETHOD: input.roundingMethod || "Normal Rounding",
                                ROUNDINGLIMIT: input.roundingLimit || "1",

                                ISBILLWISEON: "No",
                                ISCOSTCENTRESON: "Yes",
                                ISINTERESTON: "No",

                                AFFECTSSTOCK: "Yes",

                                ISCHEQUEPRINTINGENABLED: input.paymentDetails ? "Yes" : "No",
                                ISEBANKINGENABLED: input.paymentDetails ? "Yes" : "No",

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
                                        SETASDEFAULT: "No",
                                        DEFAULTTRANSACTIONTYPE: input.paymentDetails.transactionType,
                                        "BENEFICIARYCODEDETAILS.LIST": {}
                                    }
                                }),

                                ...(input.vatDealerNature && {
                                    "UDF:VATDEALERNATURE.LIST": {
                                        "@_DESC": "`VATDealerNature`",
                                        "@_ISLIST": "YES",
                                        "@_TYPE": "String",
                                        "@_INDEX": "10031",
                                        "UDF:VATDEALERNATURE": {
                                            "@_DESC": "`VATDealerNature`",
                                            "#text": input.vatDealerNature
                                        }
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

module.exports = createDirectIncomesLedgerObject;
