const prompt = `
Following are formats used to create a ledger under different groups and you need to classify the parent group of ledger that user wants to generate and after that you will try to segregate informations provided by user as below given structures of your chosen parent.

Please do not enter the fields which are empty in the ledgerInput, neither add any comments or remarks.
To respond, please use this structure (valid js object) but without any backticks or javascript labeling): 
Response : {
  parent: parent_type here as mentioned within [],
  ledgerInput: { your made strucure after extracting all information and mapping them to parent groups required structure },
}

1. Sundry Creditors                                 [type: sundryCreditors]
const ledgerInput = {
  // ───── REQUIRED ─────
  companyName: "Google",
  name: "new All fields ledger",

  // ───── MAILING / ADDRESS ─────
  mailingName: "esha",
  address: ["line1, line2", "city"],
  pincode: "403001",
  country: "India",
  state: "Goa",

  // ───── CONTACT ─────
  email: "testvira@email.com",
  emailCC: "mysteryman@email.com",
  phone: "458923",
  mobile: "6598765987",
  contactPerson: "Mystery Man",

  // ───── TAX / GST ─────
  pan: "LSWIT2227F",                 
  gstRegistrationType: "Regular",
  gstin: "30LSWIT2227F1Z5",   
  gstNature: "SEZ",

  // ───── LANGUAGE ─────
  languageNames: ["name2", "new name2"],
  languageId: "1033",

  // ───── BANK / PAYMENT ─────
  bankDetails: {
    ifsc: "IFSC0001234",
    bankName: "ScamNo1",
    accountNumber: "123456789"
  }
};

2. Sundry Debtors                                      [type: sundryDebtors]
const ledgerInput = {
  // ───── REQUIRED ─────
  companyName: "Google",
  name: "new All fields ledger",

  // ───── MAILING / ADDRESS ─────
  mailingName: "esha",
  address: ["line1, line2", "city"],
  pincode: "403001",
  country: "India",
  state: "Goa",

  // ───── CONTACT ─────
  email: "testvira@email.com",
  emailCC: "mysteryman@email.com",
  phone: "458923",
  mobile: "6598765987",
  contactPerson: "Mystery Man",

  // ───── TAX / GST ─────
  pan: "LSWIT2227F",                 
  gstRegistrationType: "Regular",
  gstin: "30LSWIT2227F1Z5",   
  gstNature: "SEZ",

  // ───── LANGUAGE ─────
  languageNames: ["name2", "new name2"],
  languageId: "1033",

  // ───── BANK / PAYMENT ─────
  bankDetails: {
    ifsc: "IFSC0001234",
    bankName: "ScamNo1",
    accountNumber: "123456789"
  }
};

3. Bank Accounts                                           [type: bankAccounts]
const ledgerInput = {
  // ───── REQUIRED ─────
  companyName: "Google",
  name: "Esha Didi Ledger",

  // ───── MAILING / ADDRESS ─────
  mailingName: "Esha Didi",
  address: ["C127 Raju Park", "South Delhi"],
  pincode: "110062",
  country: "India",
  state: "Delhi",
  priorStateName: "Delhi",

  // ───── CONTACT ─────
  email: "esha@example.com",
  emailCC: "cc_esha@example.com",
  phone: "01112345678",
  mobile: "9876543210",
  contactPerson: "Esha Didi",

  // ───── BANK DETAILS ─────
  bankDetails: {
    ifsc: "BARB0DBSAKE",
    bankName: "Bank of Example",
    accountNumber: "10010075321",
    branch: "Saket"
  },

  // ───── TAX / GST ─────
  pan: "ABCDE1234F",
  gstRegistrationType: "Regular",
  gstin: "27ABCDE1234F1Z5",
  gstNature: "SEZ",
  countryOfResidence: "India",

  // ───── LANGUAGE ─────
  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  // ───── OPENING BALANCE ─────
  openingBalance: 20000.00,

  // ───── OPTIONAL METADATA ─────
  startingFrom: "20250401",
  alterId: "198"
};

4. Bank OD or Bank OOC                             [type: bankOd]
const ledgerInput = {
  companyName: "Google",
  name: "Esha",

  mailingName: "Esha",
  address: ["C127 Raju Park", "South Zone"],

  startingFrom: "20250401",
  priorStateName: "Delhi",
  state: "Delhi",
  pincode: "110062",
  country: "India",
  countryOfResidence: "India",

  ifsc: "BARB0SKET12",
  bankAccountNumber: "1299978345",
  bankBranch: "Saket",
  bankAccountHolder: "Google",

  openingBalance: 12000.00,
  odLimit: 12.00,

  sortPosition: 1000,
  alterId: 206,

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033"
};

5. Bank Divisions                               [type: bankDivisions]
const ledgerInput = {
  companyName: "Google",
  name: "Esha",

  mailingName: "Esha",
  address: ["C127 Raju Park"],
  priorState: "Delhi",

  state: "Delhi",
  country: "India",
  countryOfResidence: "India",

  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",
  vatDealerType: "Regular",

  openingBalance: 1200.00,
  sortPosition: 1000,
  alterId: 212,

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    favouring: "Esha",
    transactionName: "Primary",
    chequeCrossComment: "A/c Payee",
    defaultTransactionType: "Cheque",
    setAsDefault: "No"
  }
};

6. Capital Account                                       [type: capitalAccount]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",
  parent: "Capital Account",

  mailingName: "Esha",

  address: [
    "C127",
    "Raju Park"
  ],

  state: "Delhi",
  country: "India",
  pincode: "110062",

  pan: "AAAPS1234A",

  gstRegistrationType: "Regular",

  openingBalance: "10.00",

  languageNames: [
    "Esha",
    "Esha Didi"
  ],
  languageId: "1033"
};

7. Cash-in-Hand                                 [type: cashInHand]
const ledgerInput = {
  companyName: "Google",
  name: "Esha",

  openingBalance: "12.00",

  allowBanking: true,

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "BARB0SAK12T",
    bankName: "Bank of India",
    accountNumber: "120935462",
    favouring: "Esha"
  }
};

8. Current Liabilities                         [type: currentLiabilities]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",
  parent: "Current Liabilities",

  addresses: ["C127", "Raju Park"],
  mailingName: "Esha",

  state: "Delhi",
  pincode: "110062",
  country: "India",

  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",

  openingBalance: "10.00",
  alterId: "239",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    favouring: "Esha",
    bankName: "Bank of Baroda",
    accountNumber: "123745629",
    ifsc: "BARB0ABCDE1",
    transactionType: "Inter Bank Transfer",
    transactionName: "Primary"
  }
};

9. Deposit (Assets)                          [type: depositAssets]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",

  addresses: ["C127", "Raju Park"],
  mailingName: "Esha",

  state: "Delhi",
  pincode: "110062",
  country: "India",

  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",

  openingBalance: "-1.00",
  alterId: "244",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    favouring: "Esha",
    transactionName: "Primary",
    chequeCrossComment: "A/c Payee",
    transactionType: "Cheque"
  };
};

10. Direct Expenses                                  [type: directExpenses]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",

  openingBalance: "-1.00",
  alterId: "248",

  roundingMethod: "Upward Rounding",
  roundingLimit: "1",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0123456",
    bankName: "Bank of Baroda",
    accountNumber: "1234567890",
    favouring: "Esha",
    transactionName: "Primary",
    transactionType: "Inter Bank Transfer"
  },

  vatDealerNature: "Invoice Rounding"
};

11. Direct Incomes                                       [type: directIncomes]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",

  openingBalance: "12.00",
  alterId: "252",

  roundingMethod: "Normal Rounding",
  roundingLimit: "1",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    favouring: "Esha",
    transactionName: "Primary",
    transactionType: "Others",
    bankName: "Bank of India",
    accountNumber: "1234567890",
    ifsc: "AAAA012345"
  },

  vatDealerNature: "Invoice Rounding"
};

12. Duties and Taxes                                     [types: dutiesAndTaxes]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",
  parent: "Duties & Taxes",

  tax: {
    basicTypeOfDuty: "As Surcharge",
    rateOfTax: "12"
  },

  rounding: {
    method: "Downward Rounding",
    limit: "1"
  },

  openingBalance: "10.00",
  alterId: "260",

  language: {
    names: ["Esha", "Esha Didi"],
    id: "1033"
  },

  paymentDetails: {
    favouring: "Esha",
    transactionType: "Cheque",
    ifsc: "SBIN0001234"
  }
};

13. fixed assets                                        [type: fixedAssets]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",
  parent: "Fixed Assets",

  addresses: ["C127", "Raju Park"],
  mailingName: "Esha",

  state: "Delhi",
  pincode: "110062",
  country: "India",

  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",

  openingBalance: "-120.00",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0123456",
    bankName: "Bank of India",
    accountNumber: "1234567890",
    favouring: "Esha",
    defaultTransactionType: "Inter Bank Transfer"
  }
};

14. indirect expenses                                     [type: indirectExpenses]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",
  parent: "Indirect Expenses",

  costCentres: "Yes",

  openingBalance: "-1234.00",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0123456",
    bankName: "Boi",
    accountNumber: "1234567890",
    favouring: "Esha",
    defaultTransactionType: "Inter Bank Transfer"
  }
};

15. Indirect Income                                        [type: indirectIncome]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",
  parent: "Indirect Incomes",

  costCentres: "Yes",

  // Income ledger → positive opening balance
  openingBalance: "12.00",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0123456",
    bankName: "Boi",
    accountNumber: "1234567890",
    favouring: "Esha",
    defaultTransactionType: "Inter Bank Transfer"
  }
};

16. Investments                                          [type: investments]
const ledgerInput = {
   companyName: "Google",

  name: "Esha",
  parent: "Investments",

  addresses: ["C127", "Raju Park"],
  mailingName: "Esha",

  state: "Delhi",
  pincode: "110062",
  country: "India",

  pan: "AAAPS1234A",

  openingBalance: "-102.00",
  alterId: "280",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0124356",
    bankName: "Boi",
    accountNumber: "1234567890",
    favouring: "Esha",
    defaultTransactionType: "Inter Bank Transfer"
  }
};

17. Loan and Advances (Assets)                              [type: loanAndAdvencesAssets]
const ledgerInput = {
   companyName: "Google",

  name: "Esha",
  parent: "Loans & Advances (Asset)",

  addresses: ["C127", "Raju Park"],
  mailingName: "Esha",

  state: "Delhi",
  pincode: "110062",
  country: "India",

  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",

  openingBalance: "-100.00",
  alterId: "284",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0123456",
    bankName: "Baoi",
    accountNumber: "1234567890",
    favouring: "Esha",
    defaultTransactionType: "Inter Bank Transfer"
  }
};

18. Loan Liability                                        [type: loanLiability]
const ledgerInput = {
   companyName: "Google",

  name: "Esha",
  parent: "Loans (Liability)",

  addresses: ["C127", "Raju Park"],
  mailingName: "Esha",

  state: "Delhi",
  pincode: "110062",
  country: "India",

  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",

  openingBalance: "10.00",
  alterId: "288",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  paymentDetails: {
    ifsc: "AAAA0123456",
    bankName: "Boi",
    accountNumber: "1234567890",
    favouring: "Esha",
    defaultTransactionType: "Inter Bank Transfer"
  }
};

19. Miss. Expense (ASSET)                                     [type: missExpensesAsset]
const ledgerInput = {
   companyName: "Google",

  name: "Esha",
  parent: "Misc. Expenses (ASSET)",

  flags: {
    billwise: "No",
    costCentres: "No",
    interest: "No"
  },

  openingBalance: "10.00",
  alterId: "292",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  banking: {
    enabled: true,

    ifsc: "AAAA0123456",
    bankName: "Bank of India",
    accountNumber: "1234567890",
    favouring: "Esha",

    transactionType: "Inter Bank Transfer"
  }
};

20. Provision                                             [type: provision]
const ledgerInput = {
   companyName: "Google",

  name: "Esha",
  openingBalance: "1.00",
  alterId: "296",

  flags: {
    billwise: "No",
    costCentres: "No",
    interest: "No"
  },

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  banking: {
    enabled: true,
    ifsc: "AAAA0123456",
    bankName: "Boi",
    accountNumber: "1234567890",
    favouring: "Esha",
    transactionType: "Inter Bank Transfer"
  }
};

21. Purchase Account                               [type: purchaseAccount]
const ledgerInput = {
  companyName: 'Google',

  ledgerName: 'Esha',
  parent: 'Purchase Accounts',

  openingBalance: 10,
  alterId: 304,

  aliases: [
    'Esha',
    'Esha Didi'
  ],

  bank: {
    enabled: 'Yes',
    ifsc: 'AAAA0123456',
    bankName: 'Baoi',
    accountNumber: '1234567890',
    transactionType: 'Inter Bank Transfer'
  }
};

22. Reserves & Surplus                             [type: reservesAndSurplus]
const ledgerInput = {
  companyName: "Google",

  name: "Esha",

  openingBalance: "12.00",
  alterId: "317",

  languageNames: ["Esha", "Esha Didi"],
  languageId: "1033",

  // Banking MUST be disabled
  banking: {
    enabled: false
  },

  // Allowed: cheque-related details only
  paymentDetails: {
    favouring: "Esha",
    transactionType: "Cheque",
    chequeCross: "A/c Payee"
  }
};

23. Sales Account                                    [type: salesAccount]
const ledgerInput = {
  companyName: "Google",

  name: "Yu",
  reservedName: "",

  parent: "Sales Accounts",

  openingBalance: "6777.00",
  alterId: "325",
  sortPosition: "1000",

  rounding: {
    method: "Upward Rounding",
    limit: "1"
  },

  audit: {
    oldAuditEntryIds: [-1]
  },

  tax: {
    taxType: "Others"
  },

  flags: {
    billwise: "No",
    costCentres: "Yes",
    interest: "No",
    affectsStock: "Yes",
    chequePrinting: "Yes",
    ebanking: "No"
  },

  language: {
    names: ["Yu"],
    id: "1033"
  },

  banking: {
    enabled: true,
    favouring: "Yu",
    transactionType: "Cheque",
    chequeCrossComment: "A/c Payee"
  },

  udf: {
    vatDealerNature: "Invoice Rounding"
  }
};

24. Secured Loans                                      [type: securedLoans]
const ledgerInput = {
  companyName: "Google",
  name: "Yu",

  addresses: ["X125", "North Street"],
  mailingNames: ["Yu"],

  state: "Delhi",
  country: "India",
  pincode: "120976",
  pan: "AAAPS1234A",
  gstRegistrationType: "Regular",

  openingBalance: "100.00",
  alterId: 336,
  sortPosition: 1000,

  language: {
    names: ["Yu", "Yuyu"],
    id: 1033
  },

  banking: {
    enabled: true,
    ifsc: "AAAA0123456",
    bankName: "Boi",
    accountNumber: "1234567890",
    favouring: "Yu",
    transactionType: "Inter Bank Transfer"
  }
};

25. Stock In Hand                                     [type: stockInHand]
const ledgerInput = {
  companyName: "Google",
  name: "Yu",

  openingBalance: "-100.00",
  alterId: 340,
  sortPosition: 1000,

  language: {
    names: ["Yu", "Yu YU"],
    id: 1033
  },

  banking: {
    ifsc: "AAAA0123456",
    bankName: "Bank of India",
    accountNumber: "1234567890",
    favouring: "Yu",
    transactionType: "Inter Bank Transfer"
  }
};

26. Suspense A/C                                 [type: suspense]
const ledgerInput = {
  companyName: "Google",
  name: "Yu",

  openingBalance: "10000.00",
  alterId: "346",

  flags: {
    billwise: "No",
    costCentres: "No"
  },

  languageNames: ["Yu", "Yuyyyu"],
  languageId: 1033,

  banking: {
    enabled: true,
    ifsc: "AAAA0123456",
    bankName: "State Bank of India",
    accountNumber: "1234567890",
    favouring: "Yu",
    transactionType: "Inter Bank Transfer"
  }
};

27. Unsecured Loan                                    [type: unsecuredLoan]
const ledgerInput = {
  companyName: "Google",
  name: "Yu",

  addresses: ["12x North", "Calefornia"],
  mailingNames: ["Yu"],

  state: "Delhi",
  pincode: "123098",
  country: "India",
  pan: "AAAPS1234A",
  gstType: "Regular",

  openingBalance: "123.00",
  alterId: "350",

  flags: { billwise: "No", costCentres: "No" },
  languageNames: ["Yu", "Yu Qu"],
  languageId: 1033,

  payment: {
    enabled: true,
    favouring: "Yu",
    transactionType: "Cheque",
    chequeComment: "A/c Payee"
  }
};
`;

// Mistral client setup
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const { Mistral } = require('@mistralai/mistralai');
const client = new Mistral({ apiKey: MISTRAL_API_KEY });

// helper function
function parseLLMResponse(content) {
  const jsonLike = content
    .replace(/^Response\s*:\s*/i, '')
    .replace(/parent:\s*(\w+)/, 'parent: { "parent_type": "$1" }');

  return eval('(' + jsonLike + ')'); // controlled environment only
}

async function guessLedgerParent(userText) {
  const res = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      { role: 'user', content: `${prompt}\nUser request:\n${userText}` }
    ],
  });

  const content = res.choices[0].message.content;
  const parsedLLMResponse = parseLLMResponse(content);

  const response = {
    type: parsedLLMResponse.parent.parent_type,
    ledgerInput: parsedLLMResponse.ledgerInput
  };

  return response;
};

module.exports = guessLedgerParent;
