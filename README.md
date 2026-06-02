# ⚠️ Telegram Phishing Simulator – Educational Security Tool

**DO NOT USE THIS CODE FOR ILLEGAL ACTIVITIES.**  
This project is a **simulation** created exclusively for cybersecurity education, awareness, and authorized penetration testing in isolated lab environments.

![Telegram Phishing Simulation Demo](https://via.placeholder.com/800x400?text=Phishing+Simulator+Demo)  
*(Replace with a screenshot of your UI)*

---

## 📚 Table of Contents
- [Purpose](#purpose)
- [How the Attack Works](#how-the-attack-works)
- [Repository Contents](#repository-contents)
- [Setup in a Safe Lab](#setup-in-a-safe-lab)
- [Step-by-Step Usage](#step-by-step-usage)
- [Capturing Network Traffic](#capturing-network-traffic)
- [How to Defend Against This Attack](#how-to-defend-against-this-attack)
- [Legal & Ethical Warning](#legal--ethical-warning)
- [License](#license)

---

## 🎯 Purpose

This repository demonstrates **how cybercriminals steal Telegram accounts** using fake "Free Premium" offers. By understanding the exact mechanics, you can:

- Recognize phishing pages and social engineering tactics.
- Test your own organization’s awareness (with permission).
- Learn how to intercept and analyze malicious traffic.
- Build defensive strategies (e.g., 2FA enforcement, user training).

**This is a teaching tool – not a weapon.**

---

## 🧠 How the Attack Works (Step by Step)

The attack mimics a real Telegram phishing kit. It has three stages:

### Stage 1 – Phone Number Harvesting
1. Victim clicks a link (e.g., “Get Free Telegram Premium”).
2. A convincing page asks for the victim’s phone number.
3. The attacker’s server receives the number (`POST /api/send-code`).

### Stage 2 – Verification Code Interception
1. The attacker uses the phone number to trigger a real Telegram SMS code (in our simulation, we **mock** this step).
2. The victim is asked to enter the 6-digit code they received.
3. The code is sent to the attacker (`POST /api/verify-code`).

### Stage 3 – Two‑Factor Password Theft (if enabled)
1. If the account has 2FA, the victim is asked for their password.
2. The password is exfiltrated (`POST /api/verify-2fa`).
3. The attacker now has full access: they can change the phone number, lock out the victim, and scam contacts.

> **Our simulation uses a mock backend** – it never contacts Telegram’s real API. Credentials are only logged locally for educational observation.

---

## 📁 Repository Contents

| File | Description |
|------|-------------|
| `index.html` | The phishing interface (modern, animated, responsive). |
| `server.js` | Mock backend that logs stolen data to console and a file. |
| `package.json` | Node.js dependencies (Express). |
| `README.md` | This file. |
| `LICENSE` | Ethical use license (see below). |
| `.gitignore` | Ignores `node_modules` and log files. |

---

## 🛠️ Setup in a Safe Lab

To analyze this simulation without any risk, you **must** use an isolated virtual environment.

### Requirements
- [VirtualBox](https://www.virtualbox.org/) (free) or VMware.
- Two VMs (both can be Linux – e.g., Ubuntu or Kali).
- Internal network / host‑only network so VMs can talk but not the internet (optional).

### Network Setup (Recommended)
1. Create a **NAT Network** or **Host‑Only Network** in VirtualBox.
2. Assign both VMs to that network.
3. On the **Attacker VM** (will host the phishing page), note its IP (e.g., `192.168.100.10`).
4. On the **Victim VM** (will browse the page), ensure it can reach that IP.

### Installing Dependencies on Attacker VM
```bash
sudo apt update && sudo apt install -y nodejs npm
git clone https://github.com/yourusername/telegram-phish-simulator.git
cd telegram-phish-simulator
npm install express

```

## 🛠️ Setup in a Safe Lab

To analyze this simulation without any risk, you **must** use an isolated virtual environment.

### Requirements
- [VirtualBox](https://www.virtualbox.org/) (free) or VMware.
- Two VMs (both can be Linux – e.g., Ubuntu or Kali).
- Internal network / host‑only network so VMs can talk but not the internet (optional).

### Network Setup (Recommended)
1. Create a **NAT Network** or **Host‑Only Network** in VirtualBox.
2. Assign both VMs to that network.
3. On the **Attacker VM** (will host the phishing page), note its IP (e.g., `192.168.100.10`).
4. On the **Victim VM** (will browse the page), ensure it can reach that IP.

### Installing Dependencies on Attacker VM

```bash

sudo apt update && sudo apt install -y nodejs npm
git clone https://github.com/yourusername/telegram-phish-simulator.git
cd telegram-phish-simulator
npm install express

```

---

## 🚀 Step-by-Step Usage

1. **Start the mock backend** on the Attacker VM:
   ```bash
   sudo node server.js
   ```
   You will see a welcome ASCII logo and:
   ```
   Server running on http://localhost:80
   ```
   *(Port 80 requires sudo; you can change to 3000 if needed)*

2. **Access the phishing page** from the Victim VM’s browser:
   ```
   http://<attacker-ip>/
   ```

3. **Simulate a victim**:
   - Enter any phone number (e.g., `+1234567890`).
   - Click **“Get Code”**.
   - On the Attacker VM’s terminal, you will see:
     ```
     [📞 PHONE] 1234567890 | Key: test_lab_123
     ```
   - Enter any 6‑digit code (e.g., `111111`).
   - Terminal shows:
     ```
     [🔐 CODE] 1234567890 | Code: 111111
     ```
   - If the simulation is set to `needs_2fa: true` (default), you will be asked for a password.
   - Enter any password.
   - Terminal shows:
     ```
     [⚠️ PASSWORD] 1234567890 | PW: myfake
     ```
   - The page displays a success message and “redirects”.

All stolen data is also appended to `stolen_credentials.log` in the same folder.

---

## 📡 Capturing Network Traffic (For Analysis)

While the simulation runs, you can use network analysis tools to see exactly what data is exfiltrated.

### Using Wireshark (on Victim VM)
```bash
sudo wireshark
```
Filter: `http.request.method == "POST"`  
You will see the raw JSON payloads containing phone, code, and password.

### Using Burp Suite (on Attacker VM)
1. Set Burp proxy to listen on `0.0.0.0:8080`.
2. Configure Victim VM’s browser to use `http://<attacker-ip>:8080`.
3. Intercept and replay requests to understand the API.

### Using Developer Tools (Simplest)
On the Victim VM browser: Press `F12` → **Network** tab.  
Every `fetch` call is recorded – you can inspect the exact data being sent.

---

## 🛡️ How to Defend Against This Attack

Understanding the attack leads directly to defensive measures:

1. **Enable Two‑Step Verification (2FA)** on Telegram.  
   - Go to **Settings → Privacy and Security → Two-Step Verification**.  
   - Set a strong password and a recovery email.  
   - Even if an attacker gets your SMS code, they cannot log in without your 2FA password.

2. **Never click “Free Premium” links** from untrusted sources.  
   - Telegram Premium is **never free** via third‑party websites.

3. **Check the URL** before entering credentials.  
   - Real Telegram pages are on `web.telegram.org` or `t.me`.  
   - Phishing domains often use misspellings like `te1egram.com`.

4. **Use a password manager** – it will not auto‑fill on fake domains.

5. **Monitor active sessions** in Telegram → Settings → Devices.  
   - Terminate any unknown devices immediately.

6. **Educate friends and family** about this exact phishing flow.

---

## ⚖️ Legal & Ethical Warning

**IMPORTANT – READ CAREFULLY**

- This code is provided **solely for educational and authorized security testing**.
- **Do not** deploy this simulation on any public website or use it against real users without explicit written permission.
- **Do not** modify the code to connect to real Telegram APIs or to exfiltrate data to external servers.
- **Do not** use this code to steal accounts, commit fraud, or violate any laws.

**The author assumes no responsibility for any misuse of this code.**  
By cloning, downloading, or using this repository, you agree that you will use it only in controlled environments (e.g., your own virtual machines) for learning purposes.

If you are a security researcher, always obtain proper authorization before testing on any system you do not own.

---

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** with an additional ethical use clause.

- **You are free to** share, adapt, and use this code for **non‑commercial educational purposes**.
- **You are NOT allowed to** use this code for any malicious, illegal, or commercial activity (including selling phishing‑as‑a‑service).
- Any derivative work must include a clear warning and attribution to this repository.

See the [LICENSE](LICENSE) file for full terms.

---

## 🙏 Acknowledgements

- Real phishing kits that inspired this educational reconstruction.
- The cybersecurity community for promoting ethical learning.
- You, for choosing to learn how to defend instead of attack.

---

## 📬 Questions or Improvements?

Feel free to open an **Issue** or **Pull Request** – but only for educational enhancements (e.g., better UI, more comments, traffic analysis tips). No requests to turn this into a real phishing tool will be answered.

**Stay safe, enable 2FA, and never trust “free Premium” links!** 🔐
`