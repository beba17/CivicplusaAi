# JanSetu AI

## From citizen voice to national infrastructure action

JanSetu AI is a multilingual Digital Public Good prototype for turning citizen development requests into explainable infrastructure priorities for public planners across India.

Citizens can share needs through voice, text, or messaging channels. The system preserves the original language, structures the request, clusters demand hotspots, and presents recommendations with an evidence trail and a human-review checkpoint.

> **Hackathon prototype:** the included data and scores are representative demo assumptions, not official statistics or an automated allocation decision.

## What is included

| Experience | Location | Purpose |
| --- | --- | --- |
| Policy control room | `artifacts/jansetu-ai` | Dashboard for signals, hotspots, evidence, and recommendations |
| Citizen mobile app | `artifacts/jansetu-mobile` | Language-first request capture and request status |
| Streamlit deployment | `jansetu-streamlit` | Lightweight browser dashboard for Streamlit Cloud |
| Pitch deck | `artifacts/jansetu-ai-pitch` | 15-slide hackathon presentation source |

## The demo story

1. A citizen shares a need in the language and channel available to them.
2. JanSetu keeps the original wording attached to the structured evidence.
3. Similar requests form a demand hotspot instead of remaining isolated anecdotes.
4. A recommendation shows its signal volume, confidence, cost, and remaining human checks.

## Run the Streamlit version

```bash
cd jansetu-streamlit
pip install -r requirements.txt
streamlit run app.py
```

For Streamlit Community Cloud, use `jansetu-streamlit/app.py` as the main file.

## Run the web prototype

```bash
pnpm install
pnpm --filter @workspace/jansetu-ai run dev
```

## Run the mobile prototype

```bash
pnpm install
pnpm --filter @workspace/jansetu-mobile run dev
```

Open the Expo preview on a phone or scan the QR code with Expo Go.

## Trust and governance

- Demo records are clearly labeled.
- Recommendations are explainable rather than black-box outputs.
- The prototype stops before budget allocation: human review is required.
- No personal details are needed for the citizen intake demo.
- Production use would require consent management, provenance, privacy controls, field validation, and a persistent data layer.

## Suggested judging line

**JanSetu AI does not replace public decision-makers — it gives them a clearer, more inclusive, and more accountable signal to act on.**