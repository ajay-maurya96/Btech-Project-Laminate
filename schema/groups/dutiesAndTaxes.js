const validateDutiesAndTaxesLedger = require('../../validators/groups/dutiesAndTaxes');

function createDutiesAndTaxesLedger(input) {
  validateDutiesAndTaxesLedger(input);

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

                PARENT: input.parent,
                TAXCLASSIFICATIONNAME: "",
                TAXTYPE: "Others",
                LEDADDLALLOCTYPE: "",

                BASICTYPEOFDUTY: input.tax.basicTypeOfDuty,
                GSTTYPE: "",
                APPROPRIATEFOR: "",

                ROUNDINGMETHOD: input.rounding.method,

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
                AUDITED: "No",

                SORTPOSITION: "1000",
                ALTERID: input.alterId,

                RATEOFTAXCALCULATION: input.tax.rateOfTax,
                ROUNDINGLIMIT: input.rounding.limit,
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
                  PAYMENTFAVOURING: input.paymentDetails.favouring,
                  TRANSACTIONNAME: "Primary",
                  CHEQUECROSSCOMMENT: "A/c Payee",
                  SETASDEFAULT: "No",
                  DEFAULTTRANSACTIONTYPE: input.paymentDetails.transactionType,
                  IFSCODE: input.paymentDetails.ifsc,
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

module.exports = createDutiesAndTaxesLedger;
