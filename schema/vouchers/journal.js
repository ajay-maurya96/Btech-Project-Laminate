const validateJournal = require('../../validators/vouchers/journal');

function escapeXML(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildJournalXML(voucher) {
    const result = validateJournal(voucher);

    if (!result.isValid) {
        throw new Error("Validation failed:\n" + result.errors.join("\n"));
    }

    const ledgerEntriesXML = voucher.entries.map(entry => `
        <ALLLEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(entry.ledgerName)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>${entry.isDeemedPositive ? "Yes" : "No"}</ISDEEMEDPOSITIVE>
            <AMOUNT>${entry.isDeemedPositive 
                ? -entry.amount 
                : entry.amount}
            </AMOUNT>
        </ALLLEDGERENTRIES.LIST>
    `).join("");

    return `
<ENVELOPE>
 <HEADER>
  <TALLYREQUEST>Import Data</TALLYREQUEST>
 </HEADER>
 <BODY>
  <IMPORTDATA>
   <REQUESTDESC>
    <REPORTNAME>Vouchers</REPORTNAME>
    <STATICVARIABLES>
     <SVCURRENTCOMPANY>${escapeXML(voucher.company)}</SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA>
    <TALLYMESSAGE xmlns:UDF="TallyUDF">
     <VOUCHER VCHTYPE="${escapeXML(voucher.type)}" ACTION="Create">
      <DATE>${voucher.date}</DATE>
      <NARRATION>${escapeXML(voucher.narration || "")}</NARRATION>
      <VOUCHERTYPENAME>${escapeXML(voucher.type)}</VOUCHERTYPENAME>
      ${ledgerEntriesXML}
     </VOUCHER>
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`;
}

module.exports = buildJournalXML;