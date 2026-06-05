const validateLedgerInput = require('../../validators/groups/cashInHand');

function createLedgerObject(input) {
  validateLedgerInput(input);

  const ledger = {
    "@_NAME": input.name,
    "@_RESERVEDNAME": "",

    "OLDAUDITENTRYIDS.LIST": {
      "@_TYPE": "Number",
      OLDAUDITENTRYIDS: [-1]
    },

    PARENT: "Cash-in-Hand",

    TAXCLASSIFICATIONNAME: "",
    TAXTYPE: "Others",
    GSTTYPE: "",
    APPROPRIATEFOR: "",

    ISBILLWISEON: "No",
    ISCOSTCENTRESON: "No",
    ISINTERESTON: "No",
    ALLOWINMOBILE: "No",
    ISGSTAPPLICABLE: "No",

    SORTPOSITION: "1000",
    OPENINGBALANCE: input.openingBalance || "0.00",

    "SERVICETAXDETAILS.LIST": {},
    "LBTREGNDETAILS.LIST": {},
    "VATDETAILS.LIST": {},
    "SALESTAXCESSDETAILS.LIST": {},
    "GSTDETAILS.LIST": {}
  };

  // Language block (optional & correct)
  if (input.languageNames?.length) {
    ledger["LANGUAGENAME.LIST"] = {
      "NAME.LIST": {
        "@_TYPE": "String",
        NAME: input.languageNames
      },
      LANGUAGEID: input.languageId || "1033"
    };
  }

  // Banking only if explicitly allowed AND not Cash-in-Hand
  if (input.paymentDetails && input.allowBanking === true) {
    Object.assign(ledger, {
      ISEBANKINGENABLED: "Yes",
      ISCHEQUEPRINTINGENABLED: "Yes",
      ISECHEQUESUPPORTED: "Yes",

      "PAYMENTDETAILS.LIST": {
        IFSCODE: input.paymentDetails.ifsc,
        BANKNAME: input.paymentDetails.bankName,
        ACCOUNTNUMBER: input.paymentDetails.accountNumber,
        PAYMENTFAVOURING: input.paymentDetails.favouring || input.name,
        TRANSACTIONNAME: "Primary",
        SETASDEFAULT: "No",
        DEFAULTTRANSACTIONTYPE: "Inter Bank Transfer",
        "BENEFICIARYCODEDETAILS.LIST": {}
      }
    });
  }

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
              LEDGER: ledger
            }
          }
        }
      }
    }
  };
}

module.exports = createLedgerObject;
