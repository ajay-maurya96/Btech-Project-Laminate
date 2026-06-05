const axios = require('axios');

const xmlPayload = `
<ENVELOPE>
 <HEADER>
  <TALLYREQUEST>Import Data</TALLYREQUEST>
 </HEADER>
 <BODY>
  <IMPORTDATA>
   <REQUESTDESC>
    <REPORTNAME>All Masters</REPORTNAME>
    <STATICVARIABLES>
     <SVCURRENTCOMPANY>Google</SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA>
    <TALLYMESSAGE xmlns:UDF="TallyUDF">
      
      <STOCKGROUP NAME="Office Supplies" ACTION="Create">
        <PARENT></PARENT>
      </STOCKGROUP>
      
      <STOCKITEM NAME="Pen hai ji" ACTION="Create">

        <OLDAUDITENTRYIDS.LIST TYPE="Number">
          <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
        </OLDAUDITENTRYIDS.LIST>

        <PARENT>Office Supplies</PARENT>
        <BASEUNITS>Nos</BASEUNITS>

        <LANGUAGENAME.LIST>
          <NAME.LIST TYPE="String">
            <NAME>Pen hai ji</NAME>
          </NAME.LIST>
          <LANGUAGEID>1033</LANGUAGEID>
        </LANGUAGENAME.LIST>

      </STOCKITEM>
    
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`;

async function sendToTally() {
  try {
    const response = await axios.post("http://localhost:9000", xmlPayload, {
      headers: { 'Content-Type': 'text/xml' }
    });
    console.log(response.data);
    return response.data;
  }
  catch (err) {
    console.error('Error sending XML to Tally:', err.message);
    throw err;
  }
}

sendToTally();