const validateSales = require("../../validators/vouchers/sales");

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

const DEFAULT_GROUPS = new Set([
    "Sales Accounts",
    "Sundry Debtors",
    "Sundry Creditors",
    "Current Assets",
    "Current Liabilities",
    "Primary"
]);

function buildSalesXML(data) {
    const result = validateSales(data);

    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    // -------- GROUPS --------
    const groupsXML = (data.groups || [])
        .filter(g => !DEFAULT_GROUPS.has(g.name))
        .map(g => `
    <GROUP NAME="${escapeXML(g.name)}">
        <PARENT>${escapeXML(g.parent)}</PARENT>
    </GROUP>`).join("");

    // -------- LEDGERS --------
    const ledgersXML = data.ledgers.map(l => `
    <LEDGER NAME="${escapeXML(l.name)}">
        <PARENT>${escapeXML(l.parent)}</PARENT>
    </LEDGER>`).join("");

    // -------- INVENTORY --------
    const inventoryXML = data.voucher.items.map(item => `
        <INVENTORYENTRIES.LIST>
            <STOCKITEMNAME>${escapeXML(item.name)}</STOCKITEMNAME>
            <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
            <AMOUNT>${item.amount.toFixed(2)}</AMOUNT>

            <ACCOUNTINGALLOCATIONS.LIST>
                <LEDGERNAME>${escapeXML(item.salesLedger)}</LEDGERNAME>
                <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                <AMOUNT>${item.amount.toFixed(2)}</AMOUNT>
            </ACCOUNTINGALLOCATIONS.LIST>
        </INVENTORYENTRIES.LIST>
    `).join("");

    const totalAmount = data.voucher.items.reduce((sum, i) => sum + i.amount, 0);

    // -------- PARTY ENTRY --------
    const partyEntryXML = `
        <LEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(data.voucher.partyLedger)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
            <AMOUNT>-${totalAmount.toFixed(2)}</AMOUNT>
        </LEDGERENTRIES.LIST>
    `;

    // -------- VOUCHER --------
    const voucherXML = `
    <VOUCHER VCHTYPE="Sales" ACTION="Create" OBJVIEW="Invoice Voucher View">
        <DATE>${data.voucher.date}</DATE>
        <VOUCHERTYPENAME>Sales</VOUCHERTYPENAME>
        <PARTYLEDGERNAME>${escapeXML(data.voucher.partyLedger)}</PARTYLEDGERNAME>
        <NARRATION>${escapeXML(data.voucher.narration || "")}</NARRATION>

        ${inventoryXML}
        ${partyEntryXML}
    </VOUCHER>`;

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

module.exports = buildSalesXML;