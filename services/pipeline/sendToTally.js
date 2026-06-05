const axios = require('axios');

const TALLY_URL = process.env.TALLY_URL || "http://localhost:9000";

async function sendToTally(xmlPayload) {
    try {
        console.log("[sendToTally] sending XML to Tally at", TALLY_URL);
        const response = await axios.post(TALLY_URL, xmlPayload, {
            headers: { 'Content-Type': 'text/xml' },
            timeout: 15000
        });
        return response.data;
    }
    catch (err) {
        if (err.code === 'ECONNREFUSED') {
            throw new Error(`Tally ERP is not running at ${TALLY_URL}. Please start Tally and ensure it is accepting XML requests on port 9000.`);
        }
        if (err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED') {
            throw new Error(`Tally ERP timed out at ${TALLY_URL}. The server may be busy or unresponsive.`);
        }
        if (err.response) {
            throw new Error(`Tally returned error (${err.response.status}): ${err.response.data || err.message}`);
        }
        throw new Error(`Failed to communicate with Tally: ${err.message}`);
    }
}

module.exports = sendToTally;