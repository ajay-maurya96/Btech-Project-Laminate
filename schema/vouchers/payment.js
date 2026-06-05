const validateAll = require("../../validators/vouchers/payment");

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// 🚀 System groups (DO NOT CREATE)
const DEFAULT_GROUPS = new Set([
    "Direct Expenses",
    "Indirect Expenses",
    "Current Assets",
    "Bank Accounts",
    "Cash-in-Hand",
    "Sundry Debtors",
    "Sundry Creditors",
    "Primary"
]);

function buildPaymentXML(data) {
    const result = validateAll(data);

    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    // -------- GROUPS (optional) --------
    const groupsXML = (data.groups || [])
        .filter(g => !DEFAULT_GROUPS.has(g.name))
        .map(g => `
    <GROUP NAME="${escapeXML(g.name)}">
        <PARENT>${escapeXML(g.parent)}</PARENT>
        <ISREVENUE>${g.isRevenue ? "Yes" : "No"}</ISREVENUE>
    </GROUP>`).join("");

    // -------- LEDGERS --------
    const ledgersXML = data.ledgers.map(l => `
    <LEDGER NAME="${escapeXML(l.name)}">
        <PARENT>${escapeXML(l.parent)}</PARENT>
        <CURRENCYNAME>INR</CURRENCYNAME>
    </LEDGER>`).join("");

    // -------- VOUCHER --------
    const ledgerEntriesXML = data.voucher.entries.map(e => {
        const amount = e.isDeemedPositive
            ? -Math.abs(e.amount)
            : Math.abs(e.amount);

        return `
        <ALLLEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(e.ledgerName)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>${e.isDeemedPositive ? "Yes" : "No"}</ISDEEMEDPOSITIVE>
            <AMOUNT>${amount.toFixed(2)}</AMOUNT>
        </ALLLEDGERENTRIES.LIST>`;
    }).join("");

    const voucherXML = `
    <VOUCHER VCHTYPE="${escapeXML(data.voucher.type)}" ACTION="Create">
        <DATE>${data.voucher.date}</DATE>
        <VOUCHERTYPENAME>${escapeXML(data.voucher.type)}</VOUCHERTYPENAME>
        <NARRATION>${escapeXML(data.voucher.narration || "")}</NARRATION>
        ${ledgerEntriesXML}
    </VOUCHER>`;

    return `
<ENVELOPE>
 <HEADER>
  <TALLYREQUEST>Import Data</TALLYREQUEST>
 </HEADER>
 <BODY>
  <IMPORTDATA>
   <REQUESTDESC>
    <REPORTNAME>All Masters</REPORTNAME>
    <STATICVARIABLES>
     <SVCURRENTCOMPANY>${escapeXML(data.company)}</SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA>
    <TALLYMESSAGE xmlns:UDF="TallyUDF">
        ${groupsXML}
        ${ledgersXML}
        ${voucherXML}
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildPaymentXML;