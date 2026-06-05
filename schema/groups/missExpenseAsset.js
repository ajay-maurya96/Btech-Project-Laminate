const validateMiscExpenseLedgerInput = require('../../validators/groups/missExpenseAsset');

function createMiscExpensesLedgerObject(input) {
  validateMiscExpenseLedgerInput(input);

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

                PARENT: "Misc. Expenses (ASSET)",

                ISBILLWISEON: input.flags?.billwise ?? "No",
                ISCOSTCENTRESON: input.flags?.costCentres ?? "No",
                ISINTERESTON: input.flags?.interest ?? "No",

                ISCHEQUEPRINTINGENABLED:
                  input.banking?.enabled ? "Yes" : "No",

                ISEBANKINGENABLED:
                  input.banking?.enabled ? "Yes" : "No",

                OPENINGBALANCE: input.openingBalance,
                ALTERID: input.alterId,

                "LANGUAGENAME.LIST": {
                  "NAME.LIST": {
                    "@_TYPE": "String",
                    NAME: input.languageNames
                  },
                  LANGUAGEID: input.languageId
                },

                ...(input.banking?.enabled && {
                  "PAYMENTDETAILS.LIST": {
                    IFSCODE: input.banking.ifsc,
                    BANKNAME: input.banking.bankName,
                    ACCOUNTNUMBER: input.banking.accountNumber,
                    PAYMENTFAVOURING: input.banking.favouring,
                    TRANSACTIONNAME: "Primary",
                    SETASDEFAULT: "No",
                    DEFAULTTRANSACTIONTYPE: input.banking.transactionType,
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

module.exports = createMiscExpensesLedgerObject;
