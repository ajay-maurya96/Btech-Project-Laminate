function validatePurchaseAccountWithBank(input) {
  // ---- Core ----
  if (!input.companyName || !input.companyName.trim()) {
    throw new Error('SVCURRENTCOMPANY is mandatory');
  }

  if (!input.ledgerName || !input.ledgerName.trim()) {
    throw new Error('LEDGER NAME is mandatory');
  }

  if (input.parent !== 'Purchase Accounts') {
    throw new Error('Parent must be Purchase Accounts');
  }

  if (typeof input.openingBalance !== 'number') {
    throw new Error('OPENINGBALANCE must be a number');
  }

  // ---- Language ----
  if (!Array.isArray(input.aliases) || input.aliases.length === 0) {
    throw new Error('At least one alias is required');
  }

  // ---- Bank / Payment ----
  if (input.bank.enabled === 'Yes') {
    const { ifsc, bankName, accountNumber, transactionType } = input.bank;

    if (!ifsc) throw new Error('IFSCODE is required');
    if (!bankName) throw new Error('BANKNAME is required');
    if (!accountNumber) throw new Error('ACCOUNTNUMBER is required');
    if (!transactionType) {
      throw new Error('DEFAULTTRANSACTIONTYPE is required');
    }

    // IFSC format: 4 letters + 0 + 6 alphanum
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      throw new Error('Invalid IFSC format');
    }
  }
}

module.exports = validatePurchaseAccountWithBank;
