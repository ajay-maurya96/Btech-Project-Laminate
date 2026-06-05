const validateInventory = require("../../validators/vouchers/inventory");

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildInventoryXML(data) {
    const result = validateInventory(data);

    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    // -------- GODOWNS --------
    const godownXML = (data.godowns || []).map(g => `
    <GODOWN NAME="${escapeXML(g.name)}">
        <PARENT>${escapeXML(g.parent || "")}</PARENT>
    </GODOWN>`).join("");

    // -------- STOCK GROUPS --------
    const groupXML = (data.stockGroups || []).map(g => `
    <STOCKGROUP NAME="${escapeXML(g.name)}">
        <PARENT>${escapeXML(g.parent || "")}</PARENT>
    </STOCKGROUP>`).join("");

    // -------- STOCK ITEMS --------
    const stockXML = (data.stockItems || []).map(s => `
    <STOCKITEM NAME="${escapeXML(s.name)}">
        <PARENT>${escapeXML(s.group)}</PARENT>
        <GSTTYPEOFSUPPLY>Goods</GSTTYPEOFSUPPLY>
    </STOCKITEM>`).join("");

    // -------- IN ENTRIES --------
    const inXML = (data.voucher.inEntries || []).map(e => `
    <INVENTORYENTRIESIN.LIST>
        <STOCKITEMNAME>${escapeXML(e.stockItemName)}</STOCKITEMNAME>
        <AMOUNT>${e.amount || 0}</AMOUNT>
        <ACTUALQTY>${e.qty}</ACTUALQTY>

        <BATCHALLOCATIONS.LIST>
            <GODOWNNAME>${escapeXML(e.godown)}</GODOWNNAME>
            <BATCHNAME>${escapeXML(e.batch || "Primary Batch")}</BATCHNAME>
            <AMOUNT>${e.amount || 0}</AMOUNT>
        </BATCHALLOCATIONS.LIST>
    </INVENTORYENTRIESIN.LIST>`).join("");

    // -------- OUT ENTRIES --------
    const outXML = (data.voucher.outEntries || []).map(e => `
    <INVENTORYENTRIESOUT.LIST>
        <STOCKITEMNAME>${escapeXML(e.stockItemName)}</STOCKITEMNAME>
        <AMOUNT>${e.amount || 0}</AMOUNT>
        <ACTUALQTY>${e.qty}</ACTUALQTY>

        <BATCHALLOCATIONS.LIST>
            <GODOWNNAME>${escapeXML(e.godown)}</GODOWNNAME>
            <BATCHNAME>${escapeXML(e.batch || "Primary Batch")}</BATCHNAME>
            <AMOUNT>${e.amount || 0}</AMOUNT>
        </BATCHALLOCATIONS.LIST>
    </INVENTORYENTRIESOUT.LIST>`).join("");

    const voucherXML = `
    <VOUCHER VCHTYPE="${escapeXML(data.voucher.type)}" ACTION="Create" OBJVIEW="Consumption Voucher View">
        <DATE>${data.voucher.date}</DATE>
        <VOUCHERTYPENAME>${escapeXML(data.voucher.type)}</VOUCHERTYPENAME>
        <NARRATION>${escapeXML(data.voucher.narration || "")}</NARRATION>

        ${inXML}
        ${outXML}
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
        ${godownXML}
        ${groupXML}
        ${stockXML}
        ${voucherXML}
    </TALLYMESSAGE>
   </REQUESTDATA>

  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildInventoryXML;