# HARMAC Command Center

Field business-development tool for HARMAC Energy Services, LLC (pipeline + SWD
construction, Permian + Delaware Basins).

Customers on a visit rotation, MSA/non-MSA tracking, prospect targets, a market
projects board, competitor workload tracking, a "By Area" route planner, and a daily
briefing. Built React + Vite, data in Firebase (live sync), hosted on Netlify.

## Run locally
```
npm install
npm run dev
```

## Deploy
See **SETUP_STEPS.md** — GitHub → Netlify + Firebase.

## Edit your keys
Only `src/firebase.js` needs your own values. Everything else works as-is.

## Notes for a developer (full build)
See the HARMAC Master Context Doc (§10 build spec) for the hosted version:
team auth/logins, voice-to-data, tightened Firestore rules. Data model lives in one
Firestore doc `harmac/commandCenter` as a starting point; split into collections if
scaling.
