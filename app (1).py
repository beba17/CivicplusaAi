import random
from datetime import datetime

import pandas as pd
import streamlit as st


st.set_page_config(
    page_title="JanSetu AI — Public Intelligence",
    page_icon="🌉",
    layout="wide",
    initial_sidebar_state="expanded",
)


LOGO_SVG = """
<svg width="{size}" height="{size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="JanSetu AI logo">
  <rect width="64" height="64" rx="15" fill="#15313a"/>
  <path d="M9 43 Q32 8 55 43" stroke="#e86f3d" stroke-width="5" fill="none" stroke-linecap="round"/>
  <line x1="7" y1="47" x2="57" y2="47" stroke="#f4f0e8" stroke-width="4" stroke-linecap="round"/>
  <line x1="21" y1="47" x2="21" y2="30" stroke="#178f8b" stroke-width="3" stroke-linecap="round"/>
  <line x1="43" y1="47" x2="43" y2="30" stroke="#178f8b" stroke-width="3" stroke-linecap="round"/>
  <circle cx="32" cy="22" r="4.5" fill="#f4f0e8"/>
</svg>
"""

_MAIN = '[data-testid="stMain"], section.main'


def _scoped(selectors: str, body: str) -> str:
    """Prefix every selector with the main-area container so the dark sidebar is untouched."""
    parts = []
    for sel in selectors.split(","):
        for root in ('[data-testid="stMain"]', 'section.main'):
            parts.append(f"{root} {sel.strip()}")
    return ",\n".join(parts) + " { " + body + " }\n"


BRAND_CSS = (
    "<style>\n"
    "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');\n"
    "html, body, .stApp, [data-testid=\"stAppViewContainer\"] { font-family: 'DM Sans', sans-serif; }\n"
    # Force the light brand look even when the visitor's system/browser is in dark mode
    ".stApp, [data-testid=\"stAppViewContainer\"], [data-testid=\"stHeader\"] { background: #f4f0e8 !important; }\n"
    + _scoped("h1, h2, h3, h4, p, li, label, span, div[data-testid=\"stMarkdownContainer\"], [data-testid=\"stCaptionContainer\"], [data-testid=\"stMetricLabel\"] *, [data-testid=\"stMetricValue\"] *", "color: #15313a;")
    + _scoped("[data-testid=\"stMetricDelta\"] *", "color: #287d69;")
    + _scoped("h1, h2, h3", "font-family: 'Instrument Serif', Georgia, serif !important; font-weight: 400 !important; letter-spacing: -0.01em;")
    + _scoped("h1", "font-size: 3.1rem !important; line-height: 1.05 !important;")
    + _scoped("[data-testid=\"stMetric\"]", "background: #fffaf0; border: 1px solid #d8d1c5; border-radius: 14px; padding: 14px 16px;")
    + _scoped("[data-testid=\"stVerticalBlockBorderWrapper\"], [data-testid=\"stExpander\"] details", "background: #fffaf0; border-color: #d8d1c5; border-radius: 14px;")
    + _scoped("[data-baseweb=\"input\"], [data-baseweb=\"textarea\"], [data-baseweb=\"select\"] > div, textarea, input", "background: #fffaf0 !important; color: #15313a !important;")
    + "[data-testid=\"stSidebar\"] { background: #15313a; }\n"
    "[data-testid=\"stSidebar\"] * { color: #f4f0e8; }\n"
    "[data-testid=\"stSidebar\"] hr { border-color: rgba(244,240,232,.18); }\n"
    "h1, h2, h3 { font-family: 'Instrument Serif', Georgia, serif !important; font-weight: 400 !important; }\n"
    ".stButton > button[kind=\"primary\"], .stFormSubmitButton > button[kind=\"primary\"] { background: #e86f3d; border: none; color: #15313a !important; font-weight: 700; border-radius: 10px; }\n"
    ".brand-row { display: flex; align-items: center; gap: 12px; }\n"
    ".brand-name { font-family: 'Instrument Serif', Georgia, serif; font-size: 1.7rem; line-height: 1; }\n"
    ".brand-tag { font-size: .78rem; opacity: .75; margin-top: 3px; }\n"
    ".brand-strip { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }\n"
    ".brand-strip .brand-name { font-size: 1.35rem; }\n"
    ".side-note { background: rgba(244,240,232,.08); border: 1px solid rgba(244,240,232,.18); border-radius: 12px; padding: 12px 14px; font-size: .85rem; line-height: 1.45; }\n"
    ".hero { background: linear-gradient(135deg, #15313a 0%, #1c5560 62%, #178f8b 100%); border-radius: 26px; padding: 44px 44px 36px; margin-bottom: 18px; box-shadow: 0 18px 40px rgba(21,49,58,.22); }\n"
    ".hero, .hero * { color: #f4f0e8 !important; }\n"
    ".hero h1 { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: 3.6rem; line-height: 1.02; margin: 18px 0 12px; }\n"
    ".hero h1 em { color: #f3a27f !important; font-style: italic; }\n"
    ".hero p { font-size: 1.08rem; max-width: 640px; opacity: .88; margin: 0 0 20px; }\n"
    ".pill { display: inline-block; padding: 6px 14px; margin: 0 8px 8px 0; border-radius: 999px; background: rgba(244,240,232,.14); border: 1px solid rgba(244,240,232,.22); font-size: .82rem; font-weight: 500; }\n"
    ".hero .brand-row .brand-name { font-size: 1.5rem; }\n"
    "[data-testid=\"stMetric\"], [data-testid=\"stVerticalBlockBorderWrapper\"] { box-shadow: 0 1px 2px rgba(21,49,58,.05), 0 8px 22px rgba(21,49,58,.06); transition: transform .18s ease, box-shadow .18s ease; }\n"
    "[data-testid=\"stMetric\"]:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(21,49,58,.12); }\n"
    "#MainMenu, footer { visibility: hidden; }\n"
    ".block-container { padding-top: 2.2rem; max-width: 1180px; }\n"
    "@media (max-width: 640px) { .hero { padding: 26px 22px; } .hero h1 { font-size: 2.5rem; } }\n"
    "</style>\n"
)


def apply_branding() -> None:
    st.markdown(BRAND_CSS, unsafe_allow_html=True)


BASE_REQUESTS = [
    {
        "id": "SIG-2048",
        "quote": "हमारे गांव में पानी का टैंकर हफ्ते में सिर्फ एक बार आता है।",
        "summary": "Reliable drinking water needed for Kalyanpur hamlet",
        "language": "Hindi",
        "channel": "Voice note",
        "place": "Kalyanpur, Rajasthan",
        "time": "12 min ago",
        "status": "Structured",
        "theme": "Water access",
    },
    {
        "id": "SIG-2047",
        "quote": "The bus stop has no light. Women wait here after sunset.",
        "summary": "Lighting and safety near the Bassi bus stop",
        "language": "English",
        "channel": "Text",
        "place": "Bassi, Jaipur",
        "time": "27 min ago",
        "status": "Under review",
        "theme": "Public safety",
    },
    {
        "id": "SIG-2046",
        "quote": "हमारे स्कूल तक जाने वाली सड़क बारिश में बंद हो जाती है।",
        "summary": "All-weather road access to government school",
        "language": "Hindi",
        "channel": "Voice note",
        "place": "Dausa, Rajasthan",
        "time": "41 min ago",
        "status": "Structured",
        "theme": "Roads",
    },
    {
        "id": "SIG-2045",
        "quote": "আমাদের পাড়ায় স্বাস্থ্যকেন্দ্র অনেক দূরে।",
        "summary": "Primary healthcare access gap in Ward 14",
        "language": "Bengali",
        "channel": "Text",
        "place": "Malda, West Bengal",
        "time": "1 hr ago",
        "status": "Triaged",
        "theme": "Healthcare",
    },
    {
        "id": "SIG-2044",
        "quote": "எங்கள் கிராமத்தில் குடிநீர் பற்றாக்குறை உள்ளது.",
        "summary": "Drinking water shortage in a Tamil Nadu village",
        "language": "Tamil",
        "channel": "Voice note",
        "place": "Madurai, Tamil Nadu",
        "time": "2 hr ago",
        "status": "Structured",
        "theme": "Water access",
    },
    {
        "id": "SIG-2043",
        "quote": "The bridge to our school washes away every monsoon.",
        "summary": "Flood-proof bridge needed for school access",
        "language": "English",
        "channel": "Messaging app",
        "place": "Dibrugarh, Assam",
        "time": "3 hr ago",
        "status": "Under review",
        "theme": "Roads",
    },
    {
        "id": "SIG-2042",
        "quote": "हमारे मोहल्ले में दिन में कई बार बिजली चली जाती है।",
        "summary": "Frequent power cuts in a Bihar neighbourhood",
        "language": "Hindi",
        "channel": "Text",
        "place": "Patna, Bihar",
        "time": "5 hr ago",
        "status": "Triaged",
        "theme": "Electricity",
    },
]

# All 36 States & UTs. Population = Census 2011 (approximate, official census figures).
# Lat/lon = approximate state centre points for map display.
_STATES = [
    ("Uttar Pradesh", 26.85, 80.95, 199812341, "Central"),
    ("Maharashtra", 19.75, 75.71, 112374333, "West"),
    ("Bihar", 25.10, 85.31, 104099452, "East"),
    ("West Bengal", 22.99, 87.85, 91276115, "East"),
    ("Madhya Pradesh", 23.47, 77.95, 72626809, "Central"),
    ("Tamil Nadu", 11.13, 78.66, 72147030, "South"),
    ("Rajasthan", 26.58, 73.84, 68548437, "West"),
    ("Karnataka", 15.32, 75.71, 61095297, "South"),
    ("Gujarat", 22.26, 71.19, 60439692, "West"),
    ("Andhra Pradesh", 15.91, 79.74, 49386799, "South"),
    ("Odisha", 20.95, 85.10, 41974218, "East"),
    ("Telangana", 18.11, 79.02, 35003674, "South"),
    ("Kerala", 10.85, 76.27, 33406061, "South"),
    ("Jharkhand", 23.61, 85.28, 32988134, "East"),
    ("Assam", 26.20, 92.94, 31205576, "Northeast"),
    ("Punjab", 31.15, 75.34, 27743338, "North"),
    ("Chhattisgarh", 21.28, 81.87, 25545198, "Central"),
    ("Haryana", 29.06, 76.09, 25351462, "North"),
    ("Delhi", 28.61, 77.21, 16787941, "North"),
    ("Jammu & Kashmir", 33.78, 75.00, 12267013, "North"),
    ("Uttarakhand", 30.07, 79.02, 10086292, "North"),
    ("Himachal Pradesh", 31.10, 77.17, 6864602, "North"),
    ("Tripura", 23.94, 91.99, 3673917, "Northeast"),
    ("Meghalaya", 25.47, 91.37, 2966889, "Northeast"),
    ("Manipur", 24.66, 93.91, 2855794, "Northeast"),
    ("Nagaland", 26.16, 94.56, 1978502, "Northeast"),
    ("Goa", 15.30, 74.12, 1458545, "West"),
    ("Arunachal Pradesh", 28.22, 94.73, 1383727, "Northeast"),
    ("Puducherry", 11.94, 79.81, 1247953, "South"),
    ("Mizoram", 23.16, 92.94, 1097206, "Northeast"),
    ("Chandigarh", 30.73, 76.78, 1055450, "North"),
    ("Sikkim", 27.53, 88.51, 610577, "Northeast"),
    ("Andaman & Nicobar Islands", 11.74, 92.66, 380581, "Islands"),
    ("Ladakh", 34.15, 77.58, 274289, "North"),
    ("Dadra & Nagar Haveli and Daman & Diu", 20.40, 72.83, 586956, "West"),
    ("Lakshadweep", 10.57, 72.64, 64473, "Islands"),
]

INDIA_STATES = pd.DataFrame(_STATES, columns=["state", "lat", "lon", "population", "region"])

THEMES = ["Water access", "Roads", "Public safety", "Healthcare", "Electricity", "Education"]

# Illustrative regional demand tendencies (NOT official statistics) used only to
# shape the simulated signal mix so the map is not perfectly uniform.
REGION_BIAS = {
    "North":     [1.0, 1.0, 1.2, 1.0, 0.9, 1.0],
    "West":      [1.4, 0.9, 1.0, 1.0, 0.9, 1.0],
    "South":     [0.9, 0.9, 1.0, 0.8, 0.8, 0.9],
    "East":      [1.1, 1.2, 1.0, 1.2, 1.3, 1.1],
    "Central":   [1.3, 1.1, 1.0, 1.3, 1.1, 1.2],
    "Northeast": [1.0, 1.7, 0.9, 1.3, 1.3, 1.1],
    "Islands":   [1.3, 1.0, 0.8, 1.4, 1.1, 1.0],
}


def build_india_signals() -> pd.DataFrame:
    """Simulated citizen-signal counts per State/UT x theme.
    Population is real (Census 2011). Signal counts are SIMULATED: scaled by population
    with a small deterministic variation, so results are stable between reruns."""
    rows = []
    for _, row in INDIA_STATES.iterrows():
        rng = random.Random(row["state"])
        for theme, bias in zip(THEMES, REGION_BIAS[row["region"]]):
            signals = int(row["population"] / 1_000_000 * 12 * bias * rng.uniform(0.75, 1.25))
            rows.append(
                {
                    "state": row["state"],
                    "region": row["region"],
                    "lat": row["lat"],
                    "lon": row["lon"],
                    "population": row["population"],
                    "theme": theme,
                    "signals": max(signals, 1),
                }
            )
    df = pd.DataFrame(rows)
    df["per_million"] = (df["signals"] / (df["population"] / 1_000_000)).round(1)
    return df


INDIA_SIGNALS = build_india_signals()

RECOMMENDATIONS = [
    {
        "id": "REC-31",
        "title": "Add 3 community water points in Kalyanpur",
        "place": "Kalyanpur, Rajasthan",
        "type": "Water access",
        "confidence": "High confidence",
        "score": 87,
        "budget": "₹18.6 lakh",
        "basis": "1,284 citizen signals · 4 source types",
    },
    {
        "id": "REC-29",
        "title": "Solar lighting corridor near Bassi bus stop",
        "place": "Bassi, Jaipur",
        "type": "Public safety",
        "confidence": "High confidence",
        "score": 82,
        "budget": "₹7.4 lakh",
        "basis": "842 citizen signals · 3 source types",
    },
    {
        "id": "REC-24",
        "title": "Raise and surface the school access road",
        "place": "Dausa district",
        "type": "Roads",
        "confidence": "Needs field check",
        "score": 71,
        "budget": "₹31.2 lakh",
        "basis": "617 citizen signals · monsoon pattern",
    },
]


THEME_KEYWORDS = {
    "Water access": ["water", "paani", "पानी", "tanker", "drinking", "jal", "well", "handpump"],
    "Roads": ["road", "sadak", "सड़क", "street", "highway", "pothole", "bridge", "connectivity"],
    "Public safety": ["safety", "unsafe", "danger", "light", "streetlight", "crime", "women", "night", "andhera"],
    "Healthcare": ["health", "hospital", "clinic", "doctor", "medicine", "swasthya", "स्वास्थ्य", "স্বাস্থ্যকেন্দ্র", "healthcare"],
    "Electricity": ["electricity", "power cut", "bijli", "बिजली", "outage", "transformer", "voltage"],
    "Education": ["school", "teacher", "education", "shiksha", "शिक्षा", "college", "classroom"],
}

THEME_ACTION_TEMPLATES = {
    "Water access": ("Add community water points", 1.45),
    "Roads": ("Repair and surface the access road", 5.0),
    "Public safety": ("Install a solar lighting corridor", 1.2),
    "Healthcare": ("Set up a primary health outreach point", 3.0),
    "Electricity": ("Upgrade local transformer capacity", 2.5),
    "Education": ("Improve school facility access", 2.0),
}


