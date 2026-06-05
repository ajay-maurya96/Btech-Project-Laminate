const buildReceiptXML = require('./schema/vouchers/stockItem');

const data = {
    company: "Google",

    groups: [
        { 
            name: "Office Supplies", 
            parent: "" 
        }
    ],

    items: [
        {
            name: "Pen hai ji",
            parent: "Office Supplies",
            unit: "Nos"
        },
    ]
};

try {
    const xml = buildReceiptXML(data);
    console.log(xml);
} catch (err) {
    console.error(err.message);
}