const validateReceipt = require("../../validators/vouchers/reciept");

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildReceiptXML(data) {
    const result = validateReceipt(data);
    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    const totalAmount = data.voucher.entries.reduce(
        (sum, e) => sum + e.amount,
        0
    );

    // -------- ENTRIES --------
    const entriesXML = data.voucher.entries.map(entry => `
        <ALLLEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(entry.ledger)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
            <AMOUNT>${entry.amount.toFixed(2)}</AMOUNT>
        </ALLLEDGERENTRIES.LIST>
    `).join("");

    // -------- BANK ENTRY --------
    const bankXML = `
        <ALLLEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(data.voucher.party)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
            <AMOUNT>-${totalAmount.toFixed(2)}</AMOUNT>

            <BANKALLOCATIONS.LIST>
                <DATE>${data.voucher.date}</DATE>
                <INSTRUMENTDATE>${data.voucher.date}</INSTRUMENTDATE>
                <INSTRUMENTNUMBER>${escapeXML(data.voucher.instrumentNumber || "")}</INSTRUMENTNUMBER>
                <TRANSACTIONTYPE>Cheque</TRANSACTIONTYPE>
                <BANKNAME>${escapeXML(data.voucher.bankName || "")}</BANKNAME>
                <PAYMENTFAVOURING>${escapeXML(data.voucher.entries[0].ledger)}</PAYMENTFAVOURING>
                <AMOUNT>-${totalAmount.toFixed(2)}</AMOUNT>
            </BANKALLOCATIONS.LIST>
        </ALLLEDGERENTRIES.LIST>
    `;

    // -------- VOUCHER --------
    const voucherXML = `
    <VOUCHER VCHTYPE="Receipt" ACTION="Create">
        <DATE>${data.voucher.date}</DATE>
        <VOUCHERTYPENAME>Receipt</VOUCHERTYPENAME>
        <PERSISTEDVIEW>Accounting Voucher View</PERSISTEDVIEW>
        <PARTYLEDGERNAME>${escapeXML(data.voucher.party)}</PARTYLEDGERNAME>
        <NARRATION>${escapeXML(data.voucher.narration || "")}</NARRATION>

        ${entriesXML}
        ${bankXML}
    </VOUCHER>
    `;

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
     <SVCURRENTCOMPANY>${escapeXML(data.company)}</SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA>
    <TALLYMESSAGE>
        ${voucherXML}
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildReceiptXML;