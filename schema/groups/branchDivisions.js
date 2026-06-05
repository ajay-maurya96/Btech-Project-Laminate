// createBranchDivisionLedgerObject.js
const validateBranchDivisionLedger = require('../../validators/groups/branchDivisions');

function createBranchDivisionLedgerObject(data) {
  validateBranchDivisionLedger(data);

  const ledger = {
    "@_NAME": data.name,
    "@_RESERVEDNAME": "",
    PARENT: "Branch / Divisions",

    TAXTYPE: "Others",
    SERVICECATEGORY: "\u0004 Not Applicable",
    ASORIGINAL: "Yes",
    AFFECTSSTOCK: "Yes",
    ISBILLWISEON: "No",
    ISCOSTCENTRESON: "No",
    ISINTERESTON: "No",
    ALLOWINMOBILE: "No"
  };

  /* ───── ADDRESS ───── */
  if (Array.isArray(data.address)) {
    ledger["ADDRESS.LIST"] = {
      "@_TYPE": "String",
      ADDRESS: data.address
    };
  }

  /* ───── MAILING NAME ───── */
  ledger["MAILINGNAME.LIST"] = {
    "@_TYPE": "String",
    MAILINGNAME: data.mailingName || data.name
  };

  /* ───── META ───── */
  if (data.guid) ledger.GUID = data.guid;
  if (data.currency) ledger.CURRENCYNAME = data.currency;
  if (data.priorState) ledger.PRIORSTATENAME = data.priorState;

  /* ───── LOCATION ───── */
  if (data.pincode) ledger.PINCODE = data.pincode;
  if (data.country) ledger.COUNTRYNAME = data.country;
  if (data.state) ledger.LEDSTATENAME = data.state;
  if (data.countryOfResidence)
    ledger.COUNTRYOFRESIDENCE = data.countryOfResidence;

  /* ───── TAX ───── */
  if (data.pan) ledger.INCOMETAXNUMBER = data.pan;
  if (data.gstRegistrationType)
    ledger.GSTREGISTRATIONTYPE = data.gstRegistrationType;
  if (data.vatDealerType)
    ledger.VATDEALERTYPE = data.vatDealerType;

  /* ───── OPTIONAL IDS ───── */
  if (data.sortPosition) ledger.SORTPOSITION = data.sortPosition;
  if (data.alterId) ledger.ALTERID = data.alterId;

  /* ───── OPENING BALANCE ───── */
  if (data.openingBalance !== undefined)
    ledger.OPENINGBALANCE = data.openingBalance;

  /* ───── EMPTY SAFE LISTS ───── */
  ledger["GSTDETAILS.LIST"] = {};
  ledger["VATDETAILS.LIST"] = {};
  ledger["SERVICETAXDETAILS.LIST"] = {};
  ledger["SALESTAXCESSDETAILS.LIST"] = {};
  ledger["LBTREGNDETAILS.LIST"] = {};

  /* ───── LANGUAGE ───── */
  ledger["LANGUAGENAME.LIST"] = {
    "NAME.LIST": {
      "@_TYPE": "String",
      NAME: data.languageNames?.length
        ? data.languageNames
        : [data.name]
    },
    LANGUAGEID: data.languageId || "1033"
  };

  /* ───── PAYMENT DETAILS ───── */
  if (data.paymentDetails) {
    ledger["PAYMENTDETAILS.LIST"] = {
      PAYMENTFAVOURING: data.paymentDetails.favouring,
      TRANSACTIONNAME: data.paymentDetails.transactionName,
      CHEQUECROSSCOMMENT: data.paymentDetails.chequeCrossComment,
      SETASDEFAULT: data.paymentDetails.setAsDefault || "No",
      DEFAULTTRANSACTIONTYPE: data.paymentDetails.defaultTransactionType
    };
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
              SVCURRENTCOMPANY: data.companyName
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

module.exports = createBranchDivisionLedgerObject;
