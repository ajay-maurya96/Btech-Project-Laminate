const validateVoucher = require('../../validators/vouchers/contra');

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildContraXML(voucher) {
    const result = validateVoucher(voucher);

    if (!result.isValid) {
        throw new Error("Validation failed:\n" + result.errors.join("\n"));
    }

    const ledgerEntriesXML = voucher.entries.map(entry => {
        const amount = entry.isDeemedPositive
            ? -Math.abs(entry.amount)
            : Math.abs(entry.amount);

        return `
        <ALLLEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(entry.ledgerName)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>${entry.isDeemedPositive ? "Yes" : "No"}</ISDEEMEDPOSITIVE>
            <AMOUNT>${amount.toFixed(2)}</AMOUNT>
        </ALLLEDGERENTRIES.LIST>`;
    }).join("");

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
      <VOUCHERTYPENAME>${escapeXML(voucher.type)}</VOUCHERTYPENAME>
      <NARRATION>${escapeXML(voucher.narration || "")}</NARRATION>
      ${ledgerEntriesXML}
     </VOUCHER>
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildContraXML;