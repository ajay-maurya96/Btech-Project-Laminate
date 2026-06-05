const validatePurchase = require('../../validators/vouchers/purchase');

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildPurchaseXML(data) {
    const result = validatePurchase(data);
    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    const DEFAULT_GROUPS = new Set(["Purchase Accounts"]);

    // auto-pick purchase ledger (non-party ledger)
    const purchaseLedger =
        data.ledgers.find(l => !l.isParty)?.name || "Purchase";

    // -------- GROUP (optional, avoid duplicate system groups) --------
    const groupXML = data.group && !DEFAULT_GROUPS.has(data.group.name)
        ? `
    <GROUP NAME="${escapeXML(data.group.name)}">
        <PARENT>${escapeXML(data.group.parent)}</PARENT>
        <ISREVENUE>Yes</ISREVENUE>
    </GROUP>`
        : "";

    // -------- LEDGERS --------
    const ledgersXML = data.ledgers.map(l => `
    <LEDGER NAME="${escapeXML(l.name)}">
        <PARENT>${escapeXML(l.parent)}</PARENT>
        <ISBILLWISEON>${l.isParty ? "Yes" : "No"}</ISBILLWISEON>
    </LEDGER>`).join("");

    // -------- STOCK ITEM --------
    const unit = data.stockItem.unit || "Nos";

    const stockXML = `
    <STOCKITEM NAME="${escapeXML(data.stockItem.name)}">
        <BASEUNITS>${escapeXML(unit)}</BASEUNITS>
    </STOCKITEM>`;

    // -------- INVENTORY --------
    const inventoryXML = data.voucher.items.map(item => {
        const amount = item.qty * item.rate;

        return `
    <INVENTORYENTRIES.LIST>
        <STOCKITEMNAME>${escapeXML(item.name)}</STOCKITEMNAME>
        <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
        <RATE>${item.rate}/${unit}</RATE>
        <AMOUNT>-${amount.toFixed(2)}</AMOUNT>
        <ACTUALQTY>${item.qty} ${unit}</ACTUALQTY>
        <BILLEDQTY>${item.qty} ${unit}</BILLEDQTY>

        <ACCOUNTINGALLOCATIONS.LIST>
            <LEDGERNAME>${escapeXML(purchaseLedger)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
            <AMOUNT>-${amount.toFixed(2)}</AMOUNT>
        </ACCOUNTINGALLOCATIONS.LIST>
    </INVENTORYENTRIES.LIST>`;
    }).join("");

    const totalAmount = data.voucher.items.reduce(
        (sum, i) => sum + i.qty * i.rate,
        0
    );

    // -------- VOUCHER --------
    const voucherXML = `
    <VOUCHER VCHTYPE="Purchase" ACTION="Create">
        <DATE>${data.voucher.date}</DATE>
        <VOUCHERTYPENAME>Purchase</VOUCHERTYPENAME>
        <ISINVOICE>Yes</ISINVOICE>
        <PERSISTEDVIEW>Invoice Voucher View</PERSISTEDVIEW>

        <PARTYLEDGERNAME>${escapeXML(data.voucher.party)}</PARTYLEDGERNAME>
        <NARRATION>${escapeXML(data.voucher.narration || "")}</NARRATION>
        <REFERENCE>${escapeXML(data.voucher.reference || "")}</REFERENCE>

        ${inventoryXML}

        <LEDGERENTRIES.LIST>
            <LEDGERNAME>${escapeXML(data.voucher.party)}</LEDGERNAME>
            <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
            <AMOUNT>${totalAmount.toFixed(2)}</AMOUNT>
        </LEDGERENTRIES.LIST>
    </VOUCHER>`;

    // -------- FINAL XML --------
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
        ${groupXML}
        ${ledgersXML}
        ${stockXML}
        ${voucherXML}
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildPurchaseXML;