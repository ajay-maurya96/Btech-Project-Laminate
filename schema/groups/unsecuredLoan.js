const validateUnsecuredLedgerInput = require('../../validators/groups/unsecuredLoan');

function createUnsecuredLedgerObject(input) {
  validateUnsecuredLedgerInput(input);

  return {
    ENVELOPE: {
      HEADER: { TALLYREQUEST: "Import Data" },
      BODY: {
        IMPORTDATA: {
          REQUESTDESC: {
            REPORTNAME: "All Masters",
            STATICVARIABLES: { SVCURRENTCOMPANY: input.companyName }
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
                  MAILINGNAME: input.mailingNames
                },

                OLDAUDITENTRYIDS: { OLDAUDITENTRYIDS: -1 },

                PRIORSTATENAME: input.state,
                PINCODE: input.pincode,
                INCOMETAXNUMBER: input.pan,
                COUNTRYNAME: input.country,
                GSTREGISTRATIONTYPE: input.gstType ?? "Regular",
                PARENT: "Unsecured Loans",
                TAXCLASSIFICATIONNAME: "",
                TAXTYPE: "Others",
                COUNTRYOFRESIDENCE: input.country,
                LEDADDLALLOCTYPE: "",
                GSTTYPE: "",
                APPROPRIATEFOR: "",
                LEDSTATENAME: input.state,
                
                ISBILLWISEON: input.flags?.billwise ?? "No",
                ISCOSTCENTRESON: input.flags?.costCentres ?? "No",
                ISINTERESTON: "No",
                ISCHEQUEPRINTINGENABLED: input.payment?.enabled ? "Yes" : "No",

                OPENINGBALANCE: input.openingBalance,
                ALTERID: input.alterId ?? "",

                "LANGUAGENAME.LIST": {
                  "NAME.LIST": { "@_TYPE": "String", NAME: input.languageNames },
                  LANGUAGEID: input.languageId ?? 1033
                },

                ...(input.payment?.enabled && {
                  "PAYMENTDETAILS.LIST": {
                    PAYMENTFAVOURING: input.payment.favouring,
                    TRANSACTIONNAME: "Primary",
                    CHEQUECROSSCOMMENT: input.payment.chequeComment ?? "",
                    SETASDEFAULT: "No",
                    DEFAULTTRANSACTIONTYPE: input.payment.transactionType,
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

module.exports = createUnsecuredLedgerObject;