def classify_theme(text: str) -> str:
    """Transparent keyword-rule classifier. Not ML — every match is traceable."""
    lowered = text.lower()
    for theme, keywords in THEME_KEYWORDS.items():
        if any(keyword.lower() in lowered for keyword in keywords):
            return theme
    return "Needs triage"


def detect_language(text: str):
    """Very small script-range heuristic so the demo can show auto-detection."""
    for char in text:
        code = ord(char)
        if 0x0900 <= code <= 0x097F:
            return "Hindi"
        if 0x0980 <= code <= 0x09FF:
            return "Bengali"
        if 0x0B80 <= code <= 0x0BFF:
            return "Tamil"
        if 0x0600 <= code <= 0x06FF:
            return "Urdu"
    return None


def estimate_urgency(text: str) -> str:
    lowered = text.lower()
    markers = [
        "never", "not working", "months", "years", "unsafe", "danger",
        "emergency", "urgent", "बंद", "नहीं", "खतरा", "no water", "no light",
    ]
    return "High priority" if any(marker in lowered for marker in markers) else "Standard"


def generate_live_recommendations() -> list:
    """Rule-based scoring computed from whatever is in the session right now —
    this is what makes a signal submitted in Citizen intake actually show up here."""
    counts = {}
    for item in st.session_state.requests:
        theme = item.get("theme", "Needs triage")
        if theme in THEME_ACTION_TEMPLATES:
            counts[theme] = counts.get(theme, 0) + 1

    live_recs = []
    for theme, count in sorted(counts.items(), key=lambda pair: pair[1], reverse=True):
        action, cost_factor = THEME_ACTION_TEMPLATES[theme]
        score = min(95, 40 + count * 8)
        confidence = (
            "High confidence" if score >= 80
            else "Needs field check" if score >= 60
            else "Early signal"
        )
        live_recs.append(
            {
                "id": f"LIVE-{theme[:3].upper()}",
                "title": action,
                "type": theme,
                "confidence": confidence,
                "score": score,
                "budget": f"₹{round(count * cost_factor, 1)} lakh (indicative)",
                "basis": f"{count} citizen signal(s) in this session",
            }
        )
    return live_recs


def init_state() -> None:
    if "requests" not in st.session_state:
        st.session_state.requests = list(BASE_REQUESTS)


def render_sidebar() -> str:
    with st.sidebar:
        st.markdown(
            '<div class="brand-row">' + LOGO_SVG.format(size=46) +
            '<div><div class="brand-name">JanSetu AI</div>'
            '<div class="brand-tag">Public intelligence for infrastructure action</div></div></div>',
            unsafe_allow_html=True,
        )
        st.divider()
        page = st.radio(
            "Workspace",
            ["Control room", "Citizen intake", "Evidence library", "Recommendations"],
        )
        st.divider()
        st.markdown(
            '<div class="side-note"><b>Demo data live</b><br>'
            'All 36 States &amp; UTs. Population: Census 2011. Signal counts are simulated for this prototype.</div>',
            unsafe_allow_html=True,
        )
        st.caption("Prototype mode · Human review required")
    return page


def render_hero() -> None:
    st.markdown(
        '<div class="hero">'
        '<div class="brand-row">' + LOGO_SVG.format(size=40) +
        '<span class="brand-name">JanSetu AI</span></div>'
        '<h1>From voice to <em>public value.</em></h1>'
        '<p>A clear line from what citizens say to what planners can act on, '
        'grounded in local evidence.</p>'
        '<span class="pill">Voice · Text · Messaging apps</span>'
        '<span class="pill">Hindi · Bengali · Tamil · English</span>'
        '<span class="pill">Explainable · Human-reviewed</span>'
        '<span class="pill">Digital Public Good</span>'
        '</div>',
        unsafe_allow_html=True,
    )


