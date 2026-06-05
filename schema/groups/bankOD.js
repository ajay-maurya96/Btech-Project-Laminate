// createBankODLedgerObject.js
const validateBankODLedger = require('../../validators/groups/bankOD');

function createBankODLedgerObject(data) {
  validateBankODLedger(data);

  const ledger = {
    "@_NAME": data.name,
    "@_RESERVEDNAME": "",
    PARENT: "Bank OD A/c",

    // defaults that Tally expects
    TAXTYPE: "Others",
    SERVICECATEGORY: "\u0004 Not Applicable",
    ASORIGINAL: "Yes",
    ISBILLWISEON: "No",
    ISCOSTCENTRESON: "No",
    ISINTERESTON: "No",
    ALLOWINMOBILE: "No"
  };

  /* ───── ADDRESS ───── */
  if (Array.isArray(data.address) && data.address.length) {
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

  /* ───── BASIC LOCATION ───── */
  if (data.startingFrom) ledger.STARTINGFROM = data.startingFrom;
  if (data.priorStateName) ledger.PRIORSTATENAME = data.priorStateName;
  if (data.state) ledger.LEDSTATENAME = data.state;
  if (data.pincode) ledger.PINCODE = data.pincode;
  if (data.country) ledger.COUNTRYNAME = data.country;
  if (data.countryOfResidence) ledger.COUNTRYOFRESIDENCE = data.countryOfResidence;

  /* ───── BANK DETAILS ───── */
  if (data.ifsc) ledger.IFSCODE = data.ifsc;
  if (data.bankAccountNumber) ledger.BANKDETAILS = data.bankAccountNumber;
  if (data.bankBranch) ledger.BANKBRANCHNAME = data.bankBranch;
  if (data.bankAccountHolder) ledger.BANKACCHOLDERNAME = data.bankAccountHolder;

  /* ───── FINANCIALS ───── */
  if (data.openingBalance !== undefined)
    ledger.OPENINGBALANCE = data.openingBalance;

  if (data.odLimit !== undefined)
    ledger.ODLIMIT = data.odLimit;

  /* ───── OPTIONAL META ───── */
  if (data.alterId) ledger.ALTERID = data.alterId;
  if (data.sortPosition) ledger.SORTPOSITION = data.sortPosition;

  /* ───── EMPTY LISTS (SAFE) ───── */
  ledger["GSTDETAILS.LIST"] = {};
  ledger["VATDETAILS.LIST"] = {};
  ledger["SERVICETAXDETAILS.LIST"] = {};

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

module.exports = createBankODLedgerObject;
