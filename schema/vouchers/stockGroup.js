const validateStockGroup = require("../../validators/vouchers/stockGroup");

function escapeXML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildStockGroupXML(data) {
    const result = validateStockGroup(data);

    if (!result.isValid) {
        throw new Error(result.errors.join("\n"));
    }

    const stockGroupsXML = data.stockGroups.map(g => `
    <STOCKGROUP NAME="${escapeXML(g.name)}" ACTION="Create">
        <PARENT>${escapeXML(g.parent || "")}</PARENT>
        <ISADDABLE>Yes</ISADDABLE>
        <LANGUAGENAME.LIST>
            <NAME.LIST TYPE="String">
                <NAME>${escapeXML(g.name)}</NAME>
            </NAME.LIST>
        </LANGUAGENAME.LIST>
    </STOCKGROUP>
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
        ${stockGroupsXML}
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`.trim();
}

module.exports = buildStockGroupXML;