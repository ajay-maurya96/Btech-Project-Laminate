const validateIndirectIncomeLedger = require('../../validators/groups/indirectIncome');

function createIndirectIncomeLedgerSchema(input) {
    validateIndirectIncomeLedger(input);

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

                                "OLDAUDITENTRYIDS.LIST": {
                                    "@_TYPE": "Number",
                                    OLDAUDITENTRYIDS: "-1"
                                },

                                PARENT: "Indirect Incomes",
                                TAXTYPE: "Others",

                                ROUNDINGMETHOD: "Normal Rounding",

                                ISBILLWISEON: "No",
                                ISCOSTCENTRESON: input.costCentres,
                                ISINTERESTON: "No",

                                AFFECTSSTOCK: "No",
                                FORPAYROLL: "No",

                                ISGSTAPPLICABLE: "No",
                                ISTDSAPPLICABLE: "No",

                                SORTPOSITION: "1000",
                                ROUNDINGLIMIT: "1",
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
                                },

                                "UDF:VATDEALERNATURE.LIST": {
                                    "@_DESC": "`VATDealerNature`",
                                    "@_ISLIST": "YES",
                                    "@_TYPE": "String",
                                    "@_INDEX": "10031",
                                    "UDF:VATDEALERNATURE": "Invoice Rounding"
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}

module.exports = createIndirectIncomeLedgerSchema;
