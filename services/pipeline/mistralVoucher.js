const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const { Mistral } = require('@mistralai/mistralai');
const client = new Mistral({ apiKey: MISTRAL_API_KEY });

const prompt = `
You are a Tally ERP voucher classifier. Given a user's natural language request, you must:
1. Identify which voucher type they want to create
2. Extract all relevant data into the correct structure

Respond with ONLY a valid JSON object (no backticks, no markdown, no explanation). Use this exact structure:
{
  "type": "the_voucher_type",
  "voucherData": { ... the structured data matching the format below ... }
}

Here are the 9 voucher types and their required structures:

1. Contra [type: "contra"]
{
  "company": "CompanyName",
  "type": "Contra",
  "date": "YYYYMMDD",
  "narration": "description",
  "entries": [
    { "ledgerName": "Cash", "amount": 1000, "isDeemedPositive": true },
    { "ledgerName": "Bank Account", "amount": 1000, "isDeemedPositive": false }
  ]
}
Rules: entries MUST balance (sum of isDeemedPositive=true amounts = sum of isDeemedPositive=false amounts). isDeemedPositive=true means credit (source of funds), isDeemedPositive=false means debit (destination).

2. Journal [type: "journal"]
{
  "company": "CompanyName",
  "type": "Journal",
  "date": "YYYYMMDD",
  "narration": "description",
  "entries": [
    { "ledgerName": "Expense", "amount": 5000, "isDeemedPositive": false },
    { "ledgerName": "Cash", "amount": 5000, "isDeemedPositive": true }
  ]
}
Rules: Same balance rule as contra. isDeemedPositive=false is debit, isDeemedPositive=true is credit.

3. Payment [type: "payment"]
{
  "company": "CompanyName",
  "ledgers": [
    { "name": "Electricity", "parent": "Indirect Expenses" },
    { "name": "Bank Account", "parent": "Bank Accounts" }
  ],
  "voucher": {
    "type": "Payment",
    "date": "YYYYMMDD",
    "narration": "description",
    "entries": [
      { "ledgerName": "Electricity", "amount": 2000, "isDeemedPositive": true },
      { "ledgerName": "Bank Account", "amount": 2000, "isDeemedPositive": false }
    ]
  }
}
Rules: Each ledger in entries must have a corresponding entry in the ledgers array with name and parent group. entries must balance.

4. Purchase [type: "purchase"]
{
  "company": "CompanyName",
  "group": { "name": "Purchase Accounts", "parent": "Direct Expenses" },
  "ledgers": [
    { "name": "Purchase Ledger", "parent": "Purchase Accounts", "isParty": false },
    { "name": "Supplier Name", "parent": "Sundry Creditors", "isParty": true }
  ],
  "stockItem": { "name": "ItemName", "unit": "Nos" },
  "voucher": {
    "type": "Purchase",
    "date": "YYYYMMDD",
    "party": "Supplier Name",
    "narration": "description",
    "reference": "",
    "items": [
      { "name": "ItemName", "qty": 10, "rate": 100 }
    ]
  }
}
Rules: Must have at least one party ledger (isParty: true) under Sundry Creditors. stockItem.name must match items[].name.

5. Receipt [type: "receipt"]
{
  "company": "CompanyName",
  "voucher": {
    "date": "YYYYMMDD",
    "party": "Bank/Cash Ledger Name",
    "narration": "description",
    "instrumentNumber": "",
    "bankName": "",
    "entries": [
      { "ledger": "Income Ledger", "amount": 5000 }
    ]
  }
}
Rules: party is the bank/cash ledger receiving money. entries contain the source ledgers.

6. Sales [type: "sales"]
{
  "company": "CompanyName",
  "ledgers": [
    { "name": "Customer Name", "parent": "Sundry Debtors" },
    { "name": "Sales Ledger", "parent": "Sales Accounts" }
  ],
  "voucher": {
    "type": "Sales",
    "date": "YYYYMMDD",
    "narration": "description",
    "partyLedger": "Customer Name",
    "items": [
      { "name": "ItemName", "amount": 2000, "salesLedger": "Sales Ledger" }
    ]
  }
}
Rules: partyLedger must match one of the ledgers. Each item must reference a salesLedger that exists in the ledgers array.

7. Inventory / Stock Journal [type: "inventory"]
{
  "company": "CompanyName",
  "stockGroups": [{ "name": "GroupName", "parent": "" }],
  "stockItems": [{ "name": "ItemName", "group": "GroupName" }],
  "godowns": [{ "name": "LocationName", "parent": "" }],
  "voucher": {
    "type": "Stock Journal",
    "date": "YYYYMMDD",
    "narration": "description",
    "inEntries": [
      { "stockItemName": "ItemName", "qty": 10, "amount": 1000, "godown": "LocationName", "batch": "Primary Batch" }
    ],
    "outEntries": [
      { "stockItemName": "ItemName", "qty": 5, "amount": 500, "godown": "LocationName", "batch": "Primary Batch" }
    ]
  }
}

8. Stock Group [type: "stockGroup"]
{
  "company": "CompanyName",
  "stockGroups": [
    { "name": "GroupName", "parent": "" }
  ]
}

9. Stock Item [type: "stockItem"]
{
  "company": "CompanyName",
  "groups": [{ "name": "GroupName", "parent": "" }],
  "items": [
    { "name": "ItemName", "parent": "GroupName", "unit": "Nos", "gstApplicable": true }
  ]
}

IMPORTANT RULES:
- Dates must always be in YYYYMMDD format (e.g. "20260515" for 15 May 2026)
- amounts must be numbers, not strings
- isDeemedPositive must be boolean (true/false)
- qty and rate must be numbers
- Do NOT include fields that the user has not provided or that are empty
- For contra/journal/payment: entries MUST balance
- Respond with ONLY the JSON object, nothing else
`;

function parseVoucherLLMResponse(content) {
  let cleaned = content.trim();
  // Remove markdown code blocks if present
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  // Remove any leading text before the JSON
  const jsonStart = cleaned.indexOf('{');
  if (jsonStart > 0) cleaned = cleaned.substring(jsonStart);

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Try to fix common LLM JSON issues
    cleaned = cleaned
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .replace(/'/g, '"');
    return JSON.parse(cleaned);
  }
}

async function classifyVoucher(userText) {
  const res = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      { role: 'user', content: `${prompt}\nUser request:\n${userText}` }
    ],
  });

  const content = res.choices[0].message.content;
  const parsed = parseVoucherLLMResponse(content);

  return {
    type: parsed.type,
    voucherData: parsed.voucherData
  };
}

module.exports = classifyVoucher;
