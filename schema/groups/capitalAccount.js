// createLedgerObject.js

const validateLedgerInput = require('../../validators/groups/capitalAccount');

function createLedgerObject(input) {
  validateLedgerInput(input);

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

                "ADDRESS.LIST": {
                  "@_TYPE": "String",
                  ADDRESS: input.address
                },

                "MAILINGNAME.LIST": {
                  "@_TYPE": "String",
                  MAILINGNAME: [input.mailingName]
                },

                "OLDAUDITENTRYIDS.LIST": {
                  "@_TYPE": "Number",
                  OLDAUDITENTRYIDS: [-1]
                },

                PRIORSTATENAME: input.state,
                PINCODE: input.pincode,
                INCOMETAXNUMBER: input.pan,
                COUNTRYNAME: input.country,

                GSTREGISTRATIONTYPE: "Regular",
                VATDEALERTYPE: "Regular",

                PARENT: input.parent,

                TAXCLASSIFICATIONNAME: "",
                TAXTYPE: "Others",
                COUNTRYOFRESIDENCE: input.country,
                GSTTYPE: "",
                APPROPRIATEFOR: "",
                LEDSTATENAME: input.state,

                EXCISELEDGERCLASSIFICATION: "",
                EXCISEDUTYTYPE: "",
                EXCISENATUREOFPURCHASE: "",
                LEDGERFBTCATEGORY: "",

                // -------- FLAGS (MANDATORY) --------
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
                ISRATEINCLUSIVEVAT: "No",
                FORPAYROLL: "No",
                ISABCENABLED: "No",
                ISCREDITDAYSCHKON: "No",
                INTERESTONBILLWISE: "No",
                OVERRIDEINTEREST: "No",
                OVERRIDEADVINTEREST: "No",
                USEFORVAT: "No",
                IGNORETDSEXEMPT: "No",
                ISTCSAPPLICABLE: "No",
                ISTDSAPPLICABLE: "No",
                ISFBTAPPLICABLE: "No",
                ISGSTAPPLICABLE: "No",
                ISEXCISAPPLICABLE: "No",

                SORTPOSITION: "1000",
                ALTERID: "219",
                OPENINGBALANCE: input.openingBalance,

                "SERVICETAXDETAILS.LIST": "",
                "LBTREGNDETAILS.LIST": "",
                "VATDETAILS.LIST": "",
                "SALESTAXCESSDETAILS.LIST": "",
                "GSTDETAILS.LIST": "",

                "LANGUAGENAME.LIST": {
                  "NAME.LIST": {
                    "@_TYPE": "String",
                    NAME: input.languageNames
                  },
                  LANGUAGEID: input.languageId
                }
              }
            }
          }
        }
      }
    }
  };
}

module.exports = createLedgerObject;