def render_header(page: str) -> None:
    if page == "Control room":
        render_hero()
        return
    st.markdown(
        '<div class="brand-strip">' + LOGO_SVG.format(size=30) +
        '<span class="brand-name">JanSetu AI</span></div>',
        unsafe_allow_html=True,
    )
    st.caption(f"ALL INDIA · 36 STATES & UTs / {page.upper()}")
    st.title("From voice to public value.")
    st.write(
        "A clear line from what citizens say to what planners can act on — "
        "grounded in local evidence."
    )


def render_loop() -> None:
    st.subheader("The signal loop")
    st.caption("One citizen voice, four moments of clarity.")
    columns = st.columns(4)
    steps = [
        ("01", "Citizen signal", "“Paani hafte mein ek baar…”"),
        ("02", "AI structures", "Need · place · urgency"),
        ("03", "Hotspot insight", "1,284 signals cluster"),
        ("04", "Policy recommendation", "3 water points · ₹18.6L"),
    ]
    for column, (number, label, detail) in zip(columns, steps):
        with column:
            st.metric(label, number)
            st.caption(detail)


def render_metrics() -> None:
    st.subheader("India overview")
    total = int(INDIA_SIGNALS["signals"].sum()) + max(len(st.session_state.requests) - len(BASE_REQUESTS), 0)
    top_state = INDIA_SIGNALS.groupby("state")["signals"].sum().idxmax()
    columns = st.columns(4)
    metrics = [
        ("Signals (illustrative)", f"{total:,}", "simulated · scaled by population"),
        ("States & UTs covered", "36", "all of India"),
        ("Population covered", f"{INDIA_STATES['population'].sum() / 1e7:.1f} crore", "Census 2011"),
        ("Highest volume", top_state, "by total signals"),
    ]
    for column, (label, value, delta) in zip(columns, metrics):
        with column:
            st.metric(label, value, delta)


def render_hotspots() -> None:
    st.subheader("Where India is asking")
    st.caption(
        "Population: Census 2011 (real). Signal counts: simulated for this prototype. "
        "Bigger circle = more signals."
    )
    theme_choice = st.selectbox("Show theme", ["All themes"] + THEMES)
    data = INDIA_SIGNALS if theme_choice == "All themes" else INDIA_SIGNALS[INDIA_SIGNALS["theme"] == theme_choice]
    by_state = (
        data.groupby(["state", "lat", "lon", "population"], as_index=False)["signals"].sum()
    )
    by_state["per_million"] = (by_state["signals"] / (by_state["population"] / 1_000_000)).round(1)
    top = by_state["signals"].max()
    by_state["size"] = 25000 + (by_state["signals"] / top) * 110000

    left, right = st.columns([1.2, 0.8])
    with left:
        st.map(by_state, latitude="lat", longitude="lon", size="size", color="#e86f3d", use_container_width=True)
    with right:
        st.markdown("**Top 10 States / UTs**")
        st.dataframe(
            by_state.sort_values("signals", ascending=False)
            .head(10)[["state", "signals", "per_million"]],
            use_container_width=True,
            hide_index=True,
            column_config={
                "state": "State / UT",
                "signals": st.column_config.NumberColumn("Signals", format="%d"),
                "per_million": st.column_config.NumberColumn("Per million people", format="%.1f"),
            },
        )

    st.markdown("**Highest need intensity (state × theme, signals per million people)**")
    hotspot_table = (
        INDIA_SIGNALS.sort_values("per_million", ascending=False)
        .head(8)[["state", "theme", "signals", "per_million"]]
    )
    st.dataframe(
        hotspot_table,
        use_container_width=True,
        hide_index=True,
        column_config={
            "state": "State / UT",
            "theme": "Theme",
            "signals": st.column_config.NumberColumn("Signals", format="%d"),
            "per_million": st.column_config.NumberColumn("Per million people", format="%.1f"),
        },
    )

    st.divider()
    st.subheader("Drill down by State / UT")
    state_choice = st.selectbox("Choose a State / UT", sorted(INDIA_STATES["state"]), index=sorted(INDIA_STATES["state"]).index("Rajasthan"))
    one = INDIA_SIGNALS[INDIA_SIGNALS["state"] == state_choice].set_index("theme")
    info = INDIA_STATES[INDIA_STATES["state"] == state_choice].iloc[0]
    cols = st.columns(3)
    cols[0].metric("Population (Census 2011)", f"{int(info['population']):,}")
    cols[1].metric("Region", info["region"])
    cols[2].metric("Top need", one["signals"].idxmax(), f"{int(one['signals'].max()):,} signals")
    st.bar_chart(one["signals"])

    st.divider()
    st.subheader("Latest citizen signals")
    recent = st.session_state.requests[:4]
    columns = st.columns(2)
    for index, item in enumerate(recent):
        with columns[index % 2]:
            with st.container(border=True):
                st.caption(f"{item['channel']} · {item['time']} · {item['status']}")
                st.write(f"**{item['summary']}**")
                st.write(f"> {item['quote']}")
                st.caption(f"{item['place']} · {item['language']} · {item['theme']}")
    if st.button("Capture another signal", type="primary"):
        st.session_state.page_override = "Citizen intake"
        st.rerun()


