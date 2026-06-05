const validateStockInHandLedgerInput = require('../../validators/groups/stockInHand');

function createStockInHandLedgerObject(input) {
  validateStockInHandLedgerInput(input);

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

                // 🔒 FIXED PARENT
                PARENT: "Stock-in-Hand",

                TAXCLASSIFICATIONNAME: "",
                TAXTYPE: "Others",
                GSTTYPE: "",
                APPROPRIATEFOR: "",

                EXCISELEDGERCLASSIFICATION: "",
                EXCISEDUTYTYPE: "",
                EXCISENATUREOFPURCHASE: "",
                LEDGERFBTCATEGORY: "",

                ISBILLWISEON: "No",
                ISCOSTCENTRESON: "No",
                ISINTERESTON: "No",
                ALLOWINMOBILE: "No",

                ISCOSTTRACKINGON: "No",
                ISBENEFICIARYCODEON: "No",
                PLASINCOMEEXPENSE: "No",
                ISUPDATINGTARGETID: "No",
                ASORIGINAL: "Yes",
                ISCONDENSED: "No",

                AFFECTSSTOCK: "No",

                ISCHEQUEPRINTINGENABLED: "Yes",
                ISEBANKINGENABLED: "No",

                SORTPOSITION: input.sortPosition ?? 1000,
                ALTERID: input.alterId,
                OPENINGBALANCE: input.openingBalance,

                "SERVICETAXDETAILS.LIST": {},
                "LBTREGNDETAILS.LIST": {},
                "VATDETAILS.LIST": {},
                "SALESTAXCESSDETAILS.LIST": {},
                "GSTDETAILS.LIST": {},

                "LANGUAGENAME.LIST": {
                  "NAME.LIST": {
                    "@_TYPE": "String",
                    NAME: input.language.names
                  },
                  LANGUAGEID: input.language.id
                },

                "PAYMENTDETAILS.LIST": {
                  IFSCODE: input.banking.ifsc,
                  BANKNAME: input.banking.bankName,
                  ACCOUNTNUMBER: input.banking.accountNumber,
                  PAYMENTFAVOURING: input.banking.favouring,
                  TRANSACTIONNAME: "Primary",
                  SETASDEFAULT: "No",
                  DEFAULTTRANSACTIONTYPE:
                    input.banking.transactionType,
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

module.exports = createStockInHandLedgerObject;
