const validateBankLedgerInput = require("../../validators/groups/currentAssets");

function createCurrentAssetsLedgerObject(input) {
  validateBankLedgerInput(input);

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
                  ADDRESS: input.addresses || []
                },

                "MAILINGNAME.LIST": {
                  "@_TYPE": "String",
                  MAILINGNAME: [input.mailingName || input.name]
                },

                "OLDAUDITENTRYIDS.LIST": {
                  "@_TYPE": "Number",
                  OLDAUDITENTRYIDS: [-1]
                },

                PRIORSTATENAME: input.state,
                PINCODE: input.pincode,
                INCOMETAXNUMBER: input.pan,
                COUNTRYNAME: input.country || "India",
                GSTREGISTRATIONTYPE: input.gstRegistrationType,

                PARENT: input.parent,

                TAXCLASSIFICATIONNAME: "",
                TAXTYPE: "Others",
                COUNTRYOFRESIDENCE: input.country || "India",
                LEDADDLALLOCTYPE: "",
                GSTTYPE: "",
                APPROPRIATEFOR: "",
                LEDSTATENAME: input.state,

                SERVICECATEGORY: input.serviceCategory || "",

                EXCISELEDGERCLASSIFICATION: "",
                EXCISEDUTYTYPE: "",
                EXCISENATUREOFPURCHASE: "",
                LEDGERFBTCATEGORY: "",

                ISBILLWISEON: input.flags.billwise,
                ISCOSTCENTRESON: input.flags.costCentres,
                ISINTERESTON: input.flags.interest,
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

                ISCHEQUEPRINTINGENABLED: input.paymentDetails.enabled ? "Yes" : "No",
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
                TDSDEDUCTEEISSPECIALRATE: "No",

                ISECHEQUESUPPORTED: "No",
                ISEDDSUPPORTED: "No",

                HASECHEQUEDELIVERYMODE: "No",
                HASECHEQUEDELIVERYTO: "No",
                HASECHEQUEPRINTLOCATION: "No",
                HASECHEQUEPAYABLELOCATION: "No",
                HASECHEQUEBANKLOCATION: "No",

                HASEDDDELIVERYMODE: "No",
                HASEDDDELIVERYTO: "No",
                HASEDDPRINTLOCATION: "No",
                HASEDDPAYABLELOCATION: "No",
                HASEDDBANKLOCATION: "No",

                ISEBANKINGENABLED: input.paymentDetails.enabled ? "Yes" : "No",
                ISEXPORTFILEENCRYPTED: "No",
                ISBATCHENABLED: "No",
                ISPRODUCTCODEBASED: "No",

                HASEDDCITY: "No",
                HASECHEQUECITY: "No",
                ISFILENAMEFORMATSUPPORTED: "No",
                HASCLIENTCODE: "No",

                PAYINSISBATCHAPPLICABLE: "No",
                PAYINSISFILENUMAPP: "No",
                ISSALARYTRANSGROUPEDFORBRS: "No",
                ISEBANKINGSUPPORTED: "No",
                ISSCBUAE: "No",
                ISBANKSTATUSAPP: "No",
                ISSALARYGROUPED: "No",
                USEFORPURCHASETAX: "No",

                AUDITED: "No",
                SORTPOSITION: "1000",
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
                    NAME: input.languageNames
                  },
                  LANGUAGEID: input.languageId
                },

                "XBRLDETAIL.LIST": {},
                "AUDITDETAILS.LIST": {},
                "SCHVIDETAILS.LIST": {},
                "EXCISETARIFFDETAILS.LIST": {},
                "TCSCATEGORYDETAILS.LIST": {},
                "TDSCATEGORYDETAILS.LIST": {},
                "SLABPERIOD.LIST": {},
                "GRATUITYPERIOD.LIST": {},
                "ADDITIONALCOMPUTATIONS.LIST": {},
                "EXCISEJURISDICTIONDETAILS.LIST": {},
                "EXCLUDEDTAXATIONS.LIST": {},
                "BANKALLOCATIONS.LIST": {},

                "PAYMENTDETAILS.LIST": input.paymentDetails.enabled
                  ? {
                    PAYMENTFAVOURING: input.paymentDetails.favouring,
                    TRANSACTIONNAME: "Primary",
                    CHEQUECROSSCOMMENT: "A/c Payee",
                    SETASDEFAULT: "No",
                    DEFAULTTRANSACTIONTYPE: input.paymentDetails.transactionType
                  }
                  : {}
              }
            }
          }
        }
      }
    }
  };
}

module.exports = createCurrentAssetsLedgerObject;
