# 🏥 Medi-Sense AI — React Native App

> Emergency triage powered by Claude AI · SDG Goal 3 · Built for Chennai, India

---

## 📁 Folder Structure

```
MediSenseAI/
├── App.js                          ← Root navigator + font loader
├── app.json                        ← Expo config + permissions
├── babel.config.js
├── package.json
├── .env                            ← API keys (never commit!)
├── .gitignore
│
└── src/
    ├── context/
    │   └── AuthContext.js          ← Auth state, profile, chat history
    │
    ├── screens/
    │   ├── SplashScreen.js         ← Welcome + login/signup entry
    │   ├── LoginScreen.js          ← Phone + password login
    │   ├── SignupScreen.js         ← Full registration + guardian setup
    │   ├── OnboardingScreen.js     ← Medical profile builder
    │   ├── SOSScreen.js            ← 🚨 Emergency SOS + GPS + guardian SMS
    │   ├── ChatScreen.js           ← Claude AI triage chat
    │   └── ProfileScreen.js        ← Patient profile + session history
    │
    ├── services/
    │   ├── ClaudeService.js        ← Claude API + system prompt + fallbacks
    │   ├── LocationService.js      ← GPS + nearest hospital finder
    │   └── SMSService.js           ← Fast2SMS + WhatsApp + SMS fallback
    │
    └── utils/
        ├── theme.js                ← Colors, fonts, shadows, radius
        ├── constants.js            ← Hospitals DB, conditions, emergencies
        └── helpers.js              ← Utility functions (distance, risk, etc.)
```

---

## 🚀 Setup

### 1. Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS or Android)

### 2. Install dependencies
```bash
cd MediSenseAI
npm install
```

### 3. Configure API keys
Edit `.env` and add your keys:
```
EXPO_PUBLIC_CLAUDE_API_KEY=sk-ant-...your key...
EXPO_PUBLIC_FAST2SMS_KEY=...your key...
```

Get keys from:
- Claude: https://console.anthropic.com
- Fast2SMS: https://fast2sms.com

### 4. Run the app
```bash
npx expo start
```
Scan the QR code with **Expo Go** on your phone.

---

## 📱 App Flow

```
Splash → Login/Signup
       → Medical Onboarding (conditions, meds, allergies)
       → SOS Emergency Screen  ← First screen after login
            ├── 🚨 SOS → GPS → nearest hospital → AUTO-CALL + SMS guardian
            ├── Quick dial: 108 / 100 / 101
            └── "Not urgent?" → Chat Screen
       → Medi-Sense AI Chat    ← Claude AI with patient memory
       → Patient Profile       ← History, sessions, guardian, conditions
```

---

## 🔑 Features

| Feature | Description |
|---|---|
| 🚨 SOS Emergency | GPS-based nearest hospital finder + auto-call |
| 👨‍👩‍👧 Guardian SMS | Auto-SMS alert when SOS is pressed |
| 🤖 Claude AI Triage | Patient-aware symptom analysis |
| 🏥 Hospital DB | 10 Chennai hospitals with emergency numbers |
| 📱 Auth System | Phone + password + Indian number validation |
| 🧠 Patient Memory | Persistent medical profile stored locally |
| ⚡ History Alerts | Pre-warns based on patient history |
| 📊 Session Log | Tracks last 20 chat sessions |

---

## 🏥 Chennai Hospitals (Built-in)

1. Apollo Hospitals — Greams Road
2. MIOT International — Manapakkam
3. Fortis Malar — Adyar
4. Kauvery Hospital — Alwarpet
5. Dr. Kamakshi Memorial — Pallikaranai
6. Govt General Hospital — Park Town
7. Stanley Medical College — Park Town
8. Vijaya Hospital — Vadapalani
9. Chettinad Health City — Kelambakkam
10. SRM Medical Institute — Kattankulathur

---

## 🔧 Production SMS Setup (Fast2SMS)

In `src/services/SMSService.js`, the `sendGuardianAlert()` function:
1. Tries Fast2SMS API first (if key is set)
2. Falls back to WhatsApp deep link
3. Falls back to SMS app

To enable production SMS, just set `EXPO_PUBLIC_FAST2SMS_KEY` in `.env`.

---

## ⚠️ Disclaimer

This app is for educational/hackathon purposes. It is NOT a replacement for professional medical care. Always call 108 for life-threatening emergencies.

---

*SDG Goal 3 — Good Health & Well-Being · Medi-Sense AI 2025*
