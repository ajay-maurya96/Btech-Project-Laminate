const validatePurchaseAccountWithBank = require('../../validators/groups/purchaseAccout');

function createPurchaseAccountLedger(input) {
    validatePurchaseAccountWithBank(input);

    return {
        ENVELOPE: {
            HEADER: {
                TALLYREQUEST: 'Import Data'
            },
            BODY: {
                IMPORTDATA: {
                    REQUESTDESC: {
                        REPORTNAME: 'All Masters',
                        STATICVARIABLES: {
                            SVCURRENTCOMPANY: input.companyName
                        }
                    },
                    REQUESTDATA: {
                        TALLYMESSAGE: {
                            LEDGER: {
                                '@_NAME': input.ledgerName,
                                '@_RESERVEDNAME': '',

                                'OLDAUDITENTRYIDS.LIST': {
                                    '@_TYPE': 'Number',
                                    OLDAUDITENTRYIDS: -1
                                },

                                PARENT: "Purchase Accounts",
                                TAXTYPE: 'Others',
                                ROUNDINGMETHOD: 'Upward Rounding',

                                ISBANKINGENABLED: 'Yes',
                                ISBENEFICIARYCODEON: 'Yes',

                                ISBILLWISEON: 'No',
                                ISCOSTCENTRESON: 'Yes',
                                AFFECTSSTOCK: 'Yes',
                                ISGSTAPPLICABLE: 'No',

                                ISCHEQUEPRINTINGENABLED: 'Yes',

                                SORTPOSITION: 1000,
                                ALTERID: input.alterId,
                                ROUNDINGLIMIT: 1,
                                OPENINGBALANCE: input.openingBalance.toFixed(2),

                                'LANGUAGENAME.LIST': {
                                    'NAME.LIST': {
                                        '@_TYPE': 'String',
                                        NAME: input.aliases
                                    },
                                    LANGUAGEID: 1033
                                },

                                'PAYMENTDETAILS.LIST': input.bank.enabled === 'Yes'
                                    ? {
                                        IFSCODE: input.bank.ifsc,
                                        BANKNAME: input.bank.bankName,
                                        ACCOUNTNUMBER: input.bank.accountNumber,
                                        PAYMENTFAVOURING: input.ledgerName,
                                        TRANSACTIONNAME: 'Primary',
                                        SETASDEFAULT: 'No',
                                        DEFAULTTRANSACTIONTYPE:
                                            input.bank.transactionType,
                                        'BENEFICIARYCODEDETAILS.LIST': {}
                                    }
                                    : undefined,

                                'UDF:VATDEALERNATURE.LIST': {
                                    '@_DESC': '`VATDealerNature`',
                                    '@_ISLIST': 'YES',
                                    '@_TYPE': 'String',
                                    '@_INDEX': '10031',
                                    'UDF:VATDEALERNATURE': {
                                        '@_DESC': '`VATDealerNature`',
                                        '#text': 'Invoice Rounding'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}

module.exports = createPurchaseAccountLedger;
