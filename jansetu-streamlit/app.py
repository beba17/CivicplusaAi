from datetime import datetime

import pandas as pd
import streamlit as st


st.set_page_config(
    page_title="JanSetu AI — Public Intelligence",
    page_icon="◉",
    layout="wide",
    initial_sidebar_state="expanded",
)


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
]

HOTSPOTS = pd.DataFrame(
    [
        {"place": "Jaipur rural belt", "issue": "Water reliability", "signals": 1284, "change": "+18%", "lat": 26.9124, "lon": 75.7873},
        {"place": "Bassi block", "issue": "Road connectivity", "signals": 842, "change": "+11%", "lat": 26.9647, "lon": 76.0488},
        {"place": "Dausa district", "issue": "School access", "signals": 617, "change": "+8%", "lat": 26.8932, "lon": 76.3375},
    ]
)

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
        st.title("JanSetu AI")
        st.caption("Public intelligence for infrastructure action")
        st.divider()
        page = st.radio(
            "Workspace",
            ["Control room", "Citizen intake", "Evidence library", "Recommendations"],
        )
        st.divider()
        st.info(
            "Demo data live\n\n"
            "Signals shown here are a representative Rajasthan pilot dataset."
        )
        st.caption("Prototype mode · Human review required")
    return page


def render_header(page: str) -> None:
    st.caption(f"RAJASTHAN PILOT / {page.upper()}")
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
    st.subheader("Live overview")
    columns = st.columns(4)
    metrics = [
        ("Signals received", "4,862", "+12.4% this month"),
        ("Districts represented", "18", "+3 since last week"),
        ("Needs structured", "91.6%", "+4.8% model confidence"),
        ("Recommendations ready", "27", "8 new · awaiting review"),
    ]
    for column, (label, value, delta) in zip(columns, metrics):
        with column:
            st.metric(label, value, delta)


def render_hotspots() -> None:
    left, right = st.columns([1.15, 0.85])
    with left:
        st.subheader("Where people are asking")
        st.caption("Demand geography · demo coordinates")
        st.map(HOTSPOTS[["lat", "lon"]], zoom=7, use_container_width=True)
        st.dataframe(
            HOTSPOTS[["place", "issue", "signals", "change"]],
            use_container_width=True,
            hide_index=True,
            column_config={
                "signals": st.column_config.NumberColumn("Signals", format="%d"),
                "change": st.column_config.TextColumn("Change"),
            },
        )
    with right:
        st.subheader("Latest citizen signals")
        for item in st.session_state.requests[:4]:
            with st.container(border=True):
                st.caption(f"{item['channel']} · {item['time']} · {item['status']}")
                st.write(f"**{item['summary']}**")
                st.write(f"> {item['quote']}")
                st.caption(f"{item['place']} · {item['language']} · {item['theme']}")
        if st.button("Capture another signal", type="primary", use_container_width=True):
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
    f"JanSetu AI · representative demo data · Last session update: "
    f"{datetime.now().strftime('%d %b %Y, %H:%M')}"
)
