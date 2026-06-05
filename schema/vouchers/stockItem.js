const validateStockItem = require("../../validators/vouchers/stockItem");

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

const DEFAULT_GROUPS = new Set(["Primary"]);

function buildStockItemXML(data) {
    const result = validateStockItem(data);

    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    // -------- GROUPS --------
    const groupsXML = (data.groups || [])
        .filter(g => !DEFAULT_GROUPS.has(g.name))
        .map(g => `
      <STOCKGROUP NAME="${escapeXML(g.name)}" ACTION="Create">
        <PARENT>${escapeXML(g.parent || "")}</PARENT>
      </STOCKGROUP>`).join("");

    // -------- STOCK ITEMS --------
    const itemsXML = data.items.map(item => `
      <STOCKITEM NAME="${escapeXML(item.name)}" ACTION="Create">

        <OLDAUDITENTRYIDS.LIST TYPE="Number">
          <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
        </OLDAUDITENTRYIDS.LIST>

        <PARENT>${escapeXML(item.parent)}</PARENT>
        <BASEUNITS>${escapeXML(item.unit)}</BASEUNITS>

        <LANGUAGENAME.LIST>
          <NAME.LIST TYPE="String">
            <NAME>${escapeXML(item.name)}</NAME>
          </NAME.LIST>
          <LANGUAGEID>1033</LANGUAGEID>
        </LANGUAGENAME.LIST>

      </STOCKITEM>
    `).join("");

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
      ${itemsXML}
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildStockItemXML;