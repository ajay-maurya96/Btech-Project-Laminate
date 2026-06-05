// inject ledger creation service
const createLedger = require('../ledgers/createLedger');

async function runPipeline(userText) {
    // ------------------------------------------- log statemnt --------------------------------------------
    console.log("running pipeline...........");
    await new Promise(r => setTimeout(r, 3000));
    // ------------------------------------------- log statemnt --------------------------------------------

    for (const text of userText) {
        // --------------------------------------- log statemnt --------------------------------------------
        console.log("user request recieved for ledger creation........");
        await new Promise(r => setTimeout(r, 3000));
        console.log(`executing user query:\n${text}`);
        // --------------------------------------- log statemnt ---------------------------------------------

        await createLedger(text);

        await new Promise(r => setTimeout(r, 6000));
    }
};

module.exports = runPipeline;
