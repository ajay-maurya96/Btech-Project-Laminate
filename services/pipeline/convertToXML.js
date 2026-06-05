// convertToXML.js
const { XMLBuilder } = require('fast-xml-parser');

/* Converts ledger JS object to XML */
function convertLedgerToXML(ledgerData) {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true
  });

  return builder.build(ledgerData);
}

module.exports = convertLedgerToXML;