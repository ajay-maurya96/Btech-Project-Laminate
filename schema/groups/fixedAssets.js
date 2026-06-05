const validateFixedAssetsLedger = require('../../validators/groups/fixedAssets');

function createFixedAssetsLedgerSchema(input) {
    validateFixedAssetsLedger(input);

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

                                PARENT: "Fixed Assets",

                                TAXTYPE: "Others",
                                COUNTRYOFRESIDENCE: input.country,
                                LEDSTATENAME: input.state,

                                ISBILLWISEON: "No",
                                ISCOSTCENTRESON: "No",
                                ISINTERESTON: "No",

                                AFFECTSSTOCK: "No",
                                FORPAYROLL: "No",

                                ISGSTAPPLICABLE: "No",
                                ISEXCISEAPPLICABLE: "No",
                                ISTDSAPPLICABLE: "No",

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

module.exports = createFixedAssetsLedgerSchema;
