// createLedgerObject.js
const validateLedgerData = require('../../validators/groups/sundryDebtors');

function createLedgerObject(data) {
  validateLedgerData(data);

  const ledger = {
    "@_NAME": data.name,
    "@_RESERVEDNAME": "",
    PARENT: "Sundry Debtors"
  };

  // ───── ADDRESS ─────
  if (Array.isArray(data.address) && data.address.length > 0) {
    ledger["ADDRESS.LIST"] = {
      "@_TYPE": "String",
      ADDRESS: data.address.map(line => ({ "#text": line }))
    };
  }

  // ───── LOCATION ─────
  if (data.state) ledger.LEDSTATENAME = data.state;
  if (data.pincode) ledger.PINCODE = data.pincode;
  if (data.country) ledger.COUNTRYNAME = data.country;

  // ───── MAILING NAME ─────
  ledger["MAILINGNAME.LIST"] = {
    "@_TYPE": "String",
    MAILINGNAME: { "#text": data.name }
  };

  // ───── CONTACT DETAILS ─────
  if (data.email) ledger.EMAIL = data.email;
  if (data.emailCC) ledger.EMAILCC = data.emailCC;
  if (data.phone) ledger.LEDGERPHONE = data.phone;
  if (data.mobile) ledger.LEDGERMOBILE = data.mobile;
  if (data.contactPerson) ledger.LEDGERCONTACT = data.contactPerson;

  // ───── TAX / GST ─────
  if (data.pan) ledger.INCOMETAXNUMBER = data.pan;
  if (data.gstRegistrationType) ledger.GSTREGISTRATIONTYPE = data.gstRegistrationType;
  if (data.gstin) ledger.PARTYGSTIN = data.gstin;
  if (data.gstNature) ledger.GSTNATUREOFSUPPLY = data.gstNature;

  // ───── LANGUAGE (MANDATORY SAFE DEFAULT) ─────
  ledger["LANGUAGENAME.LIST"] = {
    "NAME.LIST": {
      "@_TYPE": "String",
      NAME: [{ "#text": data.name }]
    },
    LANGUAGEID: "1033"
  };

  // ───── PAYMENT DETAILS (OPTIONAL) ─────
  if (data.bankDetails) {
    ledger["PAYMENTDETAILS.LIST"] = {
      IFSCODE: data.bankDetails.ifsc,
      BANKNAME: data.bankDetails.bankName,
      ACCOUNTNUMBER: data.bankDetails.accountNumber,
      PAYMENTFAVOURING: data.name,
      TRANSACTIONNAME: "E-Payment",
      SETASDEFAULT: "No",
      DEFAULTTRANSACTIONTYPE: "Inter Bank Transfer",
      "BENEFICIARYCODEDETAILS.LIST": {}
    };
  }
  if(data.openingBalance) {
    ledger.OPENINGBALANCE = data.openingBalance;
  }

  return {
    ENVELOPE: {
      HEADER: {
        VERSION: "1",
        TALLYREQUEST: "IMPORT",
        TYPE: "DATA",
        ID: "ALL MASTERS"
      },
      BODY: {
        DESC: {
          STATICVARIABLES: {
            SVCURRENTCOMPANY: data.companyName
          }
        },
        DATA: {
          TALLYMESSAGE: {
            LEDGER: ledger
          }
        }
      }
    }
  };
}

module.exports = createLedgerObject;
