require('dotenv').config();
const express = require('express');
const createLedger = require('./services/ledgers/createLedger');
const { createVoucherFromData, createVoucherFromCommand } = require('./services/vouchers/createVoucher');
const { getSchema, listTypes, listOperations } = require('./schemaRegistry');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for Electron
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

const PORT = process.env.PORT || 3000;

function parseDate(dateStr) {
  if (/^\d{8}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${day}`;
  }
  return dateStr;
}

function normalizeVoucherData(data) {
  if (data.date) data.date = parseDate(data.date);
  if (data.voucher?.date) data.voucher.date = parseDate(data.voucher.date);

  if (Array.isArray(data.entries)) {
    data.entries.forEach(e => {
      if (typeof e.amount === 'string') e.amount = parseFloat(e.amount);
    });
  }
  if (Array.isArray(data.voucher?.entries)) {
    data.voucher.entries.forEach(e => {
      if (typeof e.amount === 'string') e.amount = parseFloat(e.amount);
    });
  }
  if (Array.isArray(data.voucher?.items)) {
    data.voucher.items.forEach(i => {
      if (typeof i.amount === 'string') i.amount = parseFloat(i.amount);
      if (typeof i.qty === 'string') i.qty = parseFloat(i.qty);
      if (typeof i.rate === 'string') i.rate = parseFloat(i.rate);
    });
  }
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/schema/:operation/:type', (req, res) => {
  const { operation, type } = req.params;
  console.log("[server] schema lookup:", operation, type);
  const result = getSchema(operation, type);
  if (!result) {
    return res.status(404).json({
      error: `Unknown ${operation}/${type}`,
      availableOperations: listOperations(),
      availableTypes: listTypes(operation) || []
    });
  }
  res.json(result);
});

app.get('/schema', (req, res) => {
  const operation = req.query.operation;
  const type = req.query.type;
  console.log("[server] schema query lookup:", operation, type);
  if (!operation || !type) {
    return res.status(400).json({ error: 'Missing operation or type query params', availableOperations: listOperations() });
  }
  const result = getSchema(operation, type);
  if (!result) {
    return res.status(404).json({
      error: `Unknown ${operation}/${type}`,
      availableTypes: listTypes(operation) || []
    });
  }
  res.json(result);
});

app.post('/schema', (req, res) => {
  const operation = req.body?.operation;
  const type = req.body?.type;
  console.log("[server] schema POST lookup:", operation, type);
  if (!operation || !type) {
    return res.status(400).json({ error: 'Missing operation or type', availableOperations: listOperations() });
  }
  const result = getSchema(operation, type);
  if (!result) {
    return res.status(404).json({
      error: `Unknown ${operation}/${type}`,
      availableTypes: listTypes(operation) || []
    });
  }
  res.json(result);
});

app.post('/execute', async (req, res) => {
  console.log("[server] execute body:", JSON.stringify(req.body).substring(0, 300));

  const body = req.body;

  // Path 1: Structured data from n8n (has type + companyName + name)
  // Skip LLM — go directly to schema builder
  if (body?.type && body?.companyName && body?.name) {
    const { createLedgerFromData } = require('./services/ledgers/createLedger');
    try {
      const result = await createLedgerFromData(body.type, body);
      return res.json({ success: true, result });
    } catch (err) {
      console.error("[server] structured ledger creation failed:", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Path 2: Natural language command (from direct API or old format)
  let command;
  if (typeof body === 'string') {
    try { command = JSON.parse(body).command; } catch (_) { command = body; }
  } else if (body?.command) {
    command = body.command;
  }

  if (!command) {
    console.error("[server] no command found. body:", body);
    return res.status(400).json({ success: false, error: 'Send either {command: "..."} or structured data with type, companyName, and name' });
  }

  try {
    console.log("[server] received command:", command);
    const result = await createLedger(command);
    res.json({ success: true, result });
  } catch (err) {
    console.error("[server] execution failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/execute/voucher', async (req, res) => {
  console.log("[server] voucher request:", JSON.stringify(req.body).substring(0, 500));

  let body = req.body;

  // Support receiving data as a JSON string
  if (typeof body?.data === 'string') {
    try { body = JSON.parse(body.data); } catch (_) {}
  }
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) {}
  }

  // If it has entries/voucher/stockGroups, it's structured voucher data — normalize and use directly
  if (body?.entries || body?.voucher || body?.stockGroups || body?.items) {
    normalizeVoucherData(body);
    try {
      const result = await createVoucherFromData(body);
      return res.json({ success: true, result });
    } catch (err) {
      console.error("[server] voucher structured failed:", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Otherwise extract a natural language command
  let command;
  if (body?.command && typeof body.command === 'string') {
    command = body.command;
  } else if (typeof body === 'object' && body) {
    const stringVals = Object.values(body).filter(v => typeof v === 'string' && v.length > 10);
    if (stringVals.length > 0) {
      command = stringVals.sort((a, b) => b.length - a.length)[0];
    }
  }

  if (command) {
    try {
      console.log("[server] voucher command:", command);
      const result = await createVoucherFromCommand(command);
      return res.json({ success: true, result });
    } catch (err) {
      console.error("[server] voucher command failed:", err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Otherwise expect structured voucher data
  if (!body || !body.type) {
    return res.status(400).json({
      success: false,
      error: 'Missing voucher data. Send either {command: "natural language"} or structured data with type, company, date, entries/items',
      availableTypes: listTypes('voucher')
    });
  }

  try {
    const result = await createVoucherFromData(body);
    res.json({ success: true, result });
  } catch (err) {
    console.error("[server] voucher execution failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

const axios = require('axios');

app.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Missing "message"' });
  }
  try {
    const n8nRes = await axios.post('http://localhost:5678/webhook/laminate-chat', {
      message,
      sessionId: sessionId || 'default'
    });
    res.json({ reply: n8nRes.data?.reply || n8nRes.data?.output || JSON.stringify(n8nRes.data) });
  } catch (err) {
    console.error("[server] n8n proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`[server] laminate backend listening on port ${PORT}`));
