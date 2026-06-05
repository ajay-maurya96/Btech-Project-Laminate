const validateReservesSurplusLedgerInput =
  require("../../validators/groups/reserveAndSurplus");

function createReservesSurplusLedgerObject(input) {
  validateReservesSurplusLedgerInput(input);

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

                PARENT: "Reserves & Surplus",

                TAXTYPE: "Others",

                ISBILLWISEON: "No",
                ISCOSTCENTRESON: "No",
                ISINTERESTON: "No",

                ISCHEQUEPRINTINGENABLED: "Yes",
                ISEBANKINGENABLED: "No",

                SORTPOSITION: input.sortPosition ?? "1000",
                ALTERID: input.alterId,
                OPENINGBALANCE: input.openingBalance,

                "LANGUAGENAME.LIST": {
                  "NAME.LIST": {
                    "@_TYPE": "String",
                    NAME: input.languageNames
                  },
                  LANGUAGEID: input.languageId
                },

                ...(input.paymentDetails && {
                  "PAYMENTDETAILS.LIST": {
                    PAYMENTFAVOURING: input.paymentDetails.favouring,
                    TRANSACTIONNAME: "Primary",
                    CHEQUECROSSCOMMENT:
                      input.paymentDetails.chequeCross ?? "A/c Payee",
                    SETASDEFAULT: "No",
                    DEFAULTTRANSACTIONTYPE:
                      input.paymentDetails.transactionType,
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

module.exports = createReservesSurplusLedgerObject;