def render_live_pulse() -> None:
    st.subheader("Live signal pulse")
    st.caption("Recomputed from every signal in this session — including what you just submitted.")
    counts = pd.Series([item.get("theme", "Needs triage") for item in st.session_state.requests]).value_counts()
    st.bar_chart(counts)


def render_control_room() -> None:
    render_header("Control room")
    render_loop()
    st.divider()
    render_metrics()
    st.divider()
    render_hotspots()
    st.divider()
    render_live_pulse()
    st.divider()
    st.success(
        "Three recommendations are ready for human review. "
        "AI explains the why; the planning team decides what happens next."
    )


def render_intake() -> None:
    render_header("Citizen intake")
    st.subheader("Make a need visible.")
    st.write(
        "Capture the words as they are spoken. The original voice stays attached "
        "to the structured evidence record."
    )

    with st.form("citizen_intake"):
        language = st.selectbox(
            "Language",
            ["Hindi", "English", "Marwari", "Bengali", "Tamil"],
            index=0,
        )
        channel = st.radio(
            "Channel",
            ["Voice note", "Text", "Messaging app"],
            horizontal=True,
        )
        if channel == "Voice note":
            st.audio_input("Record a voice note (optional)")
            st.caption(
                "For this prototype, the structured demo record is created even "
                "without an uploaded audio file."
            )
            message = st.text_area(
                "Optional transcript or summary",
                placeholder="Example: The water point is 4 km away and the tanker comes once a week…",
                height=130,
            )
        else:
            message = st.text_area(
                "Your message",
                placeholder="Tell us what is happening in your area…",
                height=160,
            )
        place = st.text_input(
            "Place",
            value="Kalyanpur, Rajasthan",
            # any village, block, district or state in India works
            help="A village, ward, block, or district is enough.",
        )
        consent = st.checkbox(
            "I consent to share this request with public planning teams.",
            value=True,
        )
        submitted = st.form_submit_button(
            "Send this signal",
            type="primary",
            use_container_width=True,
        )

    if submitted:
        if not consent:
            st.error("Consent is required before sending a request.")
        elif not message.strip() and channel != "Voice note":
            st.error("Add a short message so the planning team can understand the need.")
        else:
            quote_text = message.strip() or "Voice note captured — local need shared with JanSetu."
            detected_theme = classify_theme(quote_text)
            detected_language = detect_language(quote_text) or language
            urgency = estimate_urgency(quote_text)
            new_request = {
                "id": f"SIG-{2050 + len(st.session_state.requests)}",
                "quote": quote_text,
                "summary": f"{detected_theme} concern raised in {place or 'Rajasthan'}",
                "language": detected_language,
                "channel": channel,
                "place": place or "Demo location · Rajasthan",
                "time": "just now",
                "status": "Structured",
                "theme": detected_theme,
                "urgency": urgency,
            }
            st.session_state.requests.insert(0, new_request)
            st.success(
                f"Signal structured: theme = **{detected_theme}** · "
                f"language = **{detected_language}** · urgency = **{urgency}**"
            )
            st.caption(
                "Structuring here uses transparent keyword rules, not a black-box model — "
                "every classification traces back to the words used. Check Recommendations "
                "to see this signal already counted."
            )
            st.session_state.page_override = "Evidence library"

    st.info(
        "Privacy by default: this demo does not require a name, phone number, "
        "or other personal details."
    )


