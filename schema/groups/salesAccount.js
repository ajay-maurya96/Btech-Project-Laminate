const validateSalesAccountsLedgerInput = require('../../validators/groups/salesAccount');

function createSalesLedgerObject(input) {
  validateSalesAccountsLedgerInput(input);

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
                "@_RESERVEDNAME": input.reservedName ?? "",

                "OLDAUDITENTRYIDS.LIST": {
                  "@_TYPE": "Number",
                  OLDAUDITENTRYIDS:
                    input.audit?.oldAuditEntryIds ?? []
                },

                PARENT: input.parent,

                TAXCLASSIFICATIONNAME: "",
                TAXTYPE: input.tax?.taxType ?? "",
                LEDADDLALLOCTYPE: "",
                GSTTYPE: "",
                APPROPRIATEFOR: "",

                ROUNDINGMETHOD: input.rounding?.method ?? "",

                EXCISELEDGERCLASSIFICATION: "",
                EXCISEDUTYTYPE: "",
                EXCISENATUREOFPURCHASE: "",
                LEDGERFBTCATEGORY: "",

                ISBILLWISEON: input.flags?.billwise ?? "No",
                ISCOSTCENTRESON: input.flags?.costCentres ?? "No",
                ISINTERESTON: input.flags?.interest ?? "No",

                ALLOWINMOBILE: "No",
                ISCOSTTRACKINGON: "No",
                ISBENEFICIARYCODEON: "No",
                PLASINCOMEEXPENSE: "No",
                ISUPDATINGTARGETID: "No",
                ASORIGINAL: "Yes",
                ISCONDENSED: "No",

                AFFECTSSTOCK: input.flags?.affectsStock ?? "No",

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
                ISEXCISEAPPLICABLE: "No",
                ISTDSEXPENSE: "No",
                ISEDLIAPPLICABLE: "No",
                ISRELATEDPARTY: "No",
                USEFORESIELIGIBILITY: "No",
                ISINTERESTINCLLASTDAY: "No",
                APPROPRIATETAXVALUE: "No",
                ISBEHAVEASDUTY: "No",
                INTERESTINCLDAYOFADDITION: "No",
                INTERESTINCLDAYOFDEDUCTION: "No",
                ISOTHTERRITORYASSESSEE: "No",
                OVERRIDECREDITLIMIT: "No",
                ISAGAINSTFORMC: "No",

                ISCHEQUEPRINTINGENABLED:
                  input.flags?.chequePrinting ?? "No",

                ISPAYUPLOAD: "No",
                ISPAYBATCHONLYSAL: "No",
                ISBNFCODESUPPORTED: "No",
                ALLOWEXPORTWITHERRORS: "No",
                CONSIDERPURCHASEFOREXPORT: "No",
                ISTRANSPORTER: "No",
                USEFORNOTIONALITC: "No",
                ISECOMMOPERATOR: "No",
                SHOWINPAYSLIP: "No",
                USEFORGRATUITY: "No",
                ISTDSPROJECTED: "No",
                FORSERVICETAX: "No",
                ISINPUTCREDIT: "No",
                ISEXEMPTED: "No",
                ISABATEMENTAPPLICABLE: "No",
                ISSTXPARTY: "No",
                ISSTXNONREALIZEDTYPE: "No",
                ISUSEDFORCVD: "No",
                LEDBELONGSTONONTAXABLE: "No",
                ISEXCISEMERCHANTEXPORTER: "No",
                ISPARTYEXEMPTED: "No",
                ISSEZPARTY: "No",

                ISEBANKINGENABLED:
                  input.flags?.ebanking ?? "No",

                AUDITED: "No",

                SORTPOSITION: input.sortPosition,
                ALTERID: input.alterId,
                ROUNDINGLIMIT: input.rounding?.limit,
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

                ...(input.banking?.enabled && {
                  "PAYMENTDETAILS.LIST": {
                    PAYMENTFAVOURING: input.banking.favouring,
                    TRANSACTIONNAME: "Primary",
                    CHEQUECROSSCOMMENT:
                      input.banking.chequeCrossComment ?? "",
                    SETASDEFAULT: "No",
                    DEFAULTTRANSACTIONTYPE:
                      input.banking.transactionType,
                    "BENEFICIARYCODEDETAILS.LIST": {}
                  }
                }),

                ...(input.udf?.vatDealerNature && {
                  "UDF:VATDEALERNATURE.LIST": {
                    "@_DESC": "`VATDealerNature`",
                    "@_ISLIST": "YES",
                    "@_TYPE": "String",
                    "@_INDEX": "10031",
                    "UDF:VATDEALERNATURE":
                      input.udf.vatDealerNature
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

module.exports = createSalesLedgerObject;