def render_evidence() -> None:
    render_header("Evidence library")
    st.subheader("Signals with the source still attached.")
    st.caption(
        "Each record keeps the original citizen wording alongside the structured fields."
    )
    search = st.text_input("Search by place, theme, or language", placeholder="Try: water, Hindi, Jaipur")
    filtered = st.session_state.requests
    if search:
        query = search.lower()
        filtered = [
            item
            for item in filtered
            if query in " ".join(str(value) for value in item.values()).lower()
        ]
    st.caption(f"{len(filtered)} signal(s) shown · demo dataset")
    for item in filtered:
        with st.expander(f"{item['id']} · {item['summary']} · {item['status']}"):
            columns = st.columns([1.4, 0.8, 0.8, 1, 0.8])
            columns[0].write(f"**Original wording**\n\n{item['quote']}")
            columns[1].write(f"**Language**\n\n{item['language']}")
            columns[2].write(f"**Channel**\n\n{item['channel']}")
            columns[3].write(f"**Location**\n\n{item['place']}")
            columns[4].write(f"**Urgency**\n\n{item.get('urgency', 'Standard')}")


def render_recommendations() -> None:
    render_header("Recommendations")
    st.subheader("Decision queue")
    st.caption("AI-generated recommendations require human review before action.")
    issue_filter = st.multiselect(
        "Filter by issue",
        sorted({item["type"] for item in RECOMMENDATIONS}),
        default=[],
    )
    recommendations = [
        item
        for item in RECOMMENDATIONS
        if not issue_filter or item["type"] in issue_filter
    ]
    for item in recommendations:
        with st.container(border=True):
            columns = st.columns([3.2, 1, 1])
            with columns[0]:
                st.caption(f"{item['id']} · {item['type']} · {item['place']}")
                st.write(f"### {item['title']}")
                st.write(item["basis"])
            with columns[1]:
                st.metric("Priority score", item["score"], item["confidence"])
            with columns[2]:
                st.metric("Indicative budget", item["budget"])
            with st.expander("Why this recommendation?"):
                st.write(
                    "The score combines citizen signal volume, recurrence, "
                    "geographic concentration, and cross-source agreement."
                )
                st.write(
                    "This is a demo explanation, not a final allocation decision. "
                    "A field check and public planning review are required."
                )

    st.divider()
    st.subheader("Live, from this session")
    st.caption(
        "Generated on the fly from whatever signals exist right now, including anything "
        "you just submitted in Citizen intake. Rule-based scoring, shown transparently."
    )
    live_recommendations = generate_live_recommendations()
    if not live_recommendations:
        st.info("No live signals yet — submit one from Citizen intake to see it scored here.")
    for item in live_recommendations:
        with st.container(border=True):
            columns = st.columns([3.2, 1, 1])
            with columns[0]:
                st.caption(f"{item['id']} · {item['type']}")
                st.write(f"### {item['title']}")
                st.write(item["basis"])
            with columns[1]:
                st.metric("Priority score", item["score"], item["confidence"])
            with columns[2]:
                st.metric("Indicative budget", item["budget"])


apply_branding()
init_state()
page = render_sidebar()
page_override = st.session_state.pop("page_override", None)
if page_override:
    page = page_override

if page == "Control room":
    render_control_room()
elif page == "Citizen intake":
    render_intake()
elif page == "Evidence library":
    render_evidence()
else:
    render_recommendations()

st.divider()
st.caption(
    f"JanSetu AI · Census 2011 population + simulated signals · Last session update: "
    f"{datetime.now().strftime('%d %b %Y, %H:%M')}"
)
